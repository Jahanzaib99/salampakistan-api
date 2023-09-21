'use strict';

const controllers = require('../controllers');
const enums = require('../enums');

module.exports = (server) => {
  server.get(`${enums.url.baseUrl}`, controllers.welcome.serve);
  // server.post(`${enums.url.baseUrl}/contactus`, controllers.welcome.contactUs);
};
