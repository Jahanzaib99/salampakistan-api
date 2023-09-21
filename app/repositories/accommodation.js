'use strict';

const Accommodation = require('../models/Accommodation');
const Hotel = require('../models/hotel');
const _ = require('lodash');
// const moment = require('moment');
const mongoose = require('mongoose');

module.exports = {
  search,
  accommodationCount,
  getone,
  migrate,
  findById,
  update,
  submitReview,
  addPhoto,
  removePhoto,
  getToHotels
};
function search(payload) {
  let filter = {isActive: true, status: 'published'};
  if (payload.status) {
    filter.status = { $eq: payload.status };
  }
  let sort = {};
  if (payload && payload.city) {
    filter['city'] = new RegExp(payload.city, 'i');
  }
  if (payload && payload.locationId) {
    filter['location'] = mongoose.Types.ObjectId(payload.locationId);
  }
  if (payload && payload.categoryId) {
    filter['category'] = mongoose.Types.ObjectId(payload.categoryId);
  }

  if (payload && payload.rooms) {
    filter['numberrooms'] = {};
    filter['numberrooms']['$gte'] = +payload.rooms;
  }

  if (payload && payload.isFeatured) {
    filter['isFeatured'] = JSON.parse(payload.isFeatured);
  }
  if (payload && payload.chainName) {
    filter['chain_name'] = new RegExp(payload.chainName, 'i');
  }
  if (payload && payload.brandName) {
    filter['brand_name'] = new RegExp(payload.brandName, 'i');
  }
  if (payload && payload.hotelName) {
    filter['hotel_name'] = new RegExp(payload.hotelName, 'i');
  }
  if (payload && payload.country) {
    filter['country'] = new RegExp(payload.country, 'i');
  }
  if (payload && payload.starRating) {
    filter['star_rating'] = payload.starRating;
  }
  if (payload && payload.ratesFrom) {
    filter['rates_from'] = new RegExp(payload.ratesFrom, 'i');
  }
  if (payload && payload.continentName) {
    filter['continent_name'] = new RegExp(payload.continentName, 'i');
  }
  if (payload && payload.ratingAverage) {
    filter['rating_average'] = payload.ratingAverage;
  }
  if (payload && payload.filter) {
    if (payload.filter === 'starLow') {
      sort['star_rating'] = 1;
    }
    if (payload.filter === 'starHigh') {
      sort['star_rating'] = -1;
    }
    if (payload.filter === 'bestReview') {
      sort['rating_average'] = -1;
    }
    if (payload.filter === 'priceHigh') {
      sort['rates_from'] = -1;
    }
    if (payload.filter === 'priceLow') {
      sort['rates_from'] = 1;
    }
  }
  return Hotel.find(filter)
    .sort(sort)
    .skip(payload.skip)
    .limit(payload.pageSize)
    .lean(true)
    .populate('category')
    .populate('location')
    .exec()
    .then((response) => {
      // response = _.head(response);
      if (!response) {
        response = {
          data: []
        };
      }
      return response;
    });
}

function accommodationCount(payload) {
  let filter = {};
  if (payload.status) {
    filter.status = { $eq: payload.status };
  }
  if (payload && payload.city) {
    filter['city'] = new RegExp(payload.city, 'i');
  }
  if (payload && payload.locationId) {
    filter['location'] = mongoose.Types.ObjectId(payload.locationId);
  }
  if (payload && payload.categoryId) {
    filter['category'] = mongoose.Types.ObjectId(payload.categoryId);
  }

  if (payload && payload.rooms) {
    filter['numberrooms'] = {};
    filter['numberrooms']['$gte'] = +payload.rooms;
  }

  if (payload && payload.isFeatured) {
    filter['isFeatured'] = JSON.parse(payload.isFeatured);
  }
  if (payload && payload.chainName) {
    filter['chain_name'] = new RegExp(payload.chainName, 'i');
  }
  if (payload && payload.brandName) {
    filter['brand_name'] = new RegExp(payload.brandName, 'i');
  }
  if (payload && payload.hotelName) {
    filter['hotel_name'] = new RegExp(payload.hotelName, 'i');
  }
  if (payload && payload.country) {
    filter['country'] = new RegExp(payload.country, 'i');
  }
  if (payload && payload.starRating) {
    filter['star_rating'] = payload.starRating;
  }
  if (payload && payload.ratesFrom) {
    filter['rates_from'] = new RegExp(payload.ratesFrom, 'i');
  }
  if (payload && payload.continentName) {
    filter['continent_name'] = new RegExp(payload.continentName, 'i');
  }
  if (payload && payload.ratingAverage) {
    filter['rating_average'] = payload.ratingAverage;
  }
  if (payload && payload.ratingAverage) {
    filter.ratingAverage = payload.ratingAverage;
  }
  return Hotel.find(filter)
    .countDocuments()
    .then((response) => {
      response = {
        total: response
      };
      if (!response) {
        response = {
          total: 0
        };
      }
      return response;
    });
}

function migrate() {
  return Accommodation.find()
    .lean(true)
    .then((accommodations) => {
      adjust(accommodations);
    });
}

function adjust(accommodations) {
  // let locations = ['5ec65441da69f33218c8c631', '5ec65441da69f33218c8c632', '5ec65441da69f33218c8c633', '5ec65441da69f33218c8c634', '5ec65441da69f33218c8c635'];
  accommodations.forEach(accommodation => {
    // accommodation.location = locations[_.random(locations.length - 1)];
    accommodation.photos = [];
    accommodation.photos = _.values(_.omitBy(_.pick(accommodation, ['photo1', 'photo2', 'photo3', 'photo4', 'photo5']), _.isNull));
    Accommodation.update({ _id: accommodation._id }, accommodation)
      .then(accommodation => {
        console.log('accommodation migrated successfully');
      })
      .catch(() => {
        console.log('error occured while migrating accommodation');
      });
  });
}

function getone(id) {
  return Hotel.find({ '_id': { $in: id } })
    .lean()
    .exec();
}

function findById(id) {
  return Hotel.findOne({ '_id': { $in: id } })
    .lean()
    .populate('category')
    .populate('location')
    .exec();
}

function update(payload) {
  let data = {
    isFeatured: payload.isFeatured,
    hotel_name: payload.hotel_name,
    overview: payload.overview
  };
  if (payload.locationId.length > 0) data.location = payload.locationId;
  if (payload.categoryId.length > 0) data.category = payload.categoryId;

  data = _.omitBy(data, _.isUndefined);
  return Accommodation.update({
    _id: payload.accommodationId
  }, {
    $set: data
  });
}

function submitReview(payload) {
  let data = {
    totalRating: payload.totalRating,
    averageRating: payload.averageRating,
    totalReviews: payload.totalReviews
  };
  data = _.omitBy(data, _.isUndefined);
  return Accommodation.update({
    _id: payload.locationId
  }, {
    $set: data
  });
}

function addPhoto(payload) {
  let data = {
    photoIds: payload.photoId
  };

  return Hotel.update({
    _id: payload.accommodationId
  }, {
    $push: data
  });
}

function removePhoto(payload) {
  let data = {
    photoIds: payload.photoId
  };

  return Hotel.update({
    _id: payload.accommodationId
  }, {
    $pull: data
  });
}

function getToHotels(payload) {
  let filter = {};
  if (payload && payload.city) {
    filter['city'] = new RegExp(payload.city, 'i');
  }

  return Accommodation.find(filter)
    .skip(payload.skip)
    .limit(payload.pageSize)
    .sort({ star_rating: -1 })
    .lean(true)
    .populate('category')
    .populate('location')
    .exec()
    .then((response) => {
      if (!response) {
        response = {
          data: []
        };
      }
      return response;
    });
}
