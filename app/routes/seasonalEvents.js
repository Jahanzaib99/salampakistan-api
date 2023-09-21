'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');
const { imageUpload, imageValidation, imageRemove } = require('../middlewares/imageUpload');

module.exports = server => {
  server.post(`${enums.url.baseUrl}/seasonalEvent`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.seasonalEvents.create);
  server.put(`${enums.url.baseUrl}/seasonalEvent/:seasonalEventId`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.seasonalEvents.update);
  server.del(`${enums.url.baseUrl}/seasonalEvent/:seasonalEventId`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.seasonalEvents.remove);
  server.get(`${enums.url.baseUrl}/seasonalEvent`, controllers.seasonalEvents.get);
  server.get(`${enums.url.baseUrl}/seasonalEvent/:seasonalEventId`, controllers.seasonalEvents.getSingleById);
  // Photos
  server.post(`${enums.url.baseUrl}/seasonalEvent/:seasonalEventId/photos`, auth.required([enums.user.type.admin, enums.user.type.employee]), imageUpload, imageValidation, controllers.seasonalEvents.uploadPhoto);
  server.del(`${enums.url.baseUrl}/seasonalEvent/:seasonalEventId/photos/:photoId`, auth.required([enums.user.type.admin, enums.user.type.employee]), imageRemove, controllers.seasonalEvents.removePhoto);

};
