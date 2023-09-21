'use strict';

const enums = require('../enums');
const services = require('../services');
// const enums = require('../enums');

module.exports = {
  create,
  search,
  getone,
  update,
  updateStatus,
  tripPhoto,
  tripItinerary,
  getAll,
  removeTripPhoto,
  remove
};

function create(req, res, next) {
  let payload = {
    title: req.body.title,
    description: req.body.description,
    duration: req.body.duration,
    price: req.body.price,
    date: req.body.date,
    isFeatured: req.body.isFeatured,
    startLocation: req.body.startLocation,
    Locations: req.body.Locations,
    categories: req.body.categories,
    activities: req.body.activities,
    facilities: req.body.facilities,
    status: enums.trip.status.draft,
    cancellationPolicy: req.body.cancellationPolicy,
    vendorId: req.body.vendorId,
    contact: req.body.contact,
    auth: req.auth
  };
  return services.trip.create(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function search(req, res, next) {
  let payload = {
    keywords: (req.query.keywords === 'null' || req.query.keywords === '') ? undefined : req.query.keywords,
    startLocation: (req.query.startLocation === 'null' || req.query.startLocation === '') ? undefined : req.query.startLocation,
    Locations: (req.query.Locations === 'null' || req.query.Locations === '') ? undefined : req.query.Locations,
    categories: (req.query.categories === 'null' || req.query.categories === '') ? undefined : req.query.categories,
    activities: (req.query.activities === 'null' || req.query.activities === '') ? undefined : req.query.activities,
    durationFrom: (req.query.durationFrom === 'null' || req.query.durationFrom === '') ? undefined : req.query.durationFrom,
    durationTo: (req.query.durationTo === 'null' || req.query.durationTo === '') ? undefined : req.query.durationTo,
    dateFrom: (req.query.dateFrom === 'null' || req.query.dateFrom === '') ? undefined : req.query.dateFrom,
    dateTo: (req.query.dateTo === 'null' || req.query.dateTo === '') ? undefined : req.query.dateTo,
    priceFrom: (req.query.priceFrom === 'null' || req.query.priceFrom === '') ? undefined : req.query.priceFrom,
    priceTo: (req.query.priceTo === 'null' || req.query.priceTo === '') ? undefined : req.query.priceTo,
    sort: (req.query.sort === 'null' || req.query.sort === '') ? undefined : req.query.sort,
    isFeatured: (req.query.isFeatured === 'null' || req.query.isFeatured === '') ? undefined : req.query.isFeatured,
    pageSize: req.query.pageSize,
    skip: req.query.skip
  };
  return services.trip.search(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function getone(req, res, next) {
  let payload = {
    tripId: req.params.tripId || req.query.id,
    slug: req.query.slug
  };
  return services.trip.getone(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function update(req, res, next) {
  let payload = {
    tripId: req.params.tripId,
    title: req.body.title,
    slug: req.body.slug,
    description: req.body.description,
    duration: req.body.duration,
    price: req.body.price,
    date: req.body.date,
    startLocation: req.body.startLocation,
    Locations: req.body.Locations,
    categories: req.body.categories,
    activities: req.body.activities,
    facilities: req.body.facilities,
    status: req.body.status,
    cancellationPolicy: req.body.cancellationPolicy,
    vendorId: req.body.vendorId,
    contact: req.body.contact,
    isFeatured: req.body.isFeatured,
    auth: req.auth
  };
  return services.trip.update(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function updateStatus(req, res, next) {
  let payload = {
    tripId: req.params.tripId,
    status: req.body.status,
    auth: req.auth
  };
  return services.trip.updateStatus(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function tripPhoto(req, res, next) {
  let payload = {
    tripId: req.params.tripId,
    photo: req.files.photo,
    auth: req.auth
  };
  return services.trip.tripPhoto(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}
function tripItinerary(req, res, next) {
  let payload = {
    tripId: req.params.tripId,
    itinerary: req.body.itinerary,
    auth: req.auth
  };
  return services.trip.tripItinerary(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function getAll(req, res, next) {
  let payload = {
    keywords: (req.query.keywords === 'null' || req.query.keywords === '') ? undefined : req.query.keywords,
    startLocation: (req.query.startLocation === 'null' || req.query.startLocation === '') ? undefined : req.query.startLocation,
    Locations: (req.query.Locations === 'null' || req.query.Locations === '') ? undefined : req.query.Locations,
    categories: (req.query.categories === 'null' || req.query.categories === '') ? undefined : req.query.categories,
    activities: (req.query.activities === 'null' || req.query.activities === '') ? undefined : req.query.activities,
    facilities: (req.query.facilities === 'null' || req.query.facilities === '') ? undefined : req.query.facilities,
    vendor: (req.query.vendor === 'null' || req.query.vendor === '') ? undefined : req.query.vendor,
    durationFrom: (req.query.durationFrom === 'null' || req.query.durationFrom === '') ? undefined : req.query.durationFrom,
    durationTo: (req.query.durationTo === 'null' || req.query.durationTo === '') ? undefined : req.query.durationTo,
    dateFrom: (req.query.dateFrom === 'null' || req.query.dateFrom === '') ? undefined : req.query.dateFrom,
    dateTo: (req.query.dateTo === 'null' || req.query.dateTo === '') ? undefined : req.query.dateTo,
    priceFrom: (req.query.priceFrom === 'null' || req.query.priceFrom === '') ? undefined : req.query.priceFrom,
    priceTo: (req.query.priceTo === 'null' || req.query.priceTo === '') ? undefined : req.query.priceTo,
    status: (req.query.status === 'null' || req.query.status === '') ? undefined : req.query.status,
    sort: (req.query.sort === 'null' || req.query.sort === '') ? undefined : req.query.sort,
    isFeatured: (req.query.isFeatured === 'null' || req.query.isFeatured === '') ? undefined : req.query.isFeatured,
    pageSize: req.query.pageSize,
    skip: req.query.skip

  };
  return services.trip.getAll(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function removeTripPhoto(req, res, next) {
  let payload = {
    tripId: req.params.tripId,
    photoId: req.params.photoId,
    auth: req.auth
  };
  return services.trip.removeTripPhoto(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function remove(req, res, next) {
  let payload = {
    tripId: req.params.tripId,
    auth: req.auth
  };
  return services.trip.remove(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}
