'use strict';

const repos = require('../repositories');
const helpers = require('../helpers');
// const constants = require('../constants');
// const enums = require('../enums');
const messages = require('../messages');
const validations = require('../validations');
const restify = require('restify');
// const moment = require('moment');
// const util = require('util');
const _ = require('lodash');
const moment = require('moment');

module.exports = {
  create,
  search,
  getone,
  update,
  updateStatus,
  tripItinerary,
  tripPhoto,
  getAll,
  removeTripPhoto,
  remove
};

function create(payload) {
  return validations.validatePayload(payload, {
    properties: {
      title: validations.rules.tripTitle,
      description: validations.rules.tripDescription,
      duration: validations.rules.tripDuration,
      price: validations.rules.tripPrice,
      date: validations.rules.tripDate,
      startLocation: validations.rules.ObjectId('startLocation'),
      Locations: validations.rules.arrayOfObjectIds('Locations'),
      categories: validations.rules.arrayOfObjectIds('categories'),
      activities: validations.rules.arrayOfObjectIds('activities'),
      facilities: validations.rules.arrayOfObjectIds('facilities'),
      status: validations.rules.tripStatus,
      cancellationPolicy: validations.rules.cancellationPolicy,
      vendorId: validations.rules.ObjectId('Vendor Id'),
      contact: validations.rules.textRequired('contact')
    }
  })
    .then(() => {
      payload.createdBy = payload.auth.userId;
      payload.date = moment(payload.date);
      if (payload.date < moment(new Date()).startOf('day').valueOf()) {
        throw new restify.errors.ForbiddenError('Trip cannot start on a previous date.');
      }
      payload.slug = _.kebabCase(`${payload.title}`);
      payload.location = {
        coordinates: payload.coordinates
      };
      return Promise.resolve(payload);
    })
    .then(repos.trip.create)
    .then((trip) => {
      return Promise.resolve({
        id: trip._id,
        message: messages.trip.createSuccess
      });
    });
}

function search(payload) {
  payload.durationFrom = +payload.durationFrom;
  payload.durationTo = +payload.durationTo;
  payload.priceFrom = +payload.priceFrom;
  payload.priceTo = +payload.priceTo;

  if (payload.Locations && JSON.parse(payload.Locations).length !== 0) {
    payload.Locations = JSON.parse(payload.Locations);
  }
  if (payload.categories && JSON.parse(payload.categories).length !== 0) {
    payload.categories = JSON.parse(payload.categories);
  }
  if (payload.activities && JSON.parse(payload.activities).length !== 0) {
    payload.activities = JSON.parse(payload.activities);
  }
  return validations.validatePayload(payload, {
    properties: {

    }
  })
    .then(repos.trip.search)
    .then(helpers.trip.adjustListResponse)
    .then((response) => {
      if (!response) {
        throw new restify.errors.NotFoundError(messages.trip.notFound);
      };
      return Promise.resolve({
        data: response.data,
        meta: {
          pageSize: payload.pageSize,
          skip: payload.skip,
          total: response.total
        }
      });
    });

}

async function getone(payload) {
  let trip;
  if (payload.tripId) {
    await validations.validatePayload(payload, {
      properties: {
        tripId: validations.rules.objectId
      }
    });
    trip = await repos.trip.getone(payload.tripId);
    if (!trip) {
      throw new restify.errors.NotFoundError(messages.trip.notFound);
    }
  } else if (payload.slug) {
    await validations.validatePayload(payload, {
      properties: {
        slug: validations.rules.tripSlug
      }
    });
    trip = await repos.trip.getone({ slug: payload.slug });
    if (!trip) {
      throw new restify.errors.NotFoundError(messages.trip.notFound);
    }
  }
  if (trip) {
    let response = await helpers.trip.adjustDetailResponse(trip);
    return response;
  }
}

function update(payload) {
  return validations.validatePayload(payload, {
    properties: {
      tripId: validations.rules.ObjectId('tripId'),
      title: validations.rules.tripTitle,
      slug: validations.rules.tripSlug,
      description: validations.rules.tripDescription,
      duration: validations.rules.tripDuration,
      price: validations.rules.tripPrice,
      date: validations.rules.tripDate,
      startLocation: validations.rules.ObjectId('startLocation'),
      Locations: validations.rules.arrayOfObjectIds('Locations'),
      categories: validations.rules.arrayOfObjectIds('categories'),
      activities: validations.rules.arrayOfObjectIds('activities'),
      facilities: validations.rules.arrayOfObjectIds('facilities'),
      // status: validations.rules.tripStatus,
      cancellationPolicy: validations.rules.cancellationPolicy,
      vendorId: validations.rules.ObjectId('vendorId'),
      contact: validations.rules.textRequired('contact')
    }
  })
    .then(repos.trip.findById.bind(this, payload.tripId))
    .then((trip) => {
      if (!trip) {
        throw new restify.errors.NotFoundError(messages.trip.notFound);
      }
    })
    .then(() => {
      console.log(payload.date);
      payload.date = moment(payload.date);
      console.log(payload.date);

      if (payload.date < moment(new Date()).startOf('day').valueOf()) {
        throw new restify.errors.ForbiddenError('Trip cannot start on a previous date.');
      }
      payload.updatedBy = payload.auth.userId;
      payload.location = {
        coordinates: payload.coordinates
      };
      return Promise.resolve(payload);
    })
    .then(repos.trip.update)
    .then(() => {
      return Promise.resolve({
        message: messages.trip.updateSuccess
      });
    });
}

function updateStatus(payload) {
  return validations.validatePayload(payload, {
    properties: {
      tripId: validations.rules.objectId,
      status: validations.rules.tripStatus
    }
  })
    .then(repos.trip.findById.bind(this, payload.tripId))
    .then((trip) => {
      if (!trip) {
        throw new restify.errors.NotFoundError(messages.trip.notFound);
      }
    })
    .then(() => {
      payload.updatedBy = payload.auth.userId;
      return Promise.resolve(payload);
    })
    .then(repos.trip.updateStatus)
    .then(() => {
      return Promise.resolve({
        message: messages.trip.updateSuccess
      });
    });
}

function tripItinerary(payload) {
  let itinerary = [];
  return validations.validatePayload(payload, {
    properties: {
      tripId: validations.rules.objectId,
      itinerary: validations.rules.itinerary
    }
  })
    .then(repos.trip.findById.bind(this, payload.tripId))
    .then((trip) => {
      if (!trip) {
        throw new restify.errors.NotFoundError(messages.trip.notFound);
      }
    })
    .then(() => {
      payload.updatedBy = payload.auth.userId;
      itinerary = payload.itinerary;
      payload.itinerary = itinerary;
      return Promise.resolve(payload);
    })
    .then(repos.trip.tripItinerary)
    .then(() => {
      return Promise.resolve({
        message: messages.trip.itinerarySuccess
      });
    });
}

// function tripPhoto(payload) {
//   let data;
//   return validations.validatePayload(payload, {
//     properties: {
//       tripId: validations.rules.objectId
//       // tripPhoto: validations.rules.tripPhotoIds
//     }
//   })
//     .then(repos.trip.findById.bind(this, payload.tripId))
//     .then((trip) => {
//       if (!trip) {
//         throw new restify.errors.NotFoundError(messages.trip.notFound);
//       }
//       data = trip;
//     })
//     .then(helpers.photo.upload.bind(this, new Buffer(payload.tripPhoto, 'base64'), constants.photo.coursePhoto, constants.photo.courseThumbnail))
//     .then((photo) => {
//       data.photoIds.push(photo);

//       return Promise.resolve({
//         tripId: payload.tripId,
//         photoId: data.photoIds
//       });
//     })
//     .then(repos.trip.tripPhoto)
//     .then((response) => {
//       return Promise.resolve({
//         message: messages.trip.updateSuccess
//       });
//     });
// }

function tripPhoto(payload) {
  let photoId;
  let data;

  return validations.validatePayload(payload, {
    properties: {
      // tripId: validations.rules.objectId,
    }
  })
    .then(repos.trip.findById.bind(this, payload.tripId))
    .then((trip) => {
      if (!trip) {
        throw new restify.errors.NotFoundError(messages.trip.notFound);
      }
      data = trip;
      return Promise.resolve(payload);
    })
    .then((payload) => {
      photoId = payload.photo[0].filename;
      data.photoIds.push(payload.photo[0].filename);
      return Promise.resolve({
        tripId: payload.tripId,
        photoId: data.photoIds
      });
    })
    .then(repos.trip.tripPhoto)
    .then(() => {
      return Promise.resolve({
        id: photoId,
        photo: helpers.photo.getURL(photoId, false),
        thumbnail: helpers.photo.getURL(photoId, true),
        message: messages.trip.updateSuccess
      });
    });
}
function getAll(payload) {
  payload.durationFrom = +payload.durationFrom;
  payload.durationTo = +payload.durationTo;
  payload.priceFrom = +payload.priceFrom;
  payload.priceTo = +payload.priceTo;
  payload.status = payload.status;

  if (payload.Locations && JSON.parse(payload.Locations).length !== 0) {
    payload.Locations = JSON.parse(payload.Locations);
  }
  if (payload.categories && JSON.parse(payload.categories).length !== 0) {
    payload.categories = JSON.parse(payload.categories);
  }
  if (payload.activities && JSON.parse(payload.activities).length !== 0) {
    payload.activities = JSON.parse(payload.activities);
  }
  if (payload.facilities && JSON.parse(payload.facilities).length !== 0) {
    payload.facilities = JSON.parse(payload.facilities);
  }
  return validations.validatePayload(payload, {
    properties: {
      // categories: validations.rules.arrayOfObjectIds('categories')
    }
  })
    .then(repos.trip.getAll)
    .then(helpers.trip.adjustListResponse)
    .then((response) => {
      if (!response) {
        throw new restify.errors.NotFoundError(messages.trip.notFound);
      };
      return Promise.resolve({
        data: response.data,
        meta: {
          pageSize: payload.pageSize,
          skip: payload.skip,
          total: response.total
        }
      });
    });

}

function removeTripPhoto(payload) {
  return validations.validatePayload(payload, {
    properties: {
      tripId: validations.rules.objectId
      // photoId: validations.rules.photoId
    }
  })
    .then(repos.trip.findById.bind(this, payload.tripId))
    .then((trip) => {
      if (!trip) {
        throw new restify.errors.NotFoundError(messages.trip.notFound);
      }
      if (trip.photoIds.indexOf(payload.photoId) < 0) {
        throw new restify.errors.ForbiddenError('PhotoId not found');
      }
      return Promise.resolve(payload);
    })
    .then(() => {
      return Promise.resolve(payload);
    })
    .then(repos.trip.removeTripPhoto)
    .then((response) => {
      return Promise.resolve({
        message: messages.trip.photoRemoveSuccess
      });
    });
}

function remove(payload) {
  return validations.validatePayload(payload, {
    properties: {
      tripId: validations.rules.objectId
    }
  })
    .then(repos.trip.findById.bind(this, payload.tripId))
    .then((trip) => {
      if (!trip) {
        throw new restify.errors.NotFoundError(messages.trip.notFound);
      }
    })
    .then(() => {
      payload.updatedBy = payload.auth.userId;
      return Promise.resolve(payload);
    })
    .then(repos.trip.remove)
    .then(() => {
      return Promise.resolve({
        message: messages.trip.remove
      });
    });
}

