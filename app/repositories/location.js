'use strict';

const Location = require('../models/Location');
const Surrounding = require('../models/Surrounding');

// const Event = require('../models/Event');
// const moment = require('moment');
const _ = require('lodash');
const mongoose = require('mongoose');

module.exports = {
  create,
  get,
  findOneAndUpdate,
  countLocation,
  findById,
  update,
  remove,
  findByName,
  updatePrices,
  findByIds,
  getone,
  getSingleById,
  addPhoto,
  removePhoto,
  findDetails,
  getByName,
  submitReview,
  createSurr,
  getSurrByName,
  getAllSurr,
  updateSurr,
  findSurrById,
  removeSurr,
  getNearByLocations
};

async function create(payload) {
  let data = {
    name: payload.name,
    alias: payload.alias,
    description: payload.description,
    longDescription: payload.longDescription,
    gettingThere: payload.gettingThere,
    whatToDo: payload.whatToDo,
    timeToVisit: payload.timeToVisit,
    whereToStay: payload.whereToStay,
    additionalInformation: payload.additionalInformation,
    locationType: payload.locationType,
    location: payload.location,
    parentCategories: payload.parentCategories,
    parentActivities: payload.parentActivities,
    parentProvince: payload.parentProvince,
    weatherId: payload.weatherId,
    isFeatured: payload.isFeatured,
    surroundings: payload.surroundings
  };

  data.slug = _.kebabCase(payload.name);
  data.url = '/location/' + data.slug;
  data.createdBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return Location.create(data);
}

function get(payload) {

  let payloadSkip = payload.skip;
  let payloadPageSize = payload.pageSize;
  if (payload.pageSize === 0) {
    payloadSkip = 0;
    payloadPageSize = { $size: '$data' };
  }

  let matchObj = { isActive: true };
  if (payload && payload.search) {
    var search = payload.search;
    matchObj['name'] = new RegExp(search, 'i');
  }
  if (payload && payload.locationType !== undefined) {
    matchObj['locationType'] = payload.locationType;
  }
  if (payload.parentCategories && payload.parentCategories.length !== 0) {
    for (let i = 0; i < payload.parentCategories.length; i++) {
      payload.parentCategories[i] = mongoose.Types.ObjectId(payload.parentCategories[i]);
    }
    matchObj.parentCategories = { $in: payload.parentCategories };
  }
  if (payload.parentActivities && payload.parentActivities.length !== 0) {
    for (let i = 0; i < payload.parentActivities.length; i++) {
      payload.parentActivities[i] = mongoose.Types.ObjectId(payload.parentActivities[i]);
    }
    matchObj.parentActivities = { $in: payload.parentActivities };
  }

  if (payload && payload.parentProvince !== undefined) {
    matchObj['parentProvince'] = payload.parentProvince;
  }
  if (payload.isFeatured) {
    if (payload.isFeatured === 'true' || payload.isFeatured === true) {
      matchObj.isFeatured = true;
    } else if (payload.isFeatured === 'false' || payload.isFeatured === false) {
      matchObj.isFeatured = false;
    }
  }

  matchObj = _.omitBy(matchObj, _.isUndefined);
  console.log(matchObj);
  let pipeline = [{
    $match: matchObj
  },
  {
    $sort: { createdAt: -1 }
  },
  {
    $project: {
      _id: 1,
      isActive: 1,
      name: 1,
      alias: 1,
      locationType: 1,
      type: 1,
      description: 1,
      longDescription: 1,
      gettingThere: 1,
      whatToDo: 1,
      timeToVisit: 1,
      whereToStay: 1,
      additionalInformation: 1,
      slug: 1,
      url: 1,
      photoIds: 1,
      location: 1,
      parentActivities: 1,
      parentCategories: 1,
      parentProvince: 1,
      flightId: 1,
      trainId: 1,
      weatherId: 1,
      isFeatured: 1,
      surroundings: 1
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
  return Location.aggregate(pipeline).exec()
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

// Function to count
async function countLocation(location) {
  // let currentDate = moment().tz('Asia/Karachi').valueOf();
  let countTemp = 0;
  // countTemp = await Event.count({
  //   locations: location, status: 'published',
  //   $or: [{
  //     'availability.date': { $gte: currentDate }
  //   }, {
  //     'availability.type': 'weekly'
  //   },
  //   {
  //     'availability.type': 'fixedDate'
  //   }]
  // });
  return countTemp;
}

function findOneAndUpdate(locationObject) {
  return Location.findOneAndUpdate(
    { _id: locationObject._id },
    { tripCount: locationObject.tripCount }
  );
}

function findById(locationId) {
  return Location.findOne({
    _id: locationId
  })
    .lean();
}

function update(payload) {
  let data = {
    name: payload.name,
    alias: payload.alias,
    description: payload.description,
    locationType: payload.locationType,
    location: payload.location,
    longDescription: payload.longDescription,
    gettingThere: payload.gettingThere,
    whatToDo: payload.whatToDo,
    timeToVisit: payload.timeToVisit,
    whereToStay: payload.whereToStay,
    additionalInformation: payload.additionalInformation,
    parentCategories: payload.parentCategories,
    parentActivities: payload.parentActivities,
    parentProvince: payload.parentProvince,
    weatherId: payload.weatherId,
    isFeatured: payload.isFeatured,
    surroundings: payload.surroundings
  };
  // data.slug = _.kebabCase(payload.name);
  // data.url = '/location/' + data.slug;
  data.updatedBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return Location.update({
    _id: payload.locationId
  }, {
    $set: data
  });
}
function remove(payload) {
  let data = {
    isActive: false
  };
  return Location.update({
    _id: payload.locationId
  }, {
    $set: data
  });
}

function findByName(payload) {
  let search = new RegExp(payload, 'i');
  return Location.find({ name: search }, { name: 1 }).lean(true);
}

async function updatePrices(locationObject) {
  let locationId = locationObject._id;
  let minPrice = locationObject.min;
  let maxPrice = locationObject.max;

  return Location.findOneAndUpdate(
    { _id: locationId },
    {
      'price.highest': maxPrice,
      'price.lowest': minPrice
    }
  );
}

function findByIds(locationIds, projection) {
  return Location.find({ '_id': { $in: locationIds } })
    .select(projection)
    .lean();
}

function getone(locationId) {
  return Location.find({ '_id': { $in: locationId } })
    .lean();
}
function getSingleById(locationId) {
  return Location.findOne({ '_id': { $in: locationId } })
    .lean();
}

function addPhoto(payload) {
  let data = {
    photoIds: payload.photoId
  };

  return Location.update({
    _id: payload.locationId
  }, {
    $push: data
  });
}

function removePhoto(payload) {
  let data = {
    photoIds: payload.photoId
  };

  return Location.update({
    _id: payload.locationId
  }, {
    $pull: data
  });
}

function findDetails(identifier) {

  let match = {};

  if (identifier.slug) {
    match.slug = identifier.slug;
  }

  if (identifier.id) {
    match._id = mongoose.Types.ObjectId(identifier.id);
  }

  let pipeline = [
    {
      $match: match
    },
    {
      $project: {
        _id: 1,
        isActive: 1,
        name: 1,
        alias: 1,
        locationType: 1,
        type: 1,
        description: 1,
        longDescription: 1,
        slug: 1,
        url: 1,
        photoIds: 1,
        location: 1,
        weatherId: 1,
        isFeatured: 1,
        surroundings: 1
      }
    }
  ];
  return Location.aggregate(pipeline).exec()
    .then(_.head);
}

function getByName(payload) {
  // let search = new RegExp(payload, 'i');
  return Location.find({ name: payload }, { name: 1 }).lean(true);
}

function submitReview(payload) {
  let data = {
    totalRating: payload.totalRating,
    averageRating: payload.averageRating,
    totalReviews: payload.totalReviews
  };
  data = _.omitBy(data, _.isUndefined);
  return Location.update({
    _id: payload.locationId
  }, {
    $set: data
  });
}

async function createSurr(payload) {
  let data = {
    name: payload.name.toLowerCase(),
    iconName: payload.iconName,
    typeKey: payload.typeKey
  };
  data.createdBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return Surrounding.create(data);
}

function getSurrByName(payload) {
  let search = payload.toLowerCase();
  return Surrounding.find({ name: search }, { name: 1 }).lean(true);
}

function findSurrById(payload) {
  return Surrounding.findOne({ '_id': payload })
    .lean();
}

function getAllSurr(payload) {

  let payloadSkip = payload.skip;
  let payloadPageSize = payload.pageSize;
  if (payload.pageSize === 0) {
    payloadSkip = 0;
    payloadPageSize = { $size: '$data' };
  }

  let matchObj = {};
  if (payload && payload.search) {
    var search = payload.search;
    matchObj['name'] = new RegExp(search, 'i');
  }

  matchObj = _.omitBy(matchObj, _.isUndefined);
  let pipeline = [{
    $match: matchObj
  },
  {
    $sort: { createdAt: -1 }
  },
  {
    $project: {
      _id: 1,
      name: 1,
      iconName: 1,
      typeKey: 1
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
  return Surrounding.aggregate(pipeline).exec()
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

function updateSurr(payload) {
  let data = {
    name: payload.name.toLowerCase(),
    iconName: payload.iconName,
    typeKey: payload.typeKey
  };
  data.updatedBy = payload.auth.userId;
  data = _.omitBy(data, _.isUndefined);
  return Surrounding.update({
    _id: payload.surrId
  }, {
    $set: data
  });
}

function removeSurr(payload) {
  return Surrounding.remove({
    _id: payload.surrId
  });
}

function getNearByLocations(payload) {
  let typeQuery = {};
  if (payload && payload.locationType) {
    typeQuery['locationType'] = payload.locationType;
  }

  return Location.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates: payload.coordinates },
        maxDistance: 50000,
        distanceField: 'dist.calculated',
        query: typeQuery,
        spherical: true
      }
    }
  ]);
}
