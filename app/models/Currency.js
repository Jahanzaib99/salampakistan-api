'use strict';

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

let schema = new mongoose.Schema({
  name: String,
  rate: Number
});

schema.plugin(timestamps);
module.exports = mongoose.model('Currency', schema);
