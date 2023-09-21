'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');

module.exports = server => {
  server.post(`${enums.url.baseUrl}/starting/location`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.startinglocation.create);
  server.put(`${enums.url.baseUrl}/starting/location/:startingLocationId/update`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.startinglocation.update);
  server.del(`${enums.url.baseUrl}/starting/location/:startingLocationId/delete`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.startinglocation.remove);
  server.get(`${enums.url.baseUrl}/starting/location`, controllers.startinglocation.get);

};
