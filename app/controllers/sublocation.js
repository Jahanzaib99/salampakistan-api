'use strict';

let services = require('../services');

module.exports = {
  create,
  get,
  update,
  remove
};

/**
 * @api {post} /api/location/sub Sub Location Post
 * @apiVersion 1.0.0
 * @apiName create
 * @apiGroup Location
 * @apiParam {String} name Name
 * @apiParam {String} location Location ID
 * @apiSuccess {String} response Created Sub Location with Message
 * @apiSuccessExample {JSON} Success-Response:
 * {
    "data": {
        "message": "Sub Location has been created.",
        "data": {
            "__v": 0,
            "createdAt": "2020-02-02T19:47:25.901Z",
            "updatedAt": "2020-02-02T19:47:25.901Z",
            "name": "test name",
            "alias": "test alias",
            "createdBy": "5cc6afb3d29e010f05fe870a",
            "_id": "5e37274d9cc9a5549c4ad467",
            "parent": {
                "id": "5e372070e4351f305c4a9836",
                "name": "test name",
                "type": "location"
            },
            "isActive": true
        }
    }
}
 */
function create(req, res, next) {
  let payload = {
    name: req.body.name,
    alias: req.body.alias,
    parent: req.body.parent,
    isDomestic: req.body.isDomestic,
    auth: req.auth
  };
  return services.sublocation.create(payload)
    .then((response) => {
      res.send(201, response);
    })
    .catch(next);
}

/**
 * @api {get} /api/location/sub Sub Locations Get
 * @apiVersion 1.0.0
 * @apiName get
 * @apiGroup Location
 * @apiSuccess {String} response Sub Locations Array
 * @apiSuccessExample {JSON} Success-Response:
 * {
    "data": [
        {
            "_id": "5e37274d9cc9a5549c4ad467",
            "createdAt": "2020-02-02T19:47:25.901Z",
            "updatedAt": "2020-02-02T19:49:26.331Z",
            "name": "test name",
            "alias": "test alias",
            "createdBy": "5cc6afb3d29e010f05fe870a",
            "__v": 0,
            "updatedBy": "5cc6afb3d29e010f05fe870a",
            "parent": {
                "id": "5e372070e4351f305c4a9836",
                "name": "test name",
                "type": "location"
            },
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
  return services.sublocation.get(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

/**
 * @api {put} /api/location/sub/:subLocationId/update Update Sub Location
 * @apiVersion 1.0.0
 * @apiName Update
 * @apiGroup Location
 * @apiPermission Admin
 *
 * @apiParam {String} subLocationId Sub Location ID
 * @apiParam {String} name Name
 * @apiParam {String} alias Alias
 * @apiParam {Boolean} isFilter IsFilter
 * @apiParam {description} description Description
 *
 *
 * @apiSuccess {String} response Sub Location Update Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "Sub Location has been updated."
 *    }
 *  }
 */
function update(req, res, next) {
  let payload = {
    subLocationId: req.params.subLocationId,
    name: req.body.name,
    alias: req.body.alias,
    parent: req.body.parent,
    isDomestic: req.body.isDomestic,
    auth: req.auth
  };
  return services.sublocation.update(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
function remove(req, res, next) {
  let payload = {
    subLocationId: req.params.subLocationId,
    auth: req.auth
  };
  return services.sublocation.remove(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

