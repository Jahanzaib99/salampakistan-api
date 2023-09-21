'use strict';

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const enums = require('../enums');

// const options = { discriminatorKey: 'type' };

let userSchema = new mongoose.Schema({
  accounts: {
    email: {
      type: String,
      lowercase: true,
      index: {
        unique: true,
        sparse: true
      }
    },
    local: {
      password: String
    },
    facebook: {
      id: String,
      name: String,
      token: String
    },
    google: {
      id: String,
      name: String,
      token: String
    }
  },
  photoIds: [],
  misc: {
    lastQuestionAt: Number,
    resetPasswordCode: String,
    resetPasswordCodeExpiry: Number
  },
  verify: {
    verified: {
      type: Boolean,
      default: false
    },
    verificationCode: String,
    verificationCodeExpiry: Number,
    mobile: String
  },
  address: {
    street: {
      type: String
    },
    area: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zipCode: {
      type: String
    },
    country: {
      type: String
    }
  },
  bankDetails: {
    bankTitle: String,
    accountName: String,
    accountNumber: String
  },
  profile: {
    firstName: String,
    middleName: {
      type: String,
      default: ''
    },
    lastName: String,
    mobile: String,
    emergencyMobile: String,
    gender: String,
    nic: String,
    dob: Number,
    companyName: String
  },
  // createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  isActive: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    enums: enums.user.type,
    required: true
  },
  vendorType: {
    type: String,
    enums: enums.user.vendorType
  },
  wishlist: {
    trips: [{
      type: mongoose.Schema.ObjectId,
      ref: 'trips'
    }],
    events: [{
      type: mongoose.Schema.ObjectId,
      ref: 'events'
    }],
    activities: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Tags'
    }],
    locations: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Tags'
    }],
    categories: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Tags'
    }],
    accommodations: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Accommodation'
    }]
  }
  // plan: {
  //   trips: [{
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'trips'
  //   }],
  //   events: [{
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'events'
  //   }],
  //   activities: [{
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'activities'
  //   }],
  //   locations: [{
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'locations'
  //   }],
  //   categories: [{
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'categories'
  //   }],
  //   accommodations: [{
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'Accommodation'
  //   }]
  // }
});
userSchema.plugin(timestamps);

module.exports = mongoose.model('User', userSchema);

// let adminSchema = new mongoose.Schema({
//   profile: {
//     firstName: String,
//     middleName: { type: String, default: '' },
//     lastName: String,
//     mobile: String,
//     emergencyMobile: String,
//     gender: String,
//     nic: String,
//     dob: Number
//   }
// }, options);

// let customerSchema = new mongoose.Schema({
//   profile: {
//     firstName: String,
//     middleName: { type: String, default: '' },
//     lastName: String,
//     mobile: String,
//     emergencyMobile: String,
//     gender: String,
//     nic: String,
//     dob: Number
//   }
// }, options);

// const User = mongoose.model('User', userSchema);
// const Admin = User.discriminator(enums.user.type.admin, adminSchema);
// const Customer = User.discriminator(enums.user.type.customer, customerSchema);

// module.exports = {
// self: User
// Admin: Admin,
// Customer: Customer
// };
