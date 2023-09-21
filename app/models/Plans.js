'use strict';

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

let userSchema = new mongoose.Schema({
  // _id: mongoose.Schema.ObjectId,
  name: String,
  startDate: Number,
  endDate: Number,
  duration: Number,
  userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  trips: [{
    type: mongoose.Schema.ObjectId,
    ref: 'trips'
  }],
  events: [{
    type: mongoose.Schema.ObjectId,
    ref: 'events'
  }],
  activities: [{
    type: mongoose.Schema.ObjectId,
    ref: 'activities'
  }],
  locations: [{
    type: mongoose.Schema.ObjectId,
    ref: 'locations'
  }],
  categories: [{
    type: mongoose.Schema.ObjectId,
    ref: 'categories'
  }],
  accommodations: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Accommodation'
  }]
});
userSchema.plugin(timestamps);

module.exports = mongoose.model('Plan', userSchema);

