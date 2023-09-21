'use strict';

const Activity = require('../models/Activity');

const _ = require('lodash');
// const moment = require('moment');
const mongoose = require('mongoose');

module.exports = {
  create,
  get,
  findById,
  update,
  remove,
  getByName,
  countActivity,
  findOneAndUpdate,
  getone,
  getSingleById,
  addPhoto,
  removePhoto,
  findDetails
};

function create(payload) {
  let data = {
    name: payload.name,
    alias: payload.alias,
    description: payload.description,
    location: payload.location,
    longDescription: payload.longDescription,
    activityType: payload.activityType,
    parentCategories: payload.parentCategories,
    isFeatured: payload.isFeatured
  };
  data.slug = _.kebabCase(payload.name);
  data.url = '/activity/' + data.slug;
  data.createdBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return Activity.create(data);
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
    matchObj['name'] = new RegExp(search, 'i');
  }
  if (payload && payload.activityType !== undefined) {
    matchObj['activityType'] = payload.activityType;
  }
  // if (payload && payload.isFeatured) {
  //   matchObj['isFeatured'] = payload.isFeatured;
  // }
  if (payload.isFeatured) {
    if (payload.isFeatured === 'true' || payload.isFeatured === true) {
      matchObj.isFeatured = true;
    } else if (payload.isFeatured === 'false' || payload.isFeatured === false) {
      matchObj.isFeatured = false;
    }
  }
  if (payload.parentCategories && payload.parentCategories.length !== 0) {
    for (let i = 0; i < payload.parentCategories.length; i++) {
      payload.parentCategories[i] = mongoose.Types.ObjectId(payload.parentCategories[i]);
    }
    matchObj.parentCategories = { $in: payload.parentCategories };
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
      name: 1,
      alias: 1,
      activityType: 1,
      type: 1,
      description: 1,
      longDescription: 1,
      slug: 1,
      url: 1,
      photoIds: 1,
      location: 1,
      parentCategories: 1,
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
  return Activity.aggregate(pipeline).exec()
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
function findById(activityId) {
  return Activity.findOne({
    _id: activityId
  })
    .lean();
}
function update(payload) {
  let data = {
    name: payload.name,
    alias: payload.alias,
    description: payload.description,
    longDescription: payload.longDescription,
    location: payload.location,
    activityType: payload.activityType,
    parentCategories: payload.parentCategories,
    isFeatured: payload.isFeatured

  };
  data.slug = _.kebabCase(payload.name);
  data.url = '/activity/' + data.slug;
  data.updatedBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return Activity.update({
    _id: payload.activityId
  }, {
    $set: data
  });
}
function remove(payload) {
  let data = {
    isActive: false
  };
  return Activity.update({
    _id: payload.activityId
  }, {
    $set: data
  });
}
// function getCctivityIdByName(payload) {
//   let search = new RegExp(payload, 'i');
//   return Activity.findOne({'name': search}).lean(true);
// }

function getByName(payload) {
  // let search = new RegExp(payload, 'i');
  return Activity.find({ name: payload }, { name: 1 }).lean(true);
}

async function countActivity(activity) {
  // let currentDate = moment().tz('Asia/Karachi').valueOf();
  let countTemp = 0;
  //  let search = new RegExp(payload, 'i');
  // countTemp = await Event.count({ activities: activity, status: 'published',
  //   $or: [{
  //     'availability.date': { $gte: currentDate}
  //   }, {
  //     'availability.type': 'weekly'
  //   }, {
  //     'availability.type': 'fixedDate'
  //   }, {
  //     'availability.type': 'daily'
  //   }
  //   ]
  // });
  return countTemp;
}

function findOneAndUpdate(activityObject) {
  return Activity.findOneAndUpdate(
    { _id: activityObject._id },
    { tripCount: activityObject.tripCount }
  );
}

function getone(activityId) {
  return Activity.find({ '_id': { $in: activityId } })
    .lean();
}
function getSingleById(activityId) {
  return Activity.findOne({ '_id': { $in: activityId } })
    .lean();
}

function addPhoto(payload) {
  let data = {
    photoIds: payload.photoId
  };

  return Activity.update({
    _id: payload.activityId
  }, {
    $push: data
  });
}

function removePhoto(payload) {
  let data = {
    photoIds: payload.photoId
  };

  return Activity.update({
    _id: payload.activityId
  }, {
    $pull: data
  });
}

function findDetails(identifier) {

  let match = {};
  if (identifier instanceof mongoose.Types.ObjectId || typeof eventIdentifier === 'string') {
    match._id = mongoose.Types.ObjectId(identifier.id);
  }

  if (identifier.slug) {
    match.slug = identifier.slug;
  }

  if (identifier.id) {
    match._id = mongoose.Types.ObjectId(identifier.id);
  }
  let pipeline = [
    {
      $match: match
    },
    {
      $project: {
        _id: 1,
        isActive: 1,
        name: 1,
        alias: 1,
        type: 1,
        description: 1,
        longDescription: 1,
        slug: 1,
        url: 1,
        photoIds: 1,
        location: 1,
        isFeatured: 1
      }
    }
  ];
  return Activity.aggregate(pipeline).exec()
    .then(_.head);
}
