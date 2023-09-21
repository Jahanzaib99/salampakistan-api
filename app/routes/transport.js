'use strict';

const enums = require('../enums');
// const auth = require('../middlewares/auth');
const controllers = require('../controllers');

module.exports = (server) => {

  server.get(`${enums.url.baseUrl}/get_transport_services`, controllers.transport.get);
};
