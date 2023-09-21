'use strict';

const services = require('../services');
// const config = require('../config');
// const enums = require('../enums');

module.exports = {
  getDepartureCities,
  getDestinationCities,
  getHotelCityList
};

function getDepartureCities(req, res, next) {
  let payload = {
    pageSize: req.query.pageSize,
    skip: req.query.skip,
    service_id: req.query.service_id
  };
  return services.cities.getDepartureCities(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function getDestinationCities(req, res, next) {
  let payload = {
    pageSize: req.query.pageSize,
    skip: req.query.skip,
    service_id: req.query.service_id,
    origin_city_id: req.query.origin_city_id
  };
  return services.cities.getDestinationCities(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function getHotelCityList(req, res, next) {
  let payload = {
    pageSize: req.query.pageSize,
    skip: req.query.skip
  };
  return services.cities.getHotelCityList(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}
