'use strict';

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

let schema = new mongoose.Schema({
  title: String,
  description: String,
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User' },
  updatedBy: {type: mongoose.Schema.ObjectId, ref: 'User' }

});

schema.plugin(timestamps);
module.exports = mongoose.model('News', schema);
