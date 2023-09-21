'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');
const { imageUpload, imageValidation, imageRemove } = require('../middlewares/imageUpload');

module.exports = (server) => {
  // book-me
  server.get(`${enums.url.baseUrl}/hotel-search`, controllers.hotel.search);
  server.get(`${enums.url.baseUrl}/hotel-details`, controllers.hotel.detail);

  // accommodations
  server.get(`${enums.url.baseUrl}/accommodations`, auth.required([enums.user.type.admin, enums.user.type.superAdmin, enums.user.type.vendor, enums.user.type.employee]), controllers.hotel.get);
  server.post(`${enums.url.baseUrl}/accommodations`, auth.required([enums.user.type.admin, enums.user.type.vendor, enums.user.type.employee]), controllers.hotel.create);
  server.put(`${enums.url.baseUrl}/accommodations/:accommodationsId`, auth.required([enums.user.type.admin, enums.user.type.vendor, enums.user.type.employee]), controllers.hotel.update);
  server.del(`${enums.url.baseUrl}/accommodations/:accommodationsId/remove`, auth.required([enums.user.type.admin, enums.user.type.vendor, enums.user.type.employee]), controllers.hotel.remove);
  server.put(`${enums.url.baseUrl}/accommodations/:accommodationsId/updateStatus`, auth.required([enums.user.type.admin, enums.user.type.vendor, enums.user.type.employee]), controllers.hotel.updateStatus);

  // room apis
  server.put(`${enums.url.baseUrl}/accommodations/:accommodationsId/add-rooms`, auth.required([enums.user.type.admin, enums.user.type.vendor, enums.user.type.employee]), controllers.hotel.addRoom);
  server.put(`${enums.url.baseUrl}/accommodations/:accommodationsId/rooms/:roomId/remove-rooms`, auth.required([enums.user.type.admin, enums.user.type.vendor, enums.user.type.employee]), controllers.hotel.removeRoom);
  server.put(`${enums.url.baseUrl}/accommodations/:accommodationsId/rooms/:roomId/update-rooms`, auth.required([enums.user.type.admin, enums.user.type.vendor, enums.user.type.employee]), controllers.hotel.updateRoom);
  server.put(`${enums.url.baseUrl}/accommodations/:accommodationsId/rooms/:roomId/update-rooms/photos`, auth.required([enums.user.type.admin, enums.user.type.vendor, enums.user.type.employee]), imageUpload, imageValidation, controllers.hotel.uploadRoomPhotos); // upload room photo
  server.put(`${enums.url.baseUrl}/accommodations/:accommodationsId/rooms/:roomId/update-rooms/photos/:photoId`, auth.required([enums.user.type.admin, enums.user.type.vendor, enums.user.type.employee]), imageRemove, controllers.hotel.removeRoomPhotos); // Remove room photo

};
