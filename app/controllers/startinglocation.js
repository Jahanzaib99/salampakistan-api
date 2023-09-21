'use strict';

let services = require('../services');

module.exports = {
  get,
  create,
  update,
  remove
};

/**
 * @api {post} /api/location/starting Starting Location Post
 * @apiVersion 1.0.0
 * @apiName create
 * @apiGroup Starting Location
 * @apiPermission Admin
 * @apiParam {String} name Name
 * @apiSuccess {String} response Created Starting Location with Message
 * @apiSuccessExample {JSON} Success-Response:
 *{
    "data": {
        "message": "Starting Location has been created.",
        "data": {
            "__v": 0,
            "createdAt": "2020-02-02T19:55:55.068Z",
            "updatedAt": "2020-02-02T19:55:55.068Z",
            "name": "test name",
            "alias": "test alias",
            "createdBy": "5cc6afb3d29e010f05fe870a",
            "_id": "5e37294bc21f312308cb03d3",
            "isActive": true
        }
    }
}
 */
function create(req, res, next) {
  let payload = {
    name: req.body.name,
    alias: req.body.alias,
    isDomestic: req.body.isDomestic,
    isActive: req.body.isActive,
    auth: req.auth
  };
  return services.startinglocation.create(payload)
    .then((response) => {
      res.send(201, response);
    })
    .catch(next);
}

/**
     * @api {get} /api/location/starting Starting Locations Get
     * @apiVersion 1.0.0
     * @apiName get
     * @apiGroup Starting Location
     * @apiSuccess {String} response Starting Locations Array
     * @apiSuccessExample {JSON} Success-Response:
     *{
    "data": [
        {
            "_id": "5e37294bc21f312308cb03d3",
            "createdAt": "2020-02-02T19:55:55.068Z",
            "updatedAt": "2020-02-02T19:57:13.458Z",
            "name": "test name",
            "alias": "test alias",
            "createdBy": "5cc6afb3d29e010f05fe870a",
            "__v": 0,
            "updatedBy": "5cc6afb3d29e010f05fe870a",
            "isActive": true
        }
    ]
}
     */
function get(req, res, next) {
  let payload = {
    search: req.query.search,
    isDomestic: req.query.isDomestic
  };
  return services.startinglocation.get(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
/**
 * @api {put} /api/location/starting/:startingLocationId/update Update Starting Location
 * @apiVersion 1.0.0
 * @apiName Update
 * @apiGroup Starting Location
 * @apiPermission Admin
 *
 * @apiParam {String} startingLocationId Starting Location ID
 * @apiParam {String} name Name
 * @apiParam {String} alias Alias
 * @apiParam {Boolean} isFilter IsFilter
 * @apiParam {description} description Description
 *
 *
 * @apiSuccess {String} response Starting Location Update Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "Starting Location has been updated."
 *    }
 *  }
 */
function update(req, res, next) {
  let payload = {
    startingLocationId: req.params.startingLocationId,
    name: req.body.name,
    alias: req.body.alias,
    isDomestic: req.body.isDomestic,
    isActive: req.body.isActive,
    auth: req.auth
  };
  return services.startinglocation.update(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
function remove(req, res, next) {
  let payload = {
    startingLocationId: req.params.startingLocationId,
    auth: req.auth
  };
  return services.startinglocation.remove(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

