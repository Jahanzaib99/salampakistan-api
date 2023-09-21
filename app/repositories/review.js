'use strict';

const Review = require('../models/Review');
// const moment = require('moment');
// const _ = require('lodash');
const mongoose = require('mongoose');

module.exports = {
  submitReview,
  getUserReviews
};

function submitReview(payload) {
  let data = {
    title: payload.title,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    mobile: payload.mobile,
    rating: payload.rating,
    description: payload.description,
    locationId: payload.locationId,
    userId: payload.auth.userId,
    tripId: payload.tripId,
    type: payload.type
  };
  return Review.create(data);
}

function getUserReviews(payload) {
  let query = { 'userId': mongoose.Types.ObjectId(payload.userId) };

  let pipeline = [
    {
      $match: query
    },
    {
      $project:
      {
        title: 1,
        rating: 1,
        description: 1,
        type: 1,
        createdAt: 1
      }
    }
  ];
  return Review.aggregate(pipeline).exec()
    .then((response) => {
      return response;
      // if (response[0]) {
      //   return response[0];
      // } else {
      //   return response;
      // }
    });
}
