'use strict';

const repos = require('../repositories');
const messages = require('../messages');
const validations = require('../validations');
const restify = require('restify');

module.exports = {
  submitReview,
  getUserReviews
};

// function submitReview(payload) {
//   return new Promise((resolve, reject) => {
//     if (payload.eventId) {

//       return validations.validatePayload(payload, {
//         properties: {
//           firstName: validations.rules.firstName,
//           lastName: validations.rules.lastName,
//           email: validations.rules.email,
//           description: validations.rules.textRequired('Docation'),
//           rating: validations.rules.rating,
//           eventId: validations.rules.objectId
//         }
//       }).then((response) => {
//         resolve(response);
//       })
//         .catch(err => {
//           reject(err);
//         });
//     } else if (payload.locationId) {
//       return validations.validatePayload(payload, {
//         properties: {
//           firstName: validations.rules.firstName,
//           lastName: validations.rules.lastName,
//           email: validations.rules.email,
//           description: validations.rules.textRequired('Docation'),
//           rating: validations.rules.rating,
//           locationId: validations.rules.objectId
//         }
//       }).then((response) => {
//         resolve(response);
//       })
//         .catch(err => {
//           reject(err);
//         });
//     }
//   })
//     .then((respnse) => {
//       console.log(respnse);
//     });
// }

function submitReview(payload) {
  return validations.validatePayload(payload, {
    properties: {
      firstName: validations.rules.firstName,
      lastName: validations.rules.lastName,
      email: validations.rules.email,
      // mobile: validations.rules.mobile,
      description: validations.rules.textRequired('Description'),
      rating: validations.rules.rating
    }
  })
    .then(repos.user.findById.bind(this, payload.auth.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      if (payload.tripId) {
        return Promise.resolve(_submitTripReview(payload));
      } else if (payload.locationId) {
        return Promise.resolve(_submitLocationReview(payload));
      } else if (payload.accommodatoinId) {
        return Promise.resolve(_submitAccommodationReview(payload));
      }
    });
}

function _submitTripReview(payload) {
  return validations.validatePayload(payload, {
    properties: {
      tripId: validations.rules.objectId
    }
  })
    .then(repos.trip.findById.bind(this, payload.tripId))
    .then((trip) => {
      if (!trip) {
        throw new restify.errors.NotFoundError(messages.trip.notFound);
      }
      payload.type = 'trip';
      payload.totalReviews = trip.totalReviews + 1;
      payload.totalRating = trip.totalRating + payload.rating;
      let averageRating = payload.totalRating / payload.totalReviews;
      payload.averageRating = averageRating;
      return Promise.resolve(payload);
    })
    .then((response) => {
      repos.trip.submitReview(payload).then();
      repos.review.submitReview(payload).then();

    })
    .then((response) => {
      return Promise.resolve({
        messages: 'Review has been submitted.'

      });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}
function _submitLocationReview(payload) {
  return validations.validatePayload(payload, {
    properties: {
      locationId: validations.rules.objectId
    }
  })
    .then(repos.location.findById.bind(this, payload.locationId))
    .then((location) => {
      if (!location) {
        throw new restify.errors.NotFoundError(messages.location.notFound);
      }
      payload.type = 'location';
      payload.totalReviews = location.totalReviews + 1;
      payload.totalRating = location.totalRating + payload.rating;
      let averageRating = payload.totalRating / payload.totalReviews;
      payload.averageRating = location.averageRating + averageRating;

      return Promise.resolve(payload);
    })
    .then((response) => {
      repos.location.submitReview(payload).then();
      repos.review.submitReview(payload).then();

    })
    .then((response) => {
      return Promise.resolve({
        messages: 'Review has been submitted.'
      });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

function _submitAccommodationReview(payload) {
  return validations.validatePayload(payload, {
    properties: {
      accommodatoinId: validations.rules.objectId
    }
  })
    .then(repos.accommodation.findById.bind(this, payload.accommodatoinId))
    .then((accommodation) => {
      if (!accommodation) {
        throw new restify.errors.NotFoundError(messages.accommodation.notFound);
      }
      payload.type = 'accommodation';
      payload.totalReviews = accommodation.totalReviews + 1;
      payload.totalRating = accommodation.totalRating + payload.rating;
      let averageRating = payload.totalRating / payload.totalReviews;
      payload.averageRating = accommodation.averageRating + averageRating;

      return Promise.resolve(payload);
    })
    .then((response) => {
      repos.accommodation.submitReview(payload).then();
      repos.review.submitReview(payload).then();

    })
    .then((response) => {
      return Promise.resolve({
        messages: 'Review has been submitted.'
      });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

function getUserReviews(payload) {
  return validations.validatePayload(payload, {
    properties: {
    }
  })
    .then(repos.user.findById.bind(this, payload.userId))
    .then((user) => {
      if (!user) {
        throw new restify.errors.NotFoundError(messages.user.notFound);
      }
      // else if (payload.auth.userType !== enums.user.type.customer) {
      //   throw new restify.errors.ForbiddenError(messages.user.wishList.notAllowed);
      // }
    })
    .then(repos.review.getUserReviews.bind(this, payload))
    .then((response) => {
      return Promise.resolve(response);
    });
}
