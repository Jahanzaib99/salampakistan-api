'use strict';

const repos = require('../repositories');
const restify = require('restify');
const messages = require('../messages');
const validations = require('../validations');

module.exports = {
  createLanguage,
  updateLanguage,
  deleteLanguage,
  getAllLanguages,
  getSingleById
};

async function createLanguage(payload) {
  await validations.validatePayload(payload, {
    properties: {
    }
  });
  let getByName = await repos.languages.getByName(payload.name);
  if (getByName && getByName.length > 0) {
    throw new restify.errors.ConflictError('Duplicate Name');
  }
  let createLanguage = await repos.languages.createLanguage(payload);
  if (!createLanguage) {
    throw new restify.errors.ConflictError('Something Went Wrong!');
  }
  return ({ message: messages.languages.success });
}

async function getAllLanguages(payload) {
  await validations.validatePayload(payload, {
    properties: {
    }
  });
  let getAllLanguages = await repos.languages.getAllLanguages(payload);
  if(!getAllLanguages) {
    throw new restify.errors.ConflictError('Something Went Wrong!');
  }
  return ({
    data: getAllLanguages.data,
    meta: {
      pageSize: payload.pageSize,
      skip: payload.skip,
      total: getAllLanguages.total
    }
  });
}

async function updateLanguage(payload) {
  await validations.validatePayload(payload, {
    properties: {
    }
  });
  let findByLanguageId = await repos.languages.findByLanguageId(payload.languageId);
  if (!findByLanguageId) {
    throw new restify.errors.ConflictError(messages.languages.notExists);
  };
  // let getByName = await repos.languages.getByName(payload.name);
  // if (getByName && getByName.length > 0) {
  //   throw new restify.errors.ConflictError('Duplicate Name');
  // }
  let updateLanguage = await repos.languages.updateLanguage(payload);
  if (!updateLanguage) {
    throw new restify.errors.ConflictError('Something Went Wrong!');
  }
  return ({ message: messages.languages.update });
}

async function deleteLanguage(payload) {
  await validations.validatePayload(payload, {
    properties: {
    }
  });
  let findByLanguageId = await repos.languages.findByLanguageId(payload.languageId);
  if (!findByLanguageId) {
    throw new restify.errors.ConflictError(messages.languages.notExists);
  }
  let deleteLanguage = await repos.languages.deleteLanguage(payload);
  if (!deleteLanguage) {
    throw new restify.errors.ConflictError('Something Went Wrong!');
  }
  return ({ message: messages.languages.delete });
}

async function getSingleById(payload) {
  await validations.validatePayload(payload, {
    properties: {
      languageId: validations.rules.objectId
    }
  });
  let findDetails = await repos.languages.findDetails(payload.languageId);
  if (!findDetails) {
    throw new restify.errors.NotFoundError(messages.languages.notFound);
  }
  return (findDetails);

}
