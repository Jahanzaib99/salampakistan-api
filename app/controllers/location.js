'use strict';

let services = require('../services');

module.exports = {
  create,
  get,
  reCount,
  update,
  remove,
  getSingleById,
  uploadPhoto,
  removePhoto,
  createSurr,
  getAllSurr,
  updateSurr,
  removeSurr,
  getSingleSurr,
  getNearByLocations
};

/**
 * @api {post} /api/location Posts
 * @apiVersion 1.0.0
 * @apiName create
 * @apiGroup Location
 * @apiParam {String} name Name
 * @apiParam {String} alias Alias
 * @apiParam {Boolean} isFilter IsFilter
 * @apiParam {description} description Description
 * @apiSuccess {String} response Posts Array
 * @apiSuccessExample {JSON} Success-Response:
 * {
    "data": {
        "message": "Location has been created.",
        "data": {
            "__v": 0,
            "createdAt": "2020-02-02T19:18:08.115Z",
            "updatedAt": "2020-02-02T19:18:08.115Z",
            "name": "test name",
            "alias": "test alias",
            "isFilter": true,
            "description": "test description",
            "createdBy": "5cc6afb3d29e010f05fe870a",
            "_id": "5e372070e4351f305c4a9836",
            "tripCount": 0,
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
    gettingThere: req.body.gettingThere,
    whatToDo: req.body.whatToDo,
    timeToVisit: req.body.timeToVisit,
    whereToStay: req.body.whereToStay,
    additionalInformation: req.body.additionalInformation,
    locationType: req.body.locationType,
    coordinates: req.body.coordinates,
    parentCategories: req.body.parentCategories,
    parentActivities: req.body.parentActivities,
    parentProvince: req.body.parentProvince,
    weatherId: req.body.weatherId,
    isFeatured: req.body.isFeatured,
    surroundings: req.body.surroundings,
    auth: req.auth
  };
  return services.location.create(payload)
    .then((response) => {
      res.send(201, response);
    })
    .catch(next);
}

/**
 * @api {get} /api/location Get
 * @apiVersion 1.0.0
 * @apiName get
 * @apiGroup Location
 *
 * @apiSuccess {String} response Posts Array
 * @apiSuccessExample {JSON} Success-Response:
 *{
    "data": [
        {
            "_id": "5e372070e4351f305c4a9836",
            "createdAt": "2020-02-02T19:18:08.115Z",
            "updatedAt": "2020-02-02T19:19:44.081Z",
            "name": "test name",
            "alias": "test alias",
            "isFilter": true,
            "description": "test description",
            "createdBy": "5cc6afb3d29e010f05fe870a",
            "__v": 0,
            "updatedBy": "5cc6afb3d29e010f05fe870a",
            "tripCount": 0,
            "isActive": true
        }
    ]
}
 */

function get(req, res, next) {
  let payload = {
    search: req.query.search,
    locationType: req.query.locationType,
    parentCategories: req.query.parentCategories,
    parentActivities: req.query.parentActivities,
    parentProvince: req.query.parentProvince,
    isFeatured: req.query.isFeatured,
    skip: req.query.skip,
    pageSize: req.query.pageSize
  };
  return services.location.get(payload).then((response) => {
    res.send(200, response);
  }
  ).catch(next);
}

/**
 * @api {post} /api/location/recount Posts
 * @apiVersion 1.0.0
 * @apiName Trip Recount
 * @apiGroup Location
 * @apiSuccess {String} response Posts Array
 * @apiSuccessExample {JSON} Success-Response:
 * {
    "data": [
        {
            "name": "azad kashmir"
        },
        {
            "name": "balochistan"
        }]
      }
 */
function reCount(req, res, next) {

  return services.location.reCount().then((response) => {
    res.send(200, response);
  }
  ).catch(next);
}

/**
 * @api {put} /api/location/:locationId/update Update Location
 * @apiVersion 1.0.0
 * @apiName Update
 * @apiGroup Location
 * @apiPermission Admin
 *
 * @apiParam {String} locationId Location ID
 * @apiParam {String} name Name
 * @apiParam {String} alias Alias
 * @apiParam {Boolean} isFilter IsFilter
 * @apiParam {description} description Description
 *
 *
 * @apiSuccess {String} response Location Update Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "Location has been updated."
 *    }
 *  }
 */
function update(req, res, next) {
  let payload = {
    locationId: req.params.locationId,
    name: req.body.name,
    alias: req.body.alias,
    description: req.body.description,
    longDescription: req.body.longDescription,
    gettingThere: req.body.gettingThere,
    whatToDo: req.body.whatToDo,
    timeToVisit: req.body.timeToVisit,
    whereToStay: req.body.whereToStay,
    additionalInformation: req.body.additionalInformation,
    locationType: req.body.locationType,
    coordinates: req.body.coordinates,
    parentCategories: req.body.parentCategories,
    parentActivities: req.body.parentActivities,
    parentProvince: req.body.parentProvince,
    weatherId: req.body.weatherId,
    isFeatured: req.body.isFeatured,
    surroundings: req.body.surroundings,
    auth: req.auth
  };
  return services.location.update(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
function remove(req, res, next) {
  let payload = {
    locationId: req.params.locationId,
    auth: req.auth
  };
  return services.location.remove(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

/**
 * @api {del} /api/location/:locationId Get location details
 * @apiVersion 1.0.0
 * @apiName Get One
 * @apiGroup Location
 * @apiPermission Admin
 *
 * @apiParam {String} locationId Location ID
 *
 * @apiSuccess {String} response Location Details
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "Location has been saved."
 *    }
 *  }
 */
function getSingleById(req, res, next) {
  let payload = {
    id: req.params.id || req.query.id,
    slug: req.query.slug,
    auth: req.auth
  };
  return services.location.getSingleById(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

/**
 * @api {post} /api/location/:locationId/photos Upload Location Photo
 * @apiVersion 1.0.0
 * @apiName UploadLocationPhoto
 * @apiGroup Location
 * @apiPermission Admin
 *
 * @apiParam {String} locationId Location ID
 * @apiParam {String} photo Photo (Base64)
 *
 * @apiSuccess {String} response Location Saved Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "Location has been saved."
 *    }
 *  }
 */
function uploadPhoto(req, res, next) {
  let payload = {
    locationId: req.params.locationId,
    photo: req.files.photo,
    auth: req.auth
  };
  return services.location.uploadPhoto(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
/**
 * @api {del} /api/location/:locationId/photos/:photoId Delete Location Photo
 * @apiVersion 1.0.0
 * @apiName RemoveLocationPhoto
 * @apiGroup Location
 * @apiPermission Admin
 *
 * @apiParam {String} locationId Location ID
 * @apiParam {String} photoId Photo ID
 *
 * @apiSuccess {String} response Location Saved Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "Location has been saved."
 *    }
 *  }
 */
function removePhoto(req, res, next) {
  let payload = {
    locationId: req.params.locationId,
    photoId: req.params.photoId,
    auth: req.auth
  };
  return services.location.removePhoto(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function createSurr(req, res, next) {
  let payload = {
    name: req.body.name,
    iconName: req.body.iconName,
    typeKey: req.body.typeKey,
    auth: req.auth
  };
  return services.location.createSurr(payload)
    .then((response) => {
      res.send(201, response);
    })
    .catch(next);
}

function getAllSurr(req, res, next) {
  let payload = {
    search: req.query.search,
    skip: req.query.skip,
    pageSize: req.query.pageSize
  };
  return services.location.getAllSurr(payload).then((response) => {
    res.send(200, response);
  }
  ).catch(next);
}
function updateSurr(req, res, next) {
  let payload = {
    surrId: req.params.surrId,
    name: req.body.name,
    iconName: req.body.iconName,
    typeKey: req.body.typeKey,
    auth: req.auth
  };
  return services.location.updateSurr(payload)
    .then((response) => {
      res.send(201, response);
    })
    .catch(next);
}
function removeSurr(req, res, next) {
  let payload = {
    surrId: req.params.surrId,
    auth: req.auth
  };
  return services.location.removeSurr(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function getSingleSurr(req, res, next) {
  let payload = {
    id: req.params.surrId,
    auth: req.auth
  };
  return services.location.getSingleSurr(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

/**
 * @api {get} /api/getNearByLocations Get get Near By Locations
 * @apiVersion 1.0.0
 * @apiName getNearByLocations
 * @apiGroup Location
 *
 * @apiParam {Number} coordinates coordinates Array
 * @apiParam {String} locationType Location Type
 *
 * @apiSuccess {String} response POIs Array
 * @apiSuccessExample {JSON} Success-Response:
 *{
       {
            "_id": "5f66cd125b6d27ff5e7d8ce8",
            "photoIds": [
                "d4f2b846-ed0d-4257-808b-e684277416ed",
                "645c202c-69ec-45a2-9b67-cc27490df7cd",
                "6f0a3249-cb4b-45a0-8b53-6e893feac6fc",
                "ef968615-1ca2-4aed-80c8-3fa8a1355f00"
            ],
            "isActive": true,
            "type": "location",
            "name": "nanga parbat",
            "alias": "Nanga Parbat",
            "description": "One of the world’s tallest mountains, 26,660 feet (8,126 metres) high, situated in the western Himalayas 17 miles (27 km) west-southwest of Astor, in the Pakistani.",
            "location": {
                "coordinates": [
                    74.5891,
                    35.2375
                ],
                "_id": "6023a3f086bb1366393d0aca",
                "type": "Point"
            },
            "slug": "nanga-parbat",
            "url": "/location/nanga-parbat",
            "parentCategories": [
                "5f66b9b8e008c9f9b58dacd8"
            ],
            "createdBy": "5f662fdf49e4e06fa4a07607",
            "updatedAt": "2021-02-10T09:14:24.561Z",
            "createdAt": "2020-09-20T03:31:30.046Z",
            "__v": 0,
            "locationType": "location",
            "parentActivities": [],
            "parentProvince": "gilgit-baltistan",
            "updatedBy": "5f60b084d79bedd8287f6d91",
            "longDescription": "Among the top 10 highest peaks in the world the Nanga Parbat, or Diamer as it's sometimes called, is a tremendous sight to behold and one of the most challenging climbs. The mountain stands tall above all the surrounding terrain, giving it an exceptionally majestic appearance. Hugged by the shockingly beautiful Fairy Meadows, which serve as the mountain’s base camp, the beauty of the mountain is enhanced even more in the context. It has to be seen to be believed.",
            "isFeatured": false,
            "surroundings": [
                {
                    "_id": "5fa8fb0a374cd63b5567cd90",
                    "name": "mountain trails",
                    "iconName": "trails.svg",
                    "typeKey": "tourist_attraction"
                },
                {
                    "_id": "5fa8f798aedb52223654bfd4",
                    "name": "hotels",
                    "iconName": "hotel.svg",
                    "typeKey": "lodging"
                },
                {
                    "_id": "5fa8fa36aedb52223654bfdd",
                    "name": "campings",
                    "iconName": "tent.svg",
                    "typeKey": "campground"
                }
            ],
            "weatherId": "35d2874d84/gorikot",
            "dist": {
                "calculated": 0
            }
        }
 */

function getNearByLocations(req, res, next) {
  let payload = {
    coordinates: req.query.coordinates,
    locationType: req.query.locationType
  };
  return services.location.getNearByLocations(payload)
    .then((response) => {
      res.send(200, response);
    }
    ).catch(next);
}
