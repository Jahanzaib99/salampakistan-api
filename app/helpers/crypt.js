'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  hash,
  hashCompare
};

function hash(value) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(value, 8, (err, hash) => {
      if (err) {
        return reject(err);
      }

      return resolve(hash);
    });
  });
}

function hashCompare(hash1, hash2) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(hash1, hash2, (err, hash) => {
      if (err) {
        return reject(err);
      }

      if (hash) {
        return resolve();
      }

      return reject();
    });
  });
}
