'use strict';

const repos = require('../repositories');
const enums = require('../enums');
const photoHelper = require('./photo.js');
const _ = require('lodash');
const config = require('../config');

module.exports = {
  adjustProfileResponse,
  adjustVendorResponse,
  getSpecificUserInfo,
  adjustDetailResponse,
  getURL
};

function adjustProfileResponse(users) {
  let individual = false;

  if (!_.isArray(users)) {
    individual = true;
    users = [users];
  }

  return new Promise((resolve) => {
    _.each(users, (user, index) => {
      if (user.accounts) {
        user.profile.email = user.accounts.email;
      }

      if (user.profile && user.profile.profilePhotoId) {
        // user.profile.profilePhoto = photoHelper.getURL(user.profile.profilePhotoId, false);
      } else {
        user.profile.profilePhoto = '';
      }

      if (user.__v !== undefined) {
        delete user.__v;
      }

      if (user.accounts) {
        delete user.accounts;
      }

      if (user.type === enums.user.type.customer && user.university && user.university.token) {
        delete user.university.token;
      }

      delete user.createdBy;
      delete user.createdAt;
      delete user.updatedAt;

      users[index] = user;
    });

    if (individual) {
      users = users[0];
    }
    return resolve(users);
  });
}

function adjustVendorResponse(users) {
  let individual = false;

  if (!_.isArray(users)) {
    individual = true;
    users = [users];
  }
  return new Promise((resolve) => {
    _.each(users, (user, index) => {
      if (user.profile && user.profile.profilePhotoId) {
        // user.profile.profilePhoto = photoHelper.getURL(user.profile.profilePhotoId, false);
      } else {
        user.profile.profilePhoto = '';
      }
      user.profile = _.pick(user.profile, 'companyName', 'description', 'profilePhotoId', 'twitter', 'facebook', 'commission', 'firstName', 'accountNumber1');
      user.profile.email = user.accounts.email;

      if (user.accounts) {
        delete user.accounts;
      }

      if (user.type === enums.user.type.vendor) {
        if (user.vendorId) {
          delete user.vendorId;
        }
        if (user.reviews) {
          user.ratingTotal = 0;
          user.ratingAverage = 0;
          user.ratingCount = user.reviewsCount;
          _.each(user.reviews, (review) => {
            delete review.vendorId;
            delete review.bookingId;
            delete review.updatedAt;
            delete review.isReviewLinkOpened;
            delete review.reviewRequestSent;
            delete review.isReviewed;
            delete review.__v;
            user.ratingTotal = user.ratingTotal + review.rating;
          });
          user.ratingAverage = user.ratingTotal / user.reviewsCount;
        }else{
          user.ratingTotal = 0;
          user.ratingAverage = 0;
          user.ratingCount = 0;
          user.reviewsCount = 0;
          user.reviews = [];
        }
      }

      if (user.type) {
        delete user.type;
      }

      users[index] = user;
    });

    if (individual) {
      users = users[0];
    }
    return resolve(users);
  })
    .then(adjustProfileResponse);
}

function getSpecificUserInfo(userIds, projection) {
  _.each(userIds, (val, index) => {
    userIds[index] = val.toString();
  });
  userIds = _.uniq(userIds);

  return repos.user.findByIds(userIds, '_id ' + projection)
    .then((vendors) => {
      let dataPair = {};
      _.each(vendors, (vendor) => {
        dataPair[vendor._id.toString()] = _.result(vendor, projection);
      });

      return Promise.resolve(dataPair);
    });
}

function adjustDetailResponse(user) {
  return new Promise((resolve) => {
    user.photoIds = user.photoIds || [];
    user.photos = [];
    user.thumbnails = [];

    _.each(user.photoIds, (photoId) => {
      user.photos.push(photoHelper.getURL(photoId, false));
      user.thumbnails.push(photoHelper.getURL(photoId, true));
    });

    return resolve(user);
  });
}

function getURL(slug) {
  let appURL = config.get('server.appURL');
  return appURL + '/trip/' + slug;
}
