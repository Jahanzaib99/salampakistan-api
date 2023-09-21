'use strict';

const services = require('../services');
// const config = require('../config');
// const enums = require('../enums');

module.exports = {
  createLanguage,
  updateLanguage,
  deleteLanguage,
  getAllLanguages,
  getSingleById
};

function createLanguage(req, res, next) {
  let payload = {
    name: req.body.name,
    alias: req.body.alias,
    code: req.body.code
  };
  return services.languages.createLanguage(payload)
    .then((response) => {
      res.send(201, response);
    })
    .catch(next);
}

function getAllLanguages(req, res, next) {
  let payload = {
    search: req.query.search,
    skip: req.query.skip,
    pageSize: req.query.pageSize
  };
  return services.languages.getAllLanguages(payload)
    .then((response) => {
      res.send(200, response);
    }
    ).catch(next);
}

function getSingleById(req, res, next) {
  let payload = {
    languageId: req.params.languageId || req.query.languageId
  };
  return services.languages.getSingleById(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function updateLanguage(req, res, next) {
  let payload = {
    languageId: req.params.languageId,
    name: req.body.name,
    alias: req.body.alias,
    code: req.body.code
  };
  return services.languages.updateLanguage(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function deleteLanguage(req, res, next) {
  let payload = {
    languageId: req.params.languageId
  };
  return services.languages.deleteLanguage(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
