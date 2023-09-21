'use strict';

const services = require('../services');
module.exports = {
  create,
  update,
  get,
  getSingleById,
  remove,
  uploadPhoto,
  removePhoto
};

/**
 * @api {post} /api/media Create Media
 * @apiVersion 1.0.0
 * @apiName CreateMedia
 * @apiGroup Media
 * @apiPermission Admin
 *
 *
 * @apiSuccess {String} response Media creation message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *  "data": {
 *    "message": "Media has been created succesfully"
 *    }
 *  }
 */
function create(req, res, next) {
  let payload = {
    title: req.body.title,
    date: req.body.date,
    description: req.body.description,
    isFeatured: req.body.isFeatured,
    auth: req.auth
  };
  return services.media
    .create(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

/**
 * @api {put} /api/media Update Media
 * @apiVersion 1.0.0
 * @apiName UpdateMedia
 * @apiGroup Media
 * @apiPermission Admin
 *
 *
 * @apiSuccess {String} response Media updation message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *  "data": {
 *    "message": "Media has been saved succesfully"
 *    }
 *  }
 */
function update(req, res, next) {
  let payload = {
    mediaId: req.params.mediaId,
    title: req.body.title,
    date: req.body.date,
    description: req.body.description,
    isFeatured: req.body.isFeatured,
    auth: req.auth
  };
  return services.media
    .update(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function get(req, res, next) {
  let payload = {
    search: req.query.search,
    pageSize: req.query.pageSize,
    skip: req.query.skip
  };
  return services.media
    .get(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function getSingleById(req, res, next) {
  let payload = {
    id: req.params.mediaId || req.query.id,
    slug: req.query.slug,
    auth: req.auth
  };
  return services.media
    .getSingleById(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function remove(req, res, next) {
  let payload = {
    mediaId: req.params.mediaId,
    auth: req.auth
  };
  return services.media
    .remove(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

/**
 * @api {post} /api/media/:mediaId/photos Upload Media Photo
 * @apiVersion 1.0.0
 * @apiName UploadMediaPhoto
 * @apiGroup Media
 * @apiPermission Admin
 *
 * @apiParam {String} mediaId Media ID
 * @apiParam {String} photo Photo (Base64)
 *
 * @apiSuccess {String} response Media Saved Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "Media has been saved."
 *    }
 *  }
 */
function uploadPhoto(req, res, next) {
  let payload = {
    mediaId: req.params.mediaId,
    photo: req.files.photo,
    auth: req.auth
  };
  return services.media.uploadPhoto(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

/**
 * @api {del} /api/media/:mediaId/photos/:photoId Delete Media Photo
 * @apiVersion 1.0.0
 * @apiName RemoveMediaPhoto
 * @apiGroup Media
 * @apiPermission Admin
 *
 * @apiParam {String} mediaId Media ID
 * @apiParam {String} photoId Photo ID
 *
 * @apiSuccess {String} response Media Saved Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "Media has been saved."
 *    }
 *  }
 */
function removePhoto(req, res, next) {
  let payload = {
    mediaId: req.params.mediaId,
    photoId: req.params.photoId,
    auth: req.auth
  };
  return services.media
    .removePhoto(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
