'use strict';

const enums = require('../enums');
// const auth = require('../middlewares/auth');
const controllers = require('../controllers');

module.exports = (server) => {

  server.get(`${enums.url.baseUrl}/all_bus_services`, controllers.bus.get);
  server.get(`${enums.url.baseUrl}/seats_info`, controllers.bus.getSeatsInfo);
};
