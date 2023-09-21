'use strict';

const Facility = require('../models/Facility');
// const Event = require('../models/Event');
// const moment = require('moment');
const _ = require('lodash');

module.exports = {
  create,
  update,
  remove,
  findById,
  get,
  getByName,
  getCount
};

function create(payload) {
  let data = {
    name: payload.name,
    alias: payload.alias,
    type: payload.type
  };
  data.createdBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return Facility.create(data);
}

function get(payload) {
  let matchObj = { isActive: true };
  if (payload.pageSize === 0) {
    payload.skip = false;
    payload.pageSize = false;
  }
  if (payload.name) {
    matchObj['name'] = payload.name;
  }
  if (payload.search) {
    matchObj['name'] = new RegExp(payload.search);
  }
  if (payload.type) {
    matchObj['type'] = payload.type;
  }
  return Facility.find(matchObj)
    .sort({createdAt: -1})
    .skip(payload.skip)
    .limit(payload.pageSize)
    .lean(true);
}

function getCount(payload) {
  let matchObj = { isActive: true };
  if (payload.name) {
    matchObj['name'] = payload.name;
  }
  if (payload.type) {
    matchObj['type'] = payload.type;
  }
  return Facility.find(matchObj).lean(true).count();
}

function findById(facilityId) {
  return Facility.findOne({
    _id: facilityId,
    isActive: true
  });
}
function update(payload) {
  let data = {
    name: payload.name,
    alias: payload.alias,
    type: payload.type
  };

  data.updatedBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return Facility.update({
    _id: payload.facilityId
  }, {
    $set: data
  });
}
function remove(payload) {
  let data = {
    isActive: false
  };
  return Facility.update({
    _id: payload.facilityId
  }, {
    $set: data
  });
}

function getByName(payload) {
  let search = new RegExp(payload, 'i');
  return Facility.find({ name: search }, { name: 1 }).lean(true);
}
