'use strict';

const enums = require('../enums');
// const auth = require('../middlewares/auth');
const controllers = require('../controllers');

module.exports = (server) => {

  server.get(`${enums.url.baseUrl}/airports`, controllers.airline.airports);
  server.get(`${enums.url.baseUrl}/searchAirports`, controllers.airline.searchAirports);
  server.get(`${enums.url.baseUrl}/airlines`, controllers.airline.airlines);
  server.get(`${enums.url.baseUrl}/searchAir`, controllers.airline.searchAir);
};
