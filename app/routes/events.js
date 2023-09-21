'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');
const { imageUpload, imageValidation, imageRemove } = require('../middlewares/imageUpload');

module.exports = (server) => {
  server.post(`${enums.url.baseUrl}/events`, auth.required([enums.user.type.vendor, enums.user.type.employee, enums.user.type.admin]), controllers.events.create);
  // get all
  server.get(`${enums.url.baseUrl}/events`, controllers.events.getAll);
  // get detail
  server.get(`${enums.url.baseUrl}/events/:eventId`, controllers.events.getById);
  // update
  server.put(`${enums.url.baseUrl}/events/:eventId`, auth.required([enums.user.type.vendor, enums.user.type.employee, enums.user.type.superAdmin, enums.user.type.admin]), controllers.events.update);
  // status
  server.put(`${enums.url.baseUrl}/events/:eventId/status`, auth.required([enums.user.type.vendor, enums.user.type.superAdmin, enums.user.type.admin, enums.user.type.employee]), controllers.events.updateStatus);
  // Del
  server.del(`${enums.url.baseUrl}/events/:eventId/remove`, auth.required([enums.user.type.superAdmin, enums.user.type.vendor, enums.user.type.admin, enums.user.type.employee]), controllers.events.remove);
  // photo
  server.post(`${enums.url.baseUrl}/events/:eventId/eventPhoto`, auth.required([enums.user.type.superAdmin, enums.user.type.admin, enums.user.type.vendor, enums.user.type.employee]), imageUpload, imageValidation, controllers.events.eventPhoto);
  server.del(`${enums.url.baseUrl}/events/:eventId/eventPhoto/:photoId`, auth.required([enums.user.type.superAdmin, enums.user.type.admin, enums.user.type.vendor, enums.user.type.employee]), imageRemove, controllers.events.removeEventPhoto);

};
