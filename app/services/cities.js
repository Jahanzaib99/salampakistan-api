'use strict';

// const repos = require('../repositories');
const helpers = require('../helpers');
const config = require('../config/index');
const api_key = config.get('bookMe.api_key');
// const enums = require('../enums');
// const trip = require('../enums/trip');
// const moment = require('moment');
// const moment = require('moment-timezone');
// const util = require('util');
// const _ = require('lodash');
// const pipeConstant = require('../constants/pipedrive');
// let ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  getDepartureCities,
  getDestinationCities,
  getHotelCityList
};

function getDepartureCities(payload) {
  let body = {
    service_id: payload.service_id
  };
  payload.httpMethod = 'post';
  payload.body = body;
  payload.endpoint = 'get_departure_cities';
  return helpers.bookMe.fetchData(payload)
    .then((data) => {
      return data.cities;
    });
}

function getDestinationCities(payload) {
  let body = {
    service_id: payload.service_id,
    origin_city_id: payload.origin_city_id
  };
  payload.httpMethod = 'post';
  payload.body = body;
  payload.endpoint = 'get_destination_cities';
  return helpers.bookMe.fetchData(payload)
    .then((data) => {
      return data.cities;
    });
}

function getHotelCityList(payload) {
  payload.httpMethod = 'get';
  payload.body;
  payload.convert = false;
  payload.endpoint = `hotel_city_list?api_key=${api_key}`;
  payload.apiName = 'hotel_city_list';
  return helpers.bookMe.fetchHotelData(payload)
    .then((data) => {
      return data;
    });
}
