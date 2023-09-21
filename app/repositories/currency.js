'use strict';

const Currency = require('../models/Currency');
const _ = require('lodash');
// const moment = require('moment');
// const mongoose = require('mongoose');

module.exports = {
  create,
  getAll,
  deleteAll
};

async function create(payload) {
  let data = {
    name: payload.name,
    rate: payload.rate
  };

  data = _.omitBy(data, _.isUndefined);
  return Currency.create(data);
}

function getAll() {
  return Currency.find().sort({createdAt: -1}).lean();
}

async function deleteAll() {
  return Currency.deleteMany();
}
