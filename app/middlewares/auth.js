'use strict';

const repos = require('../repositories');
const helpers = require('../helpers');
const messages = require('../messages');
const restify = require('restify');
const _ = require('lodash');

module.exports = {
  optional,
  required
};
function optional(allowTypes, meParams) {
  return (req, res, next) => {
    return authentication(req, allowTypes, meParams, next)
      .catch(() => {
        return next();
      });
  };
}
function required(allowTypes, meParams) {
  return (req, res, next) => {
    return authentication(req, allowTypes, meParams, next)
      .catch(next);
  };
}
function authentication(req, allowTypes, meParams, next) {
  let token = req.headers.token;
  let claims;

  return new Promise((resolve, reject) => {
    if (!token) {
      return reject(new restify.errors.UnauthorizedError(messages.validation.token.empty));
    }

    return resolve();
  })
    .then(helpers.token.validate.bind(this, token))
    .then((decoded) => {
      claims = decoded;
      return Promise.resolve(token);
    })
    .then(_verifyToken)
    .then(() => {
      if (allowTypes) {
        if (typeof allowTypes === 'string') {
          allowTypes = [allowTypes];
        }

        if (allowTypes.indexOf(claims.userType) === -1) {
          throw new restify.errors.ForbiddenError(messages.validation.token.forbidden);
        }
      }

      req.auth = {
        userId: claims.userId,
        userType: claims.userType
      };

      if (meParams) {
        if (typeof meParams === 'string') {
          meParams = [meParams];
        }

        _.each(meParams, (value) => {
          if (req.params[value] === 'me') {
            req.params[value] = req.auth.userId;
          }
        });
      }

      return next();
    });
}
function _verifyToken(token) {
  return repos.userToken.findByToken(token)
    .then((result) => {
      if (!result) {
        throw new restify.errors.UnauthorizedError(messages.validation.token.invalid);
      }

      return Promise.resolve(token);
    });
}
