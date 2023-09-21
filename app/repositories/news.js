'use strict';

const News = require('../models/news');
// const moment = require('moment');
const _ = require('lodash');
// const mongoose = require('mongoose');

module.exports = {
  create,
  update,
  findById,
  get,
  remove
};

function create(payload) {
  let data = {
    title: payload.title,
    description: payload.description,
    isFeatured: payload.isFeatured,
    createdBy: payload.auth.userId
  };
  data = _.omitBy(data, _.isUndefined);
  return News.create(data);
}

function update(payload) {
  let data = {
    title: payload.title,
    description: payload.description,
    isFeatured: payload.isFeatured,
    updatedBy: payload.auth.userId
  };
  data = _.omitBy(data, _.isUndefined);
  return News.update({
    _id: payload.newsId
  }, {
    $set: data
  });
}

function findById(newsId) {
  return News.findOne({ _id: newsId, isActive: true}).lean();
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
      title: 1,
      description: 1,
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
  return News.aggregate(pipeline).exec()
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
  return News.update({
    _id: payload.newsId
  }, {
    $set: data
  });
}
