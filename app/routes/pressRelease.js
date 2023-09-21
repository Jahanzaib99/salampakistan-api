'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');

module.exports = server => {
  server.post(`${enums.url.baseUrl}/press-release`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.pressRelease.create);
  server.put(`${enums.url.baseUrl}/press-release/:pressId`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.pressRelease.update);
  server.del(`${enums.url.baseUrl}/press-release/:pressId`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.pressRelease.remove);
  server.get(`${enums.url.baseUrl}/press-release`, controllers.pressRelease.get);

};
