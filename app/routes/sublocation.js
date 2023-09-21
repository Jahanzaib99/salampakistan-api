'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');

module.exports = server => {

  server.get(`${enums.url.baseUrl}/location/sub`, controllers.sublocation.get);
  server.post(`${enums.url.baseUrl}/location/sub`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.sublocation.create);
  server.put(`${enums.url.baseUrl}/location/sub/:subLocationId/update`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.sublocation.update);
  server.del(`${enums.url.baseUrl}/location/sub/:subLocationId/delete`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.sublocation.remove);

};
