'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');
const { imageUpload, imageValidation, imageRemove } = require('../middlewares/imageUpload');

module.exports = server => {
  server.post(`${enums.url.baseUrl}/season`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.season.create);
  server.put(`${enums.url.baseUrl}/season/:seasonId`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.season.update);
  server.del(`${enums.url.baseUrl}/season/:seasonId`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.season.remove);
  server.get(`${enums.url.baseUrl}/season`, controllers.season.get);
  server.get(`${enums.url.baseUrl}/season/:seasonId`, controllers.season.getSingleById);
  // Photos
  server.post(`${enums.url.baseUrl}/season/:seasonId/photos`, auth.required([enums.user.type.admin, enums.user.type.employee]), imageUpload, imageValidation, controllers.season.uploadPhoto);
  server.del(`${enums.url.baseUrl}/season/:seasonId/photos/:photoId`, auth.required([enums.user.type.admin, enums.user.type.employee]), imageRemove, controllers.season.removePhoto);

};
