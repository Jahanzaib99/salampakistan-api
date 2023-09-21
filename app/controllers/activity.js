'use strict';

let services = require('../services');

module.exports = {
  create,
  get,
  update,
  remove,
  reCount,
  getSingleById,
  uploadPhoto,
  removePhoto
};

/**
 * @api {post} /api/activity Create Activity
 * @apiVersion 1.0.0
 * @apiName create
 * @apiGroup Activity
 * @apiPermission Admin
 * @apiParam {String} name Name
 * @apiParam {String} alias Alias
 * @apiParam {Boolean} isFilter isFilter
 * @apiParam {Boolean} isDomestic isDomestic
 * @apiParam {String} description Description
 *
 * @apiSuccess {String} response Created activity with Message
 * @apiSuccessExample {JSON} Success-Response:
 * {
    "data": {
        "message": "activity has been created.",
        "data": {
            "__v": 0,
            "createdAt": "2020-02-02T19:04:53.679Z",
            "updatedAt": "2020-02-02T19:04:53.679Z",
            "name": "test name",
            "alias": "test alias",
            "isFilter": true,
            "description": "test description",
            "createdBy": "5cc6afb3d29e010f05fe870a",
            "_id": "5e371d5546158c3af449bf96",
            "isActive": true
        }
    }
}
 */
function create(req, res, next) {
  let payload = {
    name: req.body.name,
    alias: req.body.alias,
    description: req.body.description,
    longDescription: req.body.longDescription,
    activityType: req.body.activityType,
    coordinates: req.body.coordinates,
    parentCategories: req.body.parentCategories,
    isFeatured: req.body.isFeatured,
    auth: req.auth
  };
  return services.activity.create(payload)
    .then((response) => {
      res.send(201, response);
    })
    .catch(next);
}

/**
   * @api {get} /api/activity Get All Activities
   * @apiVersion 1.0.0
   * @apiName get
   * @apiGroup Activity
   * @apiParam {String} search Search
   * @apiParam {Boolean} isDomestic isDomestic
   * @apiSuccess {String} response Sub Activities Array
   * @apiSuccessExample {JSON} Success-Response:
   * {
    "data": [
        {
            "_id": "5e371d5546158c3af449bf96",
            "createdAt": "2020-02-02T19:04:53.679Z",
            "updatedAt": "2020-02-02T19:07:37.222Z",
            "name": "test name",
            "alias": "test alias",
            "isFilter": true,
            "description": "test description",
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
    activityType: req.query.activityType,
    parentCategories: req.query.parentCategories,
    isFeatured: req.query.isFeatured,
    skip: req.query.skip,
    pageSize: req.query.pageSize
  };
  return services.activity.get(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
/**
 * @api {put} /api/activity/:activityId/update Update activity
 * @apiVersion 1.0.0
 * @apiName Update
 * @apiGroup Activity
 * @apiPermission Admin
 *
 * @apiParam {String} activityId activity ID
 * @apiParam {String} name Name
 * @apiParam {String} alias Alias
 * @apiParam {Boolean} isFilter IsFilter
 * @apiParam {Boolean} isActive isActive
 * @apiParam {Boolean} isDomestic isDomestic
 * @apiParam {description} description Description
 *
 *
 * @apiSuccess {String} response activity Update Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "activity has been updated."
 *    }
 *  }
 */
function update(req, res, next) {
  let payload = {
    activityId: req.params.activityId,
    name: req.body.name,
    alias: req.body.alias,
    activityType: req.body.activityType,
    description: req.body.description,
    longDescription: req.body.longDescription,
    coordinates: req.body.coordinates,
    parentCategories: req.body.parentCategories,
    isFeatured: req.body.isFeatured,
    auth: req.auth
  };
  return services.activity.update(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
function remove(req, res, next) {
  let payload = {
    activityId: req.params.activityId,
    auth: req.auth
  };
  return services.activity.remove(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function reCount(req, res, next) {

  return services.activity.reCount().then((response) => {
    res.send(200, response);
  }
  ).catch(next);
}
/**
 * @api {del} /api/activity/:activityId Get Single Activity
 * @apiVersion 1.0.0
 * @apiName Get One
 * @apiGroup Activity
 * @apiPermission Admin
 *
 * @apiParam {String} activityId Activity ID
 *
 * @apiSuccess {String} response Activity Details
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "Activity Details."
 *    }
 *  }
 */
function getSingleById(req, res, next) {
  let payload = {
    id: req.params.id || req.query.id,
    slug: req.query.slug,
    auth: req.auth
  };
  return services.activity.getSingleById(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

/**
 * @api {post} /api/activity/:activityId/photos Upload Activity Photo
 * @apiVersion 1.0.0
 * @apiName UploadActivityPhoto
 * @apiGroup Activity
 * @apiPermission Admin
 *
 * @apiParam {String} activityId Activity ID
 * @apiParam {String} photo Photo (Base64)
 *
 * @apiSuccess {String} response Activity Saved Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "Activity has been saved."
 *    }
 *  }
 */
function uploadPhoto(req, res, next) {
  let payload = {
    activityId: req.params.activityId,
    photo: req.files.photo,
    auth: req.auth
  };
  return services.activity.uploadPhoto(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
/**
 * @api {del} /api/activity/:activityId/photos/:photoId Delete Activity Photo
 * @apiVersion 1.0.0
 * @apiName RemoveActivityPhoto
 * @apiGroup Activity
 * @apiPermission Admin
 *
 * @apiParam {String} activityId Activity ID
 * @apiParam {String} photoId Photo ID
 *
 * @apiSuccess {String} response Activity Saved Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "Activity has been saved."
 *    }
 *  }
 */
function removePhoto(req, res, next) {
  let payload = {
    activityId: req.params.activityId,
    photoId: req.params.photoId,
    auth: req.auth
  };
  return services.activity.removePhoto(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
