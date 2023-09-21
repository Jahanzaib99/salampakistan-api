'use strict';

const repos = require('../repositories');
const messages = require('../messages');
const validations = require('../validations');
// const enums = require('../enums');
const restify = require('restify');
const helpers = require('../helpers');
// const constants = require('../constants');

module.exports = {
  create,
  get,
  update,
  remove,
  reCount,
  getSingleById,
  uploadPhoto,
  removePhoto
};

function create(payload) {
  return validations.validatePayload(payload, {
    properties: {
      name: validations.rules.activityName,
      alias: validations.rules.textRequired('alias'),
      description: validations.rules.textRequired('description'),
      longDescription: validations.rules.textRequired('longDescription'),
      activityType: validations.rules.textRequired('activityType'),
      coordinates: validations.rules.coordinates,
      parentCategories: validations.rules.optionalArrayOfObjectIds('parentCategories'),
      isFeatured: validations.rules.booleanRequired('isFeatured')
    }
  })
    .then(repos.user.findById.bind(this, payload.auth.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      // if (payload.auth.userType !== enums.user.type.admin) {
      //   throw new restify.errors.ForbiddenError(messages.user.notAllowed);
      // }
      // return repos.activity.createActivity(payload);
    })
    .then(repos.activity.getByName.bind(this, payload.name))
    .then((sameNameActivity) => {
      if (sameNameActivity.length > 0) {
        console.log('sameNameActivity', sameNameActivity);
        throw new restify.errors.ConflictError('Duplicate Name');
      }
      payload.location = {
        type: 'Point',
        coordinates: payload.coordinates
      };
      return repos.activity.create(payload);
    })
    .then((response) => {
      return Promise.resolve({
        message: messages.activity.success,
        data: response
      });
    });
}

function get(payload) {
  if (payload.parentCategories && JSON.parse(payload.parentCategories).length !== 0) {
    payload.parentCategories = JSON.parse(payload.parentCategories);
  }
  // if (payload.activityType) {
  //   payload.activityType = +payload.activityType;
  // }
  return validations.validatePayload(payload, {
    properties: {
      parentCategories: validations.rules.categories
    }
  })
    .then(repos.activity.get)
    .then(helpers.tag.adjustListResponse)
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
      activityId: validations.rules.activityId,
      name: validations.rules.activityName,
      alias: validations.rules.textRequired('alias'),
      description: validations.rules.textRequired('description'),
      longDescription: validations.rules.textRequired('longDescription'),
      activityType: validations.rules.textRequired('activityType'),
      coordinates: validations.rules.coordinates,
      parentCategories: validations.rules.optionalArrayOfObjectIds('parentCategories'),
      isFeatured: validations.rules.booleanRequired('isFeatured')
    }
  })
    .then(repos.user.findById.bind(this, payload.auth.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      // if (payload.auth.userType !== enums.user.type.admin) {
      //   throw new restify.errors.ForbiddenError(messages.user.notAllowed);
      // }
      // return Promise.resolve(user);
    })
    .then(repos.activity.findById.bind(this, payload.activityId))
    .then((activity) => {
      if (!activity) {
        throw new restify.errors.ConflictError(messages.activity.activityNotExists);
      }
      // return repos.activity.update(payload);
    })
    .then(repos.activity.getByName.bind(this, payload.name))
    .then((sameNameActivity) => {
      if (sameNameActivity.length > 1) {
        console.log('sameNameActivity', sameNameActivity);
        throw new restify.errors.ConflictError('Duplicate Name');
      }
      payload.location = {
        type: 'Point',
        coordinates: payload.coordinates
      };
      return repos.activity.update(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.activity.update
      });
    });
}
function remove(payload) {
  return validations.validatePayload(payload, {
    properties: {
      activityId: validations.rules.activityId
    }
  })
    .then(repos.user.findById.bind(this, payload.auth.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      // if (payload.auth.userType !== enums.user.type.admin) {
      //   throw new restify.errors.ForbiddenError(messages.user.notAllowed);
      // }
      // return Promise.resolve(user);
    })
    .then(repos.activity.findById.bind(this, payload.activityId))
    .then((activity) => {
      if (!activity) {
        throw new restify.errors.ConflictError(messages.activity.activityNotExists);
      }
      return repos.activity.remove(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.activity.delete
      });
    });
}

async function reCount() {
  let allActivities = await repos.activity.get();
  let aresponse = [];
  for (const activity of allActivities) {
    let activityCount = await repos.activity.countactivity(activity._id);
    let activityObject = {
      _id: activity._id,
      name: activity.name,
      tripCount: activityCount
    };
    await repos.activity.findOneAndUpdate(activityObject);
    aresponse.push(activityObject);
  }
  return Promise.resolve(aresponse);
}

function getSingleById(payload) {
  return new Promise((resolve, reject) => {
    if (payload.id) {
      return validations.validatePayload(payload, {
        properties: {
          id: validations.rules.objectId
        }
      }).then((res) => {
        resolve(repos.activity.findDetails({ id: payload.id }));
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
        resolve(repos.activity.findDetails({
          slug: payload.slug
        }));
      })
        .catch(err => {
          reject(err);
        });
    }
  })
    .then((activity) => {
      if (!activity) {
        throw new restify.errors.NotFoundError(messages.activity.notFound);
      } else {
        return helpers.tag.adjustDetailResponse(activity)
          .then((response) => {
            return Promise.resolve(response);
          });
      }
    })
    .catch(() => {
      throw new restify.errors.NotFoundError(messages.activity.notFound);
    });
}

function uploadPhoto(payload) {
  let photoId;

  return validations.validatePayload(payload, {
    properties: {
      activityId: validations.rules.objectId
    }
  })
    .then(repos.activity.getSingleById.bind(this, payload.activityId))
    .then((activity) => {
      if (!activity) {
        throw new restify.errors.NotFoundError(messages.activity.activityNotExists);
      }
      return Promise.resolve(payload);
    })
    .then((payload) => {
      photoId = payload.photo[0].filename;
      return Promise.resolve({
        activityId: payload.activityId,
        photoId: photoId
      });
    })
    .then(repos.activity.addPhoto)
    .then(() => {
      return Promise.resolve({
        id: photoId,
        photo: helpers.photo.getURL(photoId, false),
        thumbnail: helpers.photo.getURL(photoId, true),
        message: messages.activity.update
      });
    });
}

function removePhoto(payload) {

  return validations.validatePayload(payload, {
    properties: {
      activityId: validations.rules.objectId
    }
  })
    .then(repos.activity.getSingleById.bind(this, payload.activityId))
    .then((activity) => {
      if (!activity) {
        throw new restify.errors.NotFoundError(messages.activity.activityNotExists);
      }
      if (activity.photoIds.indexOf(payload.photoId) < 0) {
        throw new restify.errors.ForbiddenError('Invalid PhotoId');
      }
      // return Promise.resolve(payload);
    })
    .then(() => {
      return Promise.resolve(payload);
    })
    .then(repos.activity.removePhoto)
    .then(() => {
      return Promise.resolve({
        message: messages.activity.update
      });
    });
}
