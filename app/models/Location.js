'use strict';

let mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
let ObjectId = mongoose.Schema.ObjectId;
// const constants = require('../constants');

// const options = { discriminatorKey: 'type' };

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

let schema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true },
  alias: { type: String },
  description: { type: String },
  longDescription: { type: String },
  gettingThere: { type: String },
  whatToDo: { type: String },
  timeToVisit: { type: String },
  whereToStay: { type: String },
  additionalInformation: { type: String },
  locationType: { type: String, default: '' },
  parentProvince: { type: String, default: '' },
  parentCategories: [{
    type: ObjectId,
    ref: 'Category',
    required: true
  }],
  parentActivities: [{
    type: ObjectId,
    ref: 'Activity',
    required: true
  }],
  flightId: { type: String },
  trainId: { type: Number },
  weatherId: { type: String },
  totalRating: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  slug: { type: String, sparse: true },
  url: { type: String },
  photoIds: [],
  isActive: { type: Boolean, default: true },
  location: {
    type: pointSchema,
    required: true
  },
  surroundings: [Object],
  isFeatured: { type: Boolean, default: false },
  createdBy: {
    type: ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: ObjectId,
    ref: 'User'
  }
});
schema.plugin(timestamps);

module.exports = mongoose.model('Location', schema);
