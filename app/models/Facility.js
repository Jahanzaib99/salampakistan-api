'use strict';

let mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
let ObjectId = mongoose.Schema.ObjectId;
// const constants = require('../constants');

// const options = { discriminatorKey: 'type' };

// const pointSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     enum: ['Point'],
//     required: true
//   },
//   coordinates: {
//     type: [Number],
//     required: true
//   }
// });
let schema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true },
  alias: { type: String },
  slug: { type: String, sparse: true },
  url: { type: String },
  type: String,
  photoIds: [],
  // isDomestic: { type: Boolean },
  isActive: { type: Boolean, default: true },
  //   location: {
  //     type: pointSchema,
  //     required: true
  //   },
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

module.exports = mongoose.model('Facility', schema);
