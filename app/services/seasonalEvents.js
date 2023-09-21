'use strict';

const repos = require('../repositories');
const messages = require('../messages');
const validations = require('../validations');
const enums = require('../enums');
const restify = require('restify');
const helpers = require('../helpers');
// const constants = require('../constants');
// const _ = require('lodash');
// const moment = require('moment');

module.exports = {
  create,
  update,
  get,
  getSingleById,
  remove,
  uploadPhoto,
  removePhoto
};

function create(payload) {
  return validations.validatePayload(payload, {
    properties: {
      title: validations.rules.textRequired('Title'),
      description: validations.rules.textRequired('Description')
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
      //   payload.date = moment(payload.date).valueOf();
      return Promise.resolve(payload);
    })
    .then(repos.season.findById.bind(this, payload.seasonId))
    .then((season) => {
      if (!season) {
        throw new restify.errors.NotFoundError(messages.season.notExists);
      }

      return Promise.resolve(payload);
    })
    .then(repos.seasonalEvents.create)
    .then(() => {
      return Promise.resolve({
        message: messages.seasonalEvents.createSuccess
      });
    });
}

function update(payload) {
  return validations.validatePayload(payload, {
    properties: {
      seasonalEventId: validations.rules.objectId,
      title: validations.rules.textRequired('Title')
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
    })
    .then(repos.seasonalEvents.findById.bind(this, payload.seasonalEventId))
    .then(repos.season.findById.bind(this, payload.seasonId))
    .then((season) => {
      if (!season) {
        throw new restify.errors.NotFoundError(messages.season.notExists);
      }

      return Promise.resolve(payload);
    })
    .then(repos.seasonalEvents.update)
    .then(() => {
      return Promise.resolve({
        message: messages.seasonalEvents.updateSuccess
      });
    });
}

function get(payload) {
  return repos.seasonalEvents.get(payload)
    .then(helpers.tag.adjustListResponse)
    .then((event) => {
      // return Promise.resolve(res);
      return {
        data: event.data,
        meta: {
          pageSize: payload.pageSize,
          skip: payload.skip,
          total: event.total
        }
      };
    });
}

function getSingleById(payload) {
  return new Promise((resolve, reject) => {
    if (payload.id) {
      return validations.validatePayload(payload, {
        properties: {
          id: validations.rules.objectId
        }
      }).then((res) => {
        // console.log('i am here');
        resolve(repos.seasonalEvents.getSingleById(payload.id));
      })
        .catch(err => {
          reject(err);
        });
    } else if (payload.slug) {
      return validations.validatePayload(payload, {
        properties: {
          slug: validations.rules.tagSlug
        }
      }).then((res) => {
        resolve(repos.seasonalEvents.getSingleById({
          slug: payload.slug
        }));
      })
        .catch(err => {
          reject(err);
        });
    }
  })
    .then((event) => {
      // console.log('i am here');
      if (!event) {
        throw new restify.errors.NotFoundError(messages.seasonalEvents.notFound);
      } else {
        return helpers.tag.adjustDetailResponse(event)
          .then((response) => {
            return Promise.resolve(response);
          });
      }
    })
    .catch(() => {
      throw new restify.errors.NotFoundError(messages.seasonalEvents.notFound);
    });
}

function remove(payload) {
  return validations.validatePayload(payload, {
    properties: {
      seasonalEventId: validations.rules.objectId
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
    })
    .then(repos.seasonalEvents.findById.bind(this, payload.seasonalEventId))
    .then(() => {
      return repos.seasonalEvents.remove(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.seasonalEvents.removeSuccess
      });
    });
}

function uploadPhoto(payload) {
  let photoId;

  return validations.validatePayload(payload, {
    properties: {
      seasonalEventId: validations.rules.objectId
    }
  })
    .then(repos.seasonalEvents.getSingleById.bind(this, payload.seasonalEventId))
    .then((event) => {
      if (!event) {
        throw new restify.errors.NotFoundError(messages.seasonalEvents.notExists);
      }
      return Promise.resolve(payload);
    })
    .then((payload) => {
      photoId = payload.photo[0].filename;
      return Promise.resolve({
        seasonalEventId: payload.seasonalEventId,
        photoId: photoId
      });
    })
    .then(repos.seasonalEvents.addPhoto)
    .then(() => {
      return Promise.resolve({
        id: photoId,
        photo: helpers.photo.getURL(photoId, false),
        thumbnail: helpers.photo.getURL(photoId, true),
        message: messages.seasonalEvents.imageSaveSuccess
      });
    });
}

function removePhoto(payload) {

  return validations.validatePayload(payload, {
    properties: {
      seasonalEventId: validations.rules.objectId
    }
  })
    .then(repos.seasonalEvents.getSingleById.bind(this, payload.seasonalEventId))
    .then((event) => {
      if (!event) {
        throw new restify.errors.NotFoundError(messages.seasonalEvents.notExists);
      }
      if (event.photoIds.indexOf(payload.photoId) < 0) {
        throw new restify.errors.ForbiddenError('Invalid PhotoId');
      }
      // return Promise.resolve(payload);
    })
    .then(helpers.photo.remove.bind(this, payload.photoId))
    .then(() => {
      return Promise.resolve(payload);
    })
    .then(repos.seasonalEvents.removePhoto)
    .then(() => {
      return Promise.resolve({
        message: messages.seasonalEvents.imageRemoveSuccess
      });
    });
}
