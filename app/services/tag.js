'use strict';

const repos = require('../repositories');
const messages = require('../messages');
const validations = require('../validations');
const enums = require('../enums');
const restify = require('restify');
const constants = require('../constants');
const _ = require('lodash');
module.exports = {
  create,
  get,
  update,
  remove,
  reCount,
  getFilters,
  gettagTypes
};

function create(payload) {
  return validations.validatePayload(payload, {
    properties: {
      name: validations.rules.tagName,
      isDomestic: validations.rules.isDomestic
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
      // return repos.tag.createTag(payload);
    })
    .then(repos.tag.findByName.bind(this, payload.name))
    .then((sameNameTag) => {
      if (sameNameTag.length > 0) {
        console.log('sameNameTag', sameNameTag);
        if (sameNameTag.length > 1 || payload.isDomestic === sameNameTag[0].isDomestic) {
          throw new restify.errors.ConflictError('Duplicate isDomestic');
        }
      }
      return repos.tag.create(payload);
    })
    .then((response) => {
      return Promise.resolve({
        message: messages.tag.success,
        data: response
      });
    });
}

function get(payload) {
  return repos.tag.get(payload)
    .then((response) => {
      return Promise.resolve(response);
    });
}

async function reCount() {
  let allTags = await repos.tag.get();
  let aresponse = [];

  for (const tag of allTags) {
    let tagCount = await repos.tag.countTag(tag._id);

    let tagObject = {
      _id: tag._id,
      name: tag.name,
      tripCount: tagCount
    };

    await repos.tag.findOneAndUpdate(tagObject);
    aresponse.push(tagObject);

  }
  return Promise.resolve(aresponse);
}

function update(payload) {
  return validations.validatePayload(payload, {
    properties: {
      tagId: validations.rules.tagId,
      name: validations.rules.tagName,
      isDomestic: validations.rules.isDomestic
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
    .then(repos.tag.findById.bind(this, payload.tagId))
    .then((tag) => {
      if (!tag) {
        throw new restify.errors.ConflictError(messages.tag.tagNotExists);
      }
      return repos.tag.update(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.tag.tagUpdate
      });
    });
}
function remove(payload) {
  return validations.validatePayload(payload, {
    properties: {
      tagId: validations.rules.tagId
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
    .then(repos.tag.findById.bind(this, payload.tagId))
    .then((tag) => {
      if (!tag) {
        throw new restify.errors.ConflictError(messages.tag.tagNotExists);
      }
      return repos.tag.remove(payload);
    })
    .then(() => {
      return Promise.resolve({
        message: messages.tag.delete
      });
    });
}

function getFilters(payload) {
  let activities = [];
  let categories = [];
  let locations = [];
  let startingLocations = [];
  let tags = [];
  let services = [];
  let facilities = [];
  let equipments = [];

  if (payload.filter && payload.filter === 'activity') {
    return repos.activity.get(payload)
      .then((response) => {
        activities = response;
        return Promise.resolve({ activities });
      })
      .catch(err => {
        return err;
      });
  } else if (payload.filter && payload.filter === 'category') {
    return repos.category.get(payload)
      .then((response) => {
        categories = response;
        return Promise.resolve({ categories });
      })
      .catch(err => {
        return err;
      });
  } else if (payload.filter && payload.filter === 'location') {
    return repos.location.get(payload)
      .then((response) => {
        locations = response;
        return Promise.resolve({ locations });
      })
      .catch(err => {
        return err;
      });
  } else if (payload.filter && payload.filter === 'startingLocation') {
    return repos.startingLocation.get(payload)
      .then((response) => {
        startingLocations = response;
        return Promise.resolve({ startingLocations });
      })
      .catch(err => {
        return err;
      });
  } else if (payload.filter && payload.filter === 'tag') {
    return repos.tag.get(payload)
      .then((response) => {
        tags = response;
        return Promise.resolve({ tags });
      })
      .catch(err => {
        return err;
      });
  } else if (payload.filter && payload.filter === 'service') {
    return repos.service.get(payload)
      .then((response) => {
        services = response;
        return Promise.resolve({ services });
      })
      .catch(err => {
        return err;
      });
  } else if (payload.filter && payload.filter === 'facility') {
    return repos.facility.get(payload)
      .then((response) => {
        facilities = response;
        return Promise.resolve({ facilities });
      })
      .catch(err => {
        return err;
      });
  } else if (payload.filter && payload.filter === 'equipment') {
    return repos.equipment.get(payload)
      .then((response) => {
        equipments = response;
        return Promise.resolve({ equipments });
      })
      .catch(err => {
        return err;
      });
  } else {
    return Promise.all([
      repos.activity.get(payload),
      repos.category.get(payload),
      repos.location.get(payload),
      repos.startinglocation.get(payload),
      repos.tag.get(payload),
      repos.service.get(payload),
      repos.facility.get(payload),
      repos.equipment.get(payload)
    ])
      .then((response) => {
        // if (!response) {
        //   throw new restify.errors.NotFoundError('Not found');
        // }
        activities = response[0].data;
        categories = response[1].data;
        locations = response[2].data;
        startingLocations = response[3];
        tags = response[4];
        services = response[5];
        facilities = response[6];
        equipments = response[7];

      })
      .then(() => {
        return Promise.resolve({
          activities,
          categories,
          locations,
          startingLocations,
          tags,
          services,
          facilities,
          equipments
        });
      })
      .catch(err => {
        return err;
      });
  }

}

function gettagTypes() {
  return new Promise((resolve) => {
    let activityTypes = _.sortBy(constants.tag.activityTypes);
    let categoryTypes = _.sortBy(constants.tag.categoryTypes);
    let locationTypes = _.sortBy(constants.tag.locationTypes);

    return resolve({
      activityTypes,
      categoryTypes,
      locationTypes
    });
  });
}
