'use strict';

let mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
let ObjectId = mongoose.Schema.ObjectId;
// const constants = require('../constants');

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
  parentCategories: [{
    type: ObjectId,
    ref: 'Category',
    required: true
  }],
  activityType: { type: String, default: '' },
  slug: { type: String, sparse: true },
  url: { type: String },
  photoIds: [],
  isActive: { type: Boolean, default: true },
  location: {
    type: pointSchema,
    required: true
  },
  isFeatured: { type: Boolean, default: false },
  createdBy: {
    type: ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: ObjectId,
    ref: 'User'
  }
}
);
schema.plugin(timestamps);

module.exports = mongoose.model('Activity', schema);
