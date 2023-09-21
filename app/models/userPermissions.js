'use strict';

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
// const enums = require('../enums');
const User = require('./User');

// const options = { discriminatorKey: 'type' };

let Schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: User },
  permissions: {
    accomodations: {
      post: Boolean,
      get: Boolean,
      delete: Boolean,
      update: Boolean
    },
    surroundings: {
      post: Boolean,
      get: Boolean,
      delete: Boolean,
      update: Boolean
    },
    pressRelase: {
      post: Boolean,
      get: Boolean,
      delete: Boolean,
      update: Boolean
    },
    media: {
      post: Boolean,
      get: Boolean,
      delete: Boolean,
      update: Boolean
    },
    users: {
      post: Boolean,
      get: Boolean,
      delete: Boolean,
      update: Boolean
    },
    events: {
      post: Boolean,
      get: Boolean,
      delete: Boolean,
      update: Boolean
    },
    trips: {
      post: Boolean,
      get: Boolean,
      delete: Boolean,
      update: Boolean
    },
    news: {
      post: Boolean,
      get: Boolean,
      delete: Boolean,
      update: Boolean
    },
    locations: {
      post: Boolean,
      get: Boolean,
      delete: Boolean,
      update: Boolean
    },
    categories: {
      post: Boolean,
      get: Boolean,
      delete: Boolean,
      update: Boolean
    },
    activities: {
      post: Boolean,
      get: Boolean,
      delete: Boolean,
      update: Boolean
    },
    facilities: {
      post: Boolean,
      get: Boolean,
      delete: Boolean,
      update: Boolean
    },
    languages: {
      post: Boolean,
      get: Boolean,
      delete: Boolean,
      update: Boolean
    },
    bookings: {
      get: Boolean
    },
    complaintMangement: {
      get: Boolean
    },
    dashboardPermission: {
      cards: {
        trips: Boolean,
        events: Boolean,
        accomodations: Boolean,
        locations: Boolean,
        activities: Boolean,
        vendors: Boolean,
        customers: Boolean,
        bookings: Boolean
      },
      lineCharts: {
        trips: Boolean,
        events: Boolean,
        accomodations: Boolean
      },
      pieCharts: {
        trips: Boolean,
        events: Boolean,
        accomodations: Boolean,
        locations: Boolean,
        activities: Boolean,
        vendors: Boolean,
        customers: Boolean
      }
    }
  }
});

Schema.plugin(timestamps);
module.exports = mongoose.model('userPermissions', Schema);
