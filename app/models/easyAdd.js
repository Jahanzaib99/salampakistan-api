'use strict';

let mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
let ObjectId = mongoose.Schema.ObjectId;

let schema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true },
  province: { type: String },
  type: String,
  isActive: { type: Boolean, default: true },
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

module.exports = mongoose.model('EasyAdd', schema);
