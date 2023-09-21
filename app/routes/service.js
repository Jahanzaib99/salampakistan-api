'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');

module.exports = server => {
  server.post(`${enums.url.baseUrl}/service`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.service.create);
  server.put(`${enums.url.baseUrl}/service/:serviceId/update`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.service.update);
  server.del(`${enums.url.baseUrl}/service/:serviceId/delete`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.service.remove);
  server.get(`${enums.url.baseUrl}/service`, controllers.service.get);
};
