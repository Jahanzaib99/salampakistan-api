'use strict';

let services = require('../services');

module.exports = {
  create,
  get,
  update,
  remove,
  reCount,
  getFilters,
  gettagTypes
};

/**
 * @api {post} /api/tag Tag Post
 * @apiVersion 1.0.0
 * @apiName create
 * @apiGroup Tag
 * @apiPermission Admin
 * @apiParam {String} name Name
 * @apiSuccess {String} response Created Tag with Message
 * @apiSuccessExample {JSON} Success-Response:
 *{
    "data": {
        "message": "Tag has been created.",
        "data": {
            "__v": 0,
            "createdAt": "2020-02-02T19:58:21.220Z",
            "updatedAt": "2020-02-02T19:58:21.220Z",
            "name": "test name",
            "alias": "test alias",
            "createdBy": "5cc6afb3d29e010f05fe870a",
            "_id": "5e3729dd4f9baf19d095ea69",
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
  return services.tag.create(payload)
    .then((response) => {
      res.send(201, response);
    })
    .catch(next);
}

/**
       * @api {get} /api/tag Tags Get
       * @apiVersion 1.0.0
       * @apiName get
       * @apiGroup Tag
       * @apiSuccess {String} response Tags Array
       * @apiSuccessExample {JSON} Success-Response:
       * {
    "data": [
        {
            "_id": "5e3729dd4f9baf19d095ea69",
            "createdAt": "2020-02-02T19:58:21.220Z",
            "updatedAt": "2020-02-02T19:59:51.995Z",
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
  return services.tag.get(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

/**
 * @api {post} /api/tag/recount Posts
 * @apiVersion 1.0.0
 * @apiName Trip Recount
 * @apiGroup Tag
 * @apiSuccess {String} response Trip Counts Array
 * @apiSuccessExample {JSON} Success-Response:
 * {
    "data": [
        {
            "name": "hiking",
            "tripCount": 3
        },
        {
            "name": "snorkeling",
            "tripCount": 2
        }
      ]
    }
 */

function reCount(req, res, next) {

  return services.tag.reCount().then((response) => {
    res.send(200, response);
  }
  ).catch(next);
}

/**
 * @api {put} /api/tag/:tagId/update Update Tag
 * @apiVersion 1.0.0
 * @apiName Update
 * @apiGroup Tag
 * @apiPermission Admin
 *
 * @apiParam {String} tagId Tag ID
 * @apiParam {String} name Name
 * @apiParam {String} alias Alias
 * @apiParam {Boolean} isFilter IsFilter
 * @apiParam {description} description Description
 *
 *
 * @apiSuccess {String} response Tag Update Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "Tag has been updated."
 *    }
 *  }
 */
function update(req, res, next) {
  let payload = {
    tagId: req.params.tagId,
    name: req.body.name,
    alias: req.body.alias,
    isDomestic: req.body.isDomestic,
    isActive: req.body.isActive,
    auth: req.auth
  };
  return services.tag.update(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
function remove(req, res, next) {
  let payload = {
    tagId: req.params.tagId,
    auth: req.auth
  };
  return services.tag.delete(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

/**
 * @api {get} /api/filters Get Filters
 * @apiVersion 2.0.0
 * @apiName EventFilters
 * @apiGroup Event
 * @apiPermission Guest
 *
 * @apiParam {String="category","location","activity","subLocation","subActivity","startingLocation","tag"} filter Filter
 * @apiSuccess {String} response Event List
 * @apiSuccessExample {JSON} Success-Response:
 *  {
    "data": {
        "locations": [],
        "categories": [],
        "activities": [],
        "startingLocations": [],
        "tags": []
    }
}
 */

function getFilters(req, res, next) {
  let payload = {
    filter: req.query.filter,
    search: req.query.search,
    pageSize: req.query.pageSize,
    skip: req.query.skip
  };
  return services.tag.getFilters(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function gettagTypes(req, res, next) {

  return services.tag.gettagTypes()
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}
