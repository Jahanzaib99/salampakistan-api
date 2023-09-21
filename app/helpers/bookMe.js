'use strict';

// const restify = require('restify');
const utility = require('../utility/index');
const config = require('../config/index');

const api_key = config.get('bookMe.api_key');
const token = config.get('bookMe.Authorization');

// const messages = require('../messages/user');
// const constants = require('../constants');

// const userRepo = require('../../api/user/user.repositories');

exports.fetchData = function(payload) {
  payload.body['api_key'] = api_key;
  return utility.callApi(payload.endpoint, payload.httpMethod, payload.body, token, 'bookMe', payload.convert)
    .then(data => {
      //       if (!user) {
      //         throw new restify.errors.NotFoundError(messages.user.notFound);
      //       }
      return data;
    });
  //     .catch(error => {
  //       throw new restify.errors.InternalServerError(error.message ? error.message : error.error.message);
  //     });
  //   return userRepo.findById(payload.userId);
};

exports.fetchHotelData = function(payload) {
  if(payload.apiName !== 'hotel_city_list') {payload.body['api_key'] = api_key;}
  return utility.callApi(payload.endpoint, payload.httpMethod, payload.body, token, 'bookMeHotel', payload.convert)
    .then(data => {
      //       if (!user) {
      //         throw new restify.errors.NotFoundError(messages.user.notFound);
      //       }
      return data;
    });
  //     .catch(error => {
  //       throw new restify.errors.InternalServerError(error.message ? error.message : error.error.message);
  //     });
  //   return userRepo.findById(payload.userId);
};
