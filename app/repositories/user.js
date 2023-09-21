'use strict';

const User = require('../models/User');
const enums = require('../enums');
const moment = require('moment');
const _ = require('lodash');
const mongoose = require('mongoose');

module.exports = {
  create,
  saveSocialInfo,
  saveProfile,
  savePassword,
  setResetPasswordCode,
  updateMisc,
  getMisc,
  findById,
  findByEmail,
  findByCustomerEmail,
  findByUniEmail,
  findByResetPasswordCode,
  findByIds,
  findByTypeCount,
  findByType,
  findVendorById,
  updateVendorRating,
  getVendorRating,
  setVerificationCode,
  saveVerify,
  findByMobile,
  addReferral,
  findOneAndUpdate,
  getAllUserRegistrationIds,
  addToWish,
  deleteAll,
  deleteWishListEvent,
  removeWishList,
  getUserWishlist,
  findAll,
  getTopRatedVendors,
  addToPlan,
  getUserPlan,
  removePlan,
  addPhoto,
  removePhoto,
  updateStatus,
  update,
  remove
};

const defaultProjection = '_id type accounts profile address university misc createdBy ratingAverage verify photoIds isActive vendorType bankDetails';
const vendorProjection = 'profile.companyName profile.description profile.profilePhotoId facebook twitter ratingTotal ratingCount ratingAverage bankDetails';

function create(payload) {
  let user = {
    accounts: {
      email: _.toLower(payload.email),
      [enums.auth.social.local]: {
        password: payload.hash
      }
    },
    profile: payload.profile,
    createdBy: payload.createdBy,
    type: payload.type,
    vendorType: payload.vendorType
  };

  user = _.omitBy(user, _.isUndefined);
  return User.create(user);
  // switch (payload.type) {
  // case enums.user.type.admin:
  // return User.Admin.create(user);
  // case enums.user.type.vendor:
  //   return User.Vendor.create(user);
  // case enums.user.type.customer:
  // return User.Customer.create(user);

  // default:
  // throw new Error('Invalid user type');
  // }
}

function saveSocialInfo(payload) {
  return User.update({
    _id: payload.userId
  }, {
    $set: {
      [`accounts.${payload.social}`]: payload.info
    }
  }, {
    new: true
  });
}

function saveProfile(payload) {

  payload.profile = _.omitBy(payload.profile, _.isUndefined);
  payload.address = _.omitBy(payload.address, _.isUndefined);

  let user = {
    profile: payload.profile,
    address: payload.address
  };

  user = _.omitBy(user, _.isUndefined);
  switch (payload.type) {
    case enums.user.type.admin:
      return User.update({ _id: payload.userId }, { $set: user });

      // case enums.user.type.vendor:
      // return User.Vendor.update({ _id: payload.userId }, { $set: user });

    case enums.user.type.customer:
      return User.update({ _id: payload.userId }, { $set: user });

    default:
      throw new Error('Invalid user type');
  }
}

function savePassword(payload) {
  let user = {
    [`accounts.${enums.auth.social.local}.password`]: payload.hash,
    'misc.resetPasswordCode': null,
    'misc.resetPasswordCodeExpiry': null
  };

  user = _.omitBy(user, _.isUndefined);

  return User.update({
    _id: payload.userId
  }, {
    $set: user
  });
}

function setResetPasswordCode(userId, code) {
  return User.update({
    _id: userId
  }, {
    $set: {
      'misc.resetPasswordCode': code,
      'misc.resetPasswordCodeExpiry': code ? moment().add(2, 'hours').valueOf() : null // TODO: Move duration to config
    }
  });
}

function updateMisc(userId, misc) {
  let setter = {
    'misc.lastQuestionAt': misc.lastQuestionAt
  };

  setter = _.omitBy(setter, _.isUndefined);

  return User.update({
    _id: userId
  }, {
    $set: setter
  });
}

function getMisc(userId) {
  return User.findOne({ '_id': userId }, 'misc');
}

function findById(userId) {
  return User.findOne({ '_id': userId, isActive: true })
    .select(defaultProjection)
    .lean();
}

function findVendorById(vendorId) {
  return User.findOne({ '_id': vendorId })
    .select(vendorProjection)
    .lean();
}

function findByEmail(email) {
  return User.findOne({ 'accounts.email': _.toLower(email) })
    .lean();
}

function findByCustomerEmail(email) {
  return User.findOne({ 'accounts.email': _.toLower(email), 'type': 'customer' })
    .lean();
}

function findByUniEmail(email) {
  return User.findOne({ 'university.email': _.toLower(email), 'university.verified': true })
    .lean();
}

function findByResetPasswordCode(code) {
  return User.findOne({
    'misc.resetPasswordCode': code,
    'misc.resetPasswordCodeExpiry': {
      $gte: moment().valueOf()
    }
  })
    .lean();
}

function findByIds(userIds, projection) {
  return User.find({ '_id': { $in: userIds } })
    .select(projection || defaultProjection)
    .lean();
}

function findByTypeCount(payload) {
  let matchObj = {isActive: true};

  if (payload.type !== undefined) {
    matchObj.type = { $in: JSON.parse(payload.type)};
  }
  if (payload && payload.keywords) {
    var keywords = payload.keywords;
    matchObj['profile.firstName'] = new RegExp(keywords);
  }
  return User.find(matchObj)
    .count();
}

function findByType(payload) {
  let matchObj = { isActive: true };
  if (payload.pageSize === 0) {
    payload.skip = false;
    payload.pageSize = false;
  }
  if (payload && payload.keywords) {
    var keywords = payload.keywords;
    matchObj['profile.firstName'] = new RegExp(keywords);
  }
  if (payload.type !== undefined) {
    matchObj.type = { $in: JSON.parse(payload.type)};
  }
  return User.find(matchObj)
    .select(defaultProjection)
    .sort('+accounts.email')
    .sort({createdAt: -1})
    .skip(payload.skip)
    .limit(payload.pageSize)
    .lean();
}

function updateVendorRating(vendorId, data) {
  return User.update({
    _id: vendorId
  }, {
    $set: {
      ratingTotal: data.total,
      ratingCount: data.count,
      ratingAverage: data.average
    }
  });
}

function getVendorRating(userId) {
  return User.findOne({ '_id': userId })
    .select('_id ratingTotal ratingCount ratingAverage')
    .lean();
}

function findByMobile(mobile) {
  return User.findOne({ 'profile.mobile': mobile })
    .lean();
}

function setVerificationCode(userId, code, mobile) {
  return User.update({
    _id: userId
  }, {
    $set: {
      'profile.mobile': '',
      'verify.verificationCode': code,
      'verify.verificationCodeExpiry': code ? moment().add(5, 'minutes').valueOf() : null, // TODO: Move duration to config
      'verify.mobile': mobile,
      'verify.verified': false
    }
  });
}

function saveVerify(payload) {
  let user = {
    'profile.mobile': payload.mobile,
    'verify.verified': true,
    'verify.verificationCode': null,
    'verify.verificationCodeExpiry': null,
    'verify.mobile': null
  };

  user = _.omitBy(user, _.isUndefined);
  return User.update({
    _id: payload.userId
  }, {
    $set: user
  });
}
function addReferral(userId, referral) {
  return User.update({
    _id: userId
  }, {
    $push: { referrals: referral }
  });

}

function findOneAndUpdate(payload) {
  let query = { '_id': payload._id };
  let registrationToken = payload.registrationToken;
  switch (payload.type) {
    case enums.user.type.admin:
      return User.update(query, { $set: { 'profile.registrationToken.registrationToken': registrationToken } });
    case enums.user.type.vendor:
      return User.update(query, { $set: { 'profile.registrationToken.registrationToken': registrationToken } });
    case enums.user.type.customer:
      return User.update(query, { $set: { 'profile.registrationToken.registrationToken': registrationToken } });
    default:
      throw new Error('Invalid user type');
  }
}

function getAllUserRegistrationIds() {
  return User.find(
    { 'profile.registrationToken.registrationToken': { $exists: true } },
    { _id: 0, 'profile.registrationToken': 1, type: 0 })
    .lean(true); // , registrationToken: 1
}
async function addToWish(payload) {
  let query = {
    '_id': payload.auth.userId
  };
  let tripId = payload.tripId;
  let eventId = payload.eventId;
  let activityId = payload.activityId;
  let locationId = payload.locationId;
  let categoryId = payload.categoryId;
  let accommodationId = payload.accommodationId;

  if (tripId) {
    return User.updateOne(query, { $addToSet: { 'wishlist.trips': tripId } });
  }else if (eventId) {
    return User.updateOne(query, { $addToSet: { 'wishlist.events': eventId } });
  } else if (activityId) {
    return User.updateOne(query, { $addToSet: { 'wishlist.activities': activityId } });

  } else if (locationId) {
    return User.updateOne(query, { $addToSet: { 'wishlist.locations': locationId } });
  } else if (categoryId) {
    return User.updateOne(query, { $addToSet: { 'wishlist.categories': categoryId } });
  } else if (accommodationId) {
    return User.update(query, { $addToSet: { 'wishlist.accommodations': accommodationId } });
  }
}

async function deleteAll(payload) {
  let query = { '_id': payload.auth.userId };
  return User.update(query, { $pull: { 'wishlist': { $exists: true } } }, { multi: true });
}

async function deleteWishListEvent(payload) {
  let query = { '_id': payload.auth.userId };
  return User.update(query, { $pull: { 'wishlist.events': payload.tripId } }, { multi: true });

}

async function removeWishList(payload) {
  let query = {
    '_id': payload.auth.userId
  };
  let tripId = payload.tripId;
  let eventId = payload.eventId;
  let activityId = payload.activityId;
  let locationId = payload.locationId;
  let categoryId = payload.categoryId;
  let accommodationId = payload.accommodationId;

  if (tripId) {
    return User.updateOne(query, { $pull: { 'wishlist.trips': tripId } }, { multi: true });
  } else if (eventId) {
    return User.updateOne(query, { $pull: { 'wishlist.events': eventId } }, { multi: true });

  } else if (activityId) {
    return User.updateOne(query, { $pull: { 'wishlist.activities': activityId } }, { multi: true });

  } else if (locationId) {
    return User.updateOne(query, { $pull: { 'wishlist.locations': locationId } }, { multi: true });
  } else if (categoryId) {
    return User.updateOne(query, { $pull: { 'wishlist.categories': categoryId } }, { multi: true });
  } else if (accommodationId) {
    return User.updateOne(query, { $pull: { 'wishlist.accommodations': accommodationId } }, { multi: true });
  }
}

function getUserWishlist(payload) {
  let query = { '_id': mongoose.Types.ObjectId(payload.userId) };
  let pipeline = [
    {
      $match: query
    },
    {
      $project:
      {
        'wishlist.trips': 1,
        'wishlist.events': 1,
        'wishlist.activities': 1,
        'wishlist.locations': 1,
        'wishlist.categories': 1,
        'wishlist.accommodations': 1
      }
    },
    {
      $lookup: {
        from: 'trips',
        localField: 'wishlist.trips',
        foreignField: '_id',
        as: 'trips'
      }
    },
    {
      $lookup: {
        from: 'events',
        localField: 'wishlist.events',
        foreignField: '_id',
        as: 'events'
      }
    },
    {
      $lookup: {
        from: 'tags',
        localField: 'wishlist.activities',
        foreignField: '_id',
        as: 'activities'
      }
    },
    {
      $lookup: {
        from: 'locations',
        localField: 'wishlist.locations',
        foreignField: '_id',
        as: 'locations'
      }
    },
    {
      $lookup: {
        from: 'tags',
        localField: 'wishlist.categories',
        foreignField: '_id',
        as: 'categories'
      }
    },
    {
      $lookup: {
        from: 'hotels',
        localField: 'wishlist.accommodations',
        foreignField: '_id',
        as: 'accommodations'
      }
    },
    {
      $unwind: { path: '$wishlist.trips', preserveNullAndEmptyArrays: true }
    },
    {
      $unwind: { path: '$wishlist.activities', preserveNullAndEmptyArrays: true }
    },
    {
      $unwind: { path: '$wishlist.locations', preserveNullAndEmptyArrays: true }
    },
    {
      $unwind: { path: '$wishlist.categories', preserveNullAndEmptyArrays: true }
    },
    {
      $unwind: { path: '$wishlist.accommodations', preserveNullAndEmptyArrays: true }
    }
    // ,
    // {
    //   $project: {
    //     _id: 0,
    //     events: { $arrayElemAt: ['$events', 0] },
    //     activities: { $arrayElemAt: ['$activities', 0] },
    //     locations: { $arrayElemAt: ['$locations', 0] },
    //     categories: { $arrayElemAt: ['$categories', 0] },
    //     accommodations: { $arrayElemAt: ['$accommodations', 0] }

    //   }
    // },
    // {
    //   $group: {
    //     _id: null,
    //     events: { $push: '$$ROOT.events' },
    //     activities: { $push: '$$ROOT.activities' },
    //     locations: { $push: '$$ROOT.locations' },
    //     categories: { $push: '$$ROOT.categories' },
    //     accommodations: { $push: '$$ROOT.accommodations' }
    //   }
    // }
  ];
  return User.aggregate(pipeline).exec()
    .then((response) => {
      if (response[0]) {
        return response[0];
      } else {
        return response;
      }
    });
}

function findAll() {
  return User.find()
    .select(defaultProjection)
    .sort('+accounts.email')
    .lean();
}

function getTopRatedVendors() {
  // return User.Vendor.find()
  // .select('_id ratingTotal ratingCount ratingAverage')
  // .sort('-ratingCount')
  // .lean();

  let pipeline = [
    {
      $project: {
        _id: '$_id',
        ratingTotal: '$ratingTotal',
        ratingCount: '$ratingCount',
        ratingAverage: '$ratingAverage'
      }
    },
    {
      $sort: {
        ratingCount: -1
      }
    },
    // { $limit: 10},
    {
      $lookup: {
        from: 'trips',
        localField: '_id',
        foreignField: 'vendorId',
        as: 'trips'
      }
    },
    {
      $unwind: '$trips'
    },
    {
      $group: {
        _id: '$_id',
        trips: { $addToSet: '$trips._id' },
        count: { $sum: 1 }
      }
    },
    {
      $sort: {
        count: -1
      }
    }
  ];
  return User.aggregate(pipeline).exec()
    .then((response) => {
      return response;
    });
}

async function addToPlan(payload) {
  let query = {
    '_id': payload.auth.userId
  };
  let tripId = payload.tripId;
  let eventId = payload.eventId;
  let activityId = payload.activityId;
  let locationId = payload.locationId;
  let categoryId = payload.categoryId;
  let accommodationId = payload.accommodationId;

  if (tripId) {
    return User.updateOne(query, { $addToSet: { 'plan.trips': tripId } });
  } else if (eventId) {
    return User.updateOne(query, { $addToSet: { 'plan.events': eventId } });

  }else if (activityId) {
    return User.updateOne(query, { $addToSet: { 'plan.activities': activityId } });

  } else if (locationId) {
    return User.updateOne(query, { $addToSet: { 'plan.locations': locationId } });
  } else if (categoryId) {
    return User.updateOne(query, { $addToSet: { 'plan.categories': categoryId } });
  } else if (accommodationId) {
    return User.update(query, { $addToSet: { 'plan.accommodations': accommodationId } });
  }
}

function getUserPlan(payload) {
  let query = { '_id': mongoose.Types.ObjectId(payload.userId) };

  let pipeline = [
    {
      $match: query
    },
    {
      $project:
      {
        'plan.trips': 1,
        'plan.events': 1,
        'plan.activities': 1,
        'plan.locations': 1,
        'plan.categories': 1,
        'plan.accommodations': 1
      }
    },
    {
      $lookup: {
        from: 'trips',
        localField: 'plan.trips',
        foreignField: '_id',
        as: 'trips'
      }
    },
    {
      $lookup: {
        from: 'events',
        localField: 'plan.events',
        foreignField: '_id',
        as: 'events'
      }
    },
    {
      $lookup: {
        from: 'activities',
        localField: 'plan.activities',
        foreignField: '_id',
        as: 'activities'
      }
    },
    {
      $lookup: {
        from: 'locations',
        localField: 'plan.locations',
        foreignField: '_id',
        as: 'locations'
      }
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'plan.categories',
        foreignField: '_id',
        as: 'categories'
      }
    },
    {
      $lookup: {
        from: 'accommodations',
        localField: 'plan.accommodations',
        foreignField: '_id',
        as: 'accommodations'
      }
    },
    {
      $unwind: { path: '$plan.trips', preserveNullAndEmptyArrays: true }
    },
    {
      $unwind: { path: '$plan.activities', preserveNullAndEmptyArrays: true }
    },
    {
      $unwind: { path: '$plan.locations', preserveNullAndEmptyArrays: true }
    },
    {
      $unwind: { path: '$plan.categories', preserveNullAndEmptyArrays: true }
    },
    {
      $unwind: { path: '$plan.accommodations', preserveNullAndEmptyArrays: true }
    }
    // {
    //   $project: {
    //     _id: 0,
    //     trips: { $arrayElemAt: ['$plan.trips', 0] },
    //     activities: { $arrayElemAt: ['$plan.activities', 0] },
    //     locations: { $arrayElemAt: ['$plan.locations', 0] },
    //     categories: { $arrayElemAt: ['$plan.categories', 0] },
    //     accommodations: { $arrayElemAt: ['$plan.accommodations', 0] }

    //   }
    // },
    // {
    //   $group: {
    //     _id: null,
    //     trips: { $push: '$$ROOT.trips' },
    //     activities: { $push: '$$ROOT.activities' },
    //     locations: { $push: '$$ROOT.locations' },
    //     categories: { $push: '$$ROOT.categories' },
    //     accommodations: { $push: '$$ROOT.accommodations' }
    //   }
    // }
  ];
  return User.aggregate(pipeline).exec()
    .then((response) => {
      if (response[0]) {
        return response[0];
      } else {

        return response;
      }
    });
}

async function removePlan(payload) {
  let query = {
    '_id': payload.auth.userId
  };
  let tripId = payload.tripId;
  let eventId = payload.eventId;
  let activityId = payload.activityId;
  let locationId = payload.locationId;
  let categoryId = payload.categoryId;
  let accommodationId = payload.accommodationId;

  if (tripId) {
    return User.updateOne(query, { $pull: { 'plan.trips': tripId } }, { multi: true });
  } else if (eventId) {
    return User.updateOne(query, { $pull: { 'plan.events': eventId } }, { multi: true });

  } else if (activityId) {
    return User.updateOne(query, { $pull: { 'plan.activities': activityId } }, { multi: true });

  } else if (locationId) {
    return User.updateOne(query, { $pull: { 'plan.locations': locationId } }, { multi: true });
  } else if (categoryId) {
    return User.updateOne(query, { $pull: { 'plan.categories': categoryId } }, { multi: true });
  } else if (accommodationId) {
    return User.updateOne(query, { $pull: { 'plan.accommodations': accommodationId } }, { multi: true });
  }
}

function addPhoto(payload) {
  let data = {
    photoIds: payload.photoId
  };

  return User.update({
    _id: payload.userId
  }, {
    $push: data
  });
}

function removePhoto(payload) {
  let data = {
    photoIds: payload.photoId
  };

  return User.update({
    _id: payload.userId
  }, {
    $pull: data
  });
}

function updateStatus(payload) {
  let data = {
    verify: payload.verify
  };
  data = _.omitBy(data, _.isUndefined);
  return User.update({
    _id: payload.userId
  }, {
    $set: data
  });
};

function update(payload) {
  let data = {
    profile: payload.profile,
    bankDetails: payload.bankDetails,
    address: payload.address
  };
  data = _.omitBy(data, _.isUndefined);
  return User.update({
    _id: payload.userId
  }, {
    $set: data
  });
};

function remove(payload) {
  let data = {
    isActive: false
  };
  data = _.omitBy(data, _.isUndefined);
  return User.update({
    _id: payload.userId
  }, {
    $set: data
  });
};
