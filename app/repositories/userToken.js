'use strict';

const UserToken = require('../models/UserToken');
const config = require('../config');
const jwt = require('jsonwebtoken');
const secret = config.get('token.secret');

module.exports = {
  save,
  deleteToken,
  findByToken,
  findValidByUser,
  _verifyToken
};

function save(payload) {
  let condition = {
    userId: payload.userId
  };

  let document = {
    userId: payload.userId,
    token: payload.token
  };

  return UserToken.update(condition, document, { upsert: true });
}

function findByToken(token) {
  return UserToken.findOne({ token: token }).exec();
}

function deleteToken(token) {
  return UserToken.remove({ token: token }).exec();
}

function findValidByUser(user) {
  return UserToken.findOne({ userId: user._id })
    .exec()
    .then(foundToken => {
      if (!foundToken) {
        return null;
      } else {
        return _verifyToken(foundToken);
      }
    }).catch(() => {
      return null;
    });
}

function _verifyToken(token) {
  try {
    const decoded = jwt.verify(token.token, secret);
    if (decoded) {
      return token;
    }
  } catch (ex) {
    return null;
  }
}
