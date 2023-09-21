'use strict';

const services = require('../services');

module.exports = {
  update,
  get,
  create
};

/**
 * @api {put} /api/users/permissions/:userId Update
 * @apiVersion 1.0.0
 * @apiName update
 * @apiGroup userPermission
 * @apiPermission Admin
 *
 * @apiParam {Object} permissions permissions
 *
 * @apiSuccess {String} response Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "userPermission has been updated.",
 *    }
 *  }
 */
function update(req, res, next) {
  let payload = {
    userId: req.query.userId || req.params.userId,
    permissions: req.body.permissions,
    auth: req.auth
  };

  return services.userPermissions.update(payload)
    .then((response) => {
      res.send(201, response);
    })
    .catch(next);
}

/**
 * @api {get} /api/users/permissions/:userId get
 * @apiVersion 1.0.0
 * @apiName get
 * @apiGroup userPermission
 *
 *
 * @apiSuccess {String} response Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
    "data": [
        {
            "_id": "606079dd3fe37d29a4ac6936",
            "permissions": {
                "accomodations": {
                    "post": false,
                    "get": false,
                    "delete": false,
                    "update": false
                },
                "surroundings": {
                    "post": false,
                    "get": false,
                    "delete": false,
                    "update": false
                },
                "pressRelase": {
                    "post": true,
                    "get": true,
                    "delete": false,
                    "update": true
                },
                "media": {
                    "post": true,
                    "get": true,
                    "delete": false,
                    "update": true
                },
                "users": {
                    "post": true,
                    "get": true,
                    "delete": false,
                    "update": true
                },
                "events": {
                    "post": true,
                    "get": true,
                    "delete": false,
                    "update": true
                },
                "trips": {
                    "post": true,
                    "get": true,
                    "delete": false,
                    "update": true
                },
                "news": {
                    "post": true,
                    "get": true,
                    "delete": false,
                    "update": true
                },
                "locations": {
                    "post": true,
                    "get": true,
                    "delete": false,
                    "update": true
                },
                "categories": {
                    "post": true,
                    "get": true,
                    "delete": false,
                    "update": true
                },
                "activities": {
                    "post": true,
                    "get": true,
                    "delete": false,
                    "update": true
                },
                "facilities": {
                    "post": true,
                    "get": true,
                    "delete": false,
                    "update": true
                },
                "languages": {
                    "post": true,
                    "get": true,
                    "delete": false,
                    "update": true
                },
                "bookings": {
                    "get": true
                },
                "complaintMangement": {
                    "get": true
                }
            },
            "userId": {
                "_id": "5f63463e72e916432e71de60",
                "profile": {
                    "firstName": "Fahad1",
                    "middleName": "hello1",
                    "lastName": "Saleem1",
                    "mobile": "0313338067691",
                    "gender": "male",
                    "nic": "44206621040911",
                    "dob": 857156400000,
                    "companyName": null
                },
                "wishlist": {
                    "events": [
                        "5f4f6c8ff91b75371dda9943"
                    ],
                    "locations": [
                        "5f64ca3f254e899a54a17a3f"
                    ],
                    "categories": [
                        "5f4e580f0a213b63686c41db"
                    ],
                    "activities": [],
                    "accommodations": [],
                    "trips": []
                },
                "accounts": {
                    "local": {
                        "password": "$2a$08$vG4f2qLyaTpefMxkKPbag.f50cCTMTEd1O4RCOXd5x8KVDLJpUsem"
                    },
                    "email": "jari@findmyadventure.pk"
                },
                "verify": {
                    "verified": true
                },
                "type": "customer",
                "updatedAt": "2021-03-28T00:59:55.925Z",
                "createdAt": "2020-09-17T11:19:26.262Z",
                "__v": 0,
                "plan": {
                    "activities": [],
                    "trips": [
                        "6007fec16560101c04ffe91f"
                    ],
                    "events": [
                        "5f4f6c8ff91b75371dda9943"
                    ]
                },
                "misc": {
                    "resetPasswordCode": null,
                    "resetPasswordCodeExpiry": null
                },
                "isActive": true,
                "address": {},
                "bankDetails": {
                    "bankTitle": "Habib Metro",
                    "accountName": "Mohammad Jari ali",
                    "accountNumber": "42101-5289701-8545-01"
                }
            },
            "updatedAt": "2021-03-28T12:45:10.866Z",
            "createdAt": "2021-03-28T12:43:09.741Z",
            "__v": 0
        }
    ]
 *  }
 */
function get(req, res, next) {
  let payload = {
    userId: req.query.userId || req.params.userId,
    auth: req.auth
  };

  return services.userPermissions.get(payload)
    .then((response) => {
      res.send(201, response);
    })
    .catch(next);
}

function create(req, res, next) {
  let payload = {
    userId: req.query.userId || req.params.userId,
    permissions: req.body.permissions,
    auth: req.auth
  };

  return services.userPermissions.create(payload)
    .then((response) => {
      res.send(201, response);
    })
    .catch(next);
}
