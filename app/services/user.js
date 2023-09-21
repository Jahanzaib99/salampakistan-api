'use strict';
// const config = require('../config');
const repos = require('../repositories');
const helpers = require('../helpers');
const enums = require('../enums');
const messages = require('../messages');
const validations = require('../validations');
const restify = require('restify');
const constants = require('../constants');
const moment = require('moment');

module.exports = {
  create,
  getById,
  getAll,
  saveProfile,
  changePassword,
  addToWish,
  deleteAll,
  deleteWishListEvent,
  removeWishList,
  getUserWishlist,
  addToPlan,
  getUserPlan,
  removePlan,
  uploadPhoto,
  removePhoto,
  updateStatus,
  update,
  remove
};

function create(payload) {
  return new Promise((resolve) => {
    // if (payload.type === enums.user.type.admin) {
    return resolve(_createUser(payload));
    // } else if (payload.type === enums.user.type.vendor) {
    // return resolve(_createVendor(payload));
    // throw new restify.errors.BadRequestError(messages.user.typeInvalid);
    // } else {
    // throw new restify.errors.BadRequestError(messages.user.typeInvalid);
    // }
  });
}

function _createUser(payload) {
  return validations.validatePayload(payload, {
    properties: {
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
    .then(() => {
      payload.profile = {
        firstName: payload.firstName,
        middleName: payload.middleName,
        lastName: payload.lastName,
        mobile: payload.mobile,
        gender: payload.gender,
        nic: payload.nic,
        emergencyMobile: payload.emergencyMobile,
        companyName: payload.companyName,
        dob: moment(payload.dob).startOf('day').valueOf()
      };
      return Promise.resolve(payload);
    })
    .then(_create);
}

// function _createVendor(payload) {
//   return validations.validatePayload(payload, {
//     properties: {
//       companyName: validations.rules.companyName,
//       fullName: validations.rules.fullName,
//       mobile: validations.rules.mobile,
//       email: validations.rules.email,
//       password: validations.rules.password,
//       gender: validations.rules.gender,
//       // twitter: validations.rules.socialMedia,
//       facebook: validations.rules.socialMedia,
//       description: validations.rules.textRequired('Vendor description'),

//       // Ownstransport: validations.rules.Ownstransport,
//       nic: validations.rules.idCard,
//       // license: validations.rules.license,
//       baseLocation: validations.rules.textRequired('Base Location'),
//       partnershipLevel: validations.rules.textRequired('Partnership Level')
//       // specialty: validations.rules.textRequired('Specialty'),
//       // fluencyInEnglish: validations.rules.textRequired('Fluency In English'),
//       // equipmentAndCapacity: validations.rules.textRequired('Equipment And Capacity'),
//       // numberOfGuides: validations.rules.numberOfGuides,
//       // locationOfGuides: validations.rules.textRequired('Location Of Guides'),
//       // safetyMeasures: validations.rules.textRequired('Safety Measures'),
//       // establishmentDate: validations.rules.establishmentDate,

//       // commission: validations.rules.commission,
//       // accountNumber1: validations.rules.accountNumber1,
//       // accountNumber2: validations.rules.accountNumber2,
//       // accountNumber3: validations.rules.accountNumber3
//     }
//   })
//     .then(() => {
//       payload.profile = {
//         companyName: payload.companyName,
//         fullName: payload.fullName,
//         mobile: payload.mobile,
//         gender: payload.gender,
//         // twitter: payload.twitter,
//         facebook: payload.facebook,
//         description: payload.description,

//         // Ownstransport: payload.Ownstransport,
//         nic: payload.nic,
//         // license: payload.license,
//         baseLocation: payload.baseLocation,
//         partnershipLevel: payload.partnershipLevel
//         // specialty: payload.specialty,
//         // fluencyInEnglish: payload.fluencyInEnglish,
//         // equipmentAndCapacity: payload.equipmentAndCapacity,
//         // numberOfGuides: payload.numberOfGuides,
//         // locationOfGuides: payload.locationOfGuides,
//         // safetyMeasures: payload.safetyMeasures,
//         // establishmentDate: payload.establishmentDate,

//         // commission: payload.commission,
//         // accountNumber1: payload.accountNumber1,
//         // accountNumber2: payload.accountNumber2,
//         // accountNumber3: payload.accountNumber3
//       };

//       return Promise.resolve(payload);
//     })
//     .then(_create);
// }

function _create(payload) {
  return repos.user.findByEmail(payload.email)
    .then((user) => {
      if (user) {
        throw new restify.errors.ConflictError(messages.user.signup.exists);
      }

      payload.social = enums.auth.social.local;
      payload.createdBy = payload.auth.userId;

      return helpers.crypt.hash(payload.password)
        .then((hash) => { payload.hash = hash; })
        .then(() => Promise.resolve(payload));
    })
    .then(repos.user.create)
    .then((user) => {
      let response = user;
      let data = {
        userId: user.id
      };
      switch (user.type) {
        case enums.user.type.superAdmin:
          data.permissions = constants.userPermissions.Permissions.superAdmin;
          break;
        case enums.user.type.admin:
          data.permissions = constants.userPermissions.Permissions.admin;
          break;
        case enums.user.type.vendor:
          if (user.vendorType === enums.user.vendorType.hotel) {
            data.permissions = constants.userPermissions.Permissions.vendor.hotel;
          } else if (user.vendorType === enums.user.vendorType.tripAndEvent) {
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
    .then((user) => {
      return Promise.resolve({
        id: user._id,
        message: messages.user.signup.success
      });
    });
}

function getById(payload) {
  return validations.validatePayload(payload, {
    properties: {
      userId: validations.rules.userId
    }
  })
    .then(repos.user.findById.bind(this, payload.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }

      // if (payload.auth.userType !== enums.user.type.admin && payload.auth.userType !== enums.user.type.superAdmin && payload.auth.userId !== payload.userId) {
      //   throw new restify.errors.ForbiddenError(messages.user.notAllowed);
      // }

      return Promise.resolve(user);
    })
    .then(helpers.user.adjustProfileResponse)
    .then(helpers.user.adjustDetailResponse);

}

function getAll(payload) {
  let total;

  return repos.user.findByTypeCount(payload)
    .then((count) => {
      total = count;
      return Promise.resolve(payload);
    })
    .then(repos.user.findByType)
    .then(helpers.user.adjustProfileResponse)
    .then((users) => {
      return {
        data: users,
        meta: {
          pageSize: payload.pageSize,
          skip: payload.skip,
          total: total
        }
      };
    });
}

function saveProfile(payload) {
  return validations.validatePayload(payload, {
    properties: {
      userId: validations.rules.userId
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
      if (user.type === enums.user.type.admin) {
        return Promise.resolve(_saveProfileAdmin(payload));
      } else if (user.type === enums.user.type.vendor) {
        // return Promise.resolve(_saveProfileVendor(payload));
        throw new restify.errors.BadRequestError(messages.user.typeInvalid);
      } else if (user.type === enums.user.type.customer) {
        return Promise.resolve(_saveProfileCustomer(payload));
      }
    });
}

function _saveProfileAdmin(payload) {
  return validations.validatePayload(payload, {
    properties: {
      firstName: validations.rules.firstName,
      lastName: validations.rules.lastName,
      mobile: validations.rules.mobile,
      gender: validations.rules.gender,
      nic: validations.rules.idCard,
      dob: validations.rules.dob
    }
  })
    .then(() => {
      payload.type = enums.user.type.admin;
      payload.profile = {
        firstName: payload.firstName,
        middleName: payload.middleName,
        lastName: payload.lastName,
        mobile: payload.mobile,
        emergencyMobile: payload.emergencyMobile,
        gender: payload.gender,
        nic: payload.nic,
        dob: moment(payload.dob).startOf('day').valueOf()
      };
      payload.address = {
        street: payload.street,
        area: payload.area,
        city: payload.city,
        state: payload.state,
        zipCode: payload.zipCode,
        country: payload.country
      };
      return Promise.resolve(payload);
    })
    .then(_saveProfile);
}

// function _saveProfileVendor(payload) {
//   return validations.validatePayload(payload, {
//     properties: {
//       companyName: validations.rules.companyName,
//       fullName: validations.rules.fullName,
//       mobile: validations.rules.mobile,
//       gender: validations.rules.gender,
//       // twitter: validations.rules.socialMedia,
//       facebook: validations.rules.socialMedia,
//       description: validations.rules.textRequired('Vendor description'),

//       // Ownstransport: validations.rules.Ownstransport,
//       nic: validations.rules.idCard,
//       // license: validations.rules.license,
//       baseLocation: validations.rules.textRequired('Base Location'),
//       partnershipLevel: validations.rules.textRequired('Partnership Level')
//       // specialty: validations.rules.textRequired('Specialty'),
//       // fluencyInEnglish: validations.rules.textRequired('Fluency In English'),
//       // equipmentAndCapacity: validations.rules.textRequired('Equipment And Capacity'),
//       // numberOfGuides: validations.rules.numberOfGuides,
//       // locationOfGuides: validations.rules.textRequired('Location Of Guides'),
//       // safetyMeasures: validations.rules.textRequired('Safety Measures'),
//       // establishmentDate: validations.rules.establishmentDate,

//       // commission: validations.rules.commission,
//       // accountNumber1: validations.rules.accountNumber1,
//       // accountNumber2: validations.rules.accountNumber2,
//       // accountNumber3: validations.rules.accountNumber3
//     }
//   })
//     .then(() => {
//       payload.type = enums.user.type.vendor;
//       payload.profile = {
//         companyName: payload.companyName,
//         fullName: payload.fullName,
//         mobile: payload.mobile,
//         gender: payload.gender,
//         description: payload.description,
//         // twitter: payload.twitter,
//         facebook: payload.facebook,
//         profilePhotoId: payload.profilePhotoId,

//         // Ownstransport: payload.Ownstransport,
//         nic: payload.nic,
//         // license: payload.license,
//         baseLocation: payload.baseLocation,
//         partnershipLevel: payload.partnershipLevel
//         // specialty: payload.specialty,
//         // fluencyInEnglish: payload.fluencyInEnglish,
//         // equipmentAndCapacity: payload.equipmentAndCapacity,
//         // numberOfGuides: payload.numberOfGuides,
//         // locationOfGuides: payload.locationOfGuides,
//         // safetyMeasures: payload.safetyMeasures,
//         // establishmentDate: payload.establishmentDate,

//         // commission: payload.commission,
//         // accountNumber1: payload.accountNumber1,
//         // accountNumber2: payload.accountNumber2,
//         // accountNumber3: payload.accountNumber3
//       };

//       return Promise.resolve(payload);
//     })
//     // .then(_create)
//     .then(_saveProfile);
// }

function _saveProfileCustomer(payload) {
  return validations.validatePayload(payload, {
    properties: {
      firstName: validations.rules.firstName,
      lastName: validations.rules.lastName,
      mobile: validations.rules.mobile,
      gender: validations.rules.gender,
      nic: validations.rules.idCard,
      dob: validations.rules.dob
    }
  })
    .then(() => {
      payload.type = enums.user.type.customer;
      payload.profile = {
        firstName: payload.firstName,
        middleName: payload.middleName,
        lastName: payload.lastName,
        mobile: payload.mobile,
        emergencyMobile: payload.emergencyMobile,
        gender: payload.gender,
        nic: payload.nic,
        dob: moment(payload.dob).startOf('day').valueOf()
      };
      payload.address = {
        street: payload.street,
        area: payload.area,
        city: payload.city,
        state: payload.state,
        zipCode: payload.zipCode,
        country: payload.country
      };
      return Promise.resolve(payload);
    })
    .then(_saveProfile);
}

function _saveProfile(payload) {
  return new Promise((resolve) => {
    let data = {};

    data.userId = payload.userId;
    data.type = payload.type;
    data.profile = payload.profile;
    data.address = payload.address;

    if (payload.password) {
      return helpers.crypt.hash(payload.password)
        .then((hash) => { data.hash = hash; })
        .then(() => resolve(data));
    }
    return resolve(data);
  })
    .then(repos.user.saveProfile(payload))
    .then(() => {
      return Promise.resolve({
        message: messages.user.saveSuccess
      });
    });
}

function changePassword(payload) {
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

function addToWish(payload) {
  //   return validations.validatePayload(payload, {
  //     properties: {
  //       eventId: validations.rules.wishlistIDs
  //     }
  //   })
  //     .then(repos.user.findById.bind(this, payload.auth.userId))
  return repos.user.findById(payload.auth.userId)
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      // else if (payload.auth.userType !== enums.user.type.customer) {
      //   throw new restify.errors.ForbiddenError(messages.user.wishList.notAllowed);
      // }
    })
    .then(repos.user.addToWish.bind(this, payload))
    .then((response) => {
      return Promise.resolve({
        message: messages.user.wishList.success
        // data: response
      });
    });
}

function deleteAll(payload) {
  return validations.validatePayload(payload, {
    properties: {
    }
  })
    .then(repos.user.findById.bind(this, payload.auth.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      // else if (payload.auth.userType !== enums.user.type.customer) {
      //   throw new restify.errors.ForbiddenError(messages.user.wishList.notAllowed);
      // }
    })
    .then(repos.user.deleteAll(payload))
    .then((response) => {
      return Promise.resolve({
        message: messages.user.wishList.delete,
        data: response
      });
    });
}

async function deleteWishListEvent(payload) {
  return validations.validatePayload(payload, {
    properties: {
      tripId: validations.rules.objectId
    }
  })
    .then(repos.user.findById.bind(this, payload.auth.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      // else if (payload.auth.userType !== enums.user.type.customer) {
      //   throw new restify.errors.ForbiddenError(messages.user.wishList.notAllowed);
      // }
    })
    .then(repos.user.deleteWishListEvent(payload))
    .then((response) => {
      return Promise.resolve({
        message: messages.user.wishList.delete,
        data: response
      });
    });
}

async function removeWishList(payload) {
  // return validations.validatePayload(payload, {
  //   properties: {
  //     eventId: validations.rules.objectId
  //   }
  // })
  //   .then(repos.user.findById.bind(this, payload.auth.userId))

  return repos.user.findById(payload.auth.userId)
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      // else if (payload.auth.userType !== enums.user.type.customer) {
      //   throw new restify.errors.ForbiddenError(messages.user.wishList.notAllowed);
      // }
    })
    .then(repos.user.removeWishList.bind(this, payload))
    .then((response) => {
      return Promise.resolve({
        message: messages.user.wishList.delete
        // data: response
      });
    });
}
function getUserWishlist(payload) {
  return validations.validatePayload(payload, {
    properties: {
    }
  })
    .then(repos.user.findById.bind(this, payload.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      // else if (payload.auth.userType !== enums.user.type.customer) {
      //   throw new restify.errors.ForbiddenError(messages.user.wishList.notAllowed);
      // }
    })
    .then(repos.user.getUserWishlist.bind(this, payload))
    .then(async(response) => {
      let trips = [];
      let events = [];
      let activities = [];
      let categories = [];
      let locations = [];
      let accommodations = [];
      if (response) {
        trips = await helpers.location.adjustListResponse(response.trips);
        events = await helpers.location.adjustListResponse(response.events);
        activities = await helpers.location.adjustListResponse(response.activities);
        categories = await helpers.location.adjustListResponse(response.categories);
        locations = await helpers.location.adjustListResponse(response.locations);
        accommodations = await helpers.accomodations.adjustListResponse(response.accommodations);
        let data = {
          trips: trips,
          events: events,
          activities: activities,
          locations: locations,
          categories: categories,
          accommodations: accommodations
        };
        return Promise.resolve(data);
      } else {
        let data = {
          trips: [],
          events: [],
          activities: [],
          locations: [],
          categories: [],
          accommodations: []
        };
        return Promise.resolve(data);
      }
    });
}

function addToPlan(payload) {
  //   return validations.validatePayload(payload, {
  //     properties: {
  //       eventId: validations.rules.wishlistIDs
  //     }
  //   })
  //     .then(repos.user.findById.bind(this, payload.auth.userId))
  return repos.user.findById(payload.auth.userId)
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      // else if (payload.auth.userType !== enums.user.type.customer) {
      //   throw new restify.errors.ForbiddenError(messages.user.plan.notAllowed);
      // }
    })
    .then(repos.user.addToPlan.bind(this, payload))
    .then((response) => {
      return Promise.resolve({
        message: messages.user.plan.success
        // data: response
      });
    });
}

function getUserPlan(payload) {
  return validations.validatePayload(payload, {
    properties: {
    }
  })
    .then(repos.user.findById.bind(this, payload.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      // else if (payload.auth.userType !== enums.user.type.customer) {
      //   throw new restify.errors.ForbiddenError(messages.user.plan.notAllowed);
      // }
    })
    .then(repos.user.getUserPlan.bind(this, payload))
    .then(async(response) => {
      let trips = [];
      let events = [];
      let activities = [];
      let categories = [];
      let locations = [];
      let accommodations = [];
      if (response) {
        let tripsObj = { data: response.trips };
        let eventsObj = { data: response.events };
        let activitiesObj = { data: response.activities };
        let categoriesObj = { data: response.categories };
        let locationsObj = { data: response.locations };
        let accommodationsObj = { data: response.accommodations };
        trips = await helpers.tag.adjustListResponse(tripsObj);
        events = await helpers.tag.adjustListResponse(eventsObj);
        activities = await helpers.tag.adjustListResponse(activitiesObj);
        categories = await helpers.tag.adjustListResponse(categoriesObj);
        locations = await helpers.tag.adjustListResponse(locationsObj);
        accommodations = await helpers.tag.adjustListResponse(accommodationsObj);
        let data = {
          trips: trips.data,
          events: events.data,
          activities: activities.data,
          locations: locations.data,
          categories: categories.data,
          accommodations: accommodations.data
        };
        return Promise.resolve(data);
      } else {
        let data = {
          trips: [],
          events: [],
          activities: [],
          locations: [],
          categories: [],
          accommodations: []
        };
        return Promise.resolve(data);
      }
    });
}

async function removePlan(payload) {
  // return validations.validatePayload(payload, {
  //   properties: {
  //     eventId: validations.rules.objectId
  //   }
  // })
  //   .then(repos.user.findById.bind(this, payload.auth.userId))

  return repos.user.findById(payload.auth.userId)
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      // else if (payload.auth.userType !== enums.user.type.customer) {
      //   throw new restify.errors.ForbiddenError(messages.user.plan.notAllowed);
      // }
    })
    .then(repos.user.removePlan.bind(this, payload))
    .then((response) => {
      return Promise.resolve({
        message: messages.user.plan.delete
        // data: response
      });
    });
}

function uploadPhoto(payload) {
  let photoId;
  let foundUser;

  return validations.validatePayload(payload, {
    properties: {
      userId: validations.rules.objectId
    }
  })
    .then(repos.user.findById.bind(this, payload.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.userNotExists);
      }
      foundUser = user;
      return Promise.resolve(payload);
    })
    .then((payload) => {
      photoId = payload.photo[0].filename;
      return Promise.resolve({
        userId: payload.userId,
        photoId: photoId
      });
    })
    .then(repos.user.addPhoto)
    .then(() => {
      // remove previous photo
      if (foundUser.photoIds.length > 0) {
        let payload = {
          userId: foundUser._id.toString(),
          photoId: foundUser.photoIds[0],
          auth: { userId: foundUser._id.toString(), userType: foundUser.type }
        };
        removePhoto(payload);
      }
    })
    .then(() => {
      return Promise.resolve({
        id: photoId,
        photo: helpers.photo.getURL(photoId, false),
        thumbnail: helpers.photo.getURL(photoId, true),
        message: messages.user.profilePicture.success
      });
    });
}

function removePhoto(payload) {
  return validations.validatePayload(payload, {
    properties: {
      userId: validations.rules.objectId
    }
  })
    .then(repos.user.findById.bind(this, payload.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      if (user.photoIds.indexOf(payload.photoId) < 0) {
        throw new restify.errors.ForbiddenError(messages.user.profilePicture.notFounds);
      }
    })
    .then(() => {
      return Promise.resolve(payload);
    })
    .then(repos.user.removePhoto)
    .then(() => {
      return Promise.resolve({
        message: messages.user.profilePicture.successRemove
      });
    });
}

function updateStatus(payload) {
  let res = {};
  return validations.validatePayload(payload, {
    properties: {
      userId: validations.rules.objectId
    }
  })
    .then(repos.user.findById.bind(this, payload.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.ConflictError(messages.user.signin.notFound);
      }

      if (payload.auth.userType === enums.user.type.employee && user.type === enums.user.type.admin || user.type === enums.user.type.superAdmin || user.type === enums.user.type.employee) {
        throw new restify.errors.ForbiddenError(messages.user.notAllowed);
      }

      let data = {
        verified: payload.status
      };
      res = data;
      payload.verify = res;
      return repos.user.updateStatus(payload);
    })
    .then((response) => {
      return Promise.resolve({
        message: messages.user.status.success
      });
    });
}

function update(payload) {
  return validations.validatePayload(payload, {
    properties: {
      firstName: validations.rules.firstName,
      middleName: validations.rules.middleName,
      lastName: validations.rules.lastName,
      mobile: validations.rules.mobile,
      gender: validations.rules.gender,
      nic: validations.rules.idCard,
      dob: validations.rules.dob
    }
  })
    .then(repos.user.findById.bind(this, payload.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.ConflictError(messages.user.signin.notFound);
      }
      // // only superAdmin can update super Admin
      // if (payload.auth.userType !== enums.user.type.superAdmin && user.type === enums.user.type.superAdmin) {
      //   throw new restify.errors.ForbiddenError(messages.user.notAllowed);
      // } else if (payload.auth.userType !== enums.user.type.superAdmin && payload.auth.userType !== enums.user.type.admin && payload.auth.userId !== payload.userId) {
      //   throw new restify.errors.ForbiddenError(messages.user.notAllowed);
      // }

      payload.profile = {
        firstName: payload.firstName,
        middleName: payload.middleName,
        lastName: payload.lastName,
        mobile: payload.mobile,
        gender: payload.gender,
        nic: payload.nic,
        dob: moment(payload.dob).startOf('day').valueOf(),
        companyName: payload.companyName
      };
      payload.address = {
        street: payload.street,
        area: payload.area,
        city: payload.city,
        state: payload.state,
        zipCode: payload.zipCode,
        country: payload.country
      };
      payload.bankDetails = {
        bankTitle: payload.bankTitle,
        accountName: payload.accountName,
        accountNumber: payload.accountNumber
      };
      return repos.user.update(payload);
    })
    .then((user) => {
      return Promise.resolve({
        message: messages.user.signup.update
      });
    });
}

function remove(payload) {
  return validations.validatePayload(payload, {
    properties: {
      userId: validations.rules.userId
    }
  })
    .then(repos.user.findById.bind(this, payload.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.ConflictError(messages.user.signin.notFound);
      }
      // // only superAdmin can update super Admin
      // if (payload.auth.userType !== enums.user.type.superAdmin && user.type === enums.user.type.superAdmin) {
      //   throw new restify.errors.ForbiddenError(messages.user.notAllowed);
      // } else if (payload.auth.userType !== enums.user.type.superAdmin && payload.auth.userType !== enums.user.type.admin && payload.auth.userId !== payload.userId) {
      //   throw new restify.errors.ForbiddenError(messages.user.notAllowed);
      // }
      return repos.user.remove(payload);
    })
    .then((user) => {
      return Promise.resolve({
        message: messages.user.delete
      });
    });
}
