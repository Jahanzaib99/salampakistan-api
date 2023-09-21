'use strict';

const repos = require('../repositories');
const messages = require('../messages');
const validations = require('../validations');
const restify = require('restify');
const moment = require('moment');
const { parseInt } = require('lodash');

module.exports = {
  create,
  update,
  get,
  remove
};

function create(payload) {
  return validations.validatePayload(payload, {
    properties: {
      title: validations.rules.textRequired('Title'),
      date: validations.rules.date,
      description: validations.rules.textRequired('Description')
    }
  })
    .then(repos.user.findById.bind(this, payload.auth.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      payload.date = moment(payload.date).valueOf();

      if (payload.date < parseInt(moment(new Date()).startOf('day'))) {
        throw new restify.errors.ForbiddenError('Past date is not allowed.');
      }
      return Promise.resolve(payload);
    })
    .then(repos.pressRelease.create)
    .then(() => {
      return Promise.resolve({
        message: messages.pressRelease.createSuccess
      });
    });
}

function update(payload) {
  return validations.validatePayload(payload, {
    properties: {
      pressId: validations.rules.objectId,
      title: validations.rules.textRequired('Title'),
      date: validations.rules.date,
      description: validations.rules.textRequired('Description')
    }
  })
    .then(repos.user.findById.bind(this, payload.auth.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
    })
    .then(repos.pressRelease.findById.bind(this, payload.pressId))
    .then((press) => {
      if (!press) {
        throw new restify.errors.NotFoundError(messages.pressRelease.notExists);
      }
      payload.date = moment(payload.date).valueOf();

      return repos.pressRelease.update(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.pressRelease.saveSuccess
      });
    });
}

function get(payload) {
  return repos.pressRelease.get(payload)
    .then((press) => {
      // return Promise.resolve(res);
      return {
        data: press.data,
        meta: {
          pageSize: payload.pageSize,
          skip: payload.skip,
          total: press.total
        }
      };
    });
}

function remove(payload) {
  return validations.validatePayload(payload, {
    properties: {
      pressId: validations.rules.objectId
    }
  })
    .then(repos.user.findById.bind(this, payload.auth.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
    })
    .then(repos.pressRelease.findById.bind(this, payload.pressId))
    .then((press) => {
      if (!press) {
        throw new restify.errors.NotFoundError(messages.pressRelease.notExists);
      }
      return repos.pressRelease.remove(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.pressRelease.removeSuccess
      });
    });
}
