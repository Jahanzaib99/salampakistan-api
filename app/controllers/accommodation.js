'use strict';

let services = require('../services');

module.exports = {
  search,
  getone,
  migrate,
  countryStatus,
  update,
  uploadPhoto,
  removePhoto,
  getToHotels
};

function search(req, res, next) {
  let payload = {
    city: req.query.city,
    locationId: req.query.locationId,
    categoryId: req.query.categoryId,
    rooms: req.query.rooms,
    isFeatured: req.query.isFeatured,
    chainName: req.query.chainName,
    brandName: req.query.brandName,
    hotelName: req.query.hotelName,
    country: req.query.country,
    starRating: req.query.starRating,
    ratesFrom: req.query.ratesFrom,
    continentName: req.query.continentName,
    ratingAverage: req.query.ratingAverage,
    filter: req.query.filter,
    // : req.query.isFeatured,
    status: req.query.status,
    pageSize: req.query.pageSize,
    skip: req.query.skip
  };
  return services.accommodation.search(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function migrate(req, res, next) {
  return services.accommodation.migrate()
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function countryStatus(req, res, next) {
  return services.accommodation.countryStatus()
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function getone(req, res, next) {
  let payload = {
    id: req.params.id
  };
  return services.accommodation.getone(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function update(req, res, next) {
  let payload = {
    accommodationId: req.params.accommodationId,
    locationId: req.body.locationId,
    categoryId: req.body.categoryId,
    isFeatured: req.body.isFeatured,
    hotel_name: req.body.hotel_name,
    overview: req.body.overview,
    auth: req.auth
  };
  return services.accommodation.update(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function uploadPhoto(req, res, next) {
  let payload = {
    accommodationId: req.params.accommodationId,
    photo: req.files.photo,
    auth: req.auth
  };
  return services.accommodation.uploadPhoto(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function removePhoto(req, res, next) {
  let payload = {
    accommodationId: req.params.accommodationId,
    photoId: req.params.photoId,
    auth: req.auth
  };
  return services.accommodation.removePhoto(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function getToHotels(req, res, next) {
  let payload = {
    city: req.query.city,
    pageSize: req.query.pageSize,
    skip: req.query.skip
  };
  return services.accommodation.getToHotels(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
