'use strict';

const Trip = require('../models/Trip');
// const enums = require('../enums');
const mongoose = require('mongoose');
// const moment = require('moment');
const _ = require('lodash');
const { parseInt } = require('lodash');
const moment = require('moment');
// const constants = require('../constants');

module.exports = {
  create,
  search,
  getone,
  findById,
  update,
  updateStatus,
  tripPhoto,
  tripItinerary,
  getAll,
  removeTripPhoto,
  submitReview,
  remove
};
function create(payload) {
  let trip = {
    title: payload.title,
    slug: payload.slug,
    description: payload.description,
    isFeatured: payload.isFeatured,
    startLocation: payload.startLocation,
    Locations: payload.Locations,
    locations: payload.locations,
    categories: payload.categories,
    activities: payload.activities,
    duration: payload.duration,
    price: payload.price,
    date: payload.date,
    facilities: payload.facilities,
    type: payload.type,
    vendorId: payload.vendorId,
    createdBy: payload.createdBy,
    cancellationPolicy: payload.cancellationPolicy,
    totalReviews: 0,
    totalRating: 0,
    averageRating: 0,
    contact: payload.contact
  };
  trip = _.omitBy(trip, _.isUndefined);
  return Trip.create(trip);
}

function search(payload) {
  let matchObj = { isActive: true, status: 'published' };
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
  //     let statusIn = JSON.parse(payload.status);
  //     statusFilter = (statusIn && statusIn.length !== 0) ? { $in: statusIn } : enums.event.status[payload.status];
  //   } else {
  //     statusFilter = enums.event.status.published;
  //   }

  let filters = {
    // status: statusFilter,
    '$text': payload.keywords ? {
      $search: payload.keywords
    } : undefined,
    duration: _.keys(durationFilter).length ? durationFilter : undefined
  };
  if (payload.isFeatured) {
    filters.isFeatured = JSON.parse(payload.isFeatured);
  }
  if (payload.startLocation && payload.startLocation.length !== 0) {
    for (let i = 0; i < payload.startLocation.length; i++) {
      payload.startLocation[i] = mongoose.Types.ObjectId(payload.startLocation[i]);
    }
    filters.startLocation = { $in: payload.startLocation };
  }
  if (payload.Locations && payload.Locations.length !== 0) {
    for (let i = 0; i < payload.Locations.length; i++) {
      payload.Locations[i] = mongoose.Types.ObjectId(payload.Locations[i]);
    }
    filters.Locations = { $in: payload.Locations };
  }
  if (payload.categories && payload.categories.length !== 0) {
    for (let i = 0; i < payload.categories.length; i++) {
      payload.categories[i] = mongoose.Types.ObjectId(payload.categories[i]);
    }
    filters.categories = { $in: payload.categories };
  }
  if (payload.activities && payload.activities.length !== 0) {
    for (let i = 0; i < payload.activities.length; i++) {
      payload.activities[i] = mongoose.Types.ObjectId(payload.activities[i]);
    }
    filters.activities = { $in: payload.activities };
  }
  //   payload.dateFrom = payload.dateFrom ? moment(payload.dateFrom) : moment();
  //   payload.dateTo = payload.dateTo ? moment(payload.dateTo) : moment().add(3, 'months');
  let priceFilter = {};
  filters['date'] = {};
  filters['date'].$gte = moment().startOf('day').valueOf();

  if (payload.priceFrom) {
    priceFilter['$gte'] = payload.priceFrom;
  }

  filters['date'] = {};
  filters['date'].$gte = parseInt(moment(new Date()).startOf('day'));

  if (payload.priceTo) {
    priceFilter['$lte'] = payload.priceTo;
  }
  if (payload.dateFrom || payload.dateTo) {
    filters['date'] = {};
  }
  if (payload.dateFrom) {
    filters['date'].$gte = parseInt(moment(payload.dateFrom));
  }
  if (payload.dateTo) {
    filters['date'].$lte = parseInt(moment(payload.dateTo));
  }

  filters = _.omitBy(filters, _.isUndefined);
  console.log('filter---->', filters);
  let pipeline = [{
    $match: filters
  },
  {
    $match: priceFilter
  },
  {
    $match: matchObj
  },
  {
    $lookup: {
      from: 'locations',
      localField: 'startLocation',
      foreignField: '_id',
      as: 'startLocation'
    }
  },
  {
    $lookup: {
      from: 'locations',
      localField: 'Locations',
      foreignField: '_id',
      as: 'Locations'
    }
  },
  {
    $lookup: {
      from: 'activities',
      localField: 'activities',
      foreignField: '_id',
      as: 'activities'
    }
  },
  {
    $lookup: {
      from: 'categories',
      localField: 'categories',
      foreignField: '_id',
      as: 'categories'
    }
  },
  {
    $lookup: {
      from: 'facilities',
      localField: 'facilities',
      foreignField: '_id',
      as: 'facilities'
    }
  },
  {
    $lookup: {
      from: 'users',
      localField: 'vendorId',
      foreignField: '_id',
      as: 'vendor'
    }
  },
  // { $unwind: { path: '$categories', preserveNullAndEmptyArrays: true } },
  { $unwind: { path: '$vendor', preserveNullAndEmptyArrays: true } },
  { $unwind: { path: '$startLocation', preserveNullAndEmptyArrays: true } },
  // { $unwind: { path: '$activities', preserveNullAndEmptyArrays: true } },
  // { $unwind: { path: '$facilities', preserveNullAndEmptyArrays: true } },
  {
    $group: {
      _id: '$_id',
      isFeatured: {
        $first: '$isFeatured'
      },
      slug: {
        $first: '$slug'
      },
      photoIds: {
        $first: '$photoIds'
      },
      title: {
        $first: '$title'
      },
      description: {
        $first: '$description'
      },
      duration: {
        $first: '$duration'
      },
      date: {
        $first: '$date'
      },
      startDate: {
        $first: '$startDate'
      },
      endDate: {
        $first: '$endDate'
      },
      status: {
        $first: '$status'
      },
      price: {
        $first: '$price'
      },
      cancellationPolicy: {
        $first: '$cancellationPolicy'
      },
      coordinates: {
        $first: '$location.coordinates'
      },
      type: {
        $first: '$type'
      },
      totalReviews: {
        $first: '$totalReviews'
      },
      totalRating: {
        $first: '$totalRating'
      },
      averageRating: {
        $first: '$averageRating'
      },
      startLocation: {
        $first: '$startLocation'
      },
      Location: {
        $first: '$Locations'
      },
      categories: {
        $first: '$categories'
      },
      facilities: {
        $first: '$facilities'
      },
      activities: {
        $first: '$activities'
      },
      vendor: {
        $first: '$vendor'
      },
      contact: {
        $first: '$contact'
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

  return Trip.aggregate(pipeline).exec()
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

function getone(tripIdentifier) {
  let match = { isActive: true };
  if (tripIdentifier instanceof mongoose.Types.ObjectId || typeof tripIdentifier === 'string') {
    match._id = mongoose.Types.ObjectId(tripIdentifier);
  }

  if (tripIdentifier.slug) {
    match.slug = tripIdentifier.slug;
  }

  let pipeline = [{
    $match: match
  },
  {
    $lookup: {
      from: 'categories',
      localField: 'categories',
      foreignField: '_id',
      as: 'categories'
    }
  },
  {
    $lookup: {
      from: 'locations',
      localField: 'startLocation',
      foreignField: '_id',
      as: 'startLocation'
    }
  },
  {
    $lookup: {
      from: 'locations',
      localField: 'Locations',
      foreignField: '_id',
      as: 'Locations'
    }
  },
  {
    $lookup: {
      from: 'activities',
      localField: 'activities',
      foreignField: '_id',
      as: 'activities'
    }
  },
  {
    $lookup: {
      from: 'facilities',
      localField: 'facilities',
      foreignField: '_id',
      as: 'facilities'
    }
  },
  {
    $lookup: {
      from: 'users',
      localField: 'vendorId',
      foreignField: '_id',
      as: 'users'
    }
  },
  // { $unwind: { path: '$categories', preserveNullAndEmptyArrays: true } },
  { $unwind: { path: '$startLocation', preserveNullAndEmptyArrays: true } },
  // { $unwind: { path: '$activities', preserveNullAndEmptyArrays: true } },
  // { $unwind: { path: '$facilities', preserveNullAndEmptyArrays: true } },
  { $unwind: { path: '$users', preserveNullAndEmptyArrays: true } },
  {
    $project: {
      _id: 1,
      photoIds: 1,
      title: 1,
      slug: 1,
      // shortDescription: 1,
      description: 1,
      duration: 1,
      price: 1,
      date: 1,
      startDate: 1,
      itinerary: 1,
      endDate: 1,
      status: 1,
      type: 1,
      isFeatured: 1,
      totalReviews: 1,
      totalRating: 1,
      averageRating: 1,
      // vendorId: 1,
      vendor: '$users',
      contact: 1,
      cancellationPolicy: 1,
      coordinates: '$location.coordinates',
      startLocation: '$startLocation',
      Locations: '$Locations',
      categories: '$categories',
      activities: '$activities',
      facilities: '$facilities'
    }
  }
  ];
  return Trip.aggregate(pipeline).exec()
    .then(_.head);
}

function findById(tripId) {
  return Trip.findOne({
    _id: tripId
  })
    .lean();
}

function update(payload) {
  let trip = {
    title: payload.title,
    slug: payload.slug,
    description: payload.description,
    isFeatured: payload.isFeatured,
    startLocation: payload.startLocation,
    Locations: payload.Locations,
    facilities: payload.facilities,
    categories: payload.categories,
    cancellationPolicy: payload.cancellationPolicy,
    activities: payload.activities,
    duration: payload.duration,
    price: payload.price,
    date: payload.date,
    type: payload.type,
    contact: payload.contact,
    updatedBy: payload.updatedBy
  };
  trip = _.omitBy(trip, _.isUndefined);
  return Trip.update({
    _id: payload.tripId
  }, {
    $set: trip
  });
}

function updateStatus(payload) {
  let trip = {
    status: payload.status,
    updatedBy: payload.updatedBy
  };
  trip = _.omitBy(trip, _.isUndefined);
  return Trip.update({
    _id: payload.tripId
  }, {
    $set: trip
  });
}

function tripPhoto(payload) {
  let trip = {
    photoIds: payload.photoId
  };
  trip = _.omitBy(trip, _.isUndefined);
  return Trip.update({
    _id: payload.tripId
  }, {
    $set: trip

  });
}

function tripItinerary(payload) {
  let trip = {
    itinerary: payload.itinerary
  };
  trip = _.omitBy(trip, _.isUndefined);
  return Trip.update({
    _id: payload.tripId
  }, {
    $set: trip
  });
}

function getAll(payload) {
  let matchObj = { isActive: true };
  let payloadSkip = payload.skip;
  let payloadPageSize = payload.pageSize;

  if (payload.pageSize === 0) {
    payloadSkip = 0;
    payloadPageSize = { $size: '$data' };
  }

  let durationFilter = {};
  if (payload.durationFrom) {
    durationFilter['$gte'] = payload.durationFrom;
  }
  if (payload.durationTo) {
    durationFilter['$lte'] = payload.durationTo;
  }
  let filters = {
    status: payload.status,
    '$text': payload.keywords ? {
      $search: payload.keywords
    } : undefined,
    duration: _.keys(durationFilter).length ? durationFilter : undefined
  };
  if (payload.isFeatured) {
    filters.isFeatured = JSON.parse(payload.isFeatured);
  }
  if (payload.startLocation && payload.startLocation.length !== 0) {
    payload.startLocation = JSON.parse(payload.startLocation);
    for (let i = 0; i < payload.startLocation.length; i++) {
      payload.startLocation[i] = mongoose.Types.ObjectId(payload.startLocation[i]);
    }
    filters.startLocation = { $in: payload.startLocation };
  }
  if (payload.Locations && payload.Locations.length !== 0) {
    payload.Locations = JSON.parse(payload.Locations);
    for (let i = 0; i < payload.Locations.length; i++) {
      payload.Locations[i] = mongoose.Types.ObjectId(payload.Locations[i]);
    }
    filters.Locations = { $in: payload.Locations };
  }
  if (payload.categories && payload.categories.length !== 0) {
    payload.categories = JSON.parse(payload.categories);
    for (let i = 0; i < payload.categories.length; i++) {
      payload.categories[i] = mongoose.Types.ObjectId(payload.categories[i]);
    }
    filters.categories = { $in: payload.categories };
  }
  if (payload.activities) {
    payload.activities = mongoose.Types.ObjectId(payload.activities);
    filters.activities = { $eq: payload.activities };
  }
  if (payload.facilities) {
    payload.facilities = mongoose.Types.ObjectId(payload.facilities);
    filters.facilities = { $eq: payload.facilities };
  }
  if (payload.vendor) {
    payload.vendor = mongoose.Types.ObjectId(payload.vendor);
    filters.vendorId = { $eq: payload.vendor };
  }
  if (payload.priceFrom || payload.priceTo) {
    filters['price'] = {};
  }
  if (payload.priceFrom) {
    filters['price'].$gte = payload.priceFrom;
  }
  if (payload.priceTo) {
    filters['price'].$lte = payload.priceTo;
  }
  if (payload.dateFrom || payload.dateTo) {
    filters['date'] = {};
  }
  if (payload.dateFrom) {
    filters['date'].$gte = parseInt(moment(payload.dateFrom));
  }
  if (payload.dateTo) {
    filters['date'].$lte = parseInt(moment(payload.dateTo));
  }

  filters = _.omitBy(filters, _.isUndefined);

  let pipeline = [{
    $match: filters
  },
  {
    $match: matchObj
  },
  {
    $lookup: {
      from: 'locations',
      localField: 'startLocation',
      foreignField: '_id',
      as: 'startLocation'
    }
  },
  {
    $lookup: {
      from: 'locations',
      localField: 'Locations',
      foreignField: '_id',
      as: 'Locations'
    }
  },
  {
    $lookup: {
      from: 'activities',
      localField: 'activities',
      foreignField: '_id',
      as: 'activities'
    }
  },
  {
    $lookup: {
      from: 'categories',
      localField: 'categories',
      foreignField: '_id',
      as: 'categories'
    }
  },
  {
    $lookup: {
      from: 'facilities',
      localField: 'facilities',
      foreignField: '_id',
      as: 'facilities'
    }
  },
  {
    $lookup: {
      from: 'users',
      localField: 'vendorId',
      foreignField: '_id',
      as: 'users'
    }
  },
  // {
  //   $unwind: { path: '$facilities', preserveNullAndEmptyArrays: true }
  // },
  // {
  //   $unwind: { path: '$categories', preserveNullAndEmptyArrays: true }
  // },
  // {
  //   $unwind: { path: '$activities', preserveNullAndEmptyArrays: true }
  // },
  {
    $unwind: { path: '$startLocation', preserveNullAndEmptyArrays: true }
  },
  {
    $unwind: { path: '$users', preserveNullAndEmptyArrays: true }
  },
  {
    $group: {
      _id: '$_id',
      isFeatured: {
        $first: '$isFeatured'
      },
      slug: {
        $first: '$slug'
      },
      photoIds: {
        $first: '$photoIds'
      },
      title: {
        $first: '$title'
      },
      description: {
        $first: '$description'
      },
      duration: {
        $first: '$duration'
      },
      date: {
        $first: '$date'
      },
      price: {
        $first: '$price'
      },
      cancellationPolicy: {
        $first: '$cancellationPolicy'
      },
      status: {
        $first: '$status'
      },
      contact: {
        $first: '$contact'
      },
      totalReviews: {
        $first: '$totalReviews'
      },
      totalRating: {
        $first: '$totalRating'
      },
      averageRating: {
        $first: '$averageRating'
      },
      itinerary: {
        $first: '$itinerary'
      },
      vendor: {
        $first: '$users'
      },
      startLocation: {
        $first: '$startLocation'
      },
      Locations: {
        $first: '$Locations'
      },
      categories: {
        $first: '$categories'
      },
      facilities: {
        $first: '$facilities'
      },
      activities: {
        $first: '$activities'
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

  return Trip.aggregate(pipeline).exec()
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

function removeTripPhoto(payload) {
  let trip = {
    photoIds: payload.photoId
  };
  trip = _.omitBy(trip, _.isUndefined);
  return Trip.update({
    _id: payload.tripId
  }, {
    $pull: trip

  });
}

function submitReview(payload) {
  let trip = {
    totalReviews: payload.totalReviews,
    totalRating: payload.totalRating,
    averageRating: payload.averageRating
  };
  trip = _.omitBy(trip, _.isUndefined);
  return Trip.update({
    _id: payload.tripId
  }, {
    $set: trip
  });
}

function remove(payload) {
  let trip = {
    isActive: false
  };
  trip = _.omitBy(trip, _.isUndefined);
  return Trip.update({
    _id: payload.tripId
  }, {
    $set: trip
  });
}
