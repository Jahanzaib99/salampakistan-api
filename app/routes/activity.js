'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');
const { imageUpload, imageValidation, imageRemove } = require('../middlewares/imageUpload');

module.exports = server => {
  server.post(`${enums.url.baseUrl}/activity`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.activity.create);
  server.put(`${enums.url.baseUrl}/activity/:activityId/update`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.activity.update);
  server.del(`${enums.url.baseUrl}/activity/:activityId/delete`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.activity.remove);
  server.get(`${enums.url.baseUrl}/activity`, controllers.activity.get);
  // server.get(`${enums.url.baseUrl}/activity/recount/`, controllers.activity.reCount);
  // Photos
  server.post(`${enums.url.baseUrl}/activity/:activityId/photos`, auth.required([enums.user.type.admin, enums.user.type.employee]), imageUpload, imageValidation, controllers.activity.uploadPhoto);
  server.del(`${enums.url.baseUrl}/activity/:activityId/photos/:photoId`, auth.required([enums.user.type.admin, enums.user.type.employee]), imageRemove, controllers.activity.removePhoto);

  // server.get(`${enums.url.baseUrl}/activity/:activityId`, controllers.activity.getSingleById);

  server.get(`${enums.url.baseUrl}/activity/detail`, controllers.activity.getSingleById); // id = 123 or slug = karachi

  server.get(`${enums.url.baseUrl}/activity/:id`, controllers.activity.getSingleById);
};
