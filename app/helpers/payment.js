'use strict';

// const restify = require('restify');
const config = require('../config/index');
const needle = require('needle');

const api_key = config.get('bookMe.api_key');
const token = config.get('bookMe.Authorization');

// const messages = require('../messages/user');
// const constants = require('../constants');

// const userRepo = require('../../api/user/user.repositories');

exports.fetchData = function(payload) {
  let options = {
    method: payload.httpMethod.toUpperCase(),
    uri: `https://bookme.pk/api/v2/partners/payment/paymentMethods?api_key=${api_key}`,
    headers: {
      Authorization: token
    }
  };
  console.log(options);
  return new Promise((resolve, reject) => {
    needle(options.method, options.uri, options.body, options)
      .then(response => {
        resolve(response.body);
      })
      .catch(error => {
        reject(error);
      });
  });
};

exports.placeOrder = function(payload) {
  let options = {
    method: payload.httpMethod.toUpperCase(),
    uri: 'https://bookme.pk/api/v2/partners/payment/placeOrder',
    headers: {
      Authorization: token
    },
    body: {
      ...payload.body,
      api_key: api_key
    }
  };
  return new Promise((resolve, reject) => {
    needle(options.method, options.uri, options.body, options)
      .then(response => {
        resolve(response.body);
      })
      .catch(error => {
        reject(error);
      });
  });
};
