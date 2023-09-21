'use strict';

const repos = require('../repositories');
const helpers = require('../helpers');
// const constants = require('../constants');
// const enums = require('../enums');
const messages = require('../messages');
const validations = require('../validations');
const restify = require('restify');
const moment = require('moment');
// const util = require('util');
const _ = require('lodash');
// const events = require('../enums/events');
// const moment = require('moment');

module.exports = {
  create,
  update,
  getAll,
  eventPhoto,
  removeEventPhoto,
  getById,
  remove,
  updateStatus
};

function create(payload) {
  return validations.validatePayload(payload, {
    properties: {
      title: validations.rules.textRequired('title'),
      description: validations.rules.textRequired('description'),
      coordinates: validations.rules.coordinates,
      surroundings: validations.rules.arrayOfObjectIds('surroundings'),
      address: validations.rules.textRequired('address'),
      city: validations.rules.ObjectId('city'),
      province: validations.rules.ObjectId('province'),
      startDate: validations.rules.textRequired('startDate'),
      endDate: validations.rules.textRequired('endDate'),
      startTime: validations.rules.time,
      endTime: validations.rules.time,
      numberOfPasses: validations.rules.numRequired('numberOfPasses'),
      price: validations.rules.numRequired('price'),
      vendorId: validations.rules.ObjectId('vendorId'),
      contact: validations.rules.textRequired('contact'),
      category: validations.rules.textRequired('category')
    }
  })
    .then(() => {
      payload.startDate = moment(payload.startDate);
      payload.endDate = moment(payload.endDate);

      if (payload.startDate >= payload.endDate) {
        throw new restify.errors.ForbiddenError('Event start date must be less than event end date.');
      }

      if (payload.startTime >= payload.endTime) {
        throw new restify.errors.ForbiddenError('Event start time must be less than event end time.');
      }

      payload.slug = _.kebabCase(`${payload.title}`);
      payload.location = {
        coordinates: payload.coordinates,
        type: 'Point'
      };
      return Promise.resolve(payload);
    })
    .then(repos.events.create)
    .then((events) => {
      return Promise.resolve({
        id: events._id,
        message: messages.events.createSuccess
      });
    });
}

function getAll(payload) {
  payload.durationFrom = +payload.durationFrom;
  payload.durationTo = +payload.durationTo;
  payload.priceFrom = +payload.priceFrom;
  payload.priceTo = +payload.priceTo;

  if (payload.locations && JSON.parse(payload.locations).length !== 0) {
    payload.locations = JSON.parse(payload.locations);
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
    .then(repos.events.getAll)
    .then(helpers.events.adjustListResponse)
    .then((response) => {
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

function update(payload) {
  return validations.validatePayload(payload, {
    properties: {
      eventId: validations.rules.ObjectId('eventId'),
      title: validations.rules.textRequired('title'),
      description: validations.rules.textRequired('description'),
      coordinates: validations.rules.coordinates,
      surroundings: validations.rules.arrayOfObjectIds('surroundings'),
      address: validations.rules.textRequired('address'),
      city: validations.rules.ObjectId('city'),
      province: validations.rules.ObjectId('province'),
      startDate: validations.rules.textRequired('startDate'),
      endDate: validations.rules.textRequired('endDate'),
      startTime: validations.rules.time,
      endTime: validations.rules.time,
      numberOfPasses: validations.rules.numRequired('numberOfPasses'),
      price: validations.rules.numRequired('price'),
      vendorId: validations.rules.ObjectId('vendorId'),
      contact: validations.rules.textRequired('contact'),
      category: validations.rules.textRequired('category')
    }
  })
    .then(repos.events.findById.bind(this, payload.eventId))
    .then((event) => {
      if (!event) {
        throw new restify.errors.NotFoundError(messages.events.notFound);
      }
    })
    .then(() => {
      payload.startDate = moment(payload.startDate);
      payload.endDate = moment(payload.endDate);

      if (payload.startDate >= payload.endDate) {
        throw new restify.errors.ForbiddenError('Event start date must be less than event end date.');
      }

      if (payload.startTime >= payload.endTime) {
        throw new restify.errors.ForbiddenError('Event start time must be less than event end time.');
      }
      payload.location = {
        coordinates: payload.coordinates,
        type: 'Point'
      };
      return Promise.resolve(payload);
    })
    .then(repos.events.update)
    .then((events) => {
      return Promise.resolve({
        id: events._id,
        message: messages.events.updateSuccess
      });
    });
}

function eventPhoto(payload) {
  let photoId;
  let data;

  return validations.validatePayload(payload, {
    properties: {
      eventId: validations.rules.ObjectId('eventId')
    }
  })
    .then(repos.events.findById.bind(this, payload.eventId))
    .then((events) => {
      if (!events) {
        throw new restify.errors.NotFoundError(messages.events.notFound);
      }
      data = events;
      return Promise.resolve(payload);
    })
    .then((payload) => {
      photoId = payload.photo[0].filename;
      data.photoIds.push(payload.photo[0].filename);
      return Promise.resolve({
        eventId: payload.eventId,
        photoId: data.photoIds
      });
    })
    .then(repos.events.eventPhoto)
    .then(() => {
      return Promise.resolve({
        id: photoId,
        photo: helpers.photo.getURL(photoId, false),
        thumbnail: helpers.photo.getURL(photoId, true),
        message: messages.events.updateSuccess
      });
    });
}

function removeEventPhoto(payload) {
  return validations.validatePayload(payload, {
    properties: {
      eventId: validations.rules.objectId
      // eventPhotoId: validations.rules.eventPhotoIds
    }
  })
    .then(repos.events.findById.bind(this, payload.eventId))
    .then((event) => {
      if (!event) {
        throw new restify.errors.NotFoundError(messages.events.notFound);
      }
      if (event.photoIds.indexOf(payload.photoId) < 0) {
        throw new restify.errors.ForbiddenError('PhotoId not found');
      }
      return Promise.resolve(payload);
    })
    .then(() => {
      return Promise.resolve(payload);
    })
    .then(repos.events.removeEventPhoto)
    .then((response) => {
      return Promise.resolve({
        message: messages.events.photoRemoveSuccess
      });
    });
}

function getById(payload) {
  let Data;
  return validations.validatePayload(payload, {
    properties: {
      eventId: validations.rules.ObjectId('eventId')
    }
  })
    .then(repos.events.findById.bind(this, payload.eventId))
    .then((event) => {
      if (!event) {
        throw new restify.errors.NotFoundError(messages.events.notFound);
      }
      Data = event;
      return Promise.resolve(Data);
    })
    .then(helpers.events.adjustDetailResponse)
    .then((response) => {
      Data = response;
      return Promise.resolve(Data);
    });
}

function remove(payload) {
  return validations.validatePayload(payload, {
    properties: {
      eventId: validations.rules.objectId
    }
  })
    .then(repos.events.findById.bind(this, payload.eventId))
    .then((event) => {
      if (!event) {
        throw new restify.errors.NotFoundError(messages.events.notFound);
      }
    })
    .then(() => {
      return Promise.resolve(payload);
    })
    .then(repos.events.remove)
    .then((events) => {
      return Promise.resolve({
        id: events._id,
        message: messages.events.remove
      });
    });
}

function updateStatus(payload) {
  return validations.validatePayload(payload, {
    properties: {
      eventId: validations.rules.objectId,
      status: validations.rules.tripStatus
    }
  })
    .then(repos.events.findById.bind(this, payload.eventId))
    .then((event) => {
      if (!event) {
        throw new restify.errors.NotFoundError(messages.events.notFound);
      }
    })
    .then(() => {
      payload.updatedBy = payload.auth.userId;
      return Promise.resolve(payload);
    })
    .then(repos.events.updateStatus)
    .then(() => {
      return Promise.resolve({
        message: messages.events.updateSuccess
      });
    });
}
