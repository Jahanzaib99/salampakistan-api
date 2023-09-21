'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');

module.exports = server => {
  // create
  server.post(`${enums.url.baseUrl}/news`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.news.create);
  // update
  server.put(`${enums.url.baseUrl}/news/:newsId`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.news.update);
  // remove
  server.del(`${enums.url.baseUrl}/news/:newsId`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.news.remove);
  // getAll
  server.get(`${enums.url.baseUrl}/news`, /* auth.required([enums.user.type.admin, enums.user.type.employee]),*/ controllers.news.get);
  // getDetails
  server.get(`${enums.url.baseUrl}/news/:newsId`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.news.getDetails);

};
