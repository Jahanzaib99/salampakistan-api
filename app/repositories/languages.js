'use strict';

const Languages = require('../models/Languages');
const _ = require('lodash');
const mongoose = require('mongoose');

module.exports = {
  createLanguage,
  getAllLanguages,
  findByLanguageId,
  findDetails,
  getByName,
  updateLanguage,
  deleteLanguage
};

function createLanguage(payload) {
  let data = {
    name: payload.name,
    alias: payload.alias,
    code: payload.code
  };
  data = _.omitBy(data, _.isUndefined);
  return Languages.create(data);
}

function getAllLanguages(payload) {
  let payloadSkip = payload.skip;
  let payloadPageSize = payload.pageSize;
  if (payload.pageSize === 0) {
    payloadSkip = 0;
    payloadPageSize = { $size: '$data' };
  }

  let matchObj = { isActive: true };
  if (payload && payload.search) {
    var search = payload.search;
    matchObj['name'] = new RegExp(search, 'i');
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
      name: 1,
      alias: 1,
      code: 1,
      createdAt: 1
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
  return Languages.aggregate(pipeline).exec()
    .then((response) => {
      response = _.head(response);
      if (!response) {
        response = {
          total: 0,
          data: []
        };
      }
      return response;
    });
}

function findByLanguageId(languageId) {
  return Languages.findOne({ _id: mongoose.Types.ObjectId(languageId), isActive: true }).lean();
}

function findDetails(languageId) {

  let match = {isActive: true};

  if(languageId) {
    match._id = mongoose.Types.ObjectId(languageId);
  }

  let pipeline = [
    {
      $match: match
    },
    {
      $project: {
        _id: 1,
        name: 1,
        alias: 1,
        code: 1
      }
    }
  ];
  return Languages.aggregate(pipeline).exec()
    .then(_.head);
}

function getByName(payload) {
  return Languages.find({ name: payload }, { name: 1 }).lean(true);
}

function updateLanguage(payload) {
  let data = {
    name: payload.name,
    alias: payload.alias,
    code: payload.code
  };
  data = _.omitBy(data, _.isUndefined);
  return Languages.update({
    _id: mongoose.Types.ObjectId(payload.languageId)
  }, {
    $set: data
  });
}

function deleteLanguage(payload) {
  let data = {
    isActive: false
  };
  return Languages.update({
    _id: mongoose.Types.ObjectId(payload.languageId)
  }, {
    $set: data
  });
}

