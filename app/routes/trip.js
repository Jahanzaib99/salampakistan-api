'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');
const { imageUpload, imageValidation, imageRemove } = require('../middlewares/imageUpload');

module.exports = (server) => {
  //   server.post(`${enums.url.baseUrl}/events/:eventId/photos`, auth.required(enums.user.type.admin), controllers.event.uploadPhoto);
  //   server.del(`${enums.url.baseUrl}/events/:eventId/photos/:photoId`, auth.required(enums.user.type.admin), controllers.event.removePhoto);

  server.post(`${enums.url.baseUrl}/trip`, auth.required([enums.user.type.vendor, enums.user.type.admin, enums.user.type.employee]), controllers.trip.create);
  server.get(`${enums.url.baseUrl}/trip/search`, controllers.trip.search);
  server.put(`${enums.url.baseUrl}/trip/:tripId`, auth.required([enums.user.type.vendor, enums.user.type.superAdmin, enums.user.type.admin, enums.user.type.employee]), controllers.trip.update);
  server.get(`${enums.url.baseUrl}/trip/:tripId`, controllers.trip.getone);
  server.del(`${enums.url.baseUrl}/trip/:tripId/remove`, auth.required([enums.user.type.vendor, enums.user.type.admin, enums.user.type.employee]), controllers.trip.remove);

  // get all
  server.get(`${enums.url.baseUrl}/trip`, controllers.trip.getAll);
  // status
  server.put(`${enums.url.baseUrl}/trip/:tripId/status`, auth.required([enums.user.type.vendor, enums.user.type.superAdmin, enums.user.type.admin, enums.user.type.employee]), controllers.trip.updateStatus);
  // photo
  server.post(`${enums.url.baseUrl}/trip/:tripId/tripPhoto`, auth.required([enums.user.type.superAdmin, enums.user.type.admin, enums.user.type.vendor, enums.user.type.employee]), imageUpload, imageValidation, controllers.trip.tripPhoto);
  server.del(`${enums.url.baseUrl}/trip/:tripId/tripPhoto/:photoId`, auth.required([enums.user.type.superAdmin, enums.user.type.admin, enums.user.type.vendor, enums.user.type.employee]), imageRemove, controllers.trip.removeTripPhoto);

  // post Trip Itinerary
  server.post(`${enums.url.baseUrl}/trip/:tripId/tripItinerary`, auth.required([enums.user.type.vendor, enums.user.type.superAdmin, enums.user.type.admin, enums.user.type.employee]), controllers.trip.tripItinerary);
};
