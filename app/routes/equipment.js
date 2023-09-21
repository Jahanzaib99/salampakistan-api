'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');

module.exports = server => {
  server.post(`${enums.url.baseUrl}/equipment`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.equipment.create);
  server.put(`${enums.url.baseUrl}/equipment/:equipmentId/update`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.equipment.update);
  server.del(`${enums.url.baseUrl}/equipment/:equipmentId/delete`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.equipment.remove);
  server.get(`${enums.url.baseUrl}/equipment`, controllers.equipment.get);
};
