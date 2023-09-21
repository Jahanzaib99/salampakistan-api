'use strict';

const enums = require('../enums');
// const auth = require('../middlewares/auth');
const controllers = require('../controllers');

module.exports = (server) => {
  server.post(`${enums.url.baseUrl}/plans/:userId`, controllers.plans.create);
  server.get(`${enums.url.baseUrl}/plans/:userId`, controllers.plans.get);
  server.get(`${enums.url.baseUrl}/plans/:planId/details`, controllers.plans.getDetails);
  server.put(`${enums.url.baseUrl}/plans/:planId/update`, controllers.plans.update); //  add something to plan
  server.del(`${enums.url.baseUrl}/plans/:planId/update`, controllers.plans.removeOne); // remove something from plan
  server.del(`${enums.url.baseUrl}/plans/:planId/remove`, controllers.plans.remove); // remove entire plan

};
