'use strict';

const userPermissions = require('../models/userPermissions');
const _ = require('lodash');

module.exports = {
  create,
  findById,
  update
};
function create(payload) {
  let data = {
    userId: payload.userId,
    permissions: payload.permissions
  };

  data = _.omitBy(data, _.isUndefined);
  return userPermissions.create(data);
}

function findById(userId) {
  return userPermissions.find({
    userId: userId
  })
    .populate('userId')
    .lean();
}

function update(payload) {
  let data = {
    permissions: payload.permissions
  };
  data = _.omitBy(data, _.isUndefined);
  return userPermissions.update({
    userId: payload.userId
  }, {
    $set: data
  });
}
