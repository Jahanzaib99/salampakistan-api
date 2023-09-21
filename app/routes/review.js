'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');

module.exports = server => {
  server.post(`${enums.url.baseUrl}/review`, auth.required([enums.user.type.admin, enums.user.type.customer, enums.user.type.employee]), controllers.review.submitReview);
  server.get(`${enums.url.baseUrl}/review/:userId`, auth.required([enums.user.type.admin, enums.user.type.customer, enums.user.type.employee]), controllers.review.getUserReviews);

};
