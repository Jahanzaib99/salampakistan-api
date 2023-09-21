'use strict';

const photoHelper = require('./photo');
const _ = require('lodash');
const config = require('../config');

module.exports = {
  adjustDetailResponse,
  adjustListResponse,
  getURL
};

function adjustDetailResponse(tag) {
  return new Promise((resolve) => {
    tag.photoIds = tag.photoIds || [];
    tag.photos = [];
    tag.thumbnails = [];

    _.each(tag.photoIds, (photoId) => {
      tag.photos.push(photoHelper.getURL(photoId, false));
      tag.thumbnails.push(photoHelper.getURL(photoId, true));
    });
    if (tag.location) {
      if (tag.location.coordinates.includes(null)) {
        tag.location.coordinates = [0, 0];
      }
    }
    return resolve(tag);
  });
}

function adjustListResponse(response) {
  return new Promise((resolve) => {
    if (!response) {
      return resolve({ total: 0, data: [] });
      // let data = [];
      // return resolve(data);
    }
    _.each(response.data, (tag) => {
      tag.thumbnail = _.head(tag.photoIds);
      if (tag.thumbnail) {
        tag.thumbnail = photoHelper.getURL(tag.thumbnail, true);
      }
      if (tag.location) {
        if (tag.location.coordinates.includes(null)) {
          tag.location.coordinates = [0, 0];
        }
      }
      delete tag.photoIds;
    });
    return resolve(response);
  });
}

function getURL(slug) {
  let appURL = config.get('server.appURL');
  return appURL + '/trip/' + slug;
}
