'use strict';

// const Location = require('../models/Locations');
const Tag = require('../models/Tags');
// const Event = require('../models/Event');
// const moment = require('moment');
const _ = require('lodash');

module.exports = {
  create,
  get,
  findById,
  update,
  remove,
  findByName
};

function create(payload) {
  let data = {
    name: payload.name,
    alias: payload.alias,
    isDomestic: payload.isDomestic,
    parent: payload.parent
  };
  data.slug = _.kebabCase(payload.name);
  data.url = '/subLocation/' + data.slug;
  data.createdBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return Tag.subLocation.create(data);
}
function get(payload) {
  let matchObj = {};
  if (payload && payload.search) {
    var search = payload.search;
    matchObj['name'] = new RegExp(search);
  }
  if (payload && payload.isDomestic !== undefined) {
    matchObj['isDomestic'] = payload.isDomestic;
  }
  return Tag.subLocation.find(matchObj).sort({createdAt: -1}).lean(true).exec()
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

function findById(subLocationId) {
  return Tag.subLocation.findOne({
    _id: subLocationId
  })
    .lean();
}

function update(payload) {
  let data = {
    name: payload.name,
    alias: payload.alias,
    isDomestic: payload.isDomestic,
    parent: payload.parent
  };
  data.slug = _.kebabCase(payload.name);
  data.url = '/subLocation/' + data.slug;
  data.updatedBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return Tag.subLocation.update({
    _id: payload.subLocationId
  }, {
    $set: data
  });
}
function remove(payload) {
  return Tag.subLocation.findByIdAndRemove(payload.subLocationId);
}

function findByName(payload) {
  let search = new RegExp(payload, 'i');
  return Tag.subLocation.find({ name: search }, { name: 1, isDomestic: 1 }).lean(true);
}

