'use strict';

let services = require('../services');

module.exports = {
  create,
  update,
  remove,
  get,
  getById
};

function create(req, res, next) {
  let payload = {
    name: req.body.name,
    province: req.body.province,
    type: req.body.type,
    auth: req.auth
  };
  return services.easyAdd.create(payload)
    .then((response) => {
      res.send(201, response);
    })
    .catch(next);
}

function get(req, res, next) {
  let payload = {
    search: req.query.search,
    pageSize: req.query.pageSize,
    skip: req.query.skip,
    type: req.query.type,
    name: req.query.name
  };
  return services.easyAdd.get(payload).then((response) => {
    res.send(200, response);
  }
  ).catch(next);
}

function update(req, res, next) {
  let payload = {
    easyAddId: req.params.easyAddId,
    name: req.body.name,
    province: req.body.province,
    type: req.body.type,
    auth: req.auth
  };
  return services.easyAdd.update(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function remove(req, res, next) {
  let payload = {
    easyAddId: req.params.easyAddId,
    auth: req.auth
  };
  return services.easyAdd.remove(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function getById(req, res, next) {
  let payload = {
    easyAddId: req.params.easyAddId || req.query.id
  };
  return services.easyAdd.getById(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}
