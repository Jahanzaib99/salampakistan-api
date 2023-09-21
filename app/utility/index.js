'use strict';

const needle = require('needle');
const config = require('../config/index');

exports.callApi = (
  endpoint,
  method = 'get',
  body,
  token,
  type = 'fmaAccounts',
  convert = true
) => {
  let headers;
  if (token) {
    if (type === 'bookMe' || type === 'bookMeHotel') {
      headers = {
        content_type: 'multipart/form-data',
        Authorization: token
      };
    } else {
      headers = {
        content_type: 'application/json',
        token: token
      };
    }
  } else {
    headers = {
      content_type: 'application/json'
    };
  }
  let apiUrl = config.FMA_ACCOUNTS_URL;
  if (type === 'bookMe') {
    apiUrl = config.BOOK_ME_URL;
  } else if (type === 'bookMeHotel') {
    apiUrl = config.BOOK_ME_URL_HOTELS;
  }
  let options = {
    method: method.toUpperCase(),
    uri: `${apiUrl}/${endpoint}`,
    headers,
    body,
    text: true
  };
  return new Promise((resolve, reject) => {
    needle(method, options.uri, body, options)
      .then(response => {
        if(convert === false) {
          resolve(response.body);
        } else {
          const json = JSON.parse(response.body);
          resolve(json);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};
