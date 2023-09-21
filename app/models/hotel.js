'use strict';

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
let ObjectId = mongoose.Schema.ObjectId;

const roomSechema = new mongoose.Schema({
  RoomName: { type: String, default: '' },
  HotelSource: { type: String, default: '' },
  RoomDescription: { type: String, default: '' },
  RoomSize: { type: String, default: '0' },
  BedSize: { type: String, default: '' },
  NoOfRoomsAvailable: { type: String, default: '0' },
  MaxPerson: { type: String, default: '0' },
  RoomFacilityName: [],
  photoIds: [],
  Rate: { type: String, default: '0' },
  discountedRate: { type: String, default: '0' },
  RefundStatus: { type: String, default: '1' },
  taxApplicable: { type: Boolean, default: false },
  taxPercentage: { type: String, default: '0' }
});

let schema = new mongoose.Schema({
  hotelName: String,
  addressInfo: String,
  city: String,
  hotelAmenities: [String],
  overview: String,
  description: String,
  email: String,
  mobile: String,
  zipcode: Number,
  location: {
    type: ObjectId,
    ref: 'Location'
  },
  category: {
    type: ObjectId,
    ref: 'Category'
  },
  vendor: {
    type: ObjectId,
    ref: 'user'
  },
  hotelSource: String,
  checkin: String,
  checkout: String,
  photos: [String],
  photoIds: [],
  cancellationPolicyType: String,
  isFeatured: { type: Boolean, default: false },
  totalRating: { type: Number, default: 0 },
  rate: Number,
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  status: { type: String, default: 'draft' },

  rooms: [roomSechema]
});

schema.plugin(timestamps);
module.exports = mongoose.model('Hotel', schema);
