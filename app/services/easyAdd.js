'use strict';

const repos = require('../repositories');
const messages = require('../messages');
const validations = require('../validations');
// const enums = require('../enums');
const restify = require('restify');

module.exports = {
  create,
  update,
  remove,
  get,
  getById
};

function create(payload) {
  return validations.validatePayload(payload, {
    properties: {
      name: validations.rules.textRequired,
      province: validations.rules.textRequired,
      type: validations.rules.textRequired

    }
  })
    .then(repos.user.findById.bind(this, payload.auth.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      // if (payload.auth.userType !== enums.user.type.admin) {
      //   throw new restify.errors.ForbiddenError(messages.user.notAllowed);
      // }
      // return repos.facility.create(payload);
    })
    .then(repos.easyAdd.getByName.bind(this, payload.name))
    .then((sameNameEasyAdd) => {
      if (sameNameEasyAdd.length > 0) {
        console.log('sameNameFacility', sameNameEasyAdd);
        if (sameNameEasyAdd.length > 1) {
          throw new restify.errors.ConflictError('Duplicate Destination');
        }
      }
      return repos.easyAdd.create(payload);
    })
    .then((response) => {
      return Promise.resolve({
        message: messages.easyAdd.success,
        id: response._id
      });
    });
}
function get(payload) {
  let total;

  return repos.easyAdd.getCount(payload)
    .then((count) => {
      total = count;
      return Promise.resolve(payload);
    })
    .then(repos.easyAdd.get)
    .then((res) => {
      return Promise.resolve({
        data: res,
        meta: {
          pageSize: payload.pageSize,
          skip: payload.skip,
          total: total
        }
      });
    });
}
function update(payload) {
  return validations.validatePayload(payload, {
    properties: {
      easyAddId: validations.rules.objectId,
      name: validations.rules.textRequired,
      province: validations.rules.textRequired,
      type: validations.rules.textRequired
    }
  })
    .then(repos.user.findById.bind(this, payload.auth.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      // if (payload.auth.userType !== enums.user.type.admin) {
      //   throw new restify.errors.ForbiddenError(messages.user.notAllowed);
      // }
    })
    .then(repos.easyAdd.findById.bind(this, payload.easyAddId))
    .then((easyAdd) => {
      if (!easyAdd) {
        throw new restify.errors.ConflictError(messages.easyAdd.notExists);
      }
      return repos.easyAdd.update(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.facility.update
      });
    });
}
function remove(payload) {
  return validations.validatePayload(payload, {
    properties: {
      easyAddId: validations.rules.objectId
    }
  })
    .then(repos.user.findById.bind(this, payload.auth.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      // if (payload.auth.userType !== enums.user.type.admin) {
      //   throw new restify.errors.ForbiddenError(messages.user.notAllowed);
      // }
    })
    .then(repos.easyAdd.findById.bind(this, payload.easyAddId))
    .then((easyAdd) => {
      if (!easyAdd) {
        throw new restify.errors.ConflictError(messages.easyAdd.notExists);
      }
      return repos.easyAdd.remove(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.easyAdd.delete
      });
    });
}

function getById(payload) {
  let easyAdd;
  return new Promise((resolve, reject) => {
    if (payload.easyAddId) {
      return validations.validatePayload(payload, {
        properties: {
          easyAddId: validations.rules.objectId
        }
      }).then((res) => {
        resolve(repos.easyAdd.findById(payload.easyAddId));
      })
        .catch(err => {
          reject(err);
        });
    }
  })
    .then((response) => {
      easyAdd = response;
      if (!easyAdd) {
        throw new restify.errors.NotFoundError(messages.easyAdd.notFound);
      }
      return Promise.resolve(easyAdd);
    });
}
