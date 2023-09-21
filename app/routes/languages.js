'use strict';

const enums = require('../enums');
// const auth = require('../middlewares/auth');
const controllers = require('../controllers');

module.exports = (server) => {

  server.get(`${enums.url.baseUrl}/language`, controllers.languages.getAllLanguages);
  server.post(`${enums.url.baseUrl}/language`, /* auth.required(enums.user.type.admin)*/ controllers.languages.createLanguage);
  server.put(`${enums.url.baseUrl}/language/:languageId`, /* auth.required(enums.user.type.admin) */ controllers.languages.updateLanguage);
  server.del(`${enums.url.baseUrl}/language/:languageId`, /* auth.required(enums.user.type.admin) */ controllers.languages.deleteLanguage);
  server.get(`${enums.url.baseUrl}/language/:languageId`, controllers.languages.getSingleById);

};
