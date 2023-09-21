'use strict';

// const auth = require('../enums/auth');
// const auth = require('../enums/auth');
const services = require('../services');

module.exports = {
  create,
  getById,
  getAll,
  saveProfile,
  changePassword,
  addToWish,
  deleteAll,
  deleteWishListEvent,
  removeWishList,
  getUserWishlist,
  addToPlan,
  getUserPlan,
  removePlan,
  uploadPhoto,
  removePhoto,
  update,
  remove,
  updateStatus
};

/**
 * @api {post} /api/users/:type Create a new User
 * @apiVersion 1.0.0
 * @apiName CreateUser
 * @apiGroup User
 * @apiPermission Admin
 *
 * @apiParam {String="admin","vendor"} type User type
 *
 * @apiParam admin If `type` equals `admin` (must be at root)
 * @apiParam {String} admin.fullName Full name
 * @apiParam {String} admin.mobile Mobile number
 * @apiParam {String} admin.email Email address
 * @apiParam {String} admin.password Password
 * @apiParam {String="male","female"} admin.gender Gender
 *
 * @apiParam vendor If `type` equals `vendor` (must be at root)
 * @apiParam {String} vendor.companyName Company name
 * @apiParam {String} vendor.fullName Full name
 * @apiParam {String} vendor.mobile Mobile number
 * @apiParam {String} vendor.email Email address
 * @apiParam {String} vendor.password Password
 * @apiParam {String} vendor.facebook Facbook URL
 * @apiParam {String} vendor.twitter Twitter URL
 * @apiParam {String="male","female"} vendor.gender Gender
 * @apiParam {String} vendor.description Description
 *
 * @apiSuccess {String} response User Creation Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "id": "56919527e425b80e4a3ef86a",
 *      "message": "User has been created.",
 *      "created": true
 *    }
 *  }
 */
function create(req, res, next) {
  let payload = {
    // type: req.params[0],
    type: req.body.type,
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    mobile: req.body.mobile,
    email: req.body.email,
    password: req.body.password,
    emergencyMobile: req.body.emergencyMobile,
    gender: req.body.gender,
    nic: req.body.nic,
    dob: (req.body.dob === 'null' || req.body.dob === '') ? undefined : req.body.dob,
    companyName: req.body.companyName,
    vendorType: req.body.vendorType,
    auth: req.auth
  };

  return services.user.create(payload)
    .then((response) => {
      res.send(201, response);
    })
    .catch(next);
}

/**
 * @api {get} /api/users/:userId Get User Detail
 * @apiVersion 1.0.0
 * @apiName GetUserDetail
 * @apiGroup User
 * @apiPermission Admin (any), Vendor (me), Customer (me)
 *
 * @apiParam {String} userId User ID
 *
 * @apiSuccess {String} response User Object
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "_id": "56a50658856905660f0deb9b",
 *      "type": "customer",
 *      "profile": {
 *        "email": "aly.yousuf7@gmail.com",
 *        "fullName": "Ali Yousuf",
 *        "mobile": "03219248080",
 *        "gender": "male",
 *        "dob": "1991-03-07T00:00:00.000Z"
 *      },
 *      "university": {
 *        "name": "giki",
 *        "email": "u2011050@giki.edu.pk",
 *        "verified": true
 *      }
 *      "createdBy": "56a3d82a4bdae8cf4ad96e33"
 *    }
 *  }
 */
function getById(req, res, next) {
  let payload = {
    userId: req.params.userId,
    auth: req.auth
  };
  return services.user.getById(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

/**
 * @api {post} /api/users/:type Get All Users By Type
 * @apiVersion 1.0.0
 * @apiName GetAllUsers
 * @apiGroup User
 * @apiPermission Admin
 *
 * @apiParam {String="admin","vendor","customer"} type User type
 * @apiParam {String} [pageSize] Page size
 * @apiParam {String} [skip] Skip
 *
 * @apiSuccess {String} response Admin List
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": [
 *      {
 *        "_id": "56919527e425b80e4a3ef86a",
 *        "type": "admin",
 *        "profile": {
 *          "email": "ali.yousuf@findmyadventure.pk",
 *          "fullName": "Ali Yousuf",
 *          "mobile": "03219248080",
 *          "gender": "male"
 *        }
 *      },
 *      {
 *        "_id": "56919527e425b80e4a3ef86b",
 *        "type": "vendor",
 *        "profile": {
 *          "email": "komail.naqvi@findmyadventure.pk",
 *          "companyName": "Khoj",
 *          "fullName": "Komail Abbas",
 *          "mobile": "03219248080",
 *          "gender": "male",
 *          "description": "Text",
 *        }
 *      },
 *      {
 *        "_id": "56919527e425b80e4a3ef86b",
 *        "type": "customer",
 *        "profile": {
 *          "email": "aly.yousuf7@gmail.com",
 *          "fullName": "Ali Yousuf",
 *          "mobile": "03219249080",
 *          "gender": "male",
 *          "dob": "1991-03-07T00:00:00.000Z"
 *        },
 *        "university": {
 *          "name": "giki",
 *          "email": "u2011050@giki.edu.pk",
 *          "verified": true
 *        }
 *      }
 *    ],
 *    "meta" : {
 *      "pageSize": 5,
 *      "skip": 0,
 *      "total": 3
 *    }
 *  }
 */
function getAll(req, res, next) {
  let payload = {
    // type: req.params[0],
    type: req.query.type,
    keywords: req.query.keywords,
    pageSize: req.query.pageSize,
    skip: req.query.skip
  };
  return services.user.getAll(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

/**
 * @api {put} /api/users/:userId Save User Profile
 * @apiVersion 1.0.0
 * @apiName SaveUserProfile
 * @apiGroup User
 * @apiPermission Admin (any), Vendor (me), Customer (me)
 *
 * @apiParam {String} userId User ID
 *
 * @apiParam admin If `User type` equals `admin` (must be at root)
 * @apiParam {String} admin.fullName Full name
 * @apiParam {String} admin.mobile Mobile number
 * @apiParam {String="male","female"} admin.gender Gender
 *
 * @apiParam vendor If `User type` equals `vendor` (must be at root)
 * @apiParam {String} vendor.companyName Company name
 * @apiParam {String} vendor.fullName Full name
 * @apiParam {String} vendor.mobile Mobile number
 * @apiParam {String} vendor.twitter Twitter URL
 * @apiParam {String} vendor.facebook Facbook URL
 * @apiParam {String="male","female"} vendor.gender Gender
 * @apiParam {String} vendor.description Description
 *
 * @apiParam customer If `User type` equals `customer` (must be at root)
 * @apiParam {String} customer.fullName Full name
 * @apiParam {String} customer.mobile Mobile number
 * @apiParam {String="male","female"} customer.gender Gender
 * @apiParam {Date} customer.dob Date of Birth
 *
 * @apiSuccess {String} response User Save Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "User profile has been saved."
 *    }
 *  }
 */
function saveProfile(req, res, next) {
  let payload = {
    userId: req.params.userId,

    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    mobile: req.body.mobile,
    emergencyMobile: req.body.emergencyMobile,
    gender: req.body.gender,
    dob: req.body.dob,
    nic: req.body.nic,
    // Address
    street: req.body.street,
    area: req.body.area,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    country: req.body.country,
    type: req.body.type,
    auth: req.auth
  };
  return services.user.saveProfile(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

/**
 * @api {put} /api/users/:userId Change User Password
 * @apiVersion 1.0.0
 * @apiName ChangePassword
 * @apiGroup User
 * @apiPermission Admin (any), Vendor (me), Customer (me)
 *
 * @apiParam {String} userId User ID
 *
 * @apiParam {String} oldPassword Old Password
 * @apiParam {String} newPassword New Password
 *
 * @apiSuccess {String} response User Save Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "User password has been changed."
 *    }
 *  }
 */
function changePassword(req, res, next) {
  let payload = {
    userId: req.params.userId,

    oldPassword: req.body.oldPassword,
    newPassword: req.body.newPassword,

    auth: req.auth
  };
  return services.user.changePassword(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function addToWish(req, res, next) {
  let payload = {
    tripId: req.body.tripId,
    eventId: req.body.eventId,
    activityId: req.body.activityId,
    locationId: req.body.locationId,
    categoryId: req.body.categoryId,
    accommodationId: req.body.accommodationId,
    auth: req.auth
  };
  return services.user.addToWish(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function deleteAll(req, res, next) {
  let payload = {
    auth: req.auth
  };
  return services.user.deleteAll(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function deleteWishListEvent(req, res, next) {
  let payload = {
    tripId: req.body.tripId,
    auth: req.auth
  };
  return services.user.deleteWishListEvent(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function removeWishList(req, res, next) {
  let payload = {
    tripId: req.body.tripId,
    eventId: req.body.eventId,
    activityId: req.body.activityId,
    locationId: req.body.locationId,
    categoryId: req.body.categoryId,
    accommodationId: req.body.accommodationId,
    auth: req.auth
  };
  return services.user.removeWishList(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function getUserWishlist(req, res, next) {
  let payload = {
    auth: req.auth,
    userId: req.params.userId
  };
  return services.user.getUserWishlist(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function addToPlan(req, res, next) {
  let payload = {
    tripId: req.body.tripId,
    eventId: req.body.eventId,
    activityId: req.body.activityId,
    locationId: req.body.locationId,
    categoryId: req.body.categoryId,
    accommodationId: req.body.accommodationId,
    auth: req.auth
  };
  return services.user.addToPlan(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function getUserPlan(req, res, next) {
  let payload = {
    auth: req.auth,
    userId: req.params.userId
  };
  return services.user.getUserPlan(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function removePlan(req, res, next) {
  let payload = {
    tripId: req.body.tripId,
    eventId: req.body.eventId,
    activityId: req.body.activityId,
    locationId: req.body.locationId,
    categoryId: req.body.categoryId,
    accommodationId: req.body.accommodationId,
    auth: req.auth
  };
  return services.user.removePlan(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

/**
 * @api {post} /api/user/:userId/photos Upload User Photo
 * @apiVersion 1.0.0
 * @apiName UploadUserPhoto
 * @apiGroup User
 * @apiPermission Admin, Customer
 *
 * @apiParam {String} userId User ID
 * @apiParam {String} photo Photo (Base64)
 *
 * @apiSuccess {String} response User Saved Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "User has been saved."
 *    }
 *  }
 */
function uploadPhoto(req, res, next) {
  let payload = {
    userId: req.params.userId,
    photo: req.files.photo,
    auth: req.auth
  };
  return services.user.uploadPhoto(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
/**
 * @api {del} /api/user/:userId/photos/:photoId Delete User Photo
 * @apiVersion 1.0.0
 * @apiName RemoveUserPhoto
 * @apiGroup User
 * @apiPermission Admin,Customer
 *
 * @apiParam {String} userId User ID
 * @apiParam {String} photoId Photo ID
 *
 * @apiSuccess {String} response User Saved Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "User has been saved."
 *    }
 *  }
 */
function removePhoto(req, res, next) {
  let payload = {
    userId: req.params.userId,
    photoId: req.params.photoId,
    auth: req.auth
  };
  return services.user.removePhoto(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function update(req, res, next) {
  let payload = {
    userId: req.params.userId,
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    mobile: req.body.mobile,
    gender: req.body.gender,
    nic: req.body.nic,
    dob: (req.body.dob === 'null' || req.body.dob === '') ? undefined : req.body.dob,
    companyName: req.body.companyName,
    // bank Details
    bankTitle: req.body.bankTitle,
    accountName: req.body.accountName,
    accountNumber: req.body.accountNumber,
    // Address
    street: req.body.street,
    area: req.body.area,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    country: req.body.country,
    auth: req.auth
  };

  return services.user.update(payload)
    .then((response) => {
      res.send(201, response);
    })
    .catch(next);
}

function remove(req, res, next) {
  let payload = {
    userId: req.params.userId,
    auth: req.auth
  };
  return services.user.remove(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function updateStatus(req, res, next) {
  let payload = {
    userId: req.params.userId,
    status: req.body.status,
    auth: req.auth
  };
  return services.user.updateStatus(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
