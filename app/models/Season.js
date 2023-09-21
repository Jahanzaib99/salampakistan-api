'use strict';

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

let schema = new mongoose.Schema({
  title: { type: String, default: '' },
  alias: { type: String },
  shortDescription: { type: String },
  longDescription: { type: String },
  sightShort: { type: String },
  sightLong: { type: String },
  seasonalShort: { type: String },
  seasonalLong: { type: String },
  travelingShort: { type: String },
  travelingLong: { type: String },
  photoIds: [],
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false }
});

schema.plugin(timestamps);
module.exports = mongoose.model('Season', schema);
