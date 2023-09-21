'use strict';

const services = require('../services');

module.exports = {
  signup,
  signin,
  logout,
  resetPasswordRequest,
  updatePassword
};

/**
 * @api {post} /api/signup Sign-up as Customer
 * @apiVersion 1.0.0
 * @apiName Signup
 * @apiGroup Auth
 * @apiPermission Guest
 *
 * @apiParam {String} firstName First name
 * @apiParam {String} lastName Last name
 * @apiParam {String} mobile Mobile
 * @apiParam {String} email Email address
 * @apiParam {String} password Password
 * @apiParam {String="male","female"} gender Gender
 * @apiParam {Date} dob Date of Birth
 *
 * @apiSuccess {String} response User Creation Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "id": "56919527e425b80e4a3ef86a",
 *      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI1NjkyNDU3NTQ3NTc2YWEwNjQ3YjcyYWIiLCJ1c2VyVHlwZSI6InVzZXIiLCJpYXQiOjE0NTI0MjY2MTMsImV4cCI6MTQ1MjQzMDIxM30.WKyEO7etStNB7sPj2rVUcKlLNwDhs-qKM4hl3AUCN6M",
 *      "message": "User has been created.",
 *      "created": true
 *    }
 *  }
 */
function signup(req, res, next) {
  let payload = {
    deviceType: 'Web',
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
    type: req.body.type, // user type
    companyName: req.body.companyName, // for vendor
    vendorType: req.body.vendorType, // for vendor
    auth: req.auth
  };
  return services.auth.signup(payload)
    .then((response) => {
      res.send(201, response);
    })
    .catch(next);
}

/**
 * @api {post} /api/signin/:social Sign-in
 * @apiVersion 1.0.0
 * @apiName Signin
 * @apiGroup Auth
 * @apiPermission Guest
 *
 * @apiParam {String="local","facebook","google"} social Social Website name
 * @apiParam {String} email Email address
 * @apiParam {String} password Password
 * @apiParam {String} token Social Website access token
 *
 * @apiSuccess {String} response User Sign-in Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "id": "56919527e425b80e4a3ef86a",
 *      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI1NjkyNDU3NTQ3NTc2YWEwNjQ3YjcyYWIiLCJ1c2VyVHlwZSI6InVzZXIiLCJpYXQiOjE0NTI0MjY2MTMsImV4cCI6MTQ1MjQzMDIxM30.WKyEO7etStNB7sPj2rVUcKlLNwDhs-qKM4hl3AUCN6M",
 *      "message": "User sign-in successfully."
 *    }
 *  }
 */
function signin(req, res, next) {
  let payload = {
    social: req.params.social,
    deviceType: 'Web',
    email: req.body.email,
    password: req.body.password,
    token: req.body.token,
    firstName: req.body.firstName,
    id: req.body.id,
    lastName: req.body.lastName,
    name: req.body.name,
    photoUrl: req.body.photoUrl
  };
  return services.auth.signin(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

/**
 * @api {get} /api/logout Logout
 * @apiVersion 1.0.0
 * @apiName Logout
 * @apiGroup Auth
 * @apiPermission Admin, Vendor, Customer
 *
 * @apiSuccess {String} response User Logout Message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *    "data": {
 *      "message": "User logout successfully."
 *    }
 *  }
 */
function logout(req, res, next) {
  var payload = {
    token: req.headers.token
  };
  return services.auth.logout(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function resetPasswordRequest(req, res, next) {
  var payload = {
    email: req.body.email
  };
  return services.auth.resetPasswordRequest(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function updatePassword(req, res, next) {
  let payload = {
    userId: req.params.userId,
    oldPassword: req.body.oldPassword,
    newPassword: req.body.newPassword,
    auth: req.auth
  };
  return services.auth.updatePassword(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
