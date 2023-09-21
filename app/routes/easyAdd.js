'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');

module.exports = server => {
  // Destinations
  server.post(`${enums.url.baseUrl}/easyAdd`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.easyAdd.create);
  server.get(`${enums.url.baseUrl}/easyAdd/:easyAddId`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.easyAdd.getById);
  server.put(`${enums.url.baseUrl}/easyAdd/:easyAddId/update`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.easyAdd.update);
  server.del(`${enums.url.baseUrl}/easyAdd/:easyAddId/delete`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.easyAdd.remove);
  server.get(`${enums.url.baseUrl}/easyAdd`, controllers.easyAdd.get);
};
