'use strict';

const auth = require('../middlewares/auth');
const controllers = require('../controllers');
const enums = require('../enums');

module.exports = (server) => {
  server.post(`${enums.url.baseUrl}/signup`, controllers.auth.signup);
  server.post(`${enums.url.baseUrl}/signin/:social`, controllers.auth.signin);
  server.get(`${enums.url.baseUrl}logout`, auth.required(), controllers.auth.logout);

  // reset password
  server.post(`${enums.url.baseUrl}/resetPassword/request`, controllers.auth.resetPasswordRequest);

  // update password
  server.put(`${enums.url.baseUrl}/updatePassword/:userId`, auth.required(null, ['userId']), controllers.auth.updatePassword);
};
