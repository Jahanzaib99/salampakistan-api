'use strict';

const helpers = require('../helpers');

module.exports = {
  get,
  create
};

function get(payload) {
  payload.body = {};
  payload.httpMethod = 'get';
  return helpers.payment.fetchData(payload)
    .then((data) => {
      return data;
    });
}

function create(payload) {
  payload.httpMethod = 'post';
  return helpers.payment.placeOrder(payload)
    .then((data) => {
      return data;
    });
}
