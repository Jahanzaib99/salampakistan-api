'use strict';

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const enums = require('../enums');
// const enums = require('../enums');
// const autoIncrement = require('mongoose-auto-increment');
// autoIncrement.initialize(mongoose);

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

let schema = new mongoose.Schema({
  title: String,
  slug: String,
  description: String,
  photoIds: [String],
  location: {
    type: pointSchema,
    required: true
  },
  address: String,
  city: { type: mongoose.Schema.ObjectId, ref: 'locations' },
  surroundings: [{ type: mongoose.Schema.ObjectId, ref: 'surroundings' }],
  province: { type: mongoose.Schema.ObjectId, ref: 'locations' },
  startDate: Number,
  endDate: Number,
  startTime: Date,
  endTime: Date,
  numberOfPasses: Number,
  price: Number,
  status: {type: String, default: enums.events.status.draft},
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  vendorId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  contact: String,
  category: String,
  isActive: {type: Boolean, default: true}
});

schema.pre('save', function(next) {
  Events.findOne({ slug: this.slug })
    .then(response => {
      if(!response) {
        next();
      } else {
        this.slug = this.slug + '-' + Math.random().toString(36).substr(2, 9);
        next();
      }
    });
});
schema.plugin(timestamps);
const Events = mongoose.model('Events', schema);
module.exports = Events;
