'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');
const { imageUpload, imageValidation, imageRemove } = require('../middlewares/imageUpload');
// const fs = require('fs');
// const { promisify } = require('util');
// const unlinkAsync = promisify(fs.unlink);

module.exports = server => {
  server.post(`${enums.url.baseUrl}/media`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.media.create);
  server.put(`${enums.url.baseUrl}/media/:mediaId`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.media.update);
  server.del(`${enums.url.baseUrl}/media/:mediaId`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.media.remove);
  server.get(`${enums.url.baseUrl}/media`, controllers.media.get);
  server.get(`${enums.url.baseUrl}/media/:mediaId`, controllers.media.getSingleById);
  // Photos
  server.post(`${enums.url.baseUrl}/media/:mediaId/photos`, auth.required([enums.user.type.admin, enums.user.type.employee]), imageUpload, imageValidation, controllers.media.uploadPhoto);
  server.del(`${enums.url.baseUrl}/media/:mediaId/photos/:photoId`, auth.required([enums.user.type.admin, enums.user.type.employee]), imageRemove, controllers.media.removePhoto);

};
