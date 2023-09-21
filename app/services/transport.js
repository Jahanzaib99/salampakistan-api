'use strict';

// const repos = require('../repositories');
const helpers = require('../helpers');
// const enums = require('../enums');
// const trip = require('../enums/trip');
// const moment = require('moment');
// const moment = require('moment-timezone');
// const util = require('util');
// const _ = require('lodash');
// const pipeConstant = require('../constants/pipedrive');
// let ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  get
};

function get(payload) {
  payload.body = {};
  payload.httpMethod = 'post';
  payload.endpoint = 'get_transport_services';
  return helpers.bookMe.fetchData(payload)
    .then((data) => {
      return data.services;
    });
}
