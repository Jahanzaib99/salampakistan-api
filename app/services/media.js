'use strict';

const repos = require('../repositories');
const messages = require('../messages');
const validations = require('../validations');
// const enums = require('../enums');
const restify = require('restify');
const helpers = require('../helpers');
// const constants = require('../constants');
// const _ = require('lodash');
const moment = require('moment');
const { parseInt } = require('lodash');

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
  return validations
    .validatePayload(payload, {
      properties: {
        title: validations.rules.textRequired('Title'),
        date: validations.rules.date,
        description: validations.rules.textRequired('Description')
      }
    })
    .then(repos.user.findById.bind(this, payload.auth.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      payload.date = moment(payload.date).valueOf();

      if (payload.date < parseInt(moment(new Date()).startOf('day'))) {
        throw new restify.errors.ForbiddenError('Past date is not allowed.');
      }
      return Promise.resolve(payload);
    })
    .then(repos.media.create)
    .then(() => {
      return Promise.resolve({
        message: messages.media.createSuccess
      });
    });
}

function update(payload) {
  return validations
    .validatePayload(payload, {
      properties: {
        mediaId: validations.rules.objectId,
        title: validations.rules.textRequired('Title'),
        date: validations.rules.date,
        description: validations.rules.textRequired('Description')
      }
    })
    .then(repos.user.findById.bind(this, payload.auth.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
    })
    .then(repos.media.findById.bind(this, payload.mediaId))
    .then((media) => {
      if (!media) {
        throw new restify.errors.NotFoundError(messages.media.notExists);
      }
      payload.date = moment(payload.date).valueOf();
      return repos.media.update(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.media.saveSuccess
      });
    });
}

function get(payload) {
  return repos.media
    .get(payload)
    .then(helpers.tag.adjustListResponse)
    .then((media) => {
      // return Promise.resolve(res);
      return {
        data: media.data,
        meta: {
          pageSize: payload.pageSize,
          skip: payload.skip,
          total: media.total
        }
      };
    });
}

function getSingleById(payload) {
  return new Promise((resolve, reject) => {
    if (payload.id) {
      return validations
        .validatePayload(payload, {
          properties: {
            id: validations.rules.objectId
          }
        })
        .then((res) => {
          console.log('i am here');
          resolve(repos.media.getSingleById(payload.id));
        })
        .catch((err) => {
          reject(err);
        });
    } else if (payload.slug) {
      return validations
        .validatePayload(payload, {
          properties: {
            slug: validations.rules.tagSlug
          }
        })
        .then((res) => {
          resolve(
            repos.media.getSingleById({
              slug: payload.slug
            })
          );
        })
        .catch((err) => {
          reject(err);
        });
    }
  })
    .then((media) => {
      if (!media) {
        throw new restify.errors.NotFoundError(messages.media.notFound);
      } else {
        return helpers.tag.adjustDetailResponse(media).then((response) => {
          return Promise.resolve(response);
        });
      }
    })
    .catch(() => {
      throw new restify.errors.NotFoundError(messages.location.notFound);
    });
}

function remove(payload) {
  return validations
    .validatePayload(payload, {
      properties: {
        mediaId: validations.rules.objectId
      }
    })
    .then(repos.user.findById.bind(this, payload.auth.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
    })
    .then(repos.media.findById.bind(this, payload.mediaId))
    .then((media) => {
      if (!media) {
        throw new restify.errors.NotFoundError(messages.media.notExists);
      }
      return repos.media.remove(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.media.removeSuccess
      });
    });
}

function uploadPhoto(payload) {
  let photoId;
  return validations.validatePayload(payload, {
    properties: {
      mediaId: validations.rules.objectId
    }
  })
    .then(repos.media.getSingleById.bind(this, payload.mediaId))
    .then((media) => {
      if (!media) {
        throw new restify.errors.NotFoundError(messages.media.notExists);
      }
      return Promise.resolve(payload);
    })
    .then((payload) => {
      photoId = payload.photo[0].filename;
      return Promise.resolve({
        mediaId: payload.mediaId,
        photoId: photoId
      });
    })
    .then(repos.media.addPhoto)
    .then(() => {
      return Promise.resolve({
        id: photoId,
        photo: helpers.photo.getURL(photoId, false),
        thumbnail: helpers.photo.getURL(photoId, true),
        message: messages.media.saveSuccess
      });
    });
}

function removePhoto(payload) {
  return validations
    .validatePayload(payload, {
      properties: {
        mediaId: validations.rules.objectId
      }
    })
    .then(repos.media.getSingleById.bind(this, payload.mediaId))
    .then((media) => {
      if (!media) {
        throw new restify.errors.NotFoundError(messages.media.notExists);
      }
      if (media.photoIds.indexOf(payload.photoId) < 0) {
        throw new restify.errors.ForbiddenError('Invalid PhotoId');
      }
    })
    .then(() => {
      return Promise.resolve(payload);
    })
    .then(repos.media.removePhoto)
    .then(() => {
      return Promise.resolve({
        message: messages.media.removeSuccess
      });
    });
}
