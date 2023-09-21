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
 * @api {post} /api/season Create Season
 * @apiVersion 1.0.0
 * @apiName CreateSeason
 * @apiGroup Season
 * @apiPermission Admin
 *
 *
 * @apiSuccess {String} response Season creation message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *  "data": {
 *    "message": "Season has been created succesfully"
 *    }
 *  }
 */
function create(req, res, next) {
  let payload = {
    title: req.body.title,
    description: req.body.description,
    seasonId: req.body.seasonId,
    auth: req.auth
  };
  return services.seasonalEvents.create(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

/**
 * @api {put} /api/Season/:seasonId Update Season
 * @apiVersion 1.0.0
 * @apiName UpdateSeason
 * @apiGroup Season
 * @apiPermission Admin
 *
 *
 * @apiSuccess {String} response season updation message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *  "data": {
 *    "message": "Season has been saved succesfully"
 *    }
 *  }
 */
function update(req, res, next) {
  let payload = {
    seasonalEventId: req.params.seasonalEventId,
    title: req.body.title,
    description: req.body.description,
    seasonId: req.body.seasonId,
    auth: req.auth
  };
  return services.seasonalEvents.update(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function get(req, res, next) {
  let payload = {
    search: req.query.search,
    seasonId: req.query.seasonId,
    pageSize: req.query.pageSize,
    skip: req.query.skip
  };
  return services.seasonalEvents.get(payload).then((response) => {
    res.send(200, response);
  }
  ).catch(next);
}

function getSingleById(req, res, next) {
  let payload = {
    id: req.params.seasonalEventId || req.query.id,
    slug: req.query.slug,
    auth: req.auth
  };
  return services.seasonalEvents.getSingleById(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function remove(req, res, next) {
  let payload = {
    seasonalEventId: req.params.seasonalEventId,
    auth: req.auth
  };
  return services.seasonalEvents.remove(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

/**
 * @api {post} /api/season/:seasonId/photos Upload Season Photo
 * @apiVersion 1.0.0
 * @apiName UploadSeasonPhoto
 * @apiGroup Season
 * @apiPermission Admin
 *
 * @apiParam {String} seasonId Season ID
 * @apiParam {String} photo Photo (Base64)
 *
 * @apiSuccess {String} response Season Saved Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "Season has been saved."
 *    }
 *  }
 */
function uploadPhoto(req, res, next) {
  let payload = {
    seasonalEventId: req.params.seasonalEventId,
    photo: req.files.photo,
    auth: req.auth
  };
  return services.seasonalEvents.uploadPhoto(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

/**
 * @api {del} /api/season/:seasonId/photos/:photoId Delete Season Photo
 * @apiVersion 1.0.0
 * @apiName RemoveSeasonPhoto
f * @apiGroup Season
 * @apiPermission Admin
 *
 * @apiParam {String} seasonId Season ID
 * @apiParam {String} photoId Photo ID
 *
 * @apiSuccess {String} response Season Saved Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "Season has been saved."
 *    }
 *  }
 */
function removePhoto(req, res, next) {
  let payload = {
    seasonalEventId: req.params.seasonalEventId,
    photoId: req.params.photoId,
    auth: req.auth
  };
  return services.seasonalEvents.removePhoto(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
