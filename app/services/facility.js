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
      name: validations.rules.facelityName
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
    .then(repos.facility.getByName.bind(this, payload.name))
    .then((sameNameFacility) => {
      if (sameNameFacility.length > 0) {
        console.log('sameNameFacility', sameNameFacility);
        if (sameNameFacility.length > 1) {
          throw new restify.errors.ConflictError('Duplicate Facility');
        }
      }
      return repos.facility.create(payload);
    })
    .then((response) => {
      return Promise.resolve({
        message: messages.facility.success,
        id: response._id
      });
    });
}
function get(payload) {
  let total;

  return repos.facility.getCount(payload)
    .then((count) => {
      total = count;
      return Promise.resolve(payload);
    })
    .then(repos.facility.get)
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
      facilityId: validations.rules.facilityId,
      name: validations.rules.facelityName
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
    .then(repos.facility.findById.bind(this, payload.facilityId))
    .then((facility) => {
      if (!facility) {
        throw new restify.errors.ConflictError(messages.facility.notExists);
      }
      return repos.facility.update(payload);
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
      facilityId: validations.rules.facilityId
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
    .then(repos.facility.findById.bind(this, payload.facilityId))
    .then((facility) => {
      if (!facility) {
        throw new restify.errors.ConflictError(messages.facility.notExists);
      }
      return repos.facility.remove(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.facility.delete
      });
    });
}

function getById(payload) {
  let trip;
  return new Promise((resolve, reject) => {
    if (payload.facilityId) {
      return validations.validatePayload(payload, {
        properties: {
          facilityId: validations.rules.objectId
        }
      }).then((res) => {
        resolve(repos.facility.findById(payload.facilityId));
      })
        .catch(err => {
          reject(err);
        });
    }
  })
    .then((response) => {
      trip = response;
      if (!trip) {
        throw new restify.errors.NotFoundError(messages.trip.notFound);
      }
      return Promise.resolve(trip);
    });
}
