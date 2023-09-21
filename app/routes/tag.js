'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');

module.exports = server => {
  server.post(`${enums.url.baseUrl}/tag`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.tag.create);
  server.put(`${enums.url.baseUrl}/tag/:tagId/update`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.tag.update);
  server.del(`${enums.url.baseUrl}/tag/:tagId/delete`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.tag.remove);
  server.get(`${enums.url.baseUrl}/tag`, controllers.tag.get);
  // server.get(`${enums.url.baseUrl}/tag/recount/`, controllers.tag.reCount);
  // Get All Filters
  server.get(`${enums.url.baseUrl}/filters`, controllers.tag.getFilters);
  server.get(`${enums.url.baseUrl}/tagTypes`, controllers.tag.gettagTypes);

};
