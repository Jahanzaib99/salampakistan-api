'use strict';

let services = require('../services');

module.exports = {
  create,
  getAll
};

/**
 * @api {post} /api/currency Posts
 * @apiVersion 1.0.0
 * @apiName create
 * @apiGroup Location
 * @apiParam {String} name Name
 * @apiParam {String} value Rate
 * @apiSuccess {String} response Posts Array
 * @apiSuccessExample {JSON} Success-Response:
 * {
    "data": {
        "message": "Currency has been created.",
        "data": {
            "__v": 0,
            "createdAt": "2020-02-02T19:18:08.115Z",
            "updatedAt": "2020-02-02T19:18:08.115Z",
            "name": "test name",
            "value": "test alias",
            "createdBy": "5cc6afb3d29e010f05fe870a",
            "_id": "5e372070e4351f305c4a9836",
        }
    }
}
 */

function create(req, res, next) {
  let payload = {
    name: req.body.name,
    rate: req.body.rate
  };
  return services.currency.create(payload)
    .then((response) => {
      res.send(201, response);
    })
    .catch(next);
}

function getAll(req, res, next) {
  return services.currency.getAll()
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}
