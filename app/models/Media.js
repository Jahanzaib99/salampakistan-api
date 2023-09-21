'use strict';

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

let schema = new mongoose.Schema({
  title: { type: String, default: '' },
  date: Number,
  description: { type: String, default: '' },
  photoIds: [],
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false }
});

schema.plugin(timestamps);
module.exports = mongoose.model('Media', schema);
