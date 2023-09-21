'use strict';

const Tag = require('../models/Tags');
const _ = require('lodash');

module.exports = {
  get,
  create,
  update,
  remove,
  findById,
  findByName
};
function create(payload) {
  let data = {
    name: payload.name,
    alias: payload.alias,
    isDomestic: payload.isDomestic,
    isActive: payload.isActive
  };

  data.slug = _.kebabCase(payload.name);
  data.url = '/location/starting/' + data.slug;
  data.createdBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return Tag.StartingLocation.create(data);
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
  return Tag.StartingLocation.find(matchObj).sort({createdAt: -1}).lean(true).exec()
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
function findById(startingLocationId) {
  return Tag.StartingLocation.findOne({
    _id: startingLocationId
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
  data.url = '/location/starting/' + data.slug;
  data.updatedBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return Tag.StartingLocation.update({
    _id: payload.startingLocationId
  }, {
    $set: data
  });
}
function remove(payload) {
  return Tag.StartingLocation.findByIdAndRemove(payload.startingLocationId);
}

function findByName(payload) {
  let search = new RegExp(payload, 'i');
  return Tag.StartingLocation.find({name: search}, {name: 1, isDomestic: 1}).lean(true);
}

