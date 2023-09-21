'use strict';

const request = require('request');

module.exports = {
  getUserInfo
};

function getUserInfo(token) {
  if (!token) {
    return Promise.reject('Token not provided');
  }

  let fields = ['id', 'email', 'name', 'gender'];

  return new Promise((resolve, reject) => {
    let url = `https://graph.facebook.com/me?access_token=${token}&fields=` + fields.join();
    request.get(url, (error, response, body) => {
      let res = JSON.parse(body);

      if (error || response.statusCode !== 200) {
        return reject(res.error.message);
      }

      return resolve({
        id: res.id,
        email: res.email,
        name: res.name,
        gender: res.gender,
        token: token
      });
    });
  });
}
