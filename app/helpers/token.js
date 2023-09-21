'use strict';

const config = require('../config');
const messages = require('../messages');
const jwt = require('jsonwebtoken');
const promisify = require('es6-promisify');
const restify = require('restify');

module.exports = {
  auth,
  university,
  validate,
  validateWithoutExpiryDate
};

const secret = config.get('token.secret');

function auth(user) {
  let expiresIn = config.get('token.auth.expiresIn');
  // if (user.type === 'external') {
  //   expiresIn = '365d'
  // }
  if (user.type === 'external') {
    // signin not allowed
    throw new restify.errors.BadRequestError('you are not allowed to login');
  } else {
    return jwt.sign({ userId: user.userId, userType: user.type }, secret, { expiresIn: expiresIn });
  }
}

function university(user) {
  const expiresIn = config.get('token.university.expiresIn');
  return jwt.sign({ userId: user.userId, email: user.university.email }, secret, { expiresIn: expiresIn });
}

function validate(token) {
  let jwtVerify = promisify(jwt.verify);

  return jwtVerify(token, secret)
    .then(null, () => {
      return Promise.reject(messages.validation.token.expired);
    });
}
function validateWithoutExpiryDate(token) {
  let jwtVerify = promisify(jwt.verify);

  return jwtVerify(token, secret)
    .then(null, () => {
      return Promise.resolve();
    });
}
