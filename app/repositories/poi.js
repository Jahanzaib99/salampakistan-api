'use strict';

const Poi = require('../models/POI');

module.exports = {
  get
};

function get(payload) {
  let typeQuery = {};
  // payload.coordinates = payload.coordinates.reverse();
  if (payload && payload.typeKey) {
    typeQuery['types'] = payload.typeKey;
  }
  return Poi.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates: payload.coordinates },
        // minDistance: payload.minDistance * 1000,
        // maxDistance: payload.maxDistance * 1000,
        maxDistance: 25000,

        distanceField: 'dist.calculated',
        query: typeQuery,
        // includeLocs: "dist.location",
        spherical: true
      }
    }
  ]);
}
