'use strict';

const Season = require('../models/Season');
// const moment = require('moment');
const _ = require('lodash');
// const mongoose = require('mongoose');

module.exports = {
  create,
  update,
  findById,
  get,
  remove,
  addPhoto,
  removePhoto,
  getSingleById
};

function create(payload) {
  let data = {
    title: payload.title,
    alias: payload.alias,
    shortDescription: payload.shortDescription,
    longDescription: payload.longDescription,
    sightShort: payload.sightShort,
    sightLong: payload.sightLong,
    seasonalShort: payload.seasonalShort,
    seasonalLong: payload.seasonalLong,
    travelingShort: payload.travelingShort,
    travelingLong: payload.travelingLong,
    photoIds: payload.photo,
    isFeatured: payload.isFeatured

  };
  data.createdBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return Season.create(data);
}

function update(payload) {
  let data = {
    title: payload.title,
    alias: payload.alias,
    shortDescription: payload.shortDescription,
    longDescription: payload.longDescription,
    sightShort: payload.sightShort,
    sightLong: payload.sightLong,
    seasonalShort: payload.seasonalShort,
    seasonalLong: payload.seasonalLong,
    travelingShort: payload.travelingShort,
    travelingLong: payload.travelingLong,
    photoIds: payload.photo,
    isFeatured: payload.isFeatured
  };
  data.createdBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return Season.update({
    _id: payload.seasonId
  }, {
    $set: data
  });
}

function findById(seasonId) {
  // console.log(seasonId);
  return Season.findOne({ _id: seasonId }).lean();
}

function get(payload) {
  let payloadSkip = payload.skip;
  let payloadPageSize = payload.pageSize;
  if (payload.pageSize === 0) {
    payloadSkip = 0;
    payloadPageSize = { $size: '$data' };
  }
  let matchObj = { isActive: true };
  if (payload && payload.search) {
    var search = payload.search;
    matchObj['title'] = new RegExp(search, 'i');
  }
  if (payload.isFeatured) {
    if (payload.isFeatured === 'true' || payload.isFeatured === true) {
      matchObj.isFeatured = true;
    } else if (payload.isFeatured === 'false' || payload.isFeatured === false) {
      matchObj.isFeatured = false;
    }
  }

  matchObj = _.omitBy(matchObj, _.isUndefined);
  let pipeline = [{
    $match: matchObj
  },
  {
    $sort: { createdAt: -1 }
  },
  {
    $project: {
      _id: 1,
      isActive: 1,
      title: 1,
      alias: 1,
      shortDescription: 1,
      longDescription: 1,
      sightShort: 1,
      sightLong: 1,
      seasonalShort: 1,
      seasonalLong: 1,
      travelingShort: 1,
      travelingLong: 1,
      photoIds: 1,
      isFeatured: 1
    }
  },
  {
    $group: {
      _id: null,
      data: {
        $push: '$$ROOT'
      }
    }
  },
  {
    $project: {
      data: {
        $slice: ['$data', payloadSkip, payloadPageSize]
      },
      total: {
        $size: '$data'
      }
    }
  }
  ];
  return Season.aggregate(pipeline).exec()
    .then((response) => {
      response = _.head(response);
      if (!response) {
        response = {
          total: 0,
          data: []
        };
        // response = [];
      }
      return response;
    });

}

function remove(payload) {
  let data = {
    isActive: false
  };
  data.createdBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return Season.update({
    _id: payload.seasonId
  }, {
    $set: data
  });
}

function addPhoto(payload) {
  let data = {
    photoIds: payload.photoId
  };

  return Season.update({
    _id: payload.seasonId
  }, {
    $push: data
  });
}

function removePhoto(payload) {
  let data = {
    photoIds: payload.photoId
  };

  return Season.update({
    _id: payload.seasonId
  }, {
    $pull: data
  });
}

function getSingleById(seasonId) {
  return Season.findOne({ '_id': { $in: seasonId } })
    .lean();
}
