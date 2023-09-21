'use strict';

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

let schema = new mongoose.Schema({
  title: { type: String, default: '' },
  description: { type: String },
  photoIds: [],
  seasonId: { type: mongoose.Schema.ObjectId, ref: 'Season' },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false }
});

schema.plugin(timestamps);
module.exports = mongoose.model('SeasonalEvents', schema);
