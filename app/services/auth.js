'use strict';

const repos = require('../repositories');
const helpers = require('../helpers');
const enums = require('../enums');
const messages = require('../messages');
const validations = require('../validations');
const restify = require('restify');
const moment = require('moment');
const constants = require('../constants');
// const uuid = require('node-uuid');
// const _ = require('lodash');

module.exports = {
  signup,
  signin,
  logout,
  resetPasswordRequest,
  updatePassword
};

function signup(payload) {
  return validations.validatePayload(payload, {
    properties: {
      deviceType: validations.rules.deviceType,
      firstName: validations.rules.firstName,
      middleName: validations.rules.middleName,
      lastName: validations.rules.lastName,
      mobile: validations.rules.mobile,
      emergencyMobile: validations.rules.emergencyMobile,
      email: validations.rules.email,
      password: validations.rules.password,
      gender: validations.rules.gender,
      nic: validations.rules.idCard,
      dob: validations.rules.dob,
      type: validations.rules.type
    }
  })
    .then(repos.user.findByEmail.bind(this, payload.email))
    .then((user) => {
      if (user) {
        throw new restify.errors.ConflictError(messages.user.signup.exists);
      }
      return helpers.crypt.hash(payload.password)
        .then((hash) => Promise.resolve({
          // type: enums.user.type.customer,
          type: payload.type,
          social: enums.auth.social.local,
          email: payload.email,
          hash: hash,
          vendorType: payload.vendorType,
          profile: {
            firstName: payload.firstName,
            middleName: payload.middleName,
            lastName: payload.lastName,
            mobile: payload.mobile,
            gender: payload.gender,
            nic: payload.nic,
            emergencyMobile: payload.emergencyMobile,
            dob: payload.dob ? moment(payload.dob).startOf('day').valueOf() : undefined,
            companyName: payload.companyName
          }
        }));
    })
    .then(repos.user.create)
    .then(_signin.bind(this, payload))
    .then(async(res) => {
      let response = res;
      let data = {
        userId: res.id
      };
      let subject = 'User Creation';
      let text = 'New user has been created.';
      let html = `<H1>Hi ${res.profile.firstName},</H1>
        <p>Welcome to PTDC </p>
        <p>your new user has been created </strong> </p>
        <p>
        If you didn't create this user, let us know immediately at hello@ptdc.pk!
        </p>
        <p>
        <p>
        Kind Regards,<br />
        Team PTDC
        </p>`;
      await helpers.email.sendEmail(res.profile.email, subject, text, html)
        .catch((error) => {
          throw new restify.errors.PreconditionFailedError(error);
        });
      switch (res.type) {
        case enums.user.type.superAdmin:
          data.permissions = constants.userPermissions.Permissions.superAdmin;
          break;
        case enums.user.type.admin:
          data.permissions = constants.userPermissions.Permissions.admin;
          break;
        case enums.user.type.vendor:
          if (res.vendorType === enums.user.vendorType.hotel) {
            data.permissions = constants.userPermissions.Permissions.vendor.hotel;
          } else if (res.vendorType === enums.user.vendorType.tripAndEvent) {
            data.permissions = constants.userPermissions.Permissions.vendor.tripAndEvent;
          }
          break;
        case enums.user.type.employee:
          data.permissions = constants.userPermissions.Permissions.employee;
          break;
        case enums.user.type.customer:
          data.permissions = constants.userPermissions.Permissions.customer;
          break;
        default:
          data.permissions = constants.Permissions.admin;
      }
      repos.userPermissions.create(data);
      return response;
    })
    .then((response) => {
      response.message = messages.user.signup.success;
      response.created = true;
      return Promise.resolve(response);
    });
}

function signin(payload) {
  let social = payload.social;
  let socialSignin = {
    _signinLocal,
    _signinSocial
  };

  let signinFunc = '_signin' + (social === enums.auth.social.local ? 'Local' : 'Social');

  return validations.validatePayload(payload, {
    properties: {
      social: validations.rules.social,
      deviceType: validations.rules.deviceType
    }
  })
    .then(socialSignin[signinFunc])
    .then(_signin.bind(this, payload));

  function _signinLocal(payload) {
    return validations.validatePayload(payload, {
      properties: {
        email: validations.rules.email,
        password: validations.rules.password,
        deviceType: validations.rules.deviceType
      }
    })
      .then(repos.user.findByEmail.bind(this, payload.email))
      .then(async(user) => {
        if (!user) {
          throw new restify.errors.NotFoundError(messages.user.signin.notFound);
        }
        // Check if token already exists and is valid.
        const exisingToken = await repos.userToken.findValidByUser(user);
        // Execute this condition if token exists and is valid.
        if (exisingToken) {
          return helpers.crypt.hashCompare(payload.password, user.accounts[payload.social].password)
            .then(null, () => {
              throw new restify.errors.UnauthorizedError(messages.user.signin.wrongPassword);
            })
            .then(() => {
              // Add existing token to this user
              user.token = exisingToken.token;
              return user;
            });

        } else {
          return helpers.crypt.hashCompare(payload.password, user.accounts[payload.social].password)
            .then(null, () => {
              throw new restify.errors.UnauthorizedError(messages.user.signin.wrongPassword);
            })
            .then(() => {
              // Promise.resolve(user);
              return user;
            });
        }
      });
  }

  function _signinSocial(payload) {
    let socialInfo;

    return validations.validatePayload(payload, {
      properties: {
        token: validations.rules.token
      }
    })
      .then(helpers[social].getUserInfo.bind(this, payload.token))
      .then((info) => {
        socialInfo = info;

        if (!socialInfo.email) {
          throw new restify.errors.BadRequestError(messages.user.signin.noSocialEmail);
        }

        return repos.user.findByEmail(socialInfo.email);
      }, (err) => {
        if (typeof err === 'string') {
          throw new restify.errors.UnauthorizedError(err);
        }

        throw err;
      })
      .then((user) => {
        if (social !== enums.auth.social.local && !user) {
          let userObj = {
            type: enums.user.type.customer,
            social: social,
            email: payload.email,
            profile: {
              firstName: payload.firstName,
              lastName: payload.lastName,
              mobile: payload.mobile | '1234567890',
              gender: payload.gender | 'male',
              dob: moment(509223600000).startOf('day').valueOf()
            }
          };
          repos.user.create(userObj)
            .then((newuser) => {
              return repos.user.saveSocialInfo({
                userId: newuser._id,
                social: social,
                info: socialInfo
              })
                .then(() => Promise.resolve(newuser));
            });
        } else {
          if (!user) {
            throw new restify.ContextError(new restify.errors.NotFoundError(messages.user.signin.notFound), socialInfo);
          }
          return repos.user.saveSocialInfo({
            userId: user._id,
            social: social,
            info: socialInfo
          })
            .then(() => Promise.resolve(user));
        }
      });
  }
}

function logout(payload) {
  return validations.validatePayload(payload, {
    properties: {
      token: validations.rules.token
    }
  })
    .then(repos.userToken.deleteToken.bind(this, payload.token))
    .then((result) => {
      if (!result) {
        throw new restify.errors.BadRequestError(messages.user.logout.notFound);
      }

      return Promise.resolve({ message: messages.user.logout.success });
    });
}

function _signin(payload, user) {
  // Check if user has existing user
  if (user.token) {
    return Promise.resolve({
      id: user._id,
      token: user.token,
      type: user.type,
      vendorType: user.vendorType,
      email: user.accounts.email,
      message: messages.user.signin.success,
      profile: {
        firstName: user.profile.firstName,
        middleName: user.profile.middleName,
        lastName: user.profile.lastName,
        mobile: user.profile.mobile,
        gender: user.profile.gender,
        nic: user.profile.nic,
        dob: user.profile.dob,
        companyName: user.profile.companyName,
        email: user.accounts.email
      },
      bankDetails: user.bankDetails,
      address: user.address
    });
  } else {
    // Create new token if user does not has any token
    user.userId = user._id;
    user.deviceType = payload.deviceType;
    user.token = helpers.token.auth(user);

    return repos.userToken.save(user)
      .then(() => {
        return Promise.resolve({
          id: user.userId,
          token: user.token,
          type: user.type,
          vendorType: user.vendorType,
          email: user.accounts.email,
          message: messages.user.signin.success,
          profile: {
            firstName: user.profile.firstName,
            middleName: user.profile.middleName,
            lastName: user.profile.lastName,
            mobile: user.profile.mobile,
            gender: user.profile.gender,
            nic: user.profile.nic,
            dob: user.profile.dob,
            companyName: user.profile.companyName,
            email: user.accounts.email
          },
          bankDetails: user.bankDetails,
          address: user.address
        });
      });
  }
}

function resetPasswordRequest(payload) {
  return validations.validatePayload(payload, {
    properties: {
      email: validations.rules.email
    }
  })
    .then(repos.user.findByEmail.bind(this, payload.email))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      let code = '592483';
      try {
        code = makeid(6);
      } catch (error) {
        code = '592483';
      }
      return repos.user.findByEmail(user.email)
        .then(helpers.user.adjustProfileResponse.bind(this, user))
        .then((user) => {
          let subject = 'Reset Password';
          let text = `your new password is ${code}`;
          let html = `<H1>Hey ${user.profile.firstName},</H1>
          <p>Somebody recently asked to reset your password.</p>
          <p>your new password is <strong>${code}</strong> </p>
          <p>
          <b>Didn't request this change?</b><br />
          If you didn't request a new password, let us know immediately at hello@ptdc.pk!
          </p>
          <p>
          <p>
          Kind Regards,<br />
          Team PTDC
          </p>`;
          return helpers.email.sendEmail(user.profile.email, subject, text, html)
            .catch((error) => {
              throw new restify.errors.PreconditionFailedError(error);
            });
        })
        .then(helpers.crypt.hash.bind(this, code))
        .then((hash) => {
          return repos.user.savePassword({
            userId: user._id,
            hash: hash
          });
        });
    })
    .then(() => {
      return Promise.resolve({
        message: messages.user.saveSuccess
      });
    });
}

function makeid(length) {
  var result = '';
  var characters = '0123456789abcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function updatePassword(payload) {
  return validations.validatePayload(payload, {
    properties: {
      userId: validations.rules.userId,
      oldPassword: validations.rules.oldPassword,
      newPassword: validations.rules.password
    }
  })
    .then(repos.user.findById.bind(this, payload.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }

      if (payload.auth.userType !== enums.user.type.admin && payload.auth.userId !== payload.userId) {
        throw new restify.errors.ForbiddenError(messages.user.notAllowed);
      }

      return helpers.crypt.hashCompare(payload.oldPassword, user.accounts.local.password)
        .catch(() => {
          throw new restify.errors.ForbiddenError(messages.user.signin.wrongPassword);
        });
    })
    .then(helpers.crypt.hash.bind(this, payload.newPassword))
    .then((hash) => {
      return repos.user.savePassword({
        userId: payload.userId,
        hash: hash
      });
    })
    .then(() => {
      return Promise.resolve({
        message: messages.user.resetPassword.success
      });
    });
}
