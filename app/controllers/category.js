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
 * @api {post} /api/category Category Category
 * @apiVersion 1.0.0
 * @apiName create
 * @apiGroup Category
 * @apiPermission Admin
 * @apiParam {String} name Name
 * @apiParam {String} alias Alias
 * @apiParam {Boolean} isFilter isFilter
 * @apiParam {Boolean} isDomestic isDomestic
 * @apiParam {String} description Description
 * @apiSuccess {String} response Created Category with Message
 * @apiSuccessExample {JSON} Success-Response:
 * {
    "data": {
        "message": "Category has been created.",
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
    categoryType: req.body.categoryType,
    coordinates: req.body.coordinates,
    isFeatured: req.body.isFeatured,
    auth: req.auth
  };
  return services.category.create(payload)
    .then((response) => {
      res.send(201, response);
    })
    .catch(next);
}

/**
   * @api {get} /api/category Get All Categories
   * @apiVersion 1.0.0
   * @apiName get
   * @apiGroup Category
   * @apiParam {String} search Search
   * @apiParam {Boolean} isDomestic isDomestic
   * @apiSuccess {String} response Sub Categories Array
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
    categoryType: req.query.categoryType,
    isFeatured: req.query.isFeatured,
    skip: req.query.skip,
    pageSize: req.query.pageSize
  };
  return services.category.get(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
/**
 * @api {put} /api/category/:categoryId/update Update Category
 * @apiVersion 1.0.0
 * @apiName Update
 * @apiGroup Category
 * @apiPermission Admin
 *
 * @apiParam {String} categoryId Category ID
 * @apiParam {String} name Name
 * @apiParam {String} category Category ID
 * @apiParam {String} alias Alias
 * @apiParam {Boolean} isFilter IsFilter
 * @apiParam {description} description Description
 *
 *
 * @apiSuccess {String} response Category Update Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "Category has been updated."
 *    }
 *  }
 */
function update(req, res, next) {
  let payload = {
    categoryId: req.params.categoryId,
    name: req.body.name,
    alias: req.body.alias,
    categoryType: req.body.categoryType,
    description: req.body.description,
    longDescription: req.body.longDescription,
    coordinates: req.body.coordinates,
    isFeatured: req.body.isFeatured,
    auth: req.auth
  };
  return services.category.update(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
function remove(req, res, next) {
  let payload = {
    categoryId: req.params.categoryId,
    auth: req.auth
  };
  return services.category.remove(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function reCount(req, res, next) {

  return services.category.reCount().then((response) => {
    res.send(200, response);
  }
  ).catch(next);
}

/**
 * @api {del} /api/category/:categoryId Get Single Category
 * @apiVersion 1.0.0
 * @apiName Get One
 * @apiGroup Category
 * @apiPermission Admin
 *
 * @apiParam {String} categoryId Category ID
 *
 * @apiSuccess {String} response Category Details
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "Category Details."
 *    }
 *  }
 */
function getSingleById(req, res, next) {
  let payload = {
    id: req.params.id || req.query.id,
    slug: req.query.slug,
    auth: req.auth
  };
  return services.category.getSingleById(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

/**
 * @api {post} /api/category/:categoryId/photos Upload Category Photo
 * @apiVersion 1.0.0
 * @apiName UploadCategoryPhoto
 * @apiGroup Category
 * @apiPermission Admin
 *
 * @apiParam {String} categoryId Category ID
 * @apiParam {String} photo Photo (Base64)
 *
 * @apiSuccess {String} response Category Saved Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "Category has been saved."
 *    }
 *  }
 */
function uploadPhoto(req, res, next) {
  let payload = {
    categoryId: req.params.categoryId,
    photo: req.files.photo,
    auth: req.auth
  };
  return services.category.uploadPhoto(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
/**
 * @api {del} /api/category/:categoryId/photos/:photoId Delete Aategory Photo
 * @apiVersion 1.0.0
 * @apiName RemoveCategoryPhoto
 * @apiGroup Category
 * @apiPermission Admin
 *
 * @apiParam {String} categoryId Category ID
 * @apiParam {String} photoId Photo ID
 *
 * @apiSuccess {String} response Category Saved Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "Category has been saved."
 *    }
 *  }
 */
function removePhoto(req, res, next) {
  let payload = {
    categoryId: req.params.categoryId,
    photoId: req.params.photoId,
    auth: req.auth
  };
  return services.category.removePhoto(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
