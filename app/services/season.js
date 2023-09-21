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
      shortDescription: validations.rules.textRequired('Short Description')
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
    .then(repos.season.create)
    .then(() => {
      return Promise.resolve({
        message: messages.season.createSuccess
      });
    });
}

function update(payload) {
  return validations.validatePayload(payload, {
    properties: {
      seasonId: validations.rules.objectId,
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
    .then(repos.season.findById.bind(this, payload.seasonId))
    .then((season) => {
      if (!season) {
        throw new restify.errors.NotFoundError(messages.season.notExists);
      }
      //   payload.date = moment(payload.date).valueOf();
      return repos.season.update(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.season.updateSuccess
      });
    });
}

function get(payload) {
  return repos.season.get(payload)
    .then(helpers.tag.adjustListResponse)
    .then((season) => {
      // return Promise.resolve(res);
      return {
        data: season.data,
        meta: {
          pageSize: payload.pageSize,
          skip: payload.skip,
          total: season.total
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
        resolve(repos.season.getSingleById(payload.id));
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
        resolve(repos.season.getSingleById({
          slug: payload.slug
        }));
      })
        .catch(err => {
          reject(err);
        });
    }
  })
    .then((season) => {
      // console.log('i am here');
      if (!season) {
        throw new restify.errors.NotFoundError(messages.season.notFound);
      } else {
        return helpers.tag.adjustDetailResponse(season)
          .then((response) => {
            return Promise.resolve(response);
          });
      }
    })
    .catch(() => {
      throw new restify.errors.NotFoundError(messages.season.notFound);
    });
}

function remove(payload) {
  return validations.validatePayload(payload, {
    properties: {
      seasonId: validations.rules.objectId
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
    .then(repos.season.findById.bind(this, payload.seasonId))
    .then((season) => {
      if (!season) {
        throw new restify.errors.NotFoundError(messages.season.notExists);
      }
      return repos.season.remove(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.season.removeSuccess
      });
    });
}

function uploadPhoto(payload) {
  let photoId;

  return validations.validatePayload(payload, {
    properties: {
      seasonId: validations.rules.objectId
    }
  })
    .then(repos.season.getSingleById.bind(this, payload.seasonId))
    .then((season) => {
      if (!season) {
        throw new restify.errors.NotFoundError(messages.season.notExists);
      }
      return Promise.resolve(payload);
    })
    .then((payload) => {
      photoId = payload.photo[0].filename;
      return Promise.resolve({
        seasonId: payload.seasonId,
        photoId: photoId
      });
    })
    .then(repos.season.addPhoto)
    .then(() => {
      return Promise.resolve({
        id: photoId,
        photo: helpers.photo.getURL(photoId, false),
        thumbnail: helpers.photo.getURL(photoId, true),
        message: messages.season.imageSaveSuccess
      });
    });
}

function removePhoto(payload) {

  return validations.validatePayload(payload, {
    properties: {
      seasonId: validations.rules.objectId
    }
  })
    .then(repos.season.getSingleById.bind(this, payload.seasonId))
    .then((season) => {
      if (!season) {
        throw new restify.errors.NotFoundError(messages.season.notExists);
      }
      if (season.photoIds.indexOf(payload.photoId) < 0) {
        throw new restify.errors.ForbiddenError('Invalid PhotoId');
      }
      // return Promise.resolve(payload);
    })
    .then(() => {
      return Promise.resolve(payload);
    })
    .then(repos.season.removePhoto)
    .then(() => {
      return Promise.resolve({
        message: messages.season.imageRemoveSuccess
      });
    });
}
