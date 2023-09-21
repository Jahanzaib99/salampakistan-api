'use strict';

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

let schema = new mongoose.Schema({
  name: String,
  alias: String,
  code: { type: String, required: true},
  isActive: { type: Boolean, default: true }
});

schema.plugin(timestamps);
module.exports = mongoose.model('Languages', schema);
