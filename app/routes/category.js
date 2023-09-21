'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');
const { imageUpload, imageValidation, imageRemove } = require('../middlewares/imageUpload');

module.exports = server => {
  server.post(`${enums.url.baseUrl}/category`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.category.create);
  server.put(`${enums.url.baseUrl}/category/:categoryId/update`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.category.update);
  server.del(`${enums.url.baseUrl}/category/:categoryId/delete`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.category.remove);
  server.get(`${enums.url.baseUrl}/category`, controllers.category.get);
  // server.get(`${enums.url.baseUrl}/category/recount/`, controllers.category.reCount);
  // Photos
  server.post(`${enums.url.baseUrl}/category/:categoryId/photos`, auth.required([enums.user.type.admin, enums.user.type.employee]), imageUpload, imageValidation, controllers.category.uploadPhoto);
  server.del(`${enums.url.baseUrl}/category/:categoryId/photos/:photoId`, auth.required([enums.user.type.admin, enums.user.type.employee]), imageRemove, controllers.category.removePhoto);

  server.get(`${enums.url.baseUrl}/category/detail`, controllers.category.getSingleById); // id = 123 or slug = karachi

  server.get(`${enums.url.baseUrl}/category/:id`, controllers.category.getSingleById);
};
