'use strict';

const photoHelper = require('./photo');
const _ = require('lodash');
const config = require('../config');

module.exports = {
  adjustDetailResponse,
  adjustListResponse,
  getURL
};

function adjustDetailResponse(trip) {

  return new Promise((resolve) => {
    trip.photoIds = trip.photoIds || [];
    trip.photos = [];
    trip.thumbnails = [];

    _.each(trip.photoIds, (photoId) => {
      trip.photos.push(photoHelper.getURL(photoId, false));
      trip.thumbnails.push(photoHelper.getURL(photoId, true));
    });
    delete trip.photoIds;
    return resolve(trip);
  });
}

function adjustListResponse(response) {
  return new Promise((resolve) => {
    if (!response) {
      return resolve({ total: 0, data: [] });
    }

    _.each(response.data, (trip) => {
      // trip.thumbnail = _.head(trip.photoIds);
      trip.thumbnails = [];
      // if (trip.thumbnail) {
      // event.thumbnail = photoHelper.getURL(event.thumbnail, true);
      // }
      if (trip.photoIds && trip.photoIds.length > 0) {
        _.each(trip.photoIds, element => {
          trip.thumbnails.push(photoHelper.getURL(element, true));
        });
        // event.thumbnail = photoHelper.getURL(event.thumbnail, true);
      }
      delete trip.photoIds;

      if (trip.nextAvailabilityDates) {
        trip.nextAvailability = {
          dates: _.sortBy(trip.nextAvailabilityDates),
          daysOfWeek: _.sortBy(trip.nextAvailabilityDaysOfWeek),
          minPrice: trip.nextAvailabilityMinPrice,
          dateRange: trip.nextAvailabilityStartDate ? {
            startDate: trip.nextAvailabilityStartDate,
            endDate: trip.nextAvailabilityEndDate
          } : {},
          type: trip.nextAvailabilitType[0]
        };

        trip.nextAvailabilityDates = undefined;
        trip.nextAvailabilityDaysOfWeek = undefined;
        trip.nextAvailabilityMinPrice = undefined;
        trip.nextAvailabilityStartDate = undefined;
        trip.nextAvailabilityEndDate = undefined;
        trip.nextAvailabilitType = undefined;
      }

      if (!trip.nextAvailability || trip.nextAvailability.minPrice > trip.originalPrice) {
        trip.originalPrice = undefined;
      }
    });

    return resolve(response);
  });
}

function getURL(slug) {
  let appURL = config.get('server.appURL');
  return appURL + '/trip/' + slug;
}
