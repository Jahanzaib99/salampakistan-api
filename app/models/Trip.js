'use strict';

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const enums = require('../enums');
let ObjectId = mongoose.Schema.ObjectId;

let schema = new mongoose.Schema({
  title: String,
  slug: String,
  description: String,
  photoIds: [String],
  duration: Number,
  price: Number,
  date: Number,
  isFeatured: { type: Boolean, default: false },
  // location: {
  //   type: {
  //     type: String,
  //     default: 'Point'
  //   },
  //   coordinates: [Number]
  // },
  startLocation: {
    type: [ObjectId],
    ref: 'Location'
  },
  Locations: [{
    type: [ObjectId],
    ref: 'Location'
  }],
  categories: [{
    type: [ObjectId],
    ref: 'Category'
  }],
  activities: [{
    type: [ObjectId],
    ref: 'Activity'
  }],
  facilities: [{
    type: [ObjectId],
    ref: 'Facility'
  }],
  // totalRating: { type: Number, default: 0 },
  // averageRating: { type: Number, default: 0 },
  // totalReviews: { type: Number, default: 0 },
  itinerary: [{
    _id: false,
    day: Number,
    timeFrom: Date,
    timeTo: Date,
    description: String
  }],
  status: { type: String, default: enums.trip.status.draft },
  cancellationPolicy: String,
  totalReviews: Number,
  totalRating: Number,
  averageRating: Number,
  isActive: {type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  vendorId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  contact: String

});

schema.pre('save', function(next) {
  Trip.findOne({ slug: this.slug })
    .then(response => {
      if(!response) {
        next();
      } else {
        this.slug = this.slug + '-' + Math.random().toString(36).substr(2, 9);
        next();
      }
    });
});

schema.index({
  title: 'text',
  description: 'text'
});

schema.plugin(timestamps);
const Trip = mongoose.model('Trip', schema);
module.exports = Trip;
