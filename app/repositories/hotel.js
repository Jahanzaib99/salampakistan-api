'use strict';

const Hotel = require('../models/hotel');
// const moment = require('moment');
const mongoose = require('mongoose');
const _ = require('lodash');

module.exports = {
  create,
  update,
  findById,
  remove,
  get,
  getCount,
  addRoom,
  updateStatus
};

function create(payload) {
  let data = {
    hotelName: payload.hotelName,
    addressInfo: payload.addressInfo,
    city: payload.city,
    hotelAmenities: payload.hotelAmenities,
    overview: payload.overview,
    description: payload.description,
    email: payload.email,
    mobile: payload.mobile,
    zipcode: payload.zipcode,
    location: payload.location,
    category: payload.category,
    hotelSource: payload.hotelSource,
    checkin: payload.checkin,
    checkout: payload.checkout,
    cancellationPolicyType: payload.cancellationPolicyType,
    vendor: payload.vendor,
    isFeatured: payload.isFeatured,
    rate: payload.rate
  };
  data = _.omitBy(data, _.isUndefined);
  return Hotel.create(data);
}

function update(payload) {
  let data = {
    hotelName: payload.hotelName,
    addressInfo: payload.addressInfo,
    city: payload.city,
    hotelAmenities: payload.hotelAmenities,
    overview: payload.overview,
    description: payload.description,
    email: payload.email,
    mobile: payload.mobile,
    zipcode: payload.zipcode,
    location: payload.location,
    category: payload.category,
    hotelSource: payload.hotelSource,
    checkin: payload.checkin,
    checkout: payload.checkout,
    cancellationPolicyType: payload.cancellationPolicyType,
    vendor: payload.vendor,
    isFeatured: payload.isFeatured,
    rate: payload.rate
  };
  data = _.omitBy(data, _.isUndefined);
  return Hotel.update({
    _id: payload.accommodationsId
  }, {
    $set: data
  });
}

function findById(accommodationsId) {
  return Hotel.findOne({
    _id: accommodationsId
  }).populate('location');
}

function remove(payload) {
  let Data = {
    isActive: false
  };
  Data = _.omitBy(Data, _.isUndefined);
  return Hotel.update({
    _id: payload.accommodationsId
  }, {
    $set: Data
  });
}

function getCount(payload) {
  let filter = {};
  if (payload.vendorId) {
    payload.vendorId = mongoose.Types.ObjectId(payload.vendorId);
    filter.vendor = { $eq: payload.vendorId };
  }
  return Hotel.find(filter)
    .count();

}

function get(payload) {

  let payloadSkip = payload.skip;
  let payloadPageSize = payload.pageSize;
  if (payload.pageSize === 0) {
    payloadSkip = 0;
    payloadPageSize = { $size: '$data' };
  }
  let matchObj = { isActive: true };
  if (payload.vendorId && (payload.vendorId instanceof mongoose.Types.ObjectId || typeof payload.vendorId === 'string')) {
    matchObj.vendor = mongoose.Types.ObjectId(payload.vendorId);
  }
  if (payload && payload.keywords) {
    var keywords = payload.keywords;
    matchObj['hotelName'] = new RegExp(keywords);
  }
  if (payload && payload.cityName !== undefined) {
    matchObj['city'] = payload.cityName;
  }
  matchObj = _.omitBy(matchObj, _.isUndefined);
  let pipeline = [
    {
      $match: matchObj
    },
    {
      $sort: { createdAt: -1 }
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category'
      }
    },
    {
      $unwind: { path: '$category', preserveNullAndEmptyArrays: true }
    },
    {
      $lookup: {
        from: 'locations',
        localField: 'location',
        foreignField: '_id',
        as: 'location'
      }
    },
    {
      $unwind: { path: '$location', preserveNullAndEmptyArrays: true }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'vendor',
        foreignField: '_id',
        as: 'vendor'
      }
    },
    {
      $unwind: { path: '$vendor', preserveNullAndEmptyArrays: true }
    },
    {
      $project: {
        _id: 1,
        hotelName: 1,
        addressInfo: 1,
        city: 1,
        hotelAmenities: 1,
        overview: 1,
        description: 1,
        email: 1,
        mobile: 1,
        zipcode: 1,
        location: '$location',
        category: '$category',
        hotelSource: 1,
        checkin: 1,
        checkout: 1,
        cancellationPolicyType: 1,
        isFeatured: 1,
        vendor: '$vendor',
        createdAt: 1,
        photoIds: 1,
        totalRating: 1,
        rate: 1,
        status: 1
      }
    },
    {
      $group: {
        _id: null,
        data: {
          $push: '$$ROOT'
        }
      }
    },
    {
      $project: {
        data: {
          $slice: ['$data', payloadSkip, payloadPageSize]
        },
        total: {
          $size: '$data'
        }
      }
    }
  ];
  return Hotel.aggregate(pipeline).exec()
    .then((response) => {
      response = _.head(response);
      if (!response) {
        response = {
          total: 0,
          data: []
        };
        // response = [];
      }
      return response;
    });
}

function addRoom(payload) {
  let data = {
    rooms: payload.rooms
  };
  data = _.omitBy(data, _.isUndefined);
  return Hotel.update({
    _id: payload._id
  }, {
    $set: data
  });
}

function updateStatus(payload) {
  let data = {
    status: payload.status
  };
  data = _.omitBy(data, _.isUndefined);
  return Hotel.update({
    _id: payload.accommodationsId
  }, {
    $set: data
  });
}
