'use strict';

let services = require('../services');

module.exports = {
  create,
  update,
  remove,
  get
};

/**
 * @api {post} /api/equipment Create Equipment
 * @apiVersion 1.0.0
 * @apiName create
 * @apiGroup Equipment
 * @apiParam {String} name Name
 * @apiSuccess {String} response Posts Array
 * @apiSuccessExample {JSON} Success-Response:
 * {
    "data": {
        "message": "Equipment has been created.",
        "data": {
            "__v": 0,
            "createdAt": "2020-02-02T19:10:39.425Z",
            "updatedAt": "2020-02-02T19:10:39.425Z",
            "name": "test name",
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
    auth: req.auth
  };
  return services.equipment.create(payload)
    .then((response) => {
      res.send(201, response);
    })
    .catch(next);
}

/**
   * @api {get} /api/equipment Get All Equipments
   * @apiVersion 1.0.0
   * @apiName get
   * @apiGroup Equipment
   * @apiParam {String} search Search
   * @apiSuccess {String} response Equipment Array
   * @apiSuccessExample {JSON} Success-Response:
   * {
    "data": [
             "_id": "5f4fe6799d958fc7e7d240d2",
            "createdAt": "2020-09-02T18:37:45.731Z",
            "updatedAt": "2020-09-02T20:48:31.844Z",
            "name": "equipmentName1",
            "createdBy": "5f4d03491472177fab7ddec2",
            "type": "equipment",
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
    search: req.query.search
  };
  return services.equipment.get(payload).then((response) => {
    res.send(200, response);
  }
  ).catch(next);
}

/**
 * @api {put} /api/equipment/:equipmentId/update Update Equipment
 * @apiVersion 1.0.0
 * @apiName Update
 * @apiGroup Equipment
 * @apiPermission Admin
 *
 * @apiParam {String} equipmentId Equipment ID
 * @apiParam {String} name Name
 *
 *
 * @apiSuccess {String} response equipment Update Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "equipment has been updated."
 *    }
 *  }
 */

function update(req, res, next) {
  let payload = {
    equipmentId: req.params.equipmentId,
    name: req.body.name,
    auth: req.auth
  };
  return services.equipment.update(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
function remove(req, res, next) {
  let payload = {
    equipmentId: req.params.equipmentId,
    auth: req.auth
  };
  return services.equipment.remove(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
