'use strict';

const repos = require('../repositories');
const messages = require('../messages');
const validations = require('../validations');
const enums = require('../enums');
const restify = require('restify');

module.exports = {
  create,
  get,
  update,
  remove
};
function create(payload) {
  return validations.validatePayload(payload, {
    properties: {
      name: validations.rules.startingLocationName,
      isDomestic: validations.rules.isDomestic
    }
  })
    .then(repos.user.findById.bind(this, payload.auth.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      if (payload.auth.userType !== enums.user.type.admin) {
        throw new restify.errors.ForbiddenError(messages.user.notAllowed);
      }
      // return repos.startingLocation.createStartingLocation(payload);
    })
    .then(repos.startinglocation.findByName.bind(this, payload.name))
    .then((sameNameStartingLocation) => {
      if(sameNameStartingLocation.length > 0) {
        console.log('sameNameStartingLocation', sameNameStartingLocation);
        if(sameNameStartingLocation.length > 1 || payload.isDomestic === sameNameStartingLocation[0].isDomestic) {
          throw new restify.errors.ConflictError('Duplicate isDomestic');
        }
      }
      return repos.startinglocation.create(payload);
    })
    .then((response) => {
      return Promise.resolve({
        message: messages.startingLocation.success,
        data: response
      });
    });
}
function get(payload) {
  return repos.startinglocation.get(payload)
    .then((response) => {
      return Promise.resolve(response);
    });
}

function update(payload) {
  return validations.validatePayload(payload, {
    properties: {
      startingLocationId: validations.rules.startingLocationId,
      name: validations.rules.startingLocationName,
      isDomestic: validations.rules.isDomestic
    }
  })
    .then(repos.user.findById.bind(this, payload.auth.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      if (payload.auth.userType !== enums.user.type.admin) {
        throw new restify.errors.ForbiddenError(messages.user.notAllowed);
      }
    })
    .then(repos.startinglocation.findById.bind(this, payload.startingLocationId))
    .then((startingLocation) => {
      if (!startingLocation) {
        throw new restify.errors.ConflictError(messages.startingLocation.startingLocationNotExists);
      }
      return repos.startinglocation.update(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.startingLocation.startingLocationUpdate
      });
    });
}
function remove(payload) {
  return validations.validatePayload(payload, {
    properties: {
      startingLocationId: validations.rules.startingLocationId
    }
  })
    .then(repos.user.findById.bind(this, payload.auth.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      if (payload.auth.userType !== enums.user.type.admin) {
        throw new restify.errors.ForbiddenError(messages.user.notAllowed);
      }
    })
    .then(repos.startingLocation.findByStartingLocationId.bind(this, payload.startingLocationId))
    .then((startingLocation) => {
      if (!startingLocation) {
        throw new restify.errors.ConflictError(messages.startingLocation.startingLocationNotExists);
      }
      return repos.startinglocation.remove(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.startingLocation.delete
      });
    });
}
