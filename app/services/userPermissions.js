'use strict';
const repos = require('../repositories');
const messages = require('../messages');
const validations = require('../validations');
const restify = require('restify');

module.exports = {
  create,
  update,
  get
};

async function create(payload) {
  await validations.validatePayload(payload, {
    properties: {
    }
  });
  let user = repos.user.findById(payload.userId);
  if (!user) {
    throw new restify.errors.BadRequestError(messages.user.notFound);
  }
  let userPermissions = repos.userPermissions.findById(payload.userId);
  if (!userPermissions) {
    throw new restify.errors.BadRequestError(messages.userPermissions.duplicate);
  }
  let create = await repos.userPermissions.create(payload);
  if (!create) {
    throw new restify.errors.BadRequestError('Something went Wrong!');
  }
  return ({
    id: create._id,
    message: messages.userPermissions.saveSuccess
  });
}

async function update(payload) {
  await validations.validatePayload(payload, {
    properties: {
    }
  });
  let user = repos.user.findById(payload.userId);
  if (!user) {
    throw new restify.errors.BadRequestError(messages.user.notFound);
  }
  let userPermissions = repos.userPermissions.findById(payload.userId);
  if (!userPermissions) {
    throw new restify.errors.BadRequestError(messages.userPermissions.notFound);
  }
  user.permissions = payload.permissions;
  let update = await repos.userPermissions.update(payload);
  if (!update) {
    throw new restify.errors.BadRequestError('Something went Wrong!');
  }
  return ({
    message: messages.userPermissions.updatedSuccess
  });
}

async function get(payload) {
  await validations.validatePayload(payload, {
    properties: {
      userId: validations.rules.ObjectId('userId')
    }
  });
  let user = repos.user.findById(payload.userId);
  if (!user) {
    throw new restify.errors.BadRequestError(messages.user.notFound);
  }
  let userPermissions = repos.userPermissions.findById(payload.userId);
  if (!userPermissions) {
    throw new restify.errors.BadRequestError(messages.userPermissions.notFound);
  }
  return (
    userPermissions
  );
}
