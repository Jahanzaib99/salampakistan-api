'use strict';

const photoHelper = require('./photo');
const _ = require('lodash');
const config = require('../config');

module.exports = {
  adjustDetailResponse,
  adjustListResponse,
  getURL
};

function adjustDetailResponse(hotel) {
  return new Promise((resolve) => {
    hotel.photoIds = hotel.photoIds || [];
    hotel.photos = [];
    hotel.thumbnails = [];

    _.each(hotel.photoIds, (photoId) => {
      hotel.photos.push(photoHelper.getURL(photoId, false));
      hotel.thumbnails.push(photoHelper.getURL(photoId, true));
    });
    delete hotel.photoIds;
    return resolve(hotel);
  });
}

function adjustListResponse(response) {
  return new Promise((resolve) => {
    if (!response) {
      return resolve({ total: 0, data: [] });
    }
    _.each(response.data, (hotel) => {
      // hotel.featuredImage = _.head(photoHelper.getURL(hotel.photoIds, true));
      hotel.images = [];
      if (hotel.photoIds && hotel.photoIds.length > 0) {
        _.each(hotel.photoIds, element => {
          hotel.images.push(photoHelper.getURL(element, true));
        });
        // event.thumbnail = photoHelper.getURL(event.thumbnail, true);
        hotel.featuredImage = hotel.images[0];
        hotel.rating = hotel.totalRating.toString();
        hotel.discountedRate = hotel.rate;
        delete hotel.rate;
        delete hotel.totalRating;

      }
      delete hotel.photoIds;
    });

    return resolve(response);
  });
}

function getURL(slug) {
  let appURL = config.get('server.appURL');
  return appURL + '/trip/' + slug;
}
