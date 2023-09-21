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
      name: validations.rules.categoryName
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
      // return repos.category.createCategory(payload);
    })
    .then(repos.category.getByName.bind(this, payload.name))
    .then((sameNameCategory) => {
      if (sameNameCategory.length > 0) {
        console.log('sameNameCategory', sameNameCategory);
        throw new restify.errors.ConflictError('Duplicate Name');
      }
      payload.location = {
        type: 'Point',
        coordinates: payload.coordinates
      };
      return repos.category.create(payload);
    })
    .then((response) => {
      return Promise.resolve({
        message: messages.category.success,
        data: response
      });
    });
}

function get(payload) {
  // if (payload.categoryType) {
  //   payload.categoryType = +payload.categoryType;
  // }
  return validations.validatePayload(payload, {
    properties: {
      // parentCategories: validations.rules.categories
    }
  })
    .then(repos.category.get)
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
      categoryId: validations.rules.categoryId,
      name: validations.rules.categoryName
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
    .then(repos.category.findById.bind(this, payload.categoryId))
    .then((category) => {
      if (!category) {
        throw new restify.errors.ConflictError(messages.category.categoryNotExists);
      }
      // return repos.category.update(payload);
    })
    .then(repos.category.getByName.bind(this, payload.name))
    .then((sameNameCategory) => {
      if (sameNameCategory.length > 1) {
        console.log('sameNameCategory', sameNameCategory);
        throw new restify.errors.ConflictError('Duplicate Name');
      }
      payload.location = {
        type: 'Point',
        coordinates: payload.coordinates
      };
      return repos.category.update(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.category.update
      });
    });
}
function remove(payload) {
  return validations.validatePayload(payload, {
    properties: {
      categoryId: validations.rules.categoryId
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
    .then(repos.category.findById.bind(this, payload.categoryId))
    .then((category) => {
      if (!category) {
        throw new restify.errors.ConflictError(messages.category.categoryNotExists);
      }
      return repos.category.remove(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.category.delete
      });
    });
}

async function reCount() {
  let allCateogries = await repos.category.get();
  let aresponse = [];
  for (const category of allCateogries) {
    // let upperCaseLocation = toTitleCase(location._id);
    let categoryCount = await repos.category.countCategory(category._id);
    let categoryObject = {
      _id: category._id,
      name: category.name,
      tripCount: categoryCount
    };
    await repos.category.findOneAndUpdate(categoryObject);
    aresponse.push(categoryObject);
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
        resolve(repos.category.findDetails({ id: payload.id }));
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
        resolve(repos.category.findDetails({
          slug: payload.slug
        }));
      })
        .catch(err => {
          reject(err);
        });
    }
  })
    .then((category) => {
      if (!category) {
        throw new restify.errors.NotFoundError(messages.category.notFound);
      } else {
        return helpers.tag.adjustDetailResponse(category)
          .then((response) => {
            return Promise.resolve(response);
          });
      }
    })
    .catch(() => {
      throw new restify.errors.NotFoundError(messages.category.notFound);
    });
}

function uploadPhoto(payload) {
  let photoId;

  return validations.validatePayload(payload, {
    properties: {
      categoryId: validations.rules.objectId
    }
  })
    .then(repos.category.getSingleById.bind(this, payload.categoryId))
    .then((category) => {
      if (!category) {
        throw new restify.errors.NotFoundError(messages.category.categoryNotExists);
      }
      return Promise.resolve(payload);
    })
    .then((payload) => {
      photoId = payload.photo[0].filename;
      return Promise.resolve({
        categoryId: payload.categoryId,
        photoId: photoId
      });
    })
    .then(repos.category.addPhoto)
    .then(() => {
      return Promise.resolve({
        id: photoId,
        photo: helpers.photo.getURL(photoId, false),
        thumbnail: helpers.photo.getURL(photoId, true),
        message: messages.category.update
      });
    });
}

function removePhoto(payload) {

  return validations.validatePayload(payload, {
    properties: {
      categoryId: validations.rules.objectId
    }
  })
    .then(repos.category.getSingleById.bind(this, payload.categoryId))
    .then((category) => {
      if (!category) {
        throw new restify.errors.NotFoundError(messages.category.categoryNotExists);
      }
      if (category.photoIds.indexOf(payload.photoId) < 0) {
        throw new restify.errors.ForbiddenError('Invalid PhotoId');
      }
      // return Promise.resolve(payload);
    })
    .then(() => {
      return Promise.resolve(payload);
    })
    .then(repos.category.removePhoto)
    .then(() => {
      return Promise.resolve({
        message: messages.category.update
      });
    });
}
