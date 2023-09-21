'use strict';

const mongoose = require('mongoose');

let schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  deviceType: String,
  token: String
});

module.exports = mongoose.model('UserToken', schema);
