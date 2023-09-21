'use strict';

const Media = require('../models/Media');
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
    date: payload.date,
    description: payload.description,
    isFeatured: payload.isFeatured

  };
  data = _.omitBy(data, _.isUndefined);
  return Media.create(data);
}

function update(payload) {
  let data = {
    title: payload.title,
    date: payload.date,
    description: payload.description,
    isFeatured: payload.isFeatured

  };
  data = _.omitBy(data, _.isUndefined);
  return Media.update({
    _id: payload.mediaId
  }, {
    $set: data
  });
}

function findById(mediaId) {
  console.log(mediaId);
  return Media.findOne({ _id: mediaId }).lean();
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
      description: 1,
      isFeatured: 1,
      date: 1,
      photoIds: 1
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
  return Media.aggregate(pipeline).exec()
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
  data = _.omitBy(data, _.isUndefined);
  return Media.update({
    _id: payload.mediaId
  }, {
    $set: data
  });
}

function addPhoto(payload) {
  let data = {
    photoIds: payload.photoId
  };

  return Media.update({
    _id: payload.mediaId
  }, {
    $push: data
  });
}

function removePhoto(payload) {
  let data = {
    photoIds: payload.photoId
  };

  return Media.update({
    _id: payload.mediaId
  }, {
    $pull: data
  });
}

function getSingleById(mediaId) {
  return Media.findOne({ '_id': { $in: mediaId } })
    .lean();
}
