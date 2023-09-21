'use strict';

const repos = require('../repositories');
// const messages = require('../messages');
const validations = require('../validations');
// const enums = require('../enums');
// const restify = require('restify');
// const helpers = require('../helpers');
// const constants = require('../constants');

module.exports = {
  get
};

function get(payload) {
  if(payload.coordinates && typeof (payload.coordinates) === 'string') {payload.coordinates = JSON.parse(payload.coordinates);}
  if(payload.coordinates[0] > 40) {
    payload.coordinates = payload.coordinates;
  }else{
    payload.coordinates = payload.coordinates.reverse();
  }
  console.log(payload.coordinates);
  // payload.minDistance = +payload.minDistance;
  // payload.maxDistance = +payload.maxDistance;
  return validations.validatePayload(payload, {
    properties: {
      coordinates: validations.rules.coordinates
      // minDistance: validations.rules.distance,
      // maxDistance: validations.rules.distance

    }
  })
    .then(repos.poi.get)
    .then((response) => {
      return Promise.resolve(response);
    });
}
