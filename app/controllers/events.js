'use strict';

// const enums = require('../enums');
const services = require('../services');
// const enums = require('../enums');

module.exports = {
  create,
  update,
  getAll,
  getById,
  eventPhoto,
  removeEventPhoto,
  remove,
  updateStatus
};

function create(req, res, next) {
  let payload = {
    title: req.body.title,
    description: req.body.description,
    coordinates: req.body.coordinates,
    surroundings: req.body.surroundings,
    address: req.body.address,
    city: req.body.city,
    province: req.body.province,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    numberOfPasses: req.body.numberOfPasses,
    price: req.body.price,
    vendorId: req.body.vendorId,
    contact: req.body.contact,
    category: req.body.category,
    auth: req.auth
  };
  return services.events.create(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function getAll(req, res, next) {
  let payload = {
    keywords: (req.query.keywords === 'null' || req.query.keywords === '') ? undefined : req.query.keywords,
    city: (req.query.city === 'null' || req.query.city === '') ? undefined : req.query.city,
    province: (req.query.province === 'null' || req.query.province === '') ? undefined : req.query.province,
    vendorId: (req.query.vendorId === 'null' || req.query.vendorId === '') ? undefined : req.query.vendorId,
    dateFrom: (req.query.dateFrom === 'null' || req.query.dateFrom === '') ? undefined : req.query.dateFrom,
    dateTo: (req.query.dateTo === 'null' || req.query.dateTo === '') ? undefined : req.query.dateTo,
    status: (req.query.status === 'null' || req.query.status === '') ? undefined : req.query.status,
    sort: (req.query.sort === 'null' || req.query.sort === '') ? undefined : req.query.sort,
    type: (req.query.sort === 'null' || req.query.sort === '') ? undefined : req.query.type,
    pageSize: req.query.pageSize,
    skip: req.query.skip

  };
  return services.events.getAll(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function update(req, res, next) {
  let payload = {
    eventId: req.params.eventId,
    title: req.body.title,
    description: req.body.description,
    coordinates: req.body.coordinates,
    // location: req.body.location,
    surroundings: req.body.surroundings,
    address: req.body.address,
    city: req.body.city,
    province: req.body.province,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    numberOfPasses: req.body.numberOfPasses,
    price: req.body.price,
    vendorId: req.body.vendorId,
    contact: req.body.contact,
    category: req.body.category,
    auth: req.auth
  };
  return services.events.update(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function eventPhoto(req, res, next) {
  let payload = {
    eventId: req.params.eventId,
    photo: req.files.photo,
    auth: req.auth
  };
  return services.events.eventPhoto(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function removeEventPhoto(req, res, next) {
  let payload = {
    eventId: req.params.eventId,
    photoId: req.params.photoId,
    auth: req.auth
  };
  return services.events.removeEventPhoto(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function getById(req, res, next) {
  let payload = {
    eventId: req.params.eventId
  };
  return services.events.getById(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function remove(req, res, next) {
  let payload = {
    eventId: req.params.eventId,
    auth: req.auth
  };
  return services.events.remove(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function updateStatus(req, res, next) {
  let payload = {
    eventId: req.params.eventId,
    status: req.body.status,
    auth: req.auth
  };
  return services.events.updateStatus(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}
