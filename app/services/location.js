'use strict';

const repos = require('../repositories');
const messages = require('../messages');
const validations = require('../validations');
const enums = require('../enums');
const restify = require('restify');
const helpers = require('../helpers');
// const constants = require('../constants');
// const _ = require('lodash');

module.exports = {
  create,
  get,
  reCount,
  update,
  remove,
  getSingleById,
  uploadPhoto,
  removePhoto,
  createSurr,
  getAllSurr,
  updateSurr,
  removeSurr,
  getSingleSurr,
  getNearByLocations
};

function create(payload) {
  return validations.validatePayload(payload, {
    properties: {
      name: validations.rules.locationName
      // surroundings: validations.rules.surroundings
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
    })
    .then(repos.location.getByName.bind(this, payload.name))
    .then((sameNameLocation) => {
      if (sameNameLocation.length > 0) {
        throw new restify.errors.ConflictError('Duplicate Name');
      }
      payload.location = {
        type: 'Point',
        coordinates: payload.coordinates
      };
      return repos.location.create(payload);
    })
    .then((response) => {
      return Promise.resolve({
        message: messages.location.locationSuccess,
        data: response
      });
    });
}

function get(payload) {
  if (payload.parentCategories && JSON.parse(payload.parentCategories).length !== 0) {
    payload.parentCategories = JSON.parse(payload.parentCategories);
  }
  if (payload.parentActivities && JSON.parse(payload.parentActivities).length !== 0) {
    payload.parentActivities = JSON.parse(payload.parentActivities);
  }

  return validations.validatePayload(payload, {
    properties: {
      parentActivities: validations.rules.activities,
      parentCategories: validations.rules.categories
    }
  })
    .then(repos.location.get)
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

async function reCount() {

  let allLocation = await repos.location.get();
  let aresponse = [];
  for (const location of allLocation) {
    // let upperCaseLocation = toTitleCase(location._id);
    let locationCount = await repos.location.countLocation(location._id);

    let locationObject = {
      _id: location._id,
      name: location.name,
      tripCount: locationCount
    };
    await repos.location.findOneAndUpdate(locationObject);
    aresponse.push(locationObject);
  }
  return Promise.resolve(aresponse);
}

// function to Change title to uppercase
// function toTitleCase(str) {
//   return str.toLowerCase().replace(/(?:^|[\s-/])\w/g, function (match) {
//     return match.toUpperCase();
//   });
// }

function update(payload) {
  return validations.validatePayload(payload, {
    properties: {
      locationId: validations.rules.locationId,
      name: validations.rules.locationName
      // surroundings: validations.rules.surroundings
      // isFilter: validations.rules.isFilter,
      // isDomestic: validations.rules.isDomestic
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
    })
    .then(repos.location.findById.bind(this, payload.locationId))
    .then((location) => {
      if (!location) {
        throw new restify.errors.ConflictError(messages.location.locationNotExists);
      }
      // return repos.location.update(payload);
    })
    .then(repos.location.getByName.bind(this, payload.name))
    .then((sameNameLocation) => {
      if (sameNameLocation.length > 1) {
        throw new restify.errors.ConflictError('Duplicate Name');
      }
      payload.location = {
        type: 'Point',
        coordinates: payload.coordinates
      };
      return repos.location.update(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.location.locationUpdate
      });
    });
}

function remove(payload) {
  return validations.validatePayload(payload, {
    properties: {
      locationId: validations.rules.locationId
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
    })
    .then(repos.location.findById.bind(this, payload.locationId))
    .then((location) => {
      if (!location) {
        throw new restify.errors.ConflictError(messages.location.locationNotExists);
      }
      return repos.location.remove(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.location.locationDelete
      });
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
        resolve(repos.location.findDetails({ id: payload.id }));
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
        resolve(repos.location.findDetails({
          slug: payload.slug
        }));
      })
        .catch(err => {
          reject(err);
        });
    }
  })
    .then((location) => {

      if (!location) {
        throw new restify.errors.NotFoundError(messages.location.notFound);
      } else {
        return helpers.tag.adjustDetailResponse(location)
          .then((response) => {
            return Promise.resolve(response);
          });
      }
    })
    .catch(() => {
      throw new restify.errors.NotFoundError(messages.location.notFound);
    });
}

function uploadPhoto(payload) {
  let photoId;

  return validations.validatePayload(payload, {
    properties: {
      locationId: validations.rules.objectId
    }
  })
    .then(repos.location.getSingleById.bind(this, payload.locationId))
    .then((location) => {
      if (!location) {
        throw new restify.errors.NotFoundError(messages.location.locationNotExists);
      }
      return Promise.resolve(payload);
    })
    .then((payload) => {
      photoId = payload.photo[0].filename;
      return Promise.resolve({
        locationId: payload.locationId,
        photoId: photoId
      });
    })
    .then(repos.location.addPhoto)
    .then(() => {
      return Promise.resolve({
        id: photoId,
        photo: helpers.photo.getURL(photoId, false),
        thumbnail: helpers.photo.getURL(photoId, true),
        message: messages.location.locationUpdate
      });
    });
}

function removePhoto(payload) {

  return validations.validatePayload(payload, {
    properties: {
      locationId: validations.rules.objectId
    }
  })
    .then(repos.location.getSingleById.bind(this, payload.locationId))
    .then((location) => {
      if (!location) {
        throw new restify.errors.NotFoundError(messages.location.locationNotExists);
      }
      if (location.photoIds.indexOf(payload.photoId) < 0) {
        throw new restify.errors.ForbiddenError('Invalid PhotoId');
      }
      // return Promise.resolve(payload);
    })
    .then(() => {
      return Promise.resolve(payload);
    })
    .then(repos.location.removePhoto)
    .then(() => {
      return Promise.resolve({
        message: messages.location.locationUpdate
      });
    });
}

function createSurr(payload) {
  return validations.validatePayload(payload, {
    properties: {
      // name: validations.rules.locationName
      // surroundings: validations.rules.surroundings
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
    .then(repos.location.getSurrByName.bind(this, payload.name))
    .then((sameNameSurr) => {
      if (sameNameSurr.length > 0) {
        throw new restify.errors.ConflictError('Duplicate Name');
      }
      return repos.location.createSurr(payload);
    })
    .then((response) => {
      return Promise.resolve({
        message: messages.location.surrSuccess,
        data: response
      });
    });
}
function getAllSurr(payload) {

  return validations.validatePayload(payload, {
    properties: {
      // parentActivities: validations.rules.activities,
      // parentCategories: validations.rules.categories
    }
  })
    .then(repos.location.getAllSurr)
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

function updateSurr(payload) {
  return validations.validatePayload(payload, {
    properties: {
      // locationId: validations.rules.locationId,
      // name: validations.rules.locationName
      // surroundings: validations.rules.surroundings
      // isFilter: validations.rules.isFilter,
      // isDomestic: validations.rules.isDomestic
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
    .then(repos.location.findSurrById.bind(this, payload.surrId))
    .then((surrounding) => {
      if (!surrounding) {
        throw new restify.errors.ConflictError(messages.location.surrNotExists);
      }
      // return repos.location.update(payload);
    })
    .then(repos.location.getSurrByName.bind(this, payload.name))
    .then((sameNameSurr) => {
      if (sameNameSurr.length > 1) {
        throw new restify.errors.ConflictError('Duplicate Name');
      }
      return repos.location.updateSurr(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.location.surrUpdate
      });
    });
}

function removeSurr(payload) {
  return validations.validatePayload(payload, {
    properties: {
      // locationId: validations.rules.locationId
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
    .then(repos.location.findSurrById.bind(this, payload.surrId))
    .then((location) => {
      if (!location) {
        throw new restify.errors.ConflictError(messages.location.surrNotExists);
      }
      return repos.location.removeSurr(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.location.surrDelete
      });
    });
}

function getSingleSurr(payload) {
  return validations.validatePayload(payload, {
    properties: {
      // locationId: validations.rules.locationId
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
    .then(repos.location.findSurrById.bind(this, payload.id))
    .then((surroundings) => {
      if (!surroundings) {
        throw new restify.errors.ConflictError(messages.location.surrNotExists);
      }
      // return repos.location.removeSurr(payload);
      return Promise.resolve(surroundings);
    });
}

async function getNearByLocations(payload) {
  if(payload.coordinates && typeof (payload.coordinates) === 'string') {payload.coordinates = JSON.parse(payload.coordinates);}
  await validations.validatePayload(payload, {
    properties: {
      coordinates: validations.rules.coordinates,
      locationType: validations.rules.locationType
    }
  });
  if(payload.coordinates[0] > 40) {
    payload.coordinates = payload.coordinates;
  }else{
    payload.coordinates = payload.coordinates.reverse();
  }
  let getNearByLocations = await repos.location.getNearByLocations(payload);
  if (!getNearByLocations) {
    throw new restify.errors.ForbiddenError('Something went wrong!');
  }
  let adjustListResponse = await helpers.location.adjustListResponse(getNearByLocations);
  if (!adjustListResponse) {
    throw new restify.errors.ForbiddenError('Something went wrong!');
  }
  return ({
    data: adjustListResponse,
    meta: {
      total: getNearByLocations.length
    }
  });

}
