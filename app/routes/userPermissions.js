'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');

module.exports = (server) => {
  // update
  server.put(`${enums.url.baseUrl}/users/permissions/:userId`, auth.required([enums.user.type.admin, enums.user.type.superAdmin]), controllers.userPermissions.update);
  // create
  server.post(`${enums.url.baseUrl}/users/permissions/:userId`, auth.required([enums.user.type.admin, enums.user.type.superAdmin]), controllers.userPermissions.create);
  // get
  server.get(`${enums.url.baseUrl}/users/permissions/:userId`, /* auth.required([enums.user.type.admin, enums.user.type.superAdmin]),*/ controllers.userPermissions.get);
};
