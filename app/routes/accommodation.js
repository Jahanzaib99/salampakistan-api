'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');
const { imageUpload, imageValidation, imageRemove } = require('../middlewares/imageUpload');

module.exports = server => {
  server.get(`${enums.url.baseUrl}/accommodations/search`, controllers.accommodation.search);
  server.get(`${enums.url.baseUrl}/accommodations/migrate`, controllers.accommodation.migrate);
  server.put(`${enums.url.baseUrl}/accommodations/:accommodationId/update`, auth.required(enums.user.type.admin), controllers.accommodation.update);

  // Get top hotels
  server.get(`${enums.url.baseUrl}/accommodations/toHotels`, controllers.accommodation.getToHotels);

  server.get(`${enums.url.baseUrl}/accommodations/:id`, controllers.accommodation.getone);
  server.get(`${enums.url.baseUrl}/visa/availability`, controllers.accommodation.countryStatus);

  // Photos
  server.post(`${enums.url.baseUrl}/accommodations/:accommodationId/photos`, auth.required([enums.user.type.admin, enums.user.type.vendor, enums.user.type.employee]), imageUpload, imageValidation, controllers.accommodation.uploadPhoto);
  server.del(`${enums.url.baseUrl}/accommodations/:accommodationId/photos/:photoId`, auth.required([enums.user.type.admin, enums.user.type.vendor, enums.user.type.employee]), imageRemove, controllers.accommodation.removePhoto);

};
