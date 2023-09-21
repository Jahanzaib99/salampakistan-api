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
 * @api {post} /api/press-release Create Press Release
 * @apiVersion 1.0.0
 * @apiName CreatePressRelease
 * @apiGroup PressRelease
 * @apiPermission Admin
 *
 *
 * @apiSuccess {String} response Press Release creation message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *  "data": {
 *    "message": "Press Release has been created succesfully"
 *    }
 *  }
 */
function create(req, res, next) {
  let payload = {
    title: req.body.title,
    date: req.body.date,
    description: req.body.description,
    // photo: req.body.photo,
    isFeatured: req.body.isFeatured,
    auth: req.auth

  };
  // console.log(payload);
  return services.pressRelease.create(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

/**
 * @api {put} /api/press-release Update Press Release
 * @apiVersion 1.0.0
 * @apiName UpdatePressRelease
 * @apiGroup PressRelease
 * @apiPermission Admin
 *
 *
 * @apiSuccess {String} response Press Release updation message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *  "data": {
 *    "message": "Press Release has been saved succesfully"
 *    }
 *  }
 */
function update(req, res, next) {
  let payload = {
    pressId: req.params.pressId,
    title: req.body.title,
    date: req.body.date,
    description: req.body.description,
    // photo: req.body.photo,
    isFeatured: req.body.isFeatured,
    auth: req.auth

  };
  return services.pressRelease.update(payload)
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
  return services.pressRelease.get(payload).then((response) => {
    res.send(200, response);
  }
  ).catch(next);
}

function getSingleById(req, res, next) {
  let payload = {
    id: req.params.pressId || req.query.id,
    slug: req.query.slug,
    auth: req.auth
  };
  return services.pressRelease.getSingleById(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function remove(req, res, next) {
  let payload = {
    pressId: req.params.pressId,
    auth: req.auth
  };
  return services.pressRelease.remove(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function uploadPhoto(req, res, next) {
  let payload = {
    pressId: req.params.pressId,
    photo: req.body.photo,
    auth: req.auth
  };
  return services.pressRelease.uploadPhoto(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function removePhoto(req, res, next) {
  let payload = {
    pressId: req.params.pressId,
    photoId: req.params.photoId,
    auth: req.auth
  };
  return services.pressRelease.removePhoto(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
