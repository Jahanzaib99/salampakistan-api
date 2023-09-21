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
      name: validations.rules.serviceName
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
      // return repos.service.create(payload);
    })
    .then(repos.service.getByName.bind(this, payload.name))
    .then((sameNameService) => {

      if(sameNameService.length > 0) {
        console.log('sameNameActivity', sameNameService);
        if(sameNameService.length > 1) {
          throw new restify.errors.ConflictError('Duplicate Service');
        }
      }
      return repos.service.create(payload);
    })
    .then((response) => {
      return Promise.resolve({
        message: messages.service.success,
        data: response
      });
    });
}
function get(payload) {
  return repos.service.get(payload).then((res) => {
    return Promise.resolve(res);
  });
}
function update(payload) {
  return validations.validatePayload(payload, {
    properties: {
      serviceId: validations.rules.serviceId,
      name: validations.rules.serviceName
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
    .then(repos.service.findByServiceId.bind(this, payload.serviceId))
    .then((service) => {
      if (!service) {
        throw new restify.errors.ConflictError(messages.service.notExists);
      }
      return repos.service.update(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.service.update
      });
    });
}
function remove(payload) {
  return validations.validatePayload(payload, {
    properties: {
      serviceId: validations.rules.serviceId
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
    .then(repos.service.findByServiceId.bind(this, payload.serviceId))
    .then((service) => {
      if (!service) {
        throw new restify.errors.ConflictError(messages.service.notExists);
      }
      return repos.service.remove(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.service.delete
      });
    });
}
