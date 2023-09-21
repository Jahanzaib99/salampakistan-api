'use strict';

const repos = require('../repositories');
// const helpers = require('../helpers');
const messages = require('../messages');
const validations = require('../validations');
const restify = require('restify');
// const _ = require('lodash');

module.exports = {
  create,
  update,
  get,
  getDetails,
  remove,
  removeOne
};

async function create(payload) {
  await validations.validatePayload(payload, {
    properties: {
      name: validations.rules.textRequired('name'),
      startDate: validations.rules.dateOptional,
      endDate: validations.rules.dateOptional,
      duration: validations.rules.number('duration'),
      userId: validations.rules.ObjectId('userId'),
      trips: validations.rules.optionalArrayOfObjectIds('trips'),
      events: validations.rules.optionalArrayOfObjectIds('events'),
      activities: validations.rules.optionalArrayOfObjectIds('activities'),
      locations: validations.rules.optionalArrayOfObjectIds('locations'),
      categories: validations.rules.optionalArrayOfObjectIds('categories'),
      accommodations: validations.rules.optionalArrayOfObjectIds('accomodations')
    }
  });
  let user = await repos.user.findById(payload.userId);
  if (!user) {
    throw new restify.errors.NotFoundError(messages.user.notFound);
  }
  if (payload.trips) {
    let trips = await repos.trip.findById(payload.trips);
    if (!trips) {
      throw new restify.errors.NotFoundError(messages.trip.notFound);
    }
  }
  if (payload.events) {
    let events = await repos.events.findById(payload.events);
    if (!events) {
      throw new restify.errors.NotFoundError(messages.events.notFound);
    }
  }
  if (payload.activities) {
    let activities = await repos.activity.findById(payload.activities);
    if (!activities) {
      throw new restify.errors.NotFoundError(messages.activity.notFound);
    }
  }
  if (payload.locations) {
    let locations = await repos.location.findById(payload.locations);
    if (!locations) {
      throw new restify.errors.NotFoundError(messages.location.notFound);
    }
  }
  if (payload.categories) {
    let categories = await repos.category.findById(payload.categories);
    if (!categories) {
      throw new restify.errors.NotFoundError(messages.category.notFound);
    }
  }
  if (payload.accommodations) {
    let accommodations = await repos.accommodation.findById(payload.accommodations);
    if (!accommodations) {
      throw new restify.errors.NotFoundError(messages.accommodation.notFound);
    }
  }
  let create = await repos.plans.create(payload);
  if (!create) {
    throw new restify.errors.NotFoundError(messages.user.plan.fail);
  }
  return ({
    message: messages.user.plan.success,
    id: create._id
  });
}

async function update(payload) {
  await validations.validatePayload(payload, {
    properties: {
      planId: validations.rules.ObjectId('planId'),
      name: validations.rules.text('name'),
      startDate: validations.rules.dateOptional,
      endDate: validations.rules.dateOptional,
      duration: validations.rules.number('duration'),
      trips: validations.rules.OptionalObjectId('trips'),
      events: validations.rules.OptionalObjectId('events'),
      activities: validations.rules.OptionalObjectId('activities'),
      locations: validations.rules.OptionalObjectId('locations'),
      categories: validations.rules.OptionalObjectId('categories'),
      accommodations: validations.rules.OptionalObjectId('accomodations')
    }
  });
  let plan = await repos.plans.getDetails(payload);
  if (plan.length < 1) {
    throw new restify.errors.NotFoundError(messages.user.plan.notFound);
  }
  if (payload.trips) {
    let trips = await repos.trip.findById(payload.trips);
    if (!trips) {
      throw new restify.errors.NotFoundError(messages.trip.notFound);
    }
  }
  if (payload.events) {
    let events = await repos.events.findById(payload.events);
    if (!events) {
      throw new restify.errors.NotFoundError(messages.events.notFound);
    }
  }
  if (payload.activities) {
    let activities = await repos.activity.findById(payload.activities);
    if (!activities) {
      throw new restify.errors.NotFoundError(messages.activity.notFound);
    }
  }
  if (payload.locations) {
    let locations = await repos.location.findById(payload.locations);
    if (!locations) {
      throw new restify.errors.NotFoundError(messages.location.notFound);
    }
  }
  if (payload.categories) {
    let categories = await repos.category.findById(payload.categories);
    if (!categories) {
      throw new restify.errors.NotFoundError(messages.category.notFound);
    }
  }
  if (payload.accommodations) {
    let accommodations = await repos.accommodation.findById(payload.accommodations);
    if (!accommodations) {
      throw new restify.errors.NotFoundError(messages.accommodation.notFound);
    }
  }
  let update = await repos.plans.update(payload);
  if (!update) {
    throw new restify.errors.NotFoundError(messages.user.plan.fail);
  }
  return ({
    message: messages.user.plan.success
  });
}

function get(payload) {
  return validations.validatePayload(payload, {
    properties: {
    }
  })
    .then(repos.user.findById.bind(this, payload.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      // else if (payload.auth.userType !== enums.user.type.customer) {
      //   throw new restify.errors.ForbiddenError(messages.user.plan.notAllowed);
      // }
    })
    .then(repos.plans.get.bind(this, payload))
    .then((res) => {
      return Promise.resolve(res);
    });
}

function getDetails(payload) {
  return validations.validatePayload(payload, {
    properties: {
      planId: validations.rules.ObjectId('planId')
    }
  })
    .then(repos.plans.getDetails.bind(this, payload))
    .then((res) => {
      if (res.length < 1) {
        throw new restify.errors.NotFoundError(messages.user.plan.notFound);
      }
      return Promise.resolve(res[0]);

    });
}

async function remove(payload) {
  await validations.validatePayload(payload, {
    properties: {
      planId: validations.rules.ObjectId('planId')
    }
  });
  let plan = await repos.plans.getDetails(payload);
  if (plan.length < 1) {
    throw new restify.errors.NotFoundError(messages.user.plan.notFound);
  }
  let remove = await repos.plans.remove(payload);
  if (!remove) {
    throw new restify.errors.NotFoundError('Something Went Wrong!');
  }
  return ({
    message: messages.user.plan.delete
  });
}

async function removeOne(payload) {
  await validations.validatePayload(payload, {
    properties: {
      planId: validations.rules.ObjectId('planId'),
      trips: validations.rules.OptionalObjectId('trips'),
      events: validations.rules.OptionalObjectId('events'),
      activities: validations.rules.OptionalObjectId('activities'),
      locations: validations.rules.OptionalObjectId('locations'),
      categories: validations.rules.OptionalObjectId('categories'),
      accommodations: validations.rules.OptionalObjectId('accomodations')
    }
  });
  let plan = await repos.plans.getDetails(payload);
  if (plan.length < 1) {
    throw new restify.errors.NotFoundError(messages.user.plan.notFound);
  }
  if (payload.trips) {
    let trips = await repos.trip.findById(payload.trips);
    if (!trips) {
      throw new restify.errors.NotFoundError(messages.trip.notFound);
    }
  }
  if (payload.events) {
    let events = await repos.events.findById(payload.events);
    if (!events) {
      throw new restify.errors.NotFoundError(messages.events.notFound);
    }
  }
  if (payload.activities) {
    let activities = await repos.activity.findById(payload.activities);
    if (!activities) {
      throw new restify.errors.NotFoundError(messages.activity.notFound);
    }
  }
  if (payload.locations) {
    let locations = await repos.location.findById(payload.locations);
    if (!locations) {
      throw new restify.errors.NotFoundError(messages.location.notFound);
    }
  }
  if (payload.categories) {
    let categories = await repos.category.findById(payload.categories);
    if (!categories) {
      throw new restify.errors.NotFoundError(messages.category.notFound);
    }
  }
  if (payload.accommodations) {
    let accommodations = await repos.accommodation.findById(payload.accommodations);
    if (!accommodations) {
      throw new restify.errors.NotFoundError(messages.accommodation.notFound);
    }
  }
  let removeOne = await repos.plans.removeOne(payload);
  if (!removeOne) {
    throw new restify.errors.NotFoundError(messages.user.plan.fail);
  }
  return ({
    message: messages.user.plan.delete
  });
}
