'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');

module.exports = server => {
  server.post(`${enums.url.baseUrl}/facility`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.facility.create);
  server.get(`${enums.url.baseUrl}/facility/:facilityId`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.facility.getById);
  server.put(`${enums.url.baseUrl}/facility/:facilityId/update`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.facility.update);
  server.del(`${enums.url.baseUrl}/facility/:facilityId/delete`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.facility.remove);
  server.get(`${enums.url.baseUrl}/facility`, controllers.facility.get);
};
