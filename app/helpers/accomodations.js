'use strict';

const photoHelper = require('./photo');
const _ = require('lodash');
const config = require('../config');

module.exports = {
  adjustListResponse,
  getURL
};

function adjustListResponse(response) {
  return new Promise((resolve) => {
    if (!response) {
      return resolve({ total: 0, data: [] });
      // let data = [];
      // return resolve(data);
    }
    _.each(response, (tag) => {
      tag.thumbnail = _.head(tag.photoIds);
      if (tag.thumbnail) {
        tag.thumbnail = photoHelper.getURL(tag.thumbnail, true);
      }
      delete tag.photoIds;
      delete tag.photos;
    });
    return resolve(response);
  });
}

function getURL(slug) {
  let appURL = config.get('server.appURL');
  return appURL + '/trip/' + slug;
}
