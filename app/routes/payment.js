'use strict';

const enums = require('../enums');
const controllers = require('../controllers');

module.exports = server => {
  server.get(`${enums.url.baseUrl}/paymentMethods`, /* auth.required([enums.user.type.admin, enums.user.type.employee]),*/ controllers.payment.get);
  server.post(`${enums.url.baseUrl}/placeOrder`, /* auth.required([enums.user.type.admin, enums.user.type.employee]),*/ controllers.payment.create);
};
