'use strict';

const Tag = require('../models/Tags');
// const Event = require('../models/Event');
// const moment = require('moment');
const _ = require('lodash');

module.exports = {
  create,
  update,
  remove,
  findByServiceId,
  get,
  getByName
};

function create(payload) {
  let data = {
    name: payload.name
  };
  data.createdBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return Tag.Service.create(data);
}

function get(payload) {
  let matchObj = { isActive: true};
  if(payload && payload.search) {
    var search = payload.search;
    matchObj['name'] = new RegExp(search);
  }
  return Tag.Service.find(matchObj).sort({createdAt: -1}).lean(true);
}
function findByServiceId(serviceId) {
  return Tag.Service.findOne({
    _id: serviceId
  })
    .lean();
}
function update(payload) {
  let data = {
    name: payload.name
  };

  data.updatedBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return Tag.Service.update({
    _id: payload.serviceId
  }, {
    $set: data
  });
}
function remove(payload) {
  let data = {
    isActive: false
  };
  return Tag.Service.update({
    _id: payload.serviceId
  }, {
    $set: data
  });
}

function getByName(payload) {
  let search = new RegExp(payload, 'i');
  return Tag.Service.find({name: search}, {name: 1}).lean(true);
}
