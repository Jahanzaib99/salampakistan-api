'use strict';

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
let ObjectId = mongoose.Schema.ObjectId;

let schema = new mongoose.Schema({
  hotel_id: Number,
  chain_id: Number,
  chain_name: String,
  brand_id: Number,
  brand_name: String,
  hotel_name: String,
  hotel_formerly_name: String,
  hotel_translated_name: String,
  addressline1: String,
  addressline2: String,
  zipcode: Number,
  city: String,
  state: String,
  country: String,
  countryisocode: String,
  star_rating: Number,
  longitude: Number,
  latitude: Number,
  url: String,
  checkin: String,
  checkout: String,
  numberrooms: Number,
  numberfloors: Number,
  yearopened: Number,
  yearrenovated: Number,
  //   photo1: String,
  //   photo2: String,
  //   photo3: String,
  //   photo4: String,
  //   photo5: String,
  photos: [String],
  photoIds: [],
  location: {
    type: ObjectId,
    ref: 'tags'
  },
  category: {
    type: ObjectId,
    ref: 'tags'
  },
  isFeatured: { type: Boolean, default: false },
  overview: String,
  rates_from: Number,
  continent_id: String,
  continent_name: String,
  city_id: Number,
  country_id: Number,
  number_of_reviews: Number,
  rating_average: Number,
  rates_currency: String,
  totalRating: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 }
});

schema.plugin(timestamps);
module.exports = mongoose.model('Accommodation', schema);
