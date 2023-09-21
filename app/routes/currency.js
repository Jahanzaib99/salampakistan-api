'use strict';

const enums = require('../enums');
// const auth = require('../middlewares/auth');
const controllers = require('../controllers');

module.exports = server => {
  server.get(`${enums.url.baseUrl}/currencies`, controllers.currency.getAll);
  server.get(`${enums.url.baseUrl}/currencies`, controllers.currency.create);
};
