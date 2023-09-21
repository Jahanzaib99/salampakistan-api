'use strict';

let mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
let ObjectId = mongoose.Schema.ObjectId;
// const constants = require('../constants');

// const options = { discriminatorKey: 'type' };

let schema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true },
  iconName: { type: String },
  typeKey: { type: String },
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

module.exports = mongoose.model('Surrounding', schema);
