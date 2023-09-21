'use strict';

const photoHelper = require('./photo');
const _ = require('lodash');
const config = require('../config');

module.exports = {
  adjustDetailResponse,
  adjustListResponse,
  getURL
};

function adjustDetailResponse(event) {
  return new Promise((resolve) => {
    event.photoIds = event.photoIds || [];
    event.photos = [];
    event.thumbnails = [];

    _.each(event.photoIds, (photoId) => {
      event.photos.push(photoHelper.getURL(photoId, false));
      event.thumbnails.push(photoHelper.getURL(photoId, true));
    });
    delete event.photoIds;
    return resolve(event);
  });
}

function adjustListResponse(response) {
  return new Promise((resolve) => {
    if (!response) {
      return resolve({ total: 0, data: [] });
    }

    _.each(response.data, (event) => {
    //   event.thumbnail = _.head(event.photoIds);
      event.thumbnails = [];
      if (event.photoIds && event.photoIds.length > 0) {
        _.each(event.photoIds, element => {
          event.thumbnails.push(photoHelper.getURL(element, true));
        });
        // event.thumbnail = photoHelper.getURL(event.thumbnail, true);
      }
      delete event.photoIds;

      if (event.nextAvailabilityDates) {
        event.nextAvailability = {
          dates: _.sortBy(event.nextAvailabilityDates),
          daysOfWeek: _.sortBy(event.nextAvailabilityDaysOfWeek),
          minPrice: event.nextAvailabilityMinPrice,
          dateRange: event.nextAvailabilityStartDate ? {
            startDate: event.nextAvailabilityStartDate,
            endDate: event.nextAvailabilityEndDate
          } : {},
          type: event.nextAvailabilitType[0]
        };

        event.nextAvailabilityDates = undefined;
        event.nextAvailabilityDaysOfWeek = undefined;
        event.nextAvailabilityMinPrice = undefined;
        event.nextAvailabilityStartDate = undefined;
        event.nextAvailabilityEndDate = undefined;
        event.nextAvailabilitType = undefined;
      }

      if (!event.nextAvailability || event.nextAvailability.minPrice > event.originalPrice) {
        event.originalPrice = undefined;
      }
    });

    return resolve(response);
  });
}

function getURL(slug) {
  let appURL = config.get('server.appURL');
  return appURL + '/trip/' + slug;
}
