'use strict';

const Plan = require('../models/Plans');
const _ = require('lodash');
const moment = require('moment');
const mongoose = require('mongoose');

module.exports = {
  create,
  update,
  get,
  getDetails,
  remove,
  removeOne
};

async function create(payload) {
  let data = {
    name: payload.name,
    startDate: moment(payload.startDate),
    endDate: moment(payload.endDate),
    duration: payload.duration,
    userId: payload.userId,
    trips: payload.trips,
    events: payload.events,
    activities: payload.activities,
    locations: payload.locations,
    categories: payload.categories,
    accommodations: payload.accommodations
  };
  data = _.omitBy(data, _.isUndefined);
  return Plan.create(data);
}
function get(payload) {
  let query = { 'userId': mongoose.Types.ObjectId(payload.userId) };

  let pipeline = [
    {
      $match: query
    },
    {
      $sort: { createdAt: -1 }
    },
    {
      $lookup: {
        from: 'trips',
        localField: 'trips',
        foreignField: '_id',
        as: 'trips'
      }
    },
    {
      $lookup: {
        from: 'events',
        localField: 'events',
        foreignField: '_id',
        as: 'events'
      }
    },
    {
      $lookup: {
        from: 'activities',
        localField: 'activities',
        foreignField: '_id',
        as: 'activities'
      }
    },
    {
      $lookup: {
        from: 'locations',
        localField: 'locations',
        foreignField: '_id',
        as: 'locations'
      }
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'categories'
      }
    },
    {
      $lookup: {
        from: 'hotels',
        localField: 'accommodations',
        foreignField: '_id',
        as: 'accommodations'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $unwind: { path: '$user', preserveNullAndEmptyArrays: true }
    },
    {
      $project: {
        name: 1,
        userId: 1,
        trips: 1,
        events: 1,
        user: '$user.profile',
        activities: 1,
        locations: 1,
        categories: 1,
        accommodations: 1,
        startDate: 1,
        endDate: 1,
        duration: 1
      }
    }
  ];
  return Plan.aggregate(pipeline).exec()
    .then((response) => {
      if (response) {
        return response;
      } else {

        return response;
      }
    });
}
function getDetails(payload) {
  let query = { '_id': mongoose.Types.ObjectId(payload.planId) };

  let pipeline = [
    {
      $match: query
    },
    {
      $lookup: {
        from: 'trips',
        localField: 'trips',
        foreignField: '_id',
        as: 'trips'
      }
    },
    {
      $lookup: {
        from: 'events',
        localField: 'events',
        foreignField: '_id',
        as: 'events'
      }
    },
    {
      $lookup: {
        from: 'activities',
        localField: 'activities',
        foreignField: '_id',
        as: 'activities'
      }
    },
    {
      $lookup: {
        from: 'locations',
        localField: 'locations',
        foreignField: '_id',
        as: 'locations'
      }
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'categories'
      }
    },
    {
      $lookup: {
        from: 'hotels',
        localField: 'accommodations',
        foreignField: '_id',
        as: 'accommodations'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $unwind: { path: '$user', preserveNullAndEmptyArrays: true }
    },
    {
      $project: {
        name: 1,
        userId: 1,
        trips: 1,
        events: 1,
        user: '$user.profile',
        activities: 1,
        locations: 1,
        categories: 1,
        accommodations: 1,
        startDate: 1,
        endDate: 1,
        duration: 1
      }
    }
  ];
  return Plan.aggregate(pipeline).exec()
    .then((response) => {
      if (response) {
        return response;
      } else {

        return response;
      }
    });
}
function remove(payload) {
  return Plan.remove({ '_id': payload.planId });
}

async function update(payload) {
  let query = {
    '_id': payload.planId
  };
  let tripId = payload.trips;
  let eventId = payload.events;
  let activityId = payload.activities;
  let locationId = payload.locations;
  let categoryId = payload.categories;
  let accommodationId = payload.accommodations;
  if (payload.name || payload.startDate || payload.endDate || payload.duration) {
    let data = {
      name: payload.name,
      startDate: moment(payload.startDate),
      endDate: moment(payload.endDate),
      duration: payload.duration
    };
    data = _.omitBy(data, _.isUndefined);
    return Plan.update({
      _id: payload.planId
    }, {
      $set: data
    });
  }
  if (tripId) {
    return Plan.updateOne(query, { $push: { 'trips': tripId } });
  } else if (eventId) {
    return Plan.updateOne(query, { $push: { 'events': eventId } });

  } else if (activityId) {
    return Plan.updateOne(query, { $push: { 'activities': activityId } });

  } else if (locationId) {
    return Plan.updateOne(query, { $push: { 'locations': locationId } });
  } else if (categoryId) {
    return Plan.updateOne(query, { $push: { 'categories': categoryId } });
  } else if (accommodationId) {
    return Plan.update(query, { $push: { 'accommodations': accommodationId } });
  }
}

async function removeOne(payload) {
  let query = {
    '_id': payload.planId
  };
  let tripId = payload.trips;
  let eventId = payload.events;
  let activityId = payload.activities;
  let locationId = payload.locations;
  let categoryId = payload.categories;
  let accommodationId = payload.accommodations;

  if (tripId) {
    return Plan.updateOne(query, { $pull: { 'trips': tripId } }, { multi: true });
  } else if (eventId) {
    return Plan.updateOne(query, { $pull: { 'events': eventId } }, { multi: true });

  } else if (activityId) {
    return Plan.updateOne(query, { $pull: { 'activities': activityId } }, { multi: true });

  } else if (locationId) {
    return Plan.updateOne(query, { $pull: { 'locations': locationId } }, { multi: true });
  } else if (categoryId) {
    return Plan.updateOne(query, { $pull: { 'categories': categoryId } }, { multi: true });
  } else if (accommodationId) {
    return Plan.updateOne(query, { $pull: { 'accommodations': accommodationId } }, { multi: true });
  }
}
