'use strict';

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

let schema = new mongoose.Schema({
  //   token: { type: String },
  //   vendorId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  //   bookingId: { type: mongoose.Schema.ObjectId, ref: 'Booking' },
  title: { type: String, default: '' },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  email: { type: String, lowercase: true },
  mobile: { type: String},
  userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  tripId: { type: mongoose.Schema.ObjectId, ref: 'Trip' },
  locationId: { type: mongoose.Schema.ObjectId, ref: 'tags' },
  accommodationId: { type: mongoose.Schema.ObjectId, ref: 'Accommodation' },
  description: { type: String, default: '' },
  rating: { type: Number },
  type: { type: String }
});

schema.plugin(timestamps);
module.exports = mongoose.model('Reviews', schema);
