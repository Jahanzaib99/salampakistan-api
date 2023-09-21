'use strict';

const repos = require('../repositories');
const messages = require('../messages');
const validations = require('../validations');
const enums = require('../enums');
const restify = require('restify');
const helpers = require('../helpers');
const constants = require('../constants');
const _ = require('lodash');

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

async function search(payload) {
  if (payload.locationId && JSON.parse(payload.locationId).length !== 0) {
    payload.locationId = JSON.parse(payload.locationId);
  }
  if (payload.categoryId && JSON.parse(payload.categoryId).length !== 0) {
    payload.categoryId = JSON.parse(payload.categoryId);
  }
  if (payload.starRating) {
    payload.starRating = Number(payload.starRating);
  }
  let count = await repos.accommodation.accommodationCount(payload);
  return repos.accommodation.search(payload)
    .then(helpers.accomodations.adjustListResponse)
    .then((response) => {
      return Promise.resolve({
        data: response,
        meta: {
          pageSize: payload.pageSize,
          skip: payload.skip,
          total: count.total
        }
      });
    });
}

function migrate() {
  return repos.accommodation.migrate()
    .then((resp) => {
      return Promise.resolve({
        message: 'Migration completed.'
      })
        .catch((err) => { console.log(err); });
    });
}

function countryStatus() {
  // let results = checkDuplicateInObject('name', [...constants.onArrival, ...constants.online]);
  return new Promise((resolve) => {
    return resolve(
      _.sortBy(constants.countryStatus)
      // _.reject(results, _.isEmpty)
      //   {
      //   onArrival: _.sortBy(constants.onArrival),
      //   online: _.sortBy(constants.online)
      // }
    );
  });
}

async function getone(payload) {
  await validations.validatePayload(payload, {
    properties: {
      id: validations.rules.objectId
    }
  });
  let getone = await repos.accommodation.getone(payload.id);
  if (!getone) {
  }
  let adjustDetailResponse = await helpers.events.adjustDetailResponse(getone[0]);
  return Promise.resolve(adjustDetailResponse);
}

// function checkDuplicateInObject(propertyName, inputArray) {
//   var testObject = {};
//   inputArray.map(function(item) {
//     var itemPropertyName = item[propertyName];
//     if (itemPropertyName in testObject) {
//       testObject[itemPropertyName].onArrival = true;
//       testObject[itemPropertyName].online = true;
//       delete item.status;
//       delete item.name;
//     } else {
//       testObject[itemPropertyName] = item;
//       testObject[itemPropertyName].onArrival = false;
//       testObject[itemPropertyName].online = true;
//       delete item.status;

//     }
//   });
//   return inputArray;
// }

function update(payload) {
  return validations.validatePayload(payload, {
    properties: {
      accommodationId: validations.rules.objectId
      // locationId: validations.rules.objectId,
      // categoryId: validations.rules.objectId
    }
  })
    .then(repos.user.findById.bind(this, payload.auth.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      if (payload.auth.userType !== enums.user.type.admin) {
        throw new restify.errors.ForbiddenError(messages.user.notAllowed);
      }
      // return Promise.resolve(user);
    })
    .then(repos.accommodation.findById.bind(this, payload.accommodationId))
    .then((accommodation) => {
      if (!accommodation) {
        throw new restify.errors.ConflictError(messages.accommodation.notExists);
      }
      return repos.accommodation.update(payload);

    }).then(() => {
      return Promise.resolve({
        message: messages.accommodation.update
      });
    });
}

function uploadPhoto(payload) {
  let photoId;

  return validations.validatePayload(payload, {
    properties: {
      accommodationId: validations.rules.objectId
    }
  })
    .then(repos.accommodation.findById.bind(this, payload.accommodationId))
    .then((accommodation) => {
      if (!accommodation) {
        throw new restify.errors.NotFoundError(messages.accommodation.notExists);
      }
      return Promise.resolve(payload);
    })
    .then((payload) => {
      photoId = payload.photo[0].filename;
      return Promise.resolve({
        accommodationId: payload.accommodationId,
        photoId: photoId
      });
    })
    .then(repos.accommodation.addPhoto)
    .then(() => {
      return Promise.resolve({
        id: photoId,
        photo: helpers.photo.getURL(photoId, false),
        thumbnail: helpers.photo.getURL(photoId, true),
        message: messages.accommodation.update
      });
    });
}

function removePhoto(payload) {
  return validations.validatePayload(payload, {
    properties: {
      accommodationId: validations.rules.objectId
    }
  })
    .then(repos.accommodation.findById.bind(this, payload.accommodationId))
    .then((accommodation) => {
      if (!accommodation) {
        throw new restify.errors.NotFoundError(messages.accommodation.notExists);
      }
      if (accommodation.photoIds.indexOf(payload.photoId) < 0) {
        throw new restify.errors.ForbiddenError('Invalid PhotoId');
      }
      return Promise.resolve(payload);
    })
    .then(repos.accommodation.removePhoto)
    .then(() => {
      return Promise.resolve({
        message: messages.accommodation.update
      });
    });
}

function getToHotels(payload) {
  return validations.validatePayload(payload, {
    properties: {
      // city: validations.rules.city
    }
  })
    .then(() => {
      return repos.accommodation.getToHotels(payload)
        .then((response) => {
          return Promise.resolve({
            data: response,
            meta: {
              pageSize: payload.pageSize,
              skip: payload.skip
              // total: count.total
            }
          });
        });
    });
}
