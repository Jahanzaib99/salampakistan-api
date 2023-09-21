'use strict';

let services = require('../services');

module.exports = {
  create,
  update,
  remove,
  get,
  getById
};

/**
 * @api {post} /api/facility Create Facility
 * @apiVersion 1.0.0
 * @apiName create
 * @apiGroup Facility
 * @apiParam {String} name Name
 * @apiSuccess {String} response Facility Array
 * @apiSuccessExample {JSON} Success-Response:
 * {
    "data": {
        "message": "Facility has been created.",
        "data": {
            "__v": 0,
            "createdAt": "2020-02-02T19:10:39.425Z",
            "updatedAt": "2020-02-02T19:10:39.425Z",
            "name": "test name",
            "isFilter": true,
            "createdBy": "5cc6afb3d29e010f05fe870a",
            "_id": "5e371eafd75d321b48672a74",
            "isActive": true
        }
    }
}
 */

function create(req, res, next) {
  let payload = {
    name: req.body.name,
    alias: req.body.alias,
    type: req.body.type,
    auth: req.auth
  };
  return services.facility.create(payload)
    .then((response) => {
      res.send(201, response);
    })
    .catch(next);
}

/**
   * @api {get} /api/facility Get All Facility
   * @apiVersion 1.0.0
   * @apiName get
   * @apiGroup Facility
   * @apiParam {String} search Search
   * @apiSuccess {String} response Facility Array
   * @apiSuccessExample {JSON} Success-Response:
   * {
    "data": [
             "_id": "5f4fe6799d958fc7e7d240d2",
            "createdAt": "2020-09-02T18:37:45.731Z",
            "updatedAt": "2020-09-02T20:48:31.844Z",
            "name": "facilityName1",
            "createdBy": "5f4d03491472177fab7ddec2",
            "type": "facility",
            "isActive": true,
            "photoIds": [],
            "__v": 0,
            "updatedBy": "5f4d03491472177fab7ddec2"
        }
    ]
}
   */
function get(req, res, next) {
  let payload = {
    search: req.query.search,
    pageSize: req.query.pageSize,
    skip: req.query.skip,
    type: req.query.type,
    name: req.query.name
  };
  return services.facility.get(payload).then((response) => {
    res.send(200, response);
  }
  ).catch(next);
}

/**
 * @api {put} /api/facility/:facilityId/update Update Facility
 * @apiVersion 1.0.0
 * @apiName Update
 * @apiGroup Facility
 * @apiPermission Admin
 *
 * @apiParam {String} facilityId Facility ID
 * @apiParam {String} name Name
 *
 *
 * @apiSuccess {String} response facility Update Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "facility has been updated."
 *    }
 *  }
 */

function update(req, res, next) {
  let payload = {
    facilityId: req.params.facilityId,
    name: req.body.name,
    alias: req.body.alias,
    type: req.body.type,
    auth: req.auth
  };
  return services.facility.update(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
function remove(req, res, next) {
  let payload = {
    facilityId: req.params.facilityId,
    auth: req.auth
  };
  return services.facility.remove(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function getById(req, res, next) {
  let payload = {
    facilityId: req.params.facilityId || req.query.id
  };
  return services.facility.getById(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}
