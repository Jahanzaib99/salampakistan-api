'use strict';

const services = require('../services');
module.exports = {
  submitReview,
  getUserReviews
};

/**
 * @api {post} /api/review/:token Submit review
 * @apiVersion 1.0.0
 * @apiName SubmitReview
 * @apiGroup Booking
 * @apiPermission Customer
 *
 * @apiParam {String} token Token
 *
 * @apiSuccess {String} response Review submitted message
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *  "data": {
 *    "message": "Review submitted succesfully"
 *    }
 *  }
 */
function submitReview(req, res, next) {
  let payload = {
    title: req.body.title,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    mobile: req.body.mobile,
    rating: req.body.rating,
    description: req.body.description,
    locationId: req.body.locationId,
    tripId: req.body.tripId,
    accommodatoinId: req.body.accommodatoinId,
    auth: req.auth
  };
  return services.review.submitReview(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function getUserReviews(req, res, next) {
  let payload = {
    auth: req.auth,
    userId: req.params.userId
  };
  return services.review.getUserReviews(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
