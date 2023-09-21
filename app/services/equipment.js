'use strict';

const repos = require('../repositories');
const messages = require('../messages');
const validations = require('../validations');
const enums = require('../enums');
const restify = require('restify');

module.exports = {
  create,
  update,
  remove,
  get
};

function create(payload) {
  return validations.validatePayload(payload, {
    properties: {
      name: validations.rules.equipmentName
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
      // return repos.equipment.create(payload);
    })
    .then(repos.equipment.getByName.bind(this, payload.name))
    .then((sameNameequipment) => {
      if(sameNameequipment.length > 0) {
        console.log('sameNameActivity', sameNameequipment);
        if(sameNameequipment.length > 1) {
          throw new restify.errors.ConflictError('Duplicate Equipment');
        }
      }
      return repos.equipment.create(payload);
    })
    .then((response) => {
      return Promise.resolve({
        message: messages.equipment.success,
        data: response
      });
    });
}
function get(payload) {
  return repos.equipment.get(payload).then((res) => {
    return Promise.resolve(res);
  });
}
function update(payload) {
  return validations.validatePayload(payload, {
    properties: {
      equipmentId: validations.rules.equipmentId,
      name: validations.rules.equipmentName
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
    .then(repos.equipment.findById.bind(this, payload.equipmentId))
    .then((equipment) => {
      if (!equipment) {
        throw new restify.errors.ConflictError(messages.equipment.notExists);
      }
      return repos.equipment.update(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.equipment.update
      });
    });
}
function remove(payload) {
  return validations.validatePayload(payload, {
    properties: {
      equipmentId: validations.rules.equipmentId
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
    .then(repos.equipment.findById.bind(this, payload.equipmentId))
    .then((equipment) => {
      if (!equipment) {
        throw new restify.errors.ConflictError(messages.equipment.notExists);
      }
      return repos.equipment.remove(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.equipment.delete
      });
    });
}
