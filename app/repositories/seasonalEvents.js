'use strict';

const SeasonalEvents = require('../models/SeasonalEvents');
// const moment = require('moment');
const _ = require('lodash');
const mongoose = require('mongoose');

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
    description: payload.description,
    seasonId: payload.seasonId,
    photoIds: payload.photoIds
  };
  data.createdBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return SeasonalEvents.create(data);
}

function update(payload) {
  let data = {
    title: payload.title,
    description: payload.description,
    seasonId: payload.seasonId,
    photoIds: payload.photoIds
  };
  data.createdBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return SeasonalEvents.update({
    _id: payload.seasonalEventId
  }, {
    $set: data
  });
}

function findById(seasonalEventId) {
  // console.log(eventId);
  return SeasonalEvents.findOne({ _id: seasonalEventId }).lean();
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
  if (payload.seasonId && (payload.seasonId instanceof mongoose.Types.ObjectId || typeof payload.seasonId === 'string')) {
    matchObj.seasonId = mongoose.Types.ObjectId(payload.seasonId);
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
      description: 1,
      seasonId: 1,
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
  return SeasonalEvents.aggregate(pipeline).exec()
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
  return SeasonalEvents.update({
    _id: payload.seasonalEventId
  }, {
    $set: data
  });
}

function addPhoto(payload) {
  let data = {
    photoIds: payload.photoId
  };

  return SeasonalEvents.update({
    _id: payload.seasonalEventId
  }, {
    $push: data
  });
}

function removePhoto(payload) {
  let data = {
    photoIds: payload.photoId
  };

  return SeasonalEvents.update({
    _id: payload.seasonalEventId
  }, {
    $pull: data
  });
}

function getSingleById(seasonalEventId) {
  return SeasonalEvents.findOne({ '_id': { $in: seasonalEventId } })
    .lean();
}
