'use strict';
// const services = require('../services');

module.exports = {
  serve
};

/**
 * @api {get} /api Show welcome message
 * @apiVersion 1.0.0
 * @apiName LandingPage
 * @apiGroup Welcome
 * @apiPermission All
 *
 * @apiSuccess {String} response Welcome Message
 */
function serve(req, res, next) {
  return new Promise(() => {
    res.send(200, 'Welcome to PTDC-API!');
  })
    .catch(next);
}

