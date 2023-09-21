'use strict';

const Events = require('../models/Events');
// const enums = require('../enums');
const mongoose = require('mongoose');
const moment = require('moment');
const { parseInt } = require('lodash');
const _ = require('lodash');
// const constants = require('../constants');

module.exports = {
  create,
  findById,
  update,
  getAll,
  eventPhoto,
  removeEventPhoto,
  remove,
  updateStatus
};
function create(payload) {
  let trip = {
    title: payload.title,
    slug: payload.slug,
    description: payload.description,
    location: payload.location,
    address: payload.address,
    city: payload.city,
    surroundings: payload.surroundings,
    province: payload.province,
    startDate: payload.startDate,
    endDate: payload.endDate,
    startTime: payload.startTime,
    endTime: payload.endTime,
    numberOfPasses: payload.numberOfPasses,
    price: payload.price,
    createdBy: payload.createdBy,
    updatedBy: payload.updatedBy,
    vendorId: payload.vendorId,
    contact: payload.contact,
    category: payload.category
  };
  trip = _.omitBy(trip, _.isUndefined);
  return Events.create(trip);
}

function getAll(payload) {
  let payloadSkip = payload.skip;
  let payloadPageSize = payload.pageSize;

  if (payload.pageSize === 0) {
    payloadSkip = 0;
    payloadPageSize = { $size: '$data' };
  }

  //   let sortKey = enums.event.sortKeyMap[payload.sort] || enums.event.sortKeyMap.date;
  //   let sort = {
  //     [sortKey]: 1
  //   };
  //   let statusFilter;

  let durationFilter = {};
  if (payload.durationFrom) {
    durationFilter['$gte'] = payload.durationFrom;
  }
  if (payload.durationTo) {
    durationFilter['$lte'] = payload.durationTo;
  }
  //   if (payload.status) {
  //     let status = JSON.parse(payload.status);
  //     statusFilter = (status && status.length !== 0) ? { $eq: status } : enums.events.status[payload.status];
  //   } else {
  //     statusFilter = enums.events.status.published;
  //   }
  let filters = {
    // status: statusFilter,
    isActive: true,
    '$text': payload.keywords ? {
      $search: payload.keywords
    } : undefined,
    duration: _.keys(durationFilter).length ? durationFilter : undefined
  };
  if (payload.city) {
    payload.city = mongoose.Types.ObjectId(payload.city);
    filters.city = { $eq: payload.city };
  }
  if (payload.province) {
    payload.province = mongoose.Types.ObjectId(payload.province);
    filters.province = { $eq: payload.province };
  }
  if (payload.vendorId) {
    payload.vendorId = mongoose.Types.ObjectId(payload.vendorId);
    filters.vendorId = { $eq: payload.vendorId };
  }
  if (payload.status) {
    // payload.status = mongoose.Types.ObjectId(payload.status);
    filters.status = { $eq: payload.status };
  }
  // if (payload.dateFrom || payload.dateTo) {
  //   filters['startDate'] = {};
  // }

  let noDateFilter = {
  };

  let startDateFilter = {
  };
  let endDateFilter = {
  };

  // if (payload.dateFrom) {
  //   startDateFilter['startDate'] = {};
  //   endDateFilter['endDate'] = {};
  //   startDateFilter['startDate'].$lte = parseInt(moment(payload.dateFrom).endOf('day'));
  //   endDateFilter['endDate'].$gte = parseInt(moment(payload.dateFrom).startOf('day'));
  // } else {
  //   noDateFilter['startDate'] = {};

  //   noDateFilter['startDate'].$lte = parseInt(moment(new Date()).endOf('day'));
  // }
  if (payload.dateFrom) {
    startDateFilter['startDate'] = {};
    endDateFilter['startDate'] = {};
    startDateFilter['startDate'].$gte = parseInt(moment(payload.dateFrom).startOf('day'));
    endDateFilter['startDate'].$lte = parseInt(moment(payload.dateFrom).endOf('day'));
  } else {
    noDateFilter['startDate'] = {};

    noDateFilter['startDate'].$gte = parseInt(moment(new Date()).startOf('day'));
  }

  filters = _.omitBy(filters, _.isUndefined);

  // console.log('end date limit===>', endDateLimit);

  let pipeline = [
    {
      $match: filters
    },
    {
      $match: startDateFilter
    },
    {
      $match: endDateFilter
    },
    {
      $match: noDateFilter
    },
    {
      $lookup: {
        from: 'locations',
        localField: 'city',
        foreignField: '_id',
        as: 'city'
      }
    },
    {
      $unwind: { path: '$city', preserveNullAndEmptyArrays: true }
    },
    {
      $lookup: {
        from: 'locations',
        localField: 'province',
        foreignField: '_id',
        as: 'province'
      }
    },
    {
      $unwind: { path: '$province', preserveNullAndEmptyArrays: true }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'vendorId',
        foreignField: '_id',
        as: 'users'
      }
    },
    {
      $unwind: { path: '$users', preserveNullAndEmptyArrays: true }
    },
    {
      $lookup: {
        from: 'surroundings',
        localField: 'surroundings',
        foreignField: '_id',
        as: 'surroundings'
      }
    },
    {
      $group: {
        _id: '$_id',
        slug: {
          $first: '$slug'
        },
        title: {
          $first: '$title'
        },
        description: {
          $first: '$description'
        },
        photoIds: {
          $first: '$photoIds'
        },
        location: {
          $first: '$location'
        },
        address: {
          $first: '$address'
        },
        startDate: {
          $first: '$startDate'
        },
        endDate: {
          $first: '$endDate'
        },
        startTime: {
          $first: '$startTime'
        },
        endTime: {
          $first: '$endTime'
        },
        numberOfPasses: {
          $first: '$numberOfPasses'
        },
        price: {
          $first: '$price'
        },
        contact: {
          $first: '$contact'
        },
        category: {
          $first: '$category'
        },
        status: {
          $first: '$status'
        },
        city: {
          $first: '$city.alias'
        },
        cityId: {
          $first: '$city._id'
        },
        surroundings: {
          $first: '$surroundings'
        },
        province: {
          $first: '$province.alias'
        },
        vendor: {
          $first: '$users.profile.firstName'
        },
        createdAt: {
          $first: '$createdAt'
        }
      }
    },
    {
      $sort: { createdAt: -1 }
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
    },
    {
      $unwind: '$data'
    },
    {
      $group: {
        _id: null,
        data: {
          $push: '$$ROOT.data'
        },
        total: {
          $first: '$total'
        }
      }
    }
  ];

  return Events.aggregate(pipeline).exec()
    .then((response) => {
      response = _.head(response);
      if (!response) {
        response = {
          total: 0,
          data: []
        };
      }
      return response;
    });
}

function findById(eventId) {
  let match = {
    isActive: true
  };
  if (eventId instanceof mongoose.Types.ObjectId || typeof eventId === 'string') {
    match._id = mongoose.Types.ObjectId(eventId);
  }
  match = _.omitBy(match, _.isUndefined);

  let pipeline = [{
    $match: match
  },
  {
    $lookup: {
      from: 'locations',
      localField: 'city',
      foreignField: '_id',
      as: 'city'
    }
  },
  {
    $unwind: { path: '$city', preserveNullAndEmptyArrays: true }
  },
  {
    $lookup: {
      from: 'locations',
      localField: 'province',
      foreignField: '_id',
      as: 'province'
    }
  },
  {
    $unwind: { path: '$province', preserveNullAndEmptyArrays: true }
  },
  {
    $lookup: {
      from: 'users',
      localField: 'vendorId',
      foreignField: '_id',
      as: 'users'
    }
  },
  {
    $unwind: { path: '$users', preserveNullAndEmptyArrays: true }
  },
  {
    $lookup: {
      from: 'surroundings',
      localField: 'surroundings',
      foreignField: '_id',
      as: 'surroundings'
    }
  },
  {
    $project: {
      _id: 1,
      slug: 1,
      title: 1,
      description: 1,
      photoIds: 1,
      location: 1,
      address: 1,
      startDate: 1,
      endDate: 1,
      startTime: 1,
      endTime: 1,
      numberOfPasses: 1,
      price: 1,
      status: 1,
      vendorId: 1,
      contact: 1,
      category: 1,
      cityId: '$city._id',
      provinceId: '$province._id',
      cityName: '$city.alias',
      provinceName: '$province.alias',
      vendorName: '$users.profile.firstName',
      surroundings: '$surroundings'
    }
  }
  ];

  return Events.aggregate(pipeline).exec()
    .then((response) => {
      response = _.head(response);
      return response;
    });
}

function update(payload) {
  let data = {
    title: payload.title,
    description: payload.description,
    location: payload.location,
    address: payload.address,
    city: payload.city,
    surroundings: payload.surroundings,
    province: payload.province,
    startDate: payload.startDate,
    endDate: payload.endDate,
    startTime: payload.startTime,
    endTime: payload.endTime,
    numberOfPasses: payload.numberOfPasses,
    price: payload.price,
    vendorId: payload.vendorId,
    contact: payload.contact,
    category: payload.category
  };
  data = _.omitBy(data, _.isUndefined);
  return Events.update({
    _id: payload.eventId
  }, {
    $set: data
  });
}

function eventPhoto(payload) {
  let data = {
    photoIds: payload.photoId
  };
  data = _.omitBy(data, _.isUndefined);
  return Events.update({
    _id: payload.eventId
  }, {
    $set: data

  });
}

function removeEventPhoto(payload) {
  let data = {
    photoIds: payload.photoId
  };
  data = _.omitBy(data, _.isUndefined);
  return Events.update({
    _id: payload.eventId
  }, {
    $pull: data

  });
}

function remove(payload) {
  let Data = {
    isActive: false
  };
  Data = _.omitBy(Data, _.isUndefined);
  return Events.update({
    _id: payload.eventId
  }, {
    $set: Data
  });
}

function updateStatus(payload) {
  let Data = {
    status: payload.status,
    updatedBy: payload.updatedBy
  };
  Data = _.omitBy(Data, _.isUndefined);
  return Events.update({
    _id: payload.eventId
  }, {
    $set: Data
  });
}
