'use strict';

const Tag = require('../models/Tags');
// const Event = require('../models/Event');
// const moment = require('moment');
const _ = require('lodash');

module.exports = {
  create,
  update,
  remove,
  findById,
  get,
  getByName
};

function create(payload) {
  let data = {
    name: payload.name
  };
  data.createdBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return Tag.Equipment.create(data);
}

function get(payload) {
  let matchObj = { isActive: true};
  if(payload && payload.search) {
    var search = payload.search;
    matchObj['name'] = new RegExp(search);
  }
  return Tag.Equipment.find(matchObj).sort({createdAt: -1}).lean(true);
}
function findById(equipmentId) {
  return Tag.Equipment.findOne({
    _id: equipmentId
  })
    .lean();
}
function update(payload) {
  let data = {
    name: payload.name
  };

  data.updatedBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return Tag.Equipment.update({
    _id: payload.equipmentId
  }, {
    $set: data
  });
}
function remove(payload) {
  let data = {
    isActive: false
  };
  return Tag.Equipment.update({
    _id: payload.equipmentId
  }, {
    $set: data
  });
}

function getByName(payload) {
  let search = new RegExp(payload, 'i');
  return Tag.Equipment.find({name: search}, {name: 1}).lean(true);
}
