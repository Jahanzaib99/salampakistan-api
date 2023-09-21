'use strict';

const Tag = require('../models/Tags');
// const Event = require('../models/Event');
// const moment = require('moment');
const _ = require('lodash');

module.exports = {
  create,
  get,
  update,
  remove,
  findById,
  getByName,
  findByName,
  countTag,
  findOneAndUpdate
};
function create(payload) {
  let data = {
    name: payload.name,
    alias: payload.alias,
    isDomestic: payload.isDomestic,
    isActive: payload.isActive
  };

  data.slug = _.kebabCase(payload.name);
  data.url = '/tag/' + data.slug;
  data.createdBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return Tag.Other.create(data);
}

function get(payload) {
  let matchObj = {};
  if(payload && payload.search) {
    var search = payload.search;
    matchObj['name'] = new RegExp(search);
  }
  if(payload && payload.isDomestic !== undefined) {
    matchObj['isDomestic'] = payload.isDomestic;
  }
  return Tag.Other.find(matchObj).sort({createdAt: -1}).lean(true).exec()
    .then((response) => {
      // response = _.head(response);
      if (!response) {
        response = {
          data: []
        };
      }
      return response;
    });
}
function findById(tagId) {
  return Tag.Other.findOne({
    _id: tagId
  })
    .lean();
}
function update(payload) {
  let data = {
    name: payload.name,
    alias: payload.alias,
    isDomestic: payload.isDomestic,
    isActive: payload.isActive
  };

  data.slug = _.kebabCase(payload.name);
  data.url = '/tag/' + data.slug;
  data.updatedBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return Tag.Other.update({
    _id: payload.tagId
  }, {
    $set: data
  });
}
function remove(payload) {
  return Tag.Other.findByIdAndRemove(payload.tagId);
}

function getByName(payload) {
  let search = new RegExp(payload, 'i');
  return Tag.Other.findOne({'name': search}).lean(true);
}

function findByName(payload) {
  let search = new RegExp(payload, 'i');
  return Tag.Other.find({name: search}, {name: 1, isDomestic: 1}).lean(true);
}

function findOneAndUpdate(tagObject) {
  return Tag.Other.findOneAndUpdate(
    {_id: tagObject._id},
    {tripCount: tagObject.tripCount}
  );
}

async function countTag(tag) {
  // let currentDate = moment().tz('Asia/Karachi').valueOf();
  let countTemp = 0;
  // countTemp = await Event.count({ tags: tag, status: 'published',
  //   $or: [{
  //     'availability.date': { $gte: currentDate}
  //   }, {
  //     'availability.type': 'weekly'
  //   },
  //   {
  //     'availability.type': 'fixedDate'
  //   }]
  // });
  return countTemp;
}
