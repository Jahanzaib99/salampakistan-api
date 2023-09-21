'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');
const { imageUpload, imageValidation, imageRemove } = require('../middlewares/imageUpload');

module.exports = server => {
  server.post(`${enums.url.baseUrl}/surrounding`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.location.createSurr);
  server.get(`${enums.url.baseUrl}/surrounding`, controllers.location.getAllSurr);
  server.put(`${enums.url.baseUrl}/surrounding/:surrId/update`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.location.updateSurr);
  server.del(`${enums.url.baseUrl}/surrounding/:surrId/delete`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.location.removeSurr);
  server.get(`${enums.url.baseUrl}/surrounding/:surrId/detail`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.location.getSingleSurr);

  server.post(`${enums.url.baseUrl}/location`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.location.create);
  server.put(`${enums.url.baseUrl}/location/:locationId/update`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.location.update);
  server.del(`${enums.url.baseUrl}/location/:locationId/delete`, auth.required([enums.user.type.admin, enums.user.type.employee]), controllers.location.remove);
  server.get(`${enums.url.baseUrl}/location`, controllers.location.get);
  server.get(`${enums.url.baseUrl}/location/recount`, controllers.location.reCount);
  // Photos
  server.post(`${enums.url.baseUrl}/location/:locationId/photos`, auth.required([enums.user.type.admin, enums.user.type.employee]), imageUpload, imageValidation, controllers.location.uploadPhoto);
  server.del(`${enums.url.baseUrl}/location/:locationId/photos/:photoId`, auth.required([enums.user.type.admin, enums.user.type.employee]), imageRemove, controllers.location.removePhoto);

  server.get(`${enums.url.baseUrl}/location/detail`, controllers.location.getSingleById); // id = 123 or slug = karachi

  server.get(`${enums.url.baseUrl}/location/:id`, controllers.location.getSingleById);

  // get nearBy Locations
  server.get(`${enums.url.baseUrl}/getNearByLocations`, controllers.location.getNearByLocations);
};
