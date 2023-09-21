'use strict';

const repos = require('../repositories');
const messages = require('../messages');
const validations = require('../validations');
const enums = require('../enums');
const restify = require('restify');
// const helpers = require('../helpers');
// const constants = require('../constants');
// const _ = require('lodash');

module.exports = {
  create,
  get,
  update,
  remove
};

function create(payload) {
  return validations.validatePayload(payload, {
    properties: {
      name: validations.rules.subLocationName,
      parent: validations.rules.parent,
      isDomestic: validations.rules.isDomestic
      // location: validations.rules.locationId
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
    .then(repos.sublocation.findById.bind(this, payload.parent.id))
    .then((location) => {
      if (!location) {
        throw new restify.errors.ConflictError(messages.location.locationNotExists);
      }
      // return repos.location.createSubLocation(payload);
    }).then(repos.sublocation.findByName.bind(this, payload.name))
    .then((sameNameSubLocaton) => {
      if (sameNameSubLocaton.length > 0) {
        console.log('sameNameSubLocaton', sameNameSubLocaton);
        if (sameNameSubLocaton.length > 1 || payload.isDomestic === sameNameSubLocaton[0].isDomestic) {
          throw new restify.errors.ConflictError('Duplicate isDomestic');
        }
      }
      return repos.sublocation.create(payload);
    })
    .then((response) => {
      return Promise.resolve({
        message: messages.location.subLocationSuccess,
        data: response
      });
    });
}

function get(payload) {
  return repos.sublocation.get(payload)
    .then((response) => {
      return Promise.resolve(response);
    });
}

function update(payload) {
  return validations.validatePayload(payload, {
    properties: {
      subLocationId: validations.rules.subLocationId,
      name: validations.rules.subLocationName,
      parent: validations.rules.parent,
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
    .then(repos.sublocation.findById.bind(this, payload.subLocationId))
    .then((subLocation) => {
      if (!subLocation) {
        throw new restify.errors.ConflictError(messages.location.subLocationNotExists);
      }
    })
    .then(repos.location.findById.bind(this, payload.parent.id))
    .then((location) => {
      if (!location) {
        throw new restify.errors.ConflictError(messages.location.locationNotExists);
      }
      return repos.sublocation.update(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.location.subLocationUpdate
      });
    });
}
function remove(payload) {
  return validations.validatePayload(payload, {
    properties: {
      subLocationId: validations.rules.subLocationId
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
    .then(repos.sublocation.findById.bind(this, payload.subLocationId))
    .then((subLocation) => {
      if (!subLocation) {
        throw new restify.errors.ConflictError(messages.location.subLocationNotExists);
      }
      return repos.sublocation.remove(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.location.subLocationDelete
      });
    });
}
