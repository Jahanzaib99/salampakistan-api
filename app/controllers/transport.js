'use strict';

const services = require('../services');
// const config = require('../config');
// const enums = require('../enums');

module.exports = {
  get
};

function get(req, res, next) {
  let payload = {
    pageSize: req.query.pageSize,
    skip: req.query.skip
  };
  return services.transport.get(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}
