'use strict';

let mongoose = require('mongoose');
const Schema = mongoose.Schema;
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

var poiSchema = new Schema({
  location: {
    type: pointSchema,
    required: true
  },
  types: []
}, { strict: false });

module.exports = mongoose.model('POI', poiSchema);
