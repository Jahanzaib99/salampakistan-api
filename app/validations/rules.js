'use strict';

const enums = require('../enums');
const messages = require('../messages');
const constants = require('../constants');
const url = require('url');
const util = require('util');
const moment = require('moment');
const _ = require('lodash');

const textRequired = (fieldName) => {
  return {
    type: 'string',
    required: true,
    allowEmpty: false,
    messages: {
      type: util.format(messages.validation.textRequired.empty, fieldName),
      required: util.format(messages.validation.textRequired.empty, fieldName),
      allowEmpty: util.format(messages.validation.textRequired.empty, fieldName)
    }
  };
};

const text = (fieldName) => {
  return {
    type: 'string',
    allowEmpty: false,
    messages: {
      type: util.format(messages.validation.textRequired.empty, fieldName),
      required: util.format(messages.validation.textRequired.empty, fieldName),
      allowEmpty: util.format(messages.validation.textRequired.empty, fieldName)
    }
  };
};

const socialMedia = {
  type: 'string',
  required: false,
  allowEmpty: true,
  pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
  messages: {
    type: messages.validation.socialMedia.type,
    pattern: messages.validation.socialMedia.invalid
  }
};

const social = {
  type: 'string',
  required: true,
  allowEmpty: false,
  enum: _.values(enums.auth.social),
  messages: {
    type: messages.validation.social.empty,
    required: messages.validation.social.empty,
    allowEmpty: messages.validation.social.empty,
    enum: messages.validation.social.validValue
  }
};

const deviceType = {
  type: 'string',
  required: true,
  enum: _.values(enums.auth.deviceType),
  messages: {
    type: messages.validation.deviceType.empty,
    required: messages.validation.deviceType.empty,
    enum: messages.validation.deviceType.validValue
  }
};

const type = {
  type: 'string',
  required: true,
  enum: _.values(enums.user.type),
  messages: {
    type: messages.validation.userType.empty,
    required: messages.validation.userType.empty,
    enum: messages.validation.userType.validValue
  }
};

const token = {
  type: 'string',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.token.empty,
    required: messages.validation.token.empty,
    allowEmpty: messages.validation.token.empty
  }
};

const userId = {
  type: 'string',
  required: true,
  pattern: '^[0-9a-fA-F]{24}$',
  messages: {
    type: messages.validation.userId.empty,
    required: messages.validation.userId.empty,
    pattern: messages.validation.userId.invalid
  }
};

const email = {
  type: 'string',
  required: true,
  format: 'email',
  messages: {
    type: messages.validation.email.empty,
    required: messages.validation.email.empty,
    format: messages.validation.email.invalid
  }
};

const password = {
  type: 'string',
  required: true,
  allowEmpty: false,
  minLength: 6,
  maxLength: 32,
  messages: {
    type: messages.validation.password.empty,
    required: messages.validation.password.empty,
    allowEmpty: messages.validation.password.empty,
    minLength: messages.validation.password.length,
    maxLength: messages.validation.password.length
  }
};

const oldPassword = {
  type: 'string',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.oldPassword.empty,
    required: messages.validation.oldPassword.empty,
    allowEmpty: messages.validation.oldPassword.empty
  }
};

const companyName = {
  type: 'string',
  required: true,
  allowEmpty: false,
  minLength: 3,
  maxLength: 40,
  messages: {
    type: messages.validation.companyName.empty,
    required: messages.validation.companyName.empty,
    allowEmpty: messages.validation.companyName.empty,
    minLength: messages.validation.companyName.length,
    maxLength: messages.validation.companyName.length
  }
};

const fullName = {
  type: 'string',
  required: true,
  allowEmpty: false,
  minLength: 2,
  maxLength: 50,
  messages: {
    type: messages.validation.fullName.empty,
    required: messages.validation.fullName.empty,
    allowEmpty: messages.validation.fullName.empty,
    minLength: messages.validation.fullName.length,
    maxLength: messages.validation.fullName.length
  }
};

const firstName = {
  type: 'string',
  required: true,
  allowEmpty: false,
  minLength: 2,
  maxLength: 50,
  messages: {
    type: messages.validation.firstName.empty,
    required: messages.validation.firstName.empty,
    allowEmpty: messages.validation.firstName.empty,
    minLength: messages.validation.firstName.length,
    maxLength: messages.validation.firstName.length
  }
};

const middleName = {
  type: 'string',
  required: false,
  allowEmpty: true,
  minLength: 2,
  maxLength: 50,
  messages: {
    type: messages.validation.middleName.empty,
    required: messages.validation.middleName.empty,
    allowEmpty: messages.validation.middleName.empty,
    minLength: messages.validation.middleName.length,
    maxLength: messages.validation.middleName.length
  }
};

const lastName = {
  type: 'string',
  required: true,
  allowEmpty: false,
  minLength: 2,
  maxLength: 50,
  messages: {
    type: messages.validation.lastName.empty,
    required: messages.validation.lastName.empty,
    allowEmpty: messages.validation.lastName.empty,
    minLength: messages.validation.lastName.length,
    maxLength: messages.validation.lastName.length
  }
};

const mobileInstuctor = {
  type: 'string',
  required: true,
  pattern: '^[0-9]{8,20}$',
  messages: {
    type: messages.validation.mobile.empty,
    required: messages.validation.mobile.empty,
    pattern: messages.validation.mobile.invalid
  }
};

const mobile = {
  type: 'string',
  required: true,
  pattern: '^[0-9]{8,15}$',
  messages: {
    type: messages.validation.mobile.empty,
    required: messages.validation.mobile.empty,
    pattern: messages.validation.mobile.invalid
  }
};

const emergencyMobile = {
  type: 'string',
  required: false,
  pattern: '^[0-9]{8,15}$',
  messages: {
    type: messages.validation.mobile.empty,
    required: messages.validation.mobile.empty,
    pattern: messages.validation.mobile.invalid
  }
};

const phone = {
  type: 'string',
  required: false,
  pattern: '^[0-9]{8,15}$',
  messages: {
    type: messages.validation.mobile.invalid,
    pattern: messages.validation.mobile.pattern
  }
};

const accommodationId = {
  type: 'string',
  required: true,
  pattern: '^(0|[1-9][0-9]*)$',
  messages: {
    type: messages.validation.accommodationId.empty,
    required: messages.validation.accommodationId.empty,
    pattern: messages.validation.accommodationId.invalid
  }
};

const gender = {
  type: 'string',
  required: true,
  enum: ['male', 'female'],
  messages: {
    type: messages.validation.gender.empty,
    required: messages.validation.gender.empty,
    enum: messages.validation.gender.invalid
  }
};

const dob = {
  type: 'string',
  required: false,
  format: 'date',
  messages: {
    type: messages.validation.dob.empty,
    required: messages.validation.dob.empty,
    format: messages.validation.dob.invalid
  }
};

const idCard = {
  type: 'string',
  required: false,
  pattern: '^[0-9a-zA-Z-]{9,15}$',
  messages: {
    type: messages.validation.idCard.empty,
    required: messages.validation.idCard.empty,
    pattern: messages.validation.idCard.invalid
  }
};

const universityName = {
  type: 'string',
  required: true,
  enum: _.keys(enums.user.university),
  messages: {
    type: messages.validation.universityName.empty,
    required: messages.validation.universityName.empty,
    enum: messages.validation.universityName.validValue
  }
};

const universityEmail = (universityName) => {
  return {
    type: 'string',
    required: true,
    format: 'email',
    conform: (value) => {
      let university = enums.user.university[universityName];
      return university && university.email.test(value);
    },
    messages: {
      type: messages.validation.universityEmail.empty,
      required: messages.validation.universityEmail.empty,
      format: messages.validation.universityEmail.invalid,
      conform: messages.validation.universityEmail.invalid
    }
  };
};

const objectId = {
  type: 'string',
  required: true,
  pattern: '^[0-9a-fA-F]{24}$',
  messages: {
    type: messages.validation.objectId.empty,
    required: messages.validation.objectId.empty,
    pattern: messages.validation.objectId.invalid
  }
};

const optionalObjectId = _.pick(_.cloneDeep(objectId), ['type', 'pattern', 'messages']);

const resetPasswordCode = {
  type: 'string',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.resetPasswordCode.empty,
    required: messages.validation.resetPasswordCode.empty,
    allowEmpty: messages.validation.resetPasswordCode.empty
  }
};

const profilePhoto = {
  type: 'string',
  required: true,
  pattern: '^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$', // base64
  fileSize: 3 * 1024 * 1024, // bytes
  minWidth: 100,
  maxWidth: 1500,
  minHeight: 100,
  maxHeight: 1500,
  imageType: ['jpg', 'png', 'jpeg'],
  messages: {
    type: messages.validation.photo.empty,
    required: messages.validation.photo.empty,
    pattern: messages.validation.photo.invalid,
    fileSize: messages.validation.photo.fileSize,
    minWidth: messages.validation.vendorPhoto.tooSmall,
    maxWidth: messages.validation.vendorPhoto.tooLarge,
    minHeight: messages.validation.vendorPhoto.tooSmall,
    maxHeight: messages.validation.vendorPhoto.tooLarge,
    imageType: messages.validation.photo.imageType
  }
};

const reviewToken = {
  type: 'string',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.reviewToken.empty,
    required: messages.validation.reviewToken.empty,
    allowEmpty: messages.validation.reviewToken.empty
  }
};

// const coursePhoto = {
//   type: 'string',
//   required: true,
//   pattern: '^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$', // base64
//   fileSize: 3 * 1024 * 1024, // bytes
//   ratio: constants.event.photo.width / constants.event.photo.height,
//   minWidth: constants.event.photo.width,
//   maxWidth: 1920,
//   minHeight: constants.event.photo.height,
//   maxHeight: 1080,
//   imageType: ['jpg', 'png', 'jpeg'],
//   messages: {
//     type: messages.validation.photo.empty,
//     required: messages.validation.photo.empty,
//     pattern: messages.validation.photo.invalid,
//     fileSize: messages.validation.photo.fileSize,
//     ratio: messages.validation.eventPhoto.invalidRatio,
//     minWidth: messages.validation.eventPhoto.tooSmall,
//     maxWidth: messages.validation.eventPhoto.tooLarge,
//     minHeight: messages.validation.eventPhoto.tooSmall,
//     maxHeight: messages.validation.eventPhoto.tooLarge,
//     imageType: messages.validation.photo.imageType
//   }
// };

const tagPhoto = {
  type: 'string',
  required: true,
  pattern: '^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$', // base64
  fileSize: 5 * 1024 * 1024, // bytes
  ratio: constants.tag.photo.width / constants.tag.photo.height,
  minWidth: constants.tag.photo.width,
  maxWidth: 2000,
  minHeight: constants.tag.photo.height,
  maxHeight: 2000,
  imageType: ['jpg', 'png', 'jpeg'],
  messages: {
    type: messages.validation.photo.empty,
    required: messages.validation.photo.empty,
    pattern: messages.validation.photo.invalid,
    fileSize: messages.validation.photo.fileSize,
    ratio: messages.validation.tagPhoto.invalidRatio,
    minWidth: messages.validation.tagPhoto.tooSmall,
    maxWidth: messages.validation.tagPhoto.tooLarge,
    minHeight: messages.validation.tagPhoto.tooSmall,
    maxHeight: messages.validation.tagPhoto.tooLarge,
    imageType: messages.validation.photo.imageType
  }
};

const eventPhotoIds = {
  type: 'array',
  required: true,
  items: {
    type: 'string',
    allowEmpty: false,
    messages: {
      type: messages.validation.eventPhotoId.invalid,
      allowEmpty: messages.validation.eventPhotoId.invalid
    }
  },
  uniqueItems: true,
  messages: {
    type: messages.validation.eventPhotoIds.empty,
    required: messages.validation.eventPhotoIds.empty,
    uniqueItems: messages.validation.eventPhotoIds.unique
  }
};

const eventTitle = {
  type: 'string',
  required: true,
  allowEmpty: false,
  minLength: 2,
  maxLength: 100,
  messages: {
    type: messages.validation.eventTitle.empty,
    required: messages.validation.eventTitle.empty,
    allowEmpty: messages.validation.eventTitle.empty,
    minLength: messages.validation.eventTitle.length,
    maxLength: messages.validation.eventTitle.length
  }
};

const tripSlug = {
  type: 'String',
  required: true,
  allowEmpty: false,
  minLength: 2,
  maxLength: 100,
  messages: {
    type: messages.validation.tripSlug.empty,
    required: messages.validation.tripSlug.empty,
    allowEmpty: messages.validation.tripSlug.empty,
    minLength: messages.validation.tripSlug.length,
    maxLength: messages.validation.tripSlug.length,
    conform: messages.validation.tripSlug.invalid
  }
};

const tagSlug = {
  type: 'string',
  required: true,
  allowEmpty: false,
  minLength: 2,
  maxLength: 100,
  conform: (val) => {
    return val === _.kebabCase(val);
  },
  messages: {
    type: messages.validation.eventSlug.empty,
    required: messages.validation.eventSlug.empty,
    allowEmpty: messages.validation.eventSlug.empty,
    minLength: messages.validation.eventSlug.length,
    maxLength: messages.validation.eventSlug.length,
    conform: messages.validation.eventSlug.invalid
  }
};

const eventDescription = {
  type: 'string',
  required: true,
  allowEmpty: false,
  minLength: 50,
  maxLength: 8000,
  messages: {
    type: messages.validation.eventDescription.empty,
    required: messages.validation.eventDescription.empty,
    allowEmpty: messages.validation.eventDescription.empty,
    minLength: messages.validation.eventDescription.length,
    maxLength: messages.validation.eventDescription.length
  }
};

const categoryDescription = {
  type: 'string',
  required: true,
  allowEmpty: false,
  minLength: 5,
  maxLength: 2000,
  messages: {
    type: messages.validation.categoryDescription.empty,
    required: messages.validation.categoryDescription.empty,
    allowEmpty: messages.validation.categoryDescription.empty,
    minLength: messages.validation.categoryDescription.length,
    maxLength: messages.validation.categoryDescription.length
  }
};

const activityDescription = {
  type: 'string',
  required: true,
  allowEmpty: false,
  minLength: 5,
  maxLength: 2000,
  messages: {
    type: messages.validation.activityDescription.empty,
    required: messages.validation.activityDescription.empty,
    allowEmpty: messages.validation.activityDescription.empty,
    minLength: messages.validation.activityDescription.length,
    maxLength: messages.validation.activityDescription.length
  }
};

const eventDuration = {
  type: 'number',
  required: true,
  allowEmpty: false,
  minimum: 1,
  messages: {
    type: messages.validation.eventDuration.empty,
    required: messages.validation.eventDuration.empty,
    allowEmpty: messages.validation.eventDuration.empty,
    minimum: messages.validation.eventDuration.invalid
  }
};

const upper = {
  type: 'number',
  required: true,
  allowEmpty: false,
  minimum: 1,
  messages: {
    type: messages.validation.upper.empty,
    required: messages.validation.upper.empty,
    allowEmpty: messages.validation.upper.empty,
    minimum: messages.validation.upper.invalid
  }
};

const lower = {
  type: 'number',
  required: true,
  allowEmpty: false,
  minimum: 1,
  messages: {
    type: messages.validation.lower.empty,
    required: messages.validation.lower.empty,
    allowEmpty: messages.validation.lower.empty,
    minimum: messages.validation.lower.invalid
  }
};

const from = {
  type: 'number',
  required: true,
  allowEmpty: false,
  minimum: 1,
  messages: {
    type: messages.validation.from.empty,
    required: messages.validation.from.empty,
    allowEmpty: messages.validation.from.empty,
    minimum: messages.validation.from.invalid
  }
};

const to = {
  type: 'number',
  required: true,
  allowEmpty: false,
  minimum: 1,
  messages: {
    type: messages.validation.to.empty,
    required: messages.validation.to.empty,
    allowEmpty: messages.validation.to.empty,
    minimum: messages.validation.to.invalid
  }
};

const eventLocations = {
  type: 'array',
  required: true,
  items: {
    type: 'string',
    allowEmpty: false,
    messages: {
      type: messages.validation.eventLocations.itemType,
      allowEmpty: messages.validation.eventLocations.itemEmpty
    }
  },
  minItems: 1,
  uniqueItems: true,
  messages: {
    type: messages.validation.eventLocations.empty,
    required: messages.validation.eventLocations.empty,
    minItems: messages.validation.eventLocations.length,
    uniqueItems: messages.validation.eventLocations.unique
  }
};
const included = {
  type: 'array',
  required: true,
  items: {
    type: 'string',
    allowEmpty: false,
    messages: {
      type: messages.validation.included.itemType,
      allowEmpty: messages.validation.included.itemEmpty
    }
  },
  minItems: 1,
  uniqueItems: true,
  messages: {
    type: messages.validation.included.empty,
    required: messages.validation.included.empty,
    minItems: messages.validation.included.length,
    uniqueItems: messages.validation.included.unique
  }
};
const available = {
  type: 'array',
  required: true,
  items: {
    type: 'string',
    allowEmpty: false,
    messages: {
      type: messages.validation.available.itemType,
      allowEmpty: messages.validation.available.itemEmpty
    }
  },
  minItems: 1,
  uniqueItems: true,
  messages: {
    type: messages.validation.available.empty,
    required: messages.validation.available.empty,
    minItems: messages.validation.available.length,
    uniqueItems: messages.validation.available.unique
  }
};
const eventCategories = {
  type: 'array',
  required: true,
  items: {
    type: 'string',
    allowEmpty: false,
    messages: {
      type: messages.validation.eventCategories.itemType,
      allowEmpty: messages.validation.eventCategories.itemEmpty
    }
  },
  minItems: 1,
  uniqueItems: true,
  messages: {
    type: messages.validation.eventCategories.empty,
    required: messages.validation.eventCategories.empty,
    minItems: messages.validation.eventCategories.length,
    uniqueItems: messages.validation.eventCategories.unique
  }
};

const eventActivities = {
  type: 'array',
  required: false,
  items: {
    type: 'string',
    messages: {
      type: messages.validation.eventActivities.itemType
    }
  },
  uniqueItems: true,
  messages: {
    type: messages.validation.eventActivities.empty,
    uniqueItems: messages.validation.eventActivities.unique
  }
};

const activities = {
  type: 'array',
  items: {
    type: 'string',
    pattern: '^[0-9a-fA-F]{24}$',
    messages: {
      pattern: messages.validation.objectId.invalid
    }
  },
  messages: {
    type: messages.validation.eventFilterActivities.invalid
  }
};

const subActivities = {
  type: 'array',
  items: {
    type: 'string',
    pattern: '^[0-9a-fA-F]{24}$',
    messages: {
      pattern: messages.validation.objectId.invalid
    }
  },
  messages: {
    type: messages.validation.eventFilterSubActivities.invalid
  }
};

const startingLocation = {
  type: 'array',
  required: true,
  items: {
    type: 'string',
    allowEmpty: false,
    messages: {
      type: messages.validation.startingLocation.itemType,
      allowEmpty: messages.validation.startingLocation.itemEmpty
    }
  },
  minItems: 1,
  uniqueItems: true,
  messages: {
    type: messages.validation.startingLocation.empty,
    required: messages.validation.startingLocation.empty,
    minItems: messages.validation.startingLocation.length,
    uniqueItems: messages.validation.startingLocation.unique
  }
};

const eventPassengerLimit = {
  type: 'number',
  required: true,
  conform: (value) => {
    return Math.round(value) === value;
  },
  minimum: 0,
  messages: {
    type: messages.validation.eventPassengerLimit.empty,
    required: messages.validation.eventPassengerLimit.empty,
    conform: messages.validation.eventPassengerLimit.invalid,
    minimum: messages.validation.eventPassengerLimit.invalid
  }
};

const eventDarazLink = {
  type: 'string',
  required: false,
  messages: {
    type: messages.validation.eventDarazLink.empty,
    required: messages.validation.eventDarazLink.empty
  }
};

const eventUniversityLimit = {
  type: 'array',
  required: true,
  items: universityName,
  uniqueItems: true,
  messages: {
    type: messages.validation.eventUniversityLimit.empty,
    required: messages.validation.eventUniversityLimit.empty,
    uniqueItems: messages.validation.eventUniversityLimit.unique
  }
};

const eventTags = {
  type: 'array',
  required: true,
  items: {
    type: 'string',
    allowEmpty: false,
    messages: {
      type: messages.validation.eventTags.itemType,
      allowEmpty: messages.validation.eventTags.itemEmpty
    }
  },
  minItems: 1,
  uniqueItems: true,
  messages: {
    type: messages.validation.eventTags.empty,
    required: messages.validation.eventTags.empty,
    minItems: messages.validation.eventTags.length,
    uniqueItems: messages.validation.eventTags.unique
  }
};

const tags = {
  type: 'array',
  items: {
    type: 'string',
    pattern: '^[0-9a-fA-F]{24}$',
    messages: {
      pattern: messages.validation.objectId.invalid
    }
  },
  messages: {
    type: messages.validation.tags.invalid
  }
};

const itineraryItemDay = {
  type: 'number',
  required: true,
  conform: (value) => {
    return Math.round(value) === value;
  },
  minimum: 1,
  messages: {
    type: messages.validation.itineraryItemDay.empty,
    required: messages.validation.itineraryItemDay.empty,
    conform: messages.validation.itineraryItemDay.invalid,
    minimum: messages.validation.itineraryItemDay.invalid
  }
};

const itineraryItemTime = {
  type: 'string',
  required: true,
  format: 'date-time',
  conform: (value) => {
    return moment(value).isValid();
  },
  messages: {
    type: messages.validation.itineraryItemTime.empty,
    required: messages.validation.itineraryItemTime.empty,
    format: messages.validation.itineraryItemTime.invalid,
    conform: messages.validation.itineraryItemTime.invalid
  }
};

const itineraryItemDuration = {
  type: 'string',
  format: 'date-time',
  conform: (value) => {
    return moment(value).isValid();
  },
  messages: {
    type: messages.validation.itineraryItemDuration.invalid,
    format: messages.validation.itineraryItemDuration.invalid,
    conform: messages.validation.itineraryItemDuration.invalid
  }
};

const itineraryItemDescription = {
  type: 'string',
  required: true,
  allowEmpty: false,
  minLength: 10,
  maxLength: 1000,
  messages: {
    type: messages.validation.itineraryItemDescription.empty,
    required: messages.validation.itineraryItemDescription.empty,
    allowEmpty: messages.validation.itineraryItemDescription.empty,
    minLength: messages.validation.itineraryItemDescription.length,
    maxLength: messages.validation.itineraryItemDescription.length
  }
};

const eventItinerary = {
  type: 'array',
  required: true,
  conform: (items) => {
    if (!_.isArray(items)) {
      return true;
    }

    let uniqSet = _.uniqWith(items, (item1, item2) => {
      return (item1.day === item2.day && moment(item1.time).format('HH:mm') === moment(item2.time).format('HH:mm'));
    });

    return uniqSet.length === items.length;
  },
  items: {
    properties: {
      day: itineraryItemDay,
      time: itineraryItemTime,
      duration: itineraryItemDuration,
      description: itineraryItemDescription
    }
  },
  minItems: 1,
  uniqueItems: true,
  messages: {
    type: messages.validation.eventItinerary.empty,
    required: messages.validation.eventItinerary.empty,
    conform: messages.validation.eventItinerary.unique,
    minItems: messages.validation.eventItinerary.length,
    uniqueItems: messages.validation.eventItinerary.unique
  }
};

const facilityItemTitle = {
  type: 'string',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.facilityItemTitle.invalid,
    required: messages.validation.facilityItemTitle.invalid,
    allowEmpty: messages.validation.facilityItemTitle.invalid
  }
};

const facilityItemList = {
  type: 'array',
  required: true,
  minItems: 1,
  uniqueItems: true,
  items: textRequired('Facility item'),
  messages: {
    type: messages.validation.facilityItemList.empty,
    required: messages.validation.facilityItemList.empty,
    minItems: messages.validation.facilityItemList.length,
    uniqueItems: messages.validation.facilityItemList.unique
  }
};

const eventFacilities = {
  type: 'array',
  required: true,
  conform: (items) => {
    if (!_.isArray(items)) {
      return true;
    }

    let uniqSet = _.uniqWith(items, (item1, item2) => {
      return item1.title === item2.title;
    });

    return uniqSet.length === items.length;
  },
  items: {
    properties: {
      title: facilityItemTitle,
      list: facilityItemList
    }
  },
  minItems: 1,
  uniqueItems: true,
  messages: {
    type: messages.validation.eventFacilities.empty,
    required: messages.validation.eventFacilities.empty,
    conform: messages.validation.eventFacilities.unique,
    minItems: messages.validation.eventFacilities.length,
    uniqueItems: messages.validation.eventFacilities.unique
  }
};

// const tripStatus = {
//   type: 'string',
//   required: true,
//   enum: _.values(enums.trip.status.draft),
//   messages: {
//     type: messages.validation.tripStatus.empty,
//     required: messages.validation.tripStatus.empty,
//     enum: messages.validation.tripStatus.validValue
//   }
// };

// const addonTitle = {
//   type: 'string',
//   required: true,
//   allowEmpty: false,
//   minLength: 2,
//   maxLength: 80,
//   messages: {
//     type: messages.validation.addonTitle.empty,
//     required: messages.validation.addonTitle.empty,
//     allowEmpty: messages.validation.addonTitle.empty,
//     minLength: messages.validation.addonTitle.length,
//     maxLength: messages.validation.addonTitle.length
//   }
// };

// const addonType = {
//   type: 'string',
//   required: true,
//   allowEmpty: false,
//   enum: _.values(enums.event.addonType),
//   messages: {
//     type: messages.validation.addonType.empty,
//     required: messages.validation.addonType.empty,
//     enum: messages.validation.addonType.validValue
//   }
// };

// const addonOptionName = {
//   type: 'string',
//   required: true,
//   allowEmpty: false,
//   minLength: 2,
//   maxLength: 80,
//   messages: {
//     type: messages.validation.addonOptionName.empty,
//     required: messages.validation.addonOptionName.empty,
//     allowEmpty: messages.validation.addonOptionName.empty,
//     minLength: messages.validation.addonOptionName.length,
//     maxLength: messages.validation.addonOptionName.length
//   }
// };

// const addonOptionPrice = {
//   type: 'number',
//   required: true,
//   conform: (value) => {
//     return Math.round(value) === value;
//   },
//   minimum: 0,
//   messages: {
//     type: messages.validation.addonOptionPrice.empty,
//     required: messages.validation.addonOptionPrice.empty,
//     conform: messages.validation.addonOptionPrice.invalid,
//     minimum: messages.validation.addonOptionPrice.invalid
//   }
// };

// const addonOptions = {
//   type: 'array',
//   required: true,
//   items: {
//     properties: {
//       name: addonOptionName,
//       price: addonOptionPrice
//     }
//   },
//   minItems: 1,
//   maxItems: 50,
//   uniqueItems: true,
//   messages: {
//     type: messages.validation.addonOptions.empty,
//     required: messages.validation.addonOptions.empty,
//     minItems: messages.validation.addonOptions.length,
//     maxItems: messages.validation.addonOptions.length,
//     uniqueItems: messages.validation.addonOptions.unique
//   }
// };

// const eventAddons = {
//   type: 'array',
//   required: true,
//   conform: (items) => {
//     if (!_.isArray(items)) {
//       return true;
//     }

//     let uniqSet = _.uniqWith(items, (item1, item2) => {
//       return (item1.title === item2.title);
//     });

//     return uniqSet.length === items.length;
//   },
//   items: {
//     properties: {
//       title: addonTitle,
//       type: addonType,
//       options: addonOptions
//     }
//   },
//   uniqueItems: true,
//   messages: {
//     type: messages.validation.eventAddons.empty,
//     required: messages.validation.eventAddons.empty,
//     conform: messages.validation.eventAddons.unique,
//     uniqueItems: messages.validation.eventAddons.unique
//   }
// };

const eventOriginalPrice = {
  type: 'number',
  required: false,
  minimum: 0,
  messages: {
    type: messages.validation.eventOriginalPrice.invalid,
    minimum: messages.validation.eventOriginalPrice.invalid
  }
};

const eventBookingDeadline = {
  type: 'number',
  required: true,
  conform: (value) => {
    return Math.round(value) === value;
  },
  minimum: 1,
  messages: {
    type: messages.validation.eventBookingDeadline.empty,
    required: messages.validation.eventBookingDeadline.empty,
    conform: messages.validation.eventBookingDeadline.invalid,
    minimum: messages.validation.eventBookingDeadline.invalid
  }
};

const eventDiscount = {
  type: 'number',
  required: true,
  // conform: (value) => {
  //   return Math.round(value) === value;
  // },
  minimum: 0,
  maximum: 100,
  messages: {
    type: messages.validation.eventDiscount.empty,
    required: messages.validation.eventDiscount.empty,
    // conform: messages.validation.eventDiscount.invalid,
    minimum: messages.validation.eventDiscount.invalid,
    maximum: messages.validation.eventDiscount.invalid
  }
};

const courseDiscount = {
  type: 'number',
  // required: true,
  // conform: (value) => {
  //   return Math.round(value) === value;
  // },
  minimum: 0,
  maximum: 100,
  messages: {
    type: messages.validation.courseDiscount.empty,
    // required: messages.validation.courseDiscount.empty,
    // conform: messages.validation.courseDiscount.invalid,
    minimum: messages.validation.courseDiscount.invalid,
    maximum: messages.validation.courseDiscount.invalid
  }
};

const eventOnlyDeals = {
  type: 'Boolean',
  required: false,
  messages: {
    type: messages.validation.eventOnlyDeals.invalid
  }
};

const booleanTypeCheck = {
  type: 'Boolean',
  allowEmpty: false,
  required: true,
  messages: {
    type: messages.validation.booleanTypeCheck.invalid,
    allowEmpty: messages.validation.booleanTypeCheck.allowEmpty,
    required: messages.validation.booleanTypeCheck.required
  }
};

const eventPackagesCount = {
  type: 'number',
  required: true,
  conform: (value) => {
    return Math.round(value) === value;
  },
  minimum: 1,
  maximum: 5,
  messages: {
    type: messages.validation.eventPackagesCount.empty,
    required: messages.validation.eventPackagesCount.empty,
    conform: messages.validation.eventPackagesCount.invalid,
    minimum: messages.validation.eventPackagesCount.invalid,
    maximum: messages.validation.eventPackagesCount.invalid
  }
};

// const availabilityType = {
//   type: 'string',
//   required: true,
//   allowEmpty: false,
//   enum: _.values(enums.event.availabilityType),
//   messages: {
//     type: messages.validation.availabilityType.empty,
//     required: messages.validation.availabilityType.empty,
//     enum: messages.validation.availabilityType.validValue
//   }
// };

// const availabilityDate = {
//   type: 'string',
//   required: true,
//   format: 'date',
//   conform: (value) => {
//     return moment().isBefore(value, 'day');
//   },
//   messages: {
//     type: messages.validation.availabilityDate.empty,
//     required: messages.validation.availabilityDate.empty,
//     format: messages.validation.availabilityDate.invalid,
//     conform: messages.validation.availabilityDate.pastDate
//   }
// };

// const availabilityDayOfWeek = {
//   type: 'number',
//   required: true,
//   minimum: 1,
//   maximum: 7,
//   messages: {
//     type: messages.validation.availabilityDayOfWeek.empty,
//     required: messages.validation.availabilityDayOfWeek.empty,
//     minimum: messages.validation.availabilityDayOfWeek.invalid,
//     maximum: messages.validation.availabilityDayOfWeek.invalid
//   }
// };

// const availabilityCapacity = {
//   type: 'number',
//   required: true,
//   conform: (value) => {
//     return Math.round(value) === value;
//   },
//   minimum: 0,
//   messages: {
//     type: messages.validation.availabilityCapacity.empty,
//     required: messages.validation.availabilityCapacity.empty,
//     conform: messages.validation.availabilityCapacity.invalid,
//     minimum: messages.validation.availabilityCapacity.invalid
//   }
// };

// const packagePrice = {
//   type: 'number',
//   required: true,
//   conform: (value) => {
//     return Math.round(value) === value;
//   },
//   minimum: 0,
//   messages: {
//     type: messages.validation.packagePrice.empty,
//     required: messages.validation.packagePrice.empty,
//     conform: messages.validation.packagePrice.invalid,
//     minimum: messages.validation.packagePrice.invalid
//   }
// };

// const availabilityPackagePrices = (packagesCount) => {
//   return {
//     type: 'array',
//     required: true,
//     items: packagePrice,
//     minItems: packagesCount,
//     messages: {
//       type: messages.validation.availabilityPackagePrices.empty,
//       required: messages.validation.availabilityPackagePrices.empty,
//       minItems: messages.validation.availabilityPackagePrices.length
//     }
//   };
// };

// const eventAvailability = (packagesCount) => {
//   return {
//     type: 'array',
//     required: true,
//     conform: (items) => {
//       if (!_.isArray(items)) {
//         return true;
//       }

//       let uniqSet = _.uniqWith(items, (item1, item2) => {
//         if (item1.type !== item2.type) {
//           return false;
//         }

//         if (item1.type === enums.event.availabilityType.fixedDate) {
//           return moment(item1.date).isSame(item2.date, 'day');
//         }

//         if (item1.type === enums.event.availabilityType.weekly) {
//           return item1.dayOfWeek === item2.dayOfWeek;
//         }
//       });

//       return uniqSet.length === items.length;
//     },
//     items: (item) => {
//       let rules = {
//         properties: {
//           type: availabilityType,
//           capacity: availabilityCapacity,
//           packagePrices: availabilityPackagePrices(packagesCount)
//         }
//       };

//       if (item.type === enums.event.availabilityType.fixedDate) {
//         rules.properties.date = availabilityDate;
//       }

//       if (item.type === enums.event.availabilityType.weekly) {
//         rules.properties.dayOfWeek = availabilityDayOfWeek;
//       }

//       return rules;
//     },
//     uniqueItems: true,
//     messages: {
//       type: messages.validation.eventAvailability.empty,
//       required: messages.validation.eventAvailability.empty,
//       conform: messages.validation.eventAvailability.unique,
//       uniqueItems: messages.validation.eventAvailability.unique
//     }
//   };
// };

// const packageID = {
//   type: 'number',
//   required: true,
//   messages: {
//     type: messages.validation.packageID.type,
//     required: messages.validation.packageID.type.required
//   }
// };

// const packageName = {
//   type: 'string',
//   required: true,
//   messages: {
//     type: messages.validation.packageName.type,
//     required: messages.validation.packageName.required
//   }
// };

// const capacity = {
//   type: 'number',
//   required: true,
//   messages: {
//     type: messages.validation.capacity.invalid,
//     required: messages.validation.capacity.invalid
//   }
// };

// const packageDesc = {
//   type: 'string',
//   required: true,
//   messages: {
//     type: messages.validation.packageDesc.type,
//     required: messages.validation.packageDesc.required
//   }
// };
// const packages = {
//   type: 'object',
//   required: true,
//   properties: {
//     packageID: packageID,
//     packageName: packageName,
//     capacity: capacity,
//     packagePrice: packagePrice,
//     packageDesc: packageDesc
//   },
//   messages: {
//     type: messages.validation.packagePrice.empty,
//     required: messages.validation.packagePrice.empty,
//     conform: messages.validation.packagePrice.invalid,
//     minimum: messages.validation.packagePrice.invalid
//   }
// };
// const availabilityPackages = (packagesCount) => {
//   return {
//     type: 'array',
//     required: true,
//     items: packages,
//     minItems: packagesCount,
//     messages: {
//       type: messages.validation.availabilityPackagePrices.empty,
//       required: messages.validation.availabilityPackagePrices.empty,
//       minItems: messages.validation.availabilityPackagePrices.length
//     }
//   };
// };
// const eventAvailabilityV2 = (packagesCount) => {
//   return {
//     type: 'array',
//     required: true,
//     conform: (items) => {
//       if (!_.isArray(items)) {
//         return true;
//       }

//       let uniqSet = _.uniqWith(items, (item1, item2) => {
//         if (item1.type !== item2.type) {
//           return false;
//         }

//         if (item1.type === enums.event.availabilityType.fixedDate) {
//           return moment(item1.date).isSame(item2.date, 'day');
//         }

//         if (item1.type === enums.event.availabilityType.weekly) {
//           return item1.dayOfWeek === item2.dayOfWeek;
//         }
//       });

//       return uniqSet.length === items.length;
//     },
//     items: (item) => {
//       let rules = {
//         properties: {
//           type: availabilityType,
//           // capacity: availabilityCapacity
//           packages: availabilityPackages(packagesCount)
//         }
//       };

//       if (item.type === enums.event.availabilityType.fixedDate) {
//         rules.properties.date = availabilityDate;
//       }

//       if (item.type === enums.event.availabilityType.weekly) {
//         rules.properties.dayOfWeek = availabilityDayOfWeek;
//       }

//       return rules;
//     },
//     uniqueItems: true,
//     messages: {
//       type: messages.validation.eventAvailability.empty,
//       required: messages.validation.eventAvailability.empty,
//       conform: messages.validation.eventAvailability.unique,
//       uniqueItems: messages.validation.eventAvailability.unique
//     }
//   };
// };
// const mmaPackages = (isMMA) => {
//   return {
//     type: 'array',
//     required: isMMA,
//     minItems: 1,
//     items: {
//       properties: {
//         name: packageName,
//         description: packageDesc
//       }
//     },
//     messages: {
//       type: messages.validation.mmaPackages.empty,
//       required: messages.validation.mmaPackages.empty,
//       minItems: messages.validation.mmaPackages.length
//     }
//   };
// };
const services = (isMMA) => {
  return {
    type: 'object',
    required: isMMA,
    properties: {
      included: included,
      available: available
    },
    messages: {
      type: messages.validation.services.empty,
      required: messages.validation.services.empty
    }
  };
};
const allowedPassengerLimit = (isMMA) => {
  return {
    type: 'object',
    required: isMMA,
    properties: {
      upper: upper,
      lower: lower
    },
    messages: {
      type: messages.validation.allowedPassengerLimit.empty,
      required: messages.validation.allowedPassengerLimit.empty
    }
  };
};
const priceRange = (isMMA) => {
  return {
    type: 'object',
    required: isMMA,
    properties: {
      from: from,
      to: to
    },
    messages: {
      type: messages.validation.priceRange.empty,
      required: messages.validation.priceRange.empty
    }
  };
};
// const courseAvailability = (packagesCount) => {
//   return {
//     type: 'array',
//     required: true,
//     conform: (items) => {
//       if (!_.isArray(items)) {
//         return true;
//       }
//       let uniqSet = _.uniqWith(items, (item1, item2) => {
//         if (item1.type !== item2.type) {
//           return true;
//         }
//         if (item1.type === enums.course.availabilityType.fixedDate) {
//           return moment(item1.date).isSame(item2.date, 'day');
//         }

//         // if (item1.type === enums.course.availabilityType.weekly) {
//         //   return item1.dayOfWeek === item2.dayOfWeek;
//         // }
//       });
//       return uniqSet.length === items.length;
//     },
//     items: (item) => {

//       let rules = {
//         properties: {
//           type: availabilityType,
//           // capacity: availabilityCapacity
//           packages: availabilityPackages(packagesCount)
//         }
//       };

//       if (item.type === enums.event.availabilityType.fixedDate) {
//         rules.properties.date = availabilityDate;
//       }

//       if (item.type === enums.event.availabilityType.weekly) {
//         rules.properties.dayOfWeek = availabilityDayOfWeek;
//       }

//       return rules;
//     },
//     // properties: {
//     //   type: availabilityType
//     // },
//     uniqueItems: true,
//     messages: {
//       type: messages.validation.eventAvailability.empty,
//       required: messages.validation.eventAvailability.empty,
//       conform: messages.validation.eventAvailability.unique,
//       uniqueItems: messages.validation.eventAvailability.unique
//     }
//   };
// };
// const slotHour = {
//   type: 'Number',
//   required: true,
//   allowEmpty: false,
//   minimum: 0,
//   maximum: 24,
//   messages: {
//     type: messages.validation.slotHour.type,
//     required: messages.validation.slotHour.empty,
//     allowEmpty: messages.validation.slotHour.empty,
//     minimum: messages.validation.slotHour.length,
//     maximum: messages.validation.slotHour.length
//   }
// };
// const slotMinute = {
//   type: 'Number',
//   required: true,
//   allowEmpty: false,
//   minimum: 0,
//   maximum: 60,
//   messages: {
//     type: messages.validation.slotMinute.type,
//     required: messages.validation.slotMinute.empty,
//     allowEmpty: messages.validation.slotMinute.empty,
//     minimum: messages.validation.slotMinute.length,
//     maximum: messages.validation.slotMinute.length
//   }
// };
// const slots = {
//   type: 'object',
//   required: true,
//   properties: {
//     hour: slotHour,
//     minute: slotMinute
//   },
//   messages: {
//     type: messages.validation.slots.empty,
//     required: messages.validation.slots.empty
//     // conform: messages.validation.slots.invalid,
//   }
// };
// const coursevaailabilitySlots = {
//   type: 'array',
//   required: true,
//   allowEmpty: false,
//   minItems: 1,
//   conform: (items) => {
//     if (!_.isArray(items)) {
//       return true;
//     }

//     let uniqSet = _.uniqWith(items, (item1, item2) => {
//       if (item1.hour === item2.hour && item1.minute === item2.minute) {
//         return true;
//       }
//     });
//     return uniqSet.length === items.length;
//   },
//   items: slots,
//   messages: {
//     type: messages.validation.coursevaailabilitySlots.empty,
//     required: messages.validation.coursevaailabilitySlots.empty,
//     conform: messages.validation.coursevaailabilitySlots.unique,
//     minItems: messages.validation.coursevaailabilitySlots.length,
//     allowEmpty: messages.validation.coursevaailabilitySlots.unique

//   }
// };
// const courseAvailability = {
//   type: 'array',
//   required: true,
//   conform: (items) => {
//     if (!_.isArray(items)) {
//       return true;
//     }

//     let uniqSet = _.uniqWith(items, (item1, item2) => {
//       if (item1.type !== item2.type) {
//         return true;
//       }
//       if (item1.type === enums.course.availabilityType.fixedDate) {
//         return moment(item1.date).isSame(item2.date, 'day');
//       }

//       // if (item1.type === enums.course.availabilityType.weekly) {
//       //   return item1.dayOfWeek === item2.dayOfWeek;
//       // }
//     });
//     return uniqSet.length === items.length;
//   },
//   items: {
//     properties: {
//       type: availabilityType,
//       slots: coursevaailabilitySlots

//     }
//   },
//   minItems: 1,
//   uniqueItems: true,
//   messages: {
//     type: messages.validation.courseAvailability.empty,
//     required: messages.validation.courseAvailability.empty,
//     conform: messages.validation.courseAvailability.unique,
//     uniqueItems: messages.validation.courseAvailability.unique
//     // minItems: messages.validation.courseAvailability.unique
//   }
// };
const pickupPoints = () => {
  return {
    type: 'array',
    required: true,
    properties: {
      location: {
        type: 'string',
        required: true
      },
      departureTime: {
        type: 'date',
        required: true,
        conform: (value) => {
          return moment(value, 'HH:mm:ss').isValid();
        },
        messages: {
          conform: messages.validation.PickupLocationsTime
        }
      },
      departureDateOffset: {
        type: 'number',
        required: true,
        conform: (value) => {
          return (Math.round(value) === value);
        },
        minimum: 0
      },
      addedPrice: {
        type: 'number',
        required: false,
        conform: (value) => {
          return (Math.round(value) === value);
        },
        minimum: 0
      },
      messages: {
        type: 'Invalid input for pickup locations',
        conform: 'Invalid input details',
        minimum: 'Wrong date offset provided'
      }
    }
  };
};

const questionComment = {
  type: 'string',
  required: true,
  allowEmpty: false,
  maxLength: 2000,
  messages: {
    type: messages.validation.questionComment.empty,
    required: messages.validation.questionComment.empty,
    allowEmpty: messages.validation.questionComment.empty,
    maxLength: messages.validation.questionComment.length
  }
};

const reviewComment = {
  type: 'string',
  required: false,
  allowEmpty: true,
  maxLength: 2000,
  messages: {
    type: messages.validation.reviewComment.empty,
    required: messages.validation.reviewComment.empty,
    allowEmpty: messages.validation.reviewComment.empty,
    maxLength: messages.validation.reviewComment.length
  }
};

const reviewIndividualRating = {
  type: 'number',
  required: true,
  conform: (value) => {
    return Math.round(value) === value;
  },
  minimum: 0,
  maximum: 10,
  messages: {
    type: messages.validation.reviewRating.invalid,
    required: messages.validation.reviewRating.invalid,
    conform: messages.validation.reviewRating.invalid,
    minimum: messages.validation.reviewRating.invalid,
    maximum: messages.validation.reviewRating.invalid
  }
};

const reviewRating = {
  type: 'object',
  required: true,
  properties: {
    security: reviewIndividualRating,
    value: reviewIndividualRating,
    staff: reviewIndividualRating,
    facilities: reviewIndividualRating,
    funFactor: reviewIndividualRating
  },
  messages: {
    type: messages.validation.reviewRating.empty,
    required: messages.validation.reviewRating.empty
  }
};

const booleanType = {
  type: 'object',
  required: true,
  properties: {
    status: booleanTypeCheck,
    isAvailable: booleanTypeCheck
  },
  messages: {
    type: messages.validation.booleanType.empty,
    required: messages.validation.booleanType.empty
  }
};

const feedbackReply = {
  type: 'string',
  required: true,
  allowEmpty: false,
  maxLength: 2000,
  messages: {
    type: messages.validation.feedbackReply.empty,
    required: messages.validation.feedbackReply.empty,
    allowEmpty: messages.validation.feedbackReply.empty,
    maxLength: messages.validation.feedbackReply.length
  }
};

const promoCode = {
  type: 'string',
  required: true,
  minLength: 3,
  maxLength: 20,
  pattern: /^[A-Za-z0-9_-]+$/,
  messages: {
    type: messages.validation.promoCode.invalid,
    required: messages.validation.promoCode.invalid,
    minLength: messages.validation.promoCode.length,
    maxLength: messages.validation.promoCode.length,
    pattern: messages.validation.promoCode.invalid
  }
};

const checkIn = {
  type: 'string',
  format: 'date',
  conform: (value) => {
    return moment().isSameOrBefore(value, 'day');
  },
  messages: {
    type: messages.validation.checkIn.invalid,
    format: messages.validation.checkIn.invalid,
    conform: messages.validation.checkIn.pastDate
  }
};

const checkOut = {
  type: 'string',
  format: 'date',
  conform: (value) => {
    return moment().isSameOrBefore(value, 'day');
  },
  messages: {
    type: messages.validation.checkOut.invalid,
    format: messages.validation.checkOut.invalid,
    conform: messages.validation.checkOut.pastDate
  }
};
const promoCodeEndDateForReport = {
  type: 'string',
  format: 'date',
  messages: {
    type: messages.validation.promoCodeEndDate.invalid,
    format: messages.validation.promoCodeEndDate.invalid
  }
};

const promoCodeEventIds = {
  type: 'array',
  required: true,
  minItems: 1,
  items: objectId,
  messages: {
    type: messages.validation.promoCodeEventIds.empty,
    required: messages.validation.promoCodeEventIds.empty,
    minItems: messages.validation.promoCodeEventIds.minimum
  }
};

const promoCodePercentageOff = {
  type: 'number',
  required: (typeof this.amountOff === undefined),
  minimum: 1,
  maximum: 100,
  messages: {
    type: messages.validation.promoCodePercentageOff.type,
    required: messages.validation.promoCodePercentageOff.empty,
    minimum: messages.validation.promoCodePercentageOff.validValues,
    maximum: messages.validation.promoCodePercentageOff.validValues
  }
};

const promoCodeAmountOff = {
  type: 'number',
  required: (typeof this.percentageOff === undefined),
  minimum: 1,
  messages: {
    type: messages.validation.promoCodeAmountOff.type,
    required: messages.validation.promoCodeAmountOff.empty,
    minimum: messages.validation.promoCodeAmountOff.minimum
  }
};

const promoCodeUserCap = {
  type: 'number',
  required: false,
  minimum: 1,
  messages: {
    type: messages.validation.promoCodeUserCap.type,
    minimum: messages.validation.promoCodeUserCap.minimum
  }
};

const promoCodeBookingCap = {
  type: 'number',
  required: false,
  minimum: 1,
  messages: {
    type: messages.validation.promoCodeBookingCap.type,
    minimum: messages.validation.promoCodeBookingCap.minimum
  }
};

const promoCodeScopeMMA = {
  type: 'object',
  required: (typeof this.scopeAll === undefined && typeof this.scopeEvents === undefined),
  properties: {
    amountOff: promoCodeAmountOff,
    percentageOff: promoCodePercentageOff,
    userCap: promoCodeUserCap,
    bookingCap: promoCodeBookingCap
  },
  messages: {
    required: messages.validation.promoCodeScope.required
  }
};

const promoCodeScopeAll = {
  type: 'object',
  required: (typeof this.scopeMMA === undefined && typeof this.scopeEvents === undefined),
  properties: {
    amountOff: promoCodeAmountOff,
    percentageOff: promoCodePercentageOff,
    userCap: promoCodeUserCap,
    bookingCap: promoCodeBookingCap
  },
  messages: {
    required: messages.validation.promoCodeScope.required
  }
};

const promoCodeScopeEvents = {
  type: 'object',
  required: (typeof this.scopeAll === undefined && typeof this.scopeMMA === undefined),
  properties: {
    amountOff: promoCodeAmountOff,
    percentageOff: promoCodePercentageOff,
    eventIds: promoCodeEventIds,
    userCap: promoCodeUserCap,
    bookingCap: promoCodeBookingCap
  },
  messages: {
    required: messages.validation.promoCodeScope.required
  }
};

const promoCodeSingleUse = {
  type: 'Boolean',
  required: false,
  messages: {
    type: messages.validation.promoCodeSingleUse.invalid
  }
};

const bookingDate = {
  type: 'string',
  required: true,
  format: 'date',
  conform: (value) => {
    return moment().add.apply(moment(), constants.booking.bookingBefore).isBefore(value, 'day');
  },
  messages: {
    type: messages.validation.bookingDate.empty,
    required: messages.validation.bookingDate.empty,
    format: messages.validation.bookingDate.invalid,
    conform: messages.validation.bookingDate.pastDate
  }
};

const bookingPromoCode = _.pick(_.cloneDeep(promoCode), ['type', 'required', 'messages']);

const bookingPackageId = {
  type: 'number',
  required: true,
  conform: (value) => {
    if (!value) {
      return true;
    }

    return _.isNumber(value) && !_.isNaN(value);
  },
  messages: {
    type: messages.validation.bookingPackageId.empty,
    required: messages.validation.bookingPackageId.empty,
    conform: messages.validation.bookingPackageId.invalid
  }
};

const bookingSlotId = {
  type: 'number',
  required: true,
  conform: (value) => {
    if (!value) {
      return true;
    }

    return _.isNumber(value) && !_.isNaN(value);
  },
  messages: {
    type: messages.validation.bookingSlotId.empty,
    required: messages.validation.bookingSlotId.empty,
    conform: messages.validation.bookingSlotId.invalid
  }
};

const bookingAddonTitle = {
  type: 'string',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.bookingAddonTitle.empty,
    required: messages.validation.bookingAddonTitle.empty,
    allowEmpty: messages.validation.bookingAddonTitle.empty
  }
};

const bookingAddonOptionName = {
  type: 'object',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.bookingAddonOptionName.empty,
    required: messages.validation.bookingAddonOptionName.empty,
    allowEmpty: messages.validation.bookingAddonOptionName.empty
  }
};

const bookingAddonOptions = {
  type: 'array',
  required: true,
  items: bookingAddonOptionName,
  uniqueItems: true,
  messages: {
    type: messages.validation.bookingAddonOptions.empty,
    required: messages.validation.bookingAddonOptions.empty,
    uniqueItems: messages.validation.bookingAddonOptions.unique
  }
};

const bookingChild = {
  type: 'Boolean',
  messages: {
    type: messages.validation.bookingChild.invalid
  }
};

const bookingAddons = {
  type: 'array',
  required: true,
  conform: (items) => {
    if (!_.isArray(items)) {
      return true;
    }

    let uniqSet = _.uniqWith(items, (item1, item2) => {
      return (item1.title === item2.title);
    });

    return uniqSet.length === items.length;
  },
  items: {
    properties: {
      title: bookingAddonTitle,
      options: bookingAddonOptions
    }
  },
  uniqueItems: true,
  messages: {
    type: messages.validation.bookingAddons.empty,
    required: messages.validation.bookingAddons.empty,
    conform: messages.validation.bookingAddons.unique,
    uniqueItems: messages.validation.bookingAddons.unique
  }
};

const creator = {
  type: 'object',
  required: false,
  allowEmpty: true,
  messages: {
    type: messages.validation.bookingAddonOptionName.empty
    // required: messages.validation.bookingAddonOptionName.empty,
    // allowEmpty: messages.validation.bookingAddonOptionName.empty
  }
};

const bookingPassengersDetail = {
  type: 'array',
  required: true,
  // conform: (items) => {
  //   if (!_.isArray(items)) {
  //     return true;
  //   }

  //   // let uniqSet = _.uniqWith(items, (item1, item2) => {
  //   //   return (item1.idCard === item2.idCard);
  //   // });

  //   // return uniqSet.length === items.length;
  // },
  items: {
    properties: {
      fullName: fullName,
      mobile: mobile,
      email: email,
      // idCard: idCard,
      isChild: bookingChild,
      addons: bookingAddons
    }
  },
  minItems: 1,
  // uniqueItems: true,
  messages: {
    type: messages.validation.bookingPassengersDetail.empty,
    required: messages.validation.bookingPassengersDetail.empty,
    // conform: messages.validation.bookingPassengersDetail.unique,
    minItems: messages.validation.bookingPassengersDetail.length
    // uniqueItems: messages.validation.bookingPassengersDetail.unique
  }
};

// const noOfAdults = {
//   type: 'number',
//   required: true,
//   conform: (value) => {
//     if (!value) {
//       return true;
//     }

//     return _.isNumber(value) && !_.isNaN(value);
//   },
//   messages: {
//     type: messages.validation.noOfAdults.empty,
//     required: messages.validation.noOfAdults.empty,
//     conform: messages.validation.noOfAdults.invalid
//   }
// };

// const noOfChildren = {
//   type: 'number',
//   required: true,
//   conform: (value) => {
//     if (!value) {
//       return true;
//     }

//     return _.isNumber(value) && !_.isNaN(value);
//   },
//   messages: {
//     type: messages.validation.noOfChildren.empty,
//     required: messages.validation.noOfChildren.empty,
//     conform: messages.validation.noOfChildren.invalid
//   }
// };

const noOfStudents = {
  type: 'number',
  required: true,
  conform: (value) => {
    if (!value) {
      return true;
    }

    return _.isNumber(value) && !_.isNaN(value);
  },
  messages: {
    type: messages.validation.noOfStudents.empty,
    required: messages.validation.noOfStudents.empty,
    conform: messages.validation.noOfStudents.invalid
  }
};

const studentsDetail = {
  type: 'array',
  required: true,
  items: {
    properties: {
      firstName: firstName,
      lastName: lastName,
      fullName: fullName,
      mobile: mobile,
      email: email,
      // idCard: idCard,
      // noOfAdults: noOfAdults,
      // noOfChildren: noOfChildren,
      noOfStudents: noOfStudents
    }
  },
  minItems: 1,
  messages: {
    type: messages.validation.studentsDetail.empty,
    required: messages.validation.studentsDetail.empty,
    minItems: messages.validation.studentsDetail.length
  }
};

const bookingReferrer = {
  type: 'string',
  required: false,
  allowEmpty: true,
  maxLength: 100,
  messages: {
    type: messages.validation.bookingReferrer.invalid,
    maxLength: messages.validation.bookingReferrer.length
  }
};

const bookingPaymentMethod = {
  type: 'string',
  required: true,
  enum: _.values(enums.booking.paymentMethod),
  messages: {
    type: messages.validation.bookingPaymentMethod.empty,
    required: messages.validation.bookingPaymentMethod.empty,
    enum: messages.validation.bookingPaymentMethod.validValue
  }
};

const bookingBillingInfo = (paymentMethod) => {
  if (paymentMethod !== enums.booking.paymentMethod.cod) {
    return {};
  }

  return {
    type: 'string',
    required: true,
    allowEmpty: false,
    messages: {
      type: messages.validation.bookingBillingInfo.empty,
      required: messages.validation.bookingBillingInfo.empty,
      allowEmpty: messages.validation.bookingBillingInfo.empty
    }
  };
};

const bookingNewStatus = {
  type: 'string',
  required: true,
  enum: _.values(enums.booking.status),
  messages: {
    type: messages.validation.bookingNewStatus.validValue,
    required: messages.validation.bookingNewStatus.validValue,
    enum: messages.validation.bookingNewStatus.validValue
  }
};

const accommodationStatus = {
  type: 'string',
  required: true,
  enum: _.values(enums.hotel.status),
  messages: {
    type: messages.validation.bookingNewStatus.validValue,
    required: messages.validation.bookingNewStatus.validValue,
    enum: messages.validation.bookingNewStatus.validValue
  }
};

const eventFilterLocations = {
  type: 'array',
  items: {
    type: 'string',
    messages: {
      type: messages.validation.eventFilterLocations.invalid
    }
  },
  messages: {
    type: messages.validation.eventFilterLocations.invalid
  }
};

const locations = {
  type: 'array',
  items: {
    type: 'string',
    pattern: '^[0-9a-fA-F]{24}$',
    messages: {
      pattern: messages.validation.objectId.invalid
    }
  },
  messages: {
    type: messages.validation.eventFilterLocations.invalid
  }
};
const subLocations = {
  type: 'array',
  items: {
    type: 'string',
    pattern: '^[0-9a-fA-F]{24}$',
    messages: {
      pattern: messages.validation.objectId.invalid
    }
  },
  messages: {
    type: messages.validation.eventFilterSubLocations.invalid
  }
};

const eventFilterCategories = {
  type: 'array',
  items: {
    type: 'string',
    messages: {
      type: messages.validation.eventFilterCategories.invalid
    }
  },
  messages: {
    type: messages.validation.eventFilterCategories.invalid
  }
};

const categories = {
  type: 'array',
  items: {
    type: 'string',
    pattern: '^[0-9a-fA-F]{24}$',
    messages: {
      pattern: messages.validation.objectId.invalid
    }
  },
  messages: {
    type: messages.validation.eventFilterCategories.invalid
  }
};

const eventFilterDuration = {
  type: 'number',
  conform: (value) => {
    if (!value) {
      return true;
    }

    return _.isNumber(value) && !_.isNaN(value) && value > 0;
  },
  messages: {
    type: messages.validation.eventFilterDuration.invalid,
    conform: messages.validation.eventFilterDuration.invalid
  }
};

const eventFilterDate = {
  type: 'string',
  conform: (value) => {
    if (!value) {
      return true;
    }

    let format = /^\d{4}-\d{2}-\d{2}$/;
    return format.test(value);
  },
  messages: {
    type: messages.validation.eventFilterDate.invalid,
    conform: messages.validation.eventFilterDate.invalid
  }
};

const eventFilterPrice = {
  type: 'number',
  conform: (value) => {
    if (!value) {
      return true;
    }

    return _.isNumber(value) && !_.isNaN(value);
  },
  messages: {
    type: messages.validation.eventFilterPrice.invalid,
    conform: messages.validation.eventFilterPrice.invalid
  }
};

const ipnURL = {
  type: 'string',
  required: true,
  allowEmpty: false,
  conform: (value) => {
    let test = url.parse(value);

    return test.protocol && test.slashes && test.host && test.path;
  },
  messages: {
    type: messages.validation.ipnURL.invalid,
    required: messages.validation.ipnURL.invalid,
    allowEmpty: messages.validation.ipnURL.invalid,
    conform: messages.validation.ipnURL.invalid
  }
};

const eventEquipments = {
  type: 'array',
  items: {
    type: 'string',
    minLength: 3,
    maxLength: 200,
    messages: {
      type: messages.validation.eventEquipments.itemType,
      minLength: messages.validation.eventEquipments.itemLength,
      maxLength: messages.validation.eventEquipments.itemLength
    }
  },
  uniqueItems: true,
  messages: {
    type: messages.validation.eventEquipments.itemType,
    uniqueItems: messages.validation.eventEquipments.unique
  }
};

const facilities = {
  type: 'array',
  items: {
    type: 'string',
    minLength: 1,
    maxLength: 200,
    messages: {
      type: messages.validation.facilities.itemType,
      minLength: messages.validation.facilities.itemLength,
      maxLength: messages.validation.facilities.itemLength
    }
  },
  uniqueItems: true,
  messages: {
    type: messages.validation.facilities.itemType,
    uniqueItems: messages.validation.facilities.unique
  }
};

const whatsIncluded = {
  type: 'array',
  items: {
    type: 'string',
    minLength: 1,
    maxLength: 200,
    messages: {
      type: messages.validation.whatsIncluded.itemType,
      minLength: messages.validation.whatsIncluded.itemLength,
      maxLength: messages.validation.whatsIncluded.itemLength
    }
  },
  uniqueItems: true,
  messages: {
    type: messages.validation.eventEquipments.itemType,
    uniqueItems: messages.validation.eventEquipments.unique
  }
};
const photoDescription = {
  type: 'string',
  required: true,
  messages: {
    required: messages.validation.photoDescription.required
  }
};

const testimonial = {
  type: 'string',
  required: true,
  allowEmpty: false,
  minLength: 10,
  maxLength: 8000,
  messages: {
    type: messages.validation.testimonial.empty,
    required: messages.validation.testimonial.empty,
    allowEmpty: messages.validation.testimonial.empty,
    minLength: messages.validation.testimonial.length,
    maxLength: messages.validation.testimonial.length
  }
};
const rating = {
  type: 'number',
  required: true,
  allowEmpty: false,
  minimum: 0,
  maximum: 5,
  messages: {
    type: messages.validation.rating.empty,
    required: messages.validation.rating.empty,
    allowEmpty: messages.validation.rating.empty,
    minimum: messages.validation.rating.invalid,
    maximum: messages.validation.rating.invalid
  }
};

const establishmentDate = {
  type: 'string',
  required: true,
  format: 'date',
  messages: {
    type: messages.validation.establishmentDate.empty,
    required: messages.validation.establishmentDate.empty,
    format: messages.validation.establishmentDate.invalid
  }
};

const numberOfGuides = {
  type: 'number',
  required: true,
  allowEmpty: false,
  minimum: 1,
  messages: {
    type: messages.validation.numberOfGuides.empty,
    required: messages.validation.numberOfGuides.empty,
    allowEmpty: messages.validation.numberOfGuides.empty,
    minimum: messages.validation.numberOfGuides.invalid
  }
};

const license = {
  type: 'string',
  required: true,
  pattern: '^[0-9a-zA-Z]{9,13}$',
  messages: {
    type: messages.validation.license.empty,
    required: messages.validation.license.empty,
    pattern: messages.validation.license.invalid
  }
};

const Ownstransport = {
  type: 'string',
  required: true,
  enum: ['yes', 'no'],
  messages: {
    type: messages.validation.Ownstransport.empty,
    required: messages.validation.Ownstransport.empty,
    enum: messages.validation.Ownstransport.invalid
  }
};

const commission = {
  type: 'number',
  required: true,
  messages: {
    type: messages.validation.commission.empty,
    required: messages.validation.commission.empty,
    enum: messages.validation.commission.invalid
  }
};

const accountNumber1 = {
  type: 'string',
  required: true,
  messages: {
    type: messages.validation.accountNumber1.empty,
    required: messages.validation.accountNumber1.empty,
    enum: messages.validation.accountNumber1.invalid
  }
};

const accountNumber2 = {
  type: 'string',
  required: false,
  allowEmpty: true,
  messages: {
    enum: messages.validation.accountNumber2.invalid
  }
};
const accountNumber3 = {
  type: 'string',
  required: false,
  allowEmpty: true,
  messages: {
    enum: messages.validation.accountNumber3.invalid
  }
};

const verificationCode = {
  type: 'string',
  required: true,
  // allowEmpty: true,
  messages: {
    type: messages.validation.verify.invalid,
    required: messages.validation.verify.empty
  }
};

const formPhoto = {
  type: 'string',
  required: true,
  pattern: '^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$', // base64
  fileSize: 3 * 1024 * 1024, // bytes
  minWidth: 100,
  maxWidth: 350,
  minHeight: 100,
  maxHeight: 500,
  imageType: ['jpg', 'png', 'jpeg'],
  messages: {
    type: messages.validation.photo.empty,
    required: messages.validation.photo.empty,
    pattern: messages.validation.photo.invalid,
    fileSize: messages.validation.photo.fileSize,
    minWidth: messages.validation.formPhoto.tooSmall,
    maxWidth: messages.validation.formPhoto.tooLarge,
    minHeight: messages.validation.formPhoto.tooSmall,
    maxHeight: messages.validation.formPhoto.tooLarge,
    imageType: messages.validation.photo.imageType
  }
};

const promoCodeEventStartDate = {
  type: 'string',
  required: true,
  format: 'date',
  messages: {
    type: messages.validation.promoCodeEventStartDate.invalid,
    format: messages.validation.promoCodeEventStartDate.invalid,
    required: messages.validation.promoCodeEventStartDate.required
  }
};
const promoCodeEventEndDate = {
  type: 'string',
  required: true,
  format: 'date',
  messages: {
    type: messages.validation.promoCodeEventEndDate.invalid,
    format: messages.validation.promoCodeEventEndDate.invalid,
    required: messages.validation.promoCodeEventEndDate.required

  }
};
const promoEventLimit = {
  type: 'object',
  required: false,
  properties: {
    eventStartDate: promoCodeEventStartDate,
    eventEndDate: promoCodeEventEndDate
  },
  messages: {
    type: messages.validation.promoEventLimit.type
    // required: messages.validation.reviewRating.empty
  }
};

const promoCodeUserUsageLimit = {
  type: 'number',
  required: false,
  minimum: 1,
  messages: {
    type: messages.validation.promoCodeUserUsageLimit.type,
    required: messages.validation.promoCodeUserUsageLimit.empty,
    minimum: messages.validation.promoCodeUserUsageLimit.minimum
  }
};

const promoCodeUsageLimit = {
  type: 'number',
  required: false,
  minimum: 1,
  messages: {
    type: messages.validation.promoCodeUsageLimit.type,
    required: messages.validation.promoCodeUsageLimit.empty,
    minimum: messages.validation.promoCodeUsageLimit.minimum
  }
};

const promoCodePassengerLimit = {
  type: 'number',
  required: false,
  minimum: 1,
  messages: {
    type: messages.validation.promoCodePassengerLimit.type,
    required: messages.validation.promoCodePassengerLimit.empty,
    minimum: messages.validation.promoCodePassengerLimit.minimum
  }
};

const blogSlug = {
  type: 'string',
  required: true,
  allowEmpty: false,
  minLength: 2,
  maxLength: 100,
  conform: (val) => {
    return val === _.kebabCase(val);
  },
  messages: {
    type: messages.validation.blogSlug.empty,
    required: messages.validation.blogSlug.empty,
    allowEmpty: messages.validation.blogSlug.empty,
    minLength: messages.validation.blogSlug.length,
    maxLength: messages.validation.blogSlug.length,
    conform: messages.validation.blogSlug.invalid
  }
};

const priceBracket = {

  type: 'string',
  required: true,
  allowEmpty: false,
  minLength: 2,
  maxLength: 100,
  messages: {
    type: messages.validation.priceBracket.empty,
    required: messages.validation.priceBracket.empty,
    allowEmpty: messages.validation.priceBracket.empty,
    minLength: messages.validation.priceBracket.length,
    maxLength: messages.validation.priceBracket.length
  }

};
const isMMA = {
  type: 'Boolean',
  required: false,
  messages: {
    type: messages.validation.isMMA.invalid
  }
};
const eventSubLocations = {
  type: 'array',
  required: true,
  items: {
    type: 'string',
    allowEmpty: false,
    messages: {
      type: messages.validation.subLocations.itemType,
      allowEmpty: messages.validation.subLocations.itemEmpty
    }
  },
  minItems: 1,
  uniqueItems: true,
  messages: {
    type: messages.validation.subLocations.empty,
    required: messages.validation.subLocations.empty,
    minItems: messages.validation.subLocations.length,
    uniqueItems: messages.validation.subLocations.unique
  }
};
const noOfPromos = {
  type: 'number',
  required: true,
  minimum: 1,
  messages: {
    type: messages.validation.noOfPromos.type,
    minimum: messages.validation.noOfPromos.minimum
  }
};
const isPerPersonPrice = {
  type: 'Boolean',
  required: false,
  messages: {
    type: messages.validation.isMMA.invalid
  }
};

const ageLimit = {
  type: 'number',
  required: true,
  allowEmpty: false,
  minimum: 0,
  messages: {
    type: messages.validation.ageLimit.invalid,
    required: messages.validation.ageLimit.empty,
    allowEmpty: messages.validation.ageLimit.empty,
    minimum: messages.validation.ageLimit.invalid

  }
};

const promoCodeAllowedNetworks = {
  type: 'array',
  required: false,
  allowEmpty: false,
  items: {
    type: 'string',
    allowEmpty: false,
    messages: {
      type: messages.validation.allowedNetworks.type,
      allowEmpty: messages.validation.allowedNetworks.allowEmpty
    }
  },
  uniqueItems: true,
  minItems: 1,
  messages: {
    type: messages.validation.allowedNetworks.type,
    uniqueItems: messages.validation.allowedNetworks.uniqueItems,
    allowEmpty: messages.validation.allowedNetworks.allowEmpty,
    minItems: messages.validation.allowedNetworks.minItems
  }
};

const forForeigners = {
  type: 'Boolean',
  required: false,
  messages: {
    type: messages.validation.eventOnlyDeals.invalid
  }
};

const tagName = {
  type: 'string',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.tagName.type,
    required: messages.validation.tagName.required,
    allowEmpty: messages.validation.tagName.allowEmpty
  }
};
const startingLocationName = {
  type: 'string',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.startingLocationName.type,
    required: messages.validation.startingLocationName.required,
    allowEmpty: messages.validation.startingLocationName.allowEmpty
  }
};

const categoryName = {
  type: 'string',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.categoryName.type,
    required: messages.validation.categoryName.required,
    allowEmpty: messages.validation.categoryName.allowEmpty
  }
};

const categoryAlias = {
  type: 'string',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.categoryAlias.type,
    required: messages.validation.categoryAlias.required,
    allowEmpty: messages.validation.categoryAlias.allowEmpty
  }
};

const activityAlias = {
  type: 'string',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.activityAlias.type,
    required: messages.validation.activityAlias.required,
    allowEmpty: messages.validation.categoryAlias.allowEmpty
  }
};

const activityName = {
  type: 'string',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.activityName.type,
    required: messages.validation.activityName.required,
    allowEmpty: messages.validation.activityName.allowEmpty
  }
};

const activityId = {
  type: 'string',
  required: true,
  allowEmpty: false,
  pattern: '^[0-9a-fA-F]{24}$',
  messages: {
    type: messages.validation.activityId.type,
    required: messages.validation.activityId.required,
    allowEmpty: messages.validation.activityId.allowEmpty,
    pattern: messages.validation.activityId.invalid
  }
};

const courseId = {
  type: 'string',
  required: true,
  allowEmpty: false,
  pattern: '^[0-9a-fA-F]{24}$',
  messages: {
    type: messages.validation.courseId.type,
    required: messages.validation.courseId.required,
    allowEmpty: messages.validation.courseId.allowEmpty,
    pattern: messages.validation.courseId.invalid
  }
};

const categoryId = {
  type: 'string',
  required: true,
  allowEmpty: false,
  pattern: '^[0-9a-fA-F]{24}$',
  messages: {
    type: messages.validation.categoryId.type,
    required: messages.validation.categoryId.required,
    allowEmpty: messages.validation.categoryId.allowEmpty,
    pattern: messages.validation.categoryId.invalid
  }
};

const equipmentId = {
  type: 'string',
  required: true,
  allowEmpty: false,
  pattern: '^[0-9a-fA-F]{24}$',
  messages: {
    type: messages.validation.equipmentId.type,
    required: messages.validation.equipmentId.required,
    allowEmpty: messages.validation.equipmentId.allowEmpty,
    pattern: messages.validation.equipmentId.invalid
  }
};

const facelityName = {
  type: 'string',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.facelityName.type,
    required: messages.validation.facelityName.required,
    allowEmpty: messages.validation.facelityName.allowEmpty
  }
};
const facilityId = {
  type: 'string',
  required: true,
  allowEmpty: false,
  pattern: '^[0-9a-fA-F]{24}$',
  messages: {
    type: messages.validation.facilityId.type,
    required: messages.validation.facilityId.required,
    allowEmpty: messages.validation.facilityId.allowEmpty,
    pattern: messages.validation.facilityId.invalid
  }
};
const locationId = {
  type: 'string',
  required: true,
  allowEmpty: false,
  pattern: '^[0-9a-fA-F]{24}$',
  messages: {
    type: messages.validation.locationId.type,
    required: messages.validation.locationId.required,
    allowEmpty: messages.validation.locationId.allowEmpty,
    pattern: messages.validation.locationId.invalid
  }
};

const serviceId = {
  type: 'string',
  required: true,
  allowEmpty: false,
  pattern: '^[0-9a-fA-F]{24}$',
  messages: {
    type: messages.validation.serviceId.type,
    required: messages.validation.serviceId.required,
    allowEmpty: messages.validation.serviceId.allowEmpty,
    pattern: messages.validation.serviceId.invalid
  }
};

const subActivityName = {
  type: 'string',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.subActivityName.type,
    required: messages.validation.subActivityName.required,
    allowEmpty: messages.validation.subActivityName.allowEmpty
  }
};
const locationName = {
  type: 'string',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.locationName.type,
    required: messages.validation.locationName.required,
    allowEmpty: messages.validation.locationName.allowEmpty
  }
};
const serviceName = {
  type: 'string',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.serviceName.type,
    required: messages.validation.serviceName.required,
    allowEmpty: messages.validation.serviceName.allowEmpty
  }
};
const equipmentName = {
  type: 'string',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.equipmentName.type,
    required: messages.validation.equipmentName.required,
    allowEmpty: messages.validation.equipmentName.allowEmpty
  }
};
const subLocationName = {
  type: 'string',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.subLocationName.type,
    required: messages.validation.subLocationName.required,
    allowEmpty: messages.validation.subLocationName.allowEmpty
  }
};

const coursTitle = {
  type: 'string',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.coursTitle.type,
    required: messages.validation.coursTitle.required,
    allowEmpty: messages.validation.coursTitle.allowEmpty
  }
};
const subActivityId = {
  type: 'string',
  required: true,
  allowEmpty: false,
  pattern: '^[0-9a-fA-F]{24}$',
  messages: {
    type: messages.validation.subActivityId.type,
    required: messages.validation.subActivityId.required,
    allowEmpty: messages.validation.subActivityId.allowEmpty,
    pattern: messages.validation.subActivityId.invalid
  }
};
const subLocationId = {
  type: 'string',
  required: true,
  allowEmpty: false,
  pattern: '^[0-9a-fA-F]{24}$',
  messages: {
    type: messages.validation.subLocationId.type,
    required: messages.validation.subLocationId.required,
    allowEmpty: messages.validation.subLocationId.allowEmpty,
    pattern: messages.validation.subLocationId.invalid
  }
};
const startingLocationId = {
  type: 'string',
  required: true,
  allowEmpty: false,
  pattern: '^[0-9a-fA-F]{24}$',
  messages: {
    type: messages.validation.startingLocationId.type,
    required: messages.validation.startingLocationId.required,
    allowEmpty: messages.validation.startingLocationId.allowEmpty,
    pattern: messages.validation.startingLocationId.invalid
  }
};
const tagId = {
  type: 'string',
  required: true,
  allowEmpty: false,
  pattern: '^[0-9a-fA-F]{24}$',
  messages: {
    type: messages.validation.tagId.type,
    required: messages.validation.tagId.required,
    allowEmpty: messages.validation.tagId.allowEmpty,
    pattern: messages.validation.tagId.invalid
  }
};
const isFilter = {
  type: 'Boolean',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.isFilter.type,
    required: messages.validation.isFilter.required,
    allowEmpty: messages.validation.isFilter.allowEmpty
  }
};
const isDomestic = {
  type: 'Boolean',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.isDomestic.type,
    required: messages.validation.isDomestic.required,
    allowEmpty: messages.validation.isDomestic.allowEmpty
  }
};
const parentId = {
  type: 'string',
  required: true,
  allowEmpty: false,
  pattern: '^[0-9a-fA-F]{24}$',
  messages: {
    type: messages.validation.parentId.type,
    required: messages.validation.parentId.required,
    allowEmpty: messages.validation.parentId.allowEmpty,
    pattern: messages.validation.parentId.invalid
  }
};
const parentName = {
  type: 'string',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.parentName.type,
    required: messages.validation.parentName.required,
    allowEmpty: messages.validation.parentName.allowEmpty
  }
};
const parent = {
  type: 'object',
  required: true,
  allowEmpty: false,
  properties: {
    id: parentId,
    name: parentName
  },
  messages: {
    type: messages.validation.parent.type,
    required: messages.validation.parent.required,
    allowEmpty: messages.validation.parent.allowEmpty
  }
};

const verifyEvent = {
  type: 'Boolean',
  required: false,
  messages: {
    type: messages.validation.verifyEvent.invalid
  }
};

const groupSize = {
  type: 'number',
  required: true,
  allowEmpty: false,
  minimum: 1,
  messages: {
    type: messages.validation.groupSize.invalid,
    minimum: messages.validation.groupSize.invalid
  }
};
const languages = {
  type: 'array',
  required: false,
  items: {
    type: 'string',
    messages: {
      type: messages.validation.languages.itemType
    }
  },
  uniqueItems: true,
  messages: {
    type: messages.validation.languages.empty,
    uniqueItems: messages.validation.languages.unique
  }
};
const skills = {
  type: 'array',
  required: false,
  items: {
    type: 'string',
    messages: {
      type: messages.validation.skills.itemType
    }
  },
  uniqueItems: true,
  messages: {
    type: messages.validation.skills.empty,
    uniqueItems: messages.validation.skills.unique
  }
};

const promoCodeScop = {
  type: 'object',
  conform: (value) => {
    return (
      ((typeof value.everywhere !== 'undefined' && (typeof value.mma === 'undefined' && typeof value.retail === 'undefined' && typeof value.events === 'undefined')) ||
        (typeof value.retail !== 'undefined' && (typeof value.mma === 'undefined' && typeof value.everywhere === 'undefined' && typeof value.events === 'undefined')) ||
        (typeof value.mma !== 'undefined' && (typeof value.retail === 'undefined' && typeof value.everywhere === 'undefined' && typeof value.events === 'undefined')) ||
        (typeof value.events !== 'undefined' && (typeof value.mma === 'undefined' && typeof value.retail === 'undefined' && typeof value.everywhere === 'undefined'))
      ) &&
      (
        (typeof value.categories === 'undefined' && typeof value.activities === 'undefined' && typeof value.locations === 'undefined') ||
        (typeof value.categories === 'undefined' && typeof value.locations === 'undefined') ||
        (typeof value.categories === 'undefined' && typeof value.activities === 'undefined') ||
        (typeof value.activities === 'undefined' && typeof value.locations === 'undefined')
      )
    );
  },
  properties: {
    everywhere: {
      type: 'object',
      required: false,
      properties: {
        amountOff: promoCodeAmountOff,
        percentageOff: promoCodePercentageOff,
        userCap: promoCodeUserCap,
        bookingCap: promoCodeBookingCap
      }
    },
    retail: {
      type: 'object',
      required: false,
      properties: {
        amountOff: promoCodeAmountOff,
        percentageOff: promoCodePercentageOff,
        userCap: promoCodeUserCap,
        bookingCap: promoCodeBookingCap
      }
    },
    mma: {
      type: 'object',
      required: false,
      properties: {
        amountOff: promoCodeAmountOff,
        percentageOff: promoCodePercentageOff,
        userCap: promoCodeUserCap,
        bookingCap: promoCodeBookingCap
      }
    },
    events: {
      type: 'object',
      required: false,
      properties: {
        includes: {
          type: 'object',
          required: false,
          properties: {
            eventIds: promoCodeEventIds,
            amountOff: promoCodeAmountOff,
            percentageOff: promoCodePercentageOff,
            userCap: promoCodeUserCap,
            bookingCap: promoCodeBookingCap
          }
        },
        excludes: {
          type: 'object',
          required: false,
          properties: {
            eventIds: promoCodeEventIds,
            amountOff: promoCodeAmountOff,
            percentageOff: promoCodePercentageOff,
            userCap: promoCodeUserCap,
            bookingCap: promoCodeBookingCap
          }
        }
      }
    },
    categories: {
      type: 'object',
      required: false,
      properties: {
        includes: {
          type: 'array',
          required: false,
          properties: {
            id: categoryId,
            amountOff: promoCodeAmountOff,
            percentageOff: promoCodePercentageOff,
            userCap: promoCodeUserCap,
            bookingCap: promoCodeBookingCap
          }
        },
        excludes: {
          type: 'array',
          required: false,
          properties: {
            id: categoryId,
            amountOff: promoCodeAmountOff,
            percentageOff: promoCodePercentageOff,
            userCap: promoCodeUserCap,
            bookingCap: promoCodeBookingCap
          }
        }
      }
    },
    activities: {
      type: 'object',
      required: false,
      properties: {
        includes: {
          type: 'array',
          required: false,
          properties: {
            id: activityId,
            amountOff: promoCodeAmountOff,
            percentageOff: promoCodePercentageOff,
            userCap: promoCodeUserCap,
            bookingCap: promoCodeBookingCap
          }
        },
        excludes: {
          type: 'array',
          required: false,
          properties: {
            id: activityId,
            amountOff: promoCodeAmountOff,
            percentageOff: promoCodePercentageOff,
            userCap: promoCodeUserCap,
            bookingCap: promoCodeBookingCap
          }
        }
      }
    },
    locations: {
      type: 'object',
      required: false,
      properties: {
        includes: {
          type: 'array',
          required: false,
          properties: {
            id: locationId,
            amountOff: promoCodeAmountOff,
            percentageOff: promoCodePercentageOff,
            userCap: promoCodeUserCap,
            bookingCap: promoCodeBookingCap
          }
        },
        excludes: {
          type: 'array',
          required: false,
          properties: {
            id: locationId,
            amountOff: promoCodeAmountOff,
            percentageOff: promoCodePercentageOff,
            userCap: promoCodeUserCap,
            bookingCap: promoCodeBookingCap
          }
        }
      }
    }
  },
  messages: {
    required: messages.validation.promoCodeScope.required,
    conform: messages.validation.promoCodeScope.conform
  }
};

const wishlistIDs = {
  type: 'object',
  conform: (value) => {
    return (
      ((typeof value.eventId !== 'undefined' && (typeof value.mma === 'undefined' && typeof value.retail === 'undefined' && typeof value.events === 'undefined')) ||
        (typeof value.retail !== 'undefined' && (typeof value.mma === 'undefined' && typeof value.everywhere === 'undefined' && typeof value.events === 'undefined')) ||
        (typeof value.mma !== 'undefined' && (typeof value.retail === 'undefined' && typeof value.everywhere === 'undefined' && typeof value.events === 'undefined'))
      ) &&
      (
        (typeof value.categories === 'undefined' && typeof value.activities === 'undefined' && typeof value.locations === 'undefined') ||
        (typeof value.categories === 'undefined' && typeof value.locations === 'undefined') ||
        (typeof value.categories === 'undefined' && typeof value.activities === 'undefined') ||
        (typeof value.activities === 'undefined' && typeof value.locations === 'undefined')
      )
    );
  },
  properties: {
    everywhere: {
      type: 'object',
      required: false,
      properties: {
        amountOff: promoCodeAmountOff,
        percentageOff: promoCodePercentageOff,
        userCap: promoCodeUserCap,
        bookingCap: promoCodeBookingCap
      }
    },
    retail: {
      type: 'object',
      required: false,
      properties: {
        amountOff: promoCodeAmountOff,
        percentageOff: promoCodePercentageOff,
        userCap: promoCodeUserCap,
        bookingCap: promoCodeBookingCap
      }
    },
    mma: {
      type: 'object',
      required: false,
      properties: {
        amountOff: promoCodeAmountOff,
        percentageOff: promoCodePercentageOff,
        userCap: promoCodeUserCap,
        bookingCap: promoCodeBookingCap
      }
    },
    events: {
      type: 'object',
      required: false,
      properties: {
        includes: {
          type: 'object',
          required: false,
          properties: {
            eventIds: promoCodeEventIds,
            amountOff: promoCodeAmountOff,
            percentageOff: promoCodePercentageOff,
            userCap: promoCodeUserCap,
            bookingCap: promoCodeBookingCap
          }
        },
        excludes: {
          type: 'object',
          required: false,
          properties: {
            eventIds: promoCodeEventIds,
            amountOff: promoCodeAmountOff,
            percentageOff: promoCodePercentageOff,
            userCap: promoCodeUserCap,
            bookingCap: promoCodeBookingCap
          }
        }
      }
    },
    categories: {
      type: 'object',
      required: false,
      properties: {
        includes: {
          type: 'array',
          required: false,
          properties: {
            id: categoryId,
            amountOff: promoCodeAmountOff,
            percentageOff: promoCodePercentageOff,
            userCap: promoCodeUserCap,
            bookingCap: promoCodeBookingCap
          }
        },
        excludes: {
          type: 'array',
          required: false,
          properties: {
            id: categoryId,
            amountOff: promoCodeAmountOff,
            percentageOff: promoCodePercentageOff,
            userCap: promoCodeUserCap,
            bookingCap: promoCodeBookingCap
          }
        }
      }
    },
    activities: {
      type: 'object',
      required: false,
      properties: {
        includes: {
          type: 'array',
          required: false,
          properties: {
            id: activityId,
            amountOff: promoCodeAmountOff,
            percentageOff: promoCodePercentageOff,
            userCap: promoCodeUserCap,
            bookingCap: promoCodeBookingCap
          }
        },
        excludes: {
          type: 'array',
          required: false,
          properties: {
            id: activityId,
            amountOff: promoCodeAmountOff,
            percentageOff: promoCodePercentageOff,
            userCap: promoCodeUserCap,
            bookingCap: promoCodeBookingCap
          }
        }
      }
    },
    locations: {
      type: 'object',
      required: false,
      properties: {
        includes: {
          type: 'array',
          required: false,
          properties: {
            id: locationId,
            amountOff: promoCodeAmountOff,
            percentageOff: promoCodePercentageOff,
            userCap: promoCodeUserCap,
            bookingCap: promoCodeBookingCap
          }
        },
        excludes: {
          type: 'array',
          required: false,
          properties: {
            id: locationId,
            amountOff: promoCodeAmountOff,
            percentageOff: promoCodePercentageOff,
            userCap: promoCodeUserCap,
            bookingCap: promoCodeBookingCap
          }
        }
      }
    }
  },
  messages: {
    required: messages.validation.promoCodeScope.required,
    conform: messages.validation.promoCodeScope.conform
  }
};

const eventType = {
  type: 'string',
  required: true,
  allowEmpty: false,
  messages: {
    type: messages.validation.eventType.empty,
    required: messages.validation.eventType.empty,
    allowEmpty: messages.validation.eventType.empty
  }
};

const coordinates = {
  type: 'array',
  required: true,
  minItems: 2,
  maxItems: 2,
  items: {
    type: 'number',
    allowEmpty: false,
    messages: {
      type: messages.validation.coordinates.invalid,
      allowEmpty: messages.validation.coordinates.invalid
    }
  },
  messages: {
    type: messages.validation.coordinates.invalid,
    required: messages.validation.coordinates.invalid,
    minLength: messages.validation.coordinates.length

  }
};

const distance = {
  type: 'number',
  required: true,
  minimum: 0,
  messages: {
    type: messages.validation.distance.invalid,
    required: messages.validation.distance.empty,
    minimum: messages.validation.distance.invalid
  }
};

const date = {
  type: 'string',
  required: true,
  format: 'date',
  messages: {
    type: messages.validation.date.empty,
    required: messages.validation.date.empty,
    format: messages.validation.date.invalid
  }
};
const dateOptional = {
  type: 'string',
  required: false,
  format: 'date',
  messages: {
    type: messages.validation.date.empty,
    required: messages.validation.date.empty,
    format: messages.validation.date.invalid
  }
};

const tripStatus = {
  type: 'string',
  required: true,
  enum: _.values(enums.trip.status),
  messages: {
    type: messages.validation.tripStatus.empty,
    required: messages.validation.tripStatus.empty,
    enum: messages.validation.tripStatus.validValue
  }
};

const day = {
  type: 'number',
  required: true,
  messages: {
    type: messages.validation.day.empty,
    required: messages.validation.day.empty,
    enum: messages.validation.day.validValue
  }
};

const time = {
  type: 'string',
  required: true,
  format: 'Date',
  conform: (value) => {
    return moment(value).isValid();
  },
  messages: {
    type: messages.validation.time.empty,
    required: messages.validation.time.empty,
    format: messages.validation.time.validValue
  }
};
// const duration = {
//   type: 'number',
//   required: true,
//   messages: {
//     type: messages.validation.duration.empty,
//     required: messages.validation.duration.empty,
//     format: messages.validation.duration.validValue
//   }
// };

const description = {
  type: 'string',
  required: false,
  allowEmpty: false,
  minLength: 20,
  maxLength: 800,
  messages: {
    type: messages.validation.description.empty,
    required: messages.validation.description.empty,
    allowEmpty: messages.validation.description.empty,
    minLength: messages.validation.description.length,
    maxLength: messages.validation.description.length
  }
};

const itinerary = {
  type: 'array',
  required: true,
  items: {
    properties: {
      day: day,
      timeFrom: time,
      timeTo: time,
      description: description
    }
  },
  messages: {
    type: messages.validation.itinerary.empty,
    required: messages.validation.itinerary.empty,
    conform: messages.validation.itinerary.unique,
    minItems: messages.validation.itinerary.length,
    uniqueItems: messages.validation.itinerary.unique
  }
};

const cancellationPolicy = {
  type: 'string',
  required: false,
  allowEmpty: false,
  minLength: 5,
  maxLength: 2000,
  messages: {
    type: messages.validation.cancellationPolicy.empty,
    required: messages.validation.cancellationPolicy.empty,
    allowEmpty: messages.validation.cancellationPolicy.empty,
    minLength: messages.validation.cancellationPolicy.length,
    maxLength: messages.validation.cancellationPolicy.length
  }
};

const tripPrice = {
  type: 'number',
  required: false,
  minimum: 0,
  messages: {
    type: messages.validation.tripPrice.invalid,
    minimum: messages.validation.tripPrice.invalid
  }
};

const tripDescription = {
  type: 'string',
  required: false,
  allowEmpty: false,
  minLength: 5,
  maxLength: 2000,
  messages: {
    type: messages.validation.tripDescription.empty,
    required: messages.validation.tripDescription.empty,
    allowEmpty: messages.validation.tripDescription.empty,
    minLength: messages.validation.tripDescription.length,
    maxLength: messages.validation.tripDescription.length
  }
};

const tripDate = {
  type: 'string',
  required: true,
  format: 'Date',
  messages: {
    type: messages.validation.date.empty,
    required: messages.validation.date.empty,
    format: messages.validation.date.invalid
  }
};

const tripDuration = {
  type: 'number',
  required: false,
  allowEmpty: false,
  messages: {
    type: messages.validation.tripDescription.empty,
    required: messages.validation.tripDescription.empty,
    allowEmpty: messages.validation.tripDescription.empty,
    minLength: messages.validation.tripDescription.length,
    maxLength: messages.validation.tripDescription.length
  }
};

const tripTitle = {
  type: 'string',
  required: true,
  allowEmpty: false,
  minLength: 2,
  maxLength: 100,
  messages: {
    type: messages.validation.tripTitle.empty,
    required: messages.validation.tripTitle.empty,
    allowEmpty: messages.validation.tripTitle.empty,
    minLength: messages.validation.tripTitle.length,
    maxLength: messages.validation.tripTitle.length
  }
};

const tripPhotoIds = {
  type: 'string',
  required: true,
  uniqueItems: true,
  messages: {
    type: messages.validation.eventPhotoIds.empty,
    required: messages.validation.eventPhotoIds.empty,
    uniqueItems: messages.validation.eventPhotoIds.unique
  }
};

const service_name = {
  type: 'string',
  required: true,
  messages: {
    type: messages.validation.service_name.empty,
    required: messages.validation.service_name.empty
  }
};

const origin_city_name = {
  type: 'string',
  required: true,
  messages: {
    type: messages.validation.origin_city_name.empty,
    required: messages.validation.origin_city_name.empty
  }
};

const destination_city_name = {
  type: 'string',
  required: true,
  messages: {
    type: messages.validation.destination_city_name.empty,
    required: messages.validation.destination_city_name.empty
  }
};

const deptime = {
  type: 'string',
  required: true,
  messages: {
    type: messages.validation.deptime.empty,
    required: messages.validation.deptime.empty
  }
};

const time_id = {
  type: 'string',
  required: true,
  messages: {
    type: messages.validation.time_id.empty,
    required: messages.validation.time_id.empty
  }
};

const schedule_id = {
  type: 'string',
  required: true,
  messages: {
    type: messages.validation.schedule_id.empty,
    required: messages.validation.schedule_id.empty
  }
};

const route_id = {
  type: 'string',
  required: true,
  messages: {
    type: messages.validation.route_id.empty,
    required: messages.validation.route_id.empty
  }
};

const number_of_seats = {
  type: 'string',
  required: true,
  messages: {
    type: messages.validation.number_of_seats.empty,
    required: messages.validation.number_of_seats.empty
  }
};

const seat_numbers_male = {
  type: 'string',
  required: true,
  messages: {
    type: messages.validation.seat_numbers_male.empty,
    required: messages.validation.seat_numbers_male.empty
  }
};

const seat_numbers_female = {
  type: 'string',
  required: true,
  messages: {
    type: messages.validation.seat_numbers_female.empty,
    required: messages.validation.seat_numbers_female.empty
  }
};

const name = {
  type: 'string',
  required: true,
  messages: {
    type: messages.validation.name.empty,
    required: messages.validation.name.empty
  }
};

const cnic = {
  type: 'string',
  required: true,
  messages: {
    type: messages.validation.cnic.empty,
    required: messages.validation.cnic.empty
  }
};

const ticket_price = {
  type: 'string',
  required: true,
  messages: {
    type: messages.validation.ticket_price.empty,
    required: messages.validation.ticket_price.empty
  }
};

const total_price = {
  type: 'string',
  required: true,
  messages: {
    type: messages.validation.total_price.empty,
    required: messages.validation.total_price.empty
  }
};

const locationType = {
  type: 'string',
  messages: {
    type: messages.validation.locationType.empty,
    required: messages.validation.locationType.empty,
    enum: messages.validation.locationType.validValue
  }
};

const ObjectId = (fieldName) => {
  return {
    type: 'string',
    required: true,
    pattern: '^[0-9a-fA-F]{24}$',
    messages: {
      type: util.format(messages.validation.ObjectId.empty, fieldName),
      required: util.format(messages.validation.ObjectId.empty, fieldName),
      pattern: util.format(messages.validation.ObjectId.invalid, fieldName)
    }
  };
};

const arrayOfObjectIds = (fieldName) => {
  return {
    type: 'array',
    required: true,
    items: ObjectId(fieldName),
    minItems: 1,
    maxItems: 50,
    uniqueItems: true,
    messages: {
      type: util.format(messages.validation.arrayOfObjectIds.empty, fieldName),
      required: util.format(messages.validation.arrayOfObjectIds.empty, fieldName),
      minItems: util.format(messages.validation.arrayOfObjectIds.length, fieldName),
      maxItems: util.format(messages.validation.arrayOfObjectIds.length, fieldName),
      uniqueItems: util.format(messages.validation.arrayOfObjectIds.unique, fieldName)
    }
  };
};

const numRequired = (fieldName) => {
  return {
    type: 'number',
    required: true,
    allowEmpty: false,
    minimum: 0,
    messages: {
      type: util.format(messages.validation.numRequired.type, fieldName),
      required: util.format(messages.validation.numRequired.empty, fieldName),
      allowEmpty: util.format(messages.validation.numRequired.empty, fieldName),
      minimum: util.format(messages.validation.numRequired.minimum, fieldName)
    }
  };
};

const number = (fieldName) => {
  return {
    type: 'number',
    allowEmpty: false,
    minimum: 0,
    messages: {
      type: util.format(messages.validation.numRequired.type, fieldName),
      required: util.format(messages.validation.numRequired.empty, fieldName),
      allowEmpty: util.format(messages.validation.numRequired.empty, fieldName),
      minimum: util.format(messages.validation.numRequired.minimum, fieldName)
    }
  };
};

const booleanRequired = (fieldName) => {
  return {
    type: 'boolean',
    required: true,
    allowEmpty: false,
    messages: {
      type: util.format(messages.validation.booleanRequired.empty, fieldName),
      required: util.format(messages.validation.booleanRequired.empty, fieldName),
      allowEmpty: util.format(messages.validation.booleanRequired.empty, fieldName)
    }
  };
};

const coordinatesRequired = (fieldName) => {
  return {
    type: 'array',
    required: true,
    items: numRequired(fieldName),
    minItems: 2,
    maxItems: 2,
    messages: {
      type: util.format(messages.validation.coordinates.type, fieldName),
      required: util.format(messages.validation.coordinates.empty, fieldName),
      minItems: util.format(messages.validation.coordinates.length, fieldName),
      maxItems: util.format(messages.validation.coordinates.length, fieldName)
    }
  };
};

const OptionalObjectId = (fieldName) => {
  return {
    type: 'string',
    required: false,
    pattern: '^[0-9a-fA-F]{24}$',
    messages: {
      type: util.format(messages.validation.ObjectId.empty, fieldName),
      required: util.format(messages.validation.ObjectId.empty, fieldName),
      pattern: util.format(messages.validation.ObjectId.invalid, fieldName)
    }
  };
};

const arrayOfStrings = (fieldName) => {
  return {
    type: 'array',
    required: true,
    items: textRequired(fieldName),
    messages: {
      messages: {
        type: util.format(messages.validation.textRequired.empty, fieldName),
        required: util.format(messages.validation.textRequired.empty, fieldName),
        allowEmpty: util.format(messages.validation.textRequired.empty, fieldName)
      }
    }
  };
};
const optionalArrayOfObjectIds = (fieldName) => {
  return {
    type: 'array',
    required: false,
    items: OptionalObjectId(fieldName),
    minItems: 1,
    maxItems: 50,
    uniqueItems: true,
    messages: {
      type: util.format(messages.validation.arrayOfObjectIds.empty, fieldName),
      required: util.format(messages.validation.arrayOfObjectIds.empty, fieldName),
      minItems: util.format(messages.validation.arrayOfObjectIds.length, fieldName),
      maxItems: util.format(messages.validation.arrayOfObjectIds.length, fieldName),
      uniqueItems: util.format(messages.validation.arrayOfObjectIds.unique, fieldName)
    }
  };
};

const arrayOfBooleans = (fieldName) => {
  return {
    type: 'array',
    required: true,
    items: booleanRequired(fieldName),
    minItems: 7,
    messages: {
      type: util.format(messages.validation.arrayOfBooleans.empty, fieldName),
      required: util.format(messages.validation.arrayOfBooleans.empty, fieldName),
      minItems: util.format(messages.validation.arrayOfBooleans.length, fieldName)
    }
  };
};

const passengersDetail = {
  type: 'object',
  required: true,
  allowEmpty: false,
  properties: {
    fullName: textRequired('fullName'),
    mobile: textRequired('mobile'),
    email: textRequired('email'),
    idCard: textRequired('idCard'),
    isChild: booleanRequired('isChild'),
    noOfAdults: numRequired('noOfAdults'),
    noOfChildren: numRequired('noOfChildren')
  },
  messages: {
    type: messages.validation.passengersDetail.type,
    required: messages.validation.passengersDetail.required,
    allowEmpty: messages.validation.passengersDetail.allowEmpty
  }
};

module.exports = {
  textRequired,
  text,
  numRequired,
  number,
  booleanRequired,
  coordinatesRequired,
  arrayOfStrings,
  arrayOfBooleans,
  socialMedia,
  social,
  deviceType,
  token,
  userId,
  email,
  password,
  oldPassword,
  companyName,
  fullName,
  firstName,
  middleName,
  lastName,
  mobile,
  gender,
  dob,
  idCard,
  universityName,
  universityEmail,
  objectId,
  optionalObjectId,
  OptionalObjectId,
  resetPasswordCode,
  // eventPhoto,
  tagPhoto,
  eventPhotoIds,
  eventTitle,
  booleanTypeCheck,
  booleanType,
  tripSlug,
  tagSlug,
  eventDescription,
  eventDuration,
  eventLocations,
  eventCategories,
  eventPassengerLimit,
  eventUniversityLimit,
  eventDarazLink,
  eventTags,
  eventItinerary,
  eventFacilities,
  // eventStatus,
  // eventAddons,
  eventOriginalPrice,
  eventBookingDeadline,
  eventDiscount,
  courseDiscount,
  eventOnlyDeals,
  eventPackagesCount,
  // eventAvailability,
  // eventAvailabilityV2,
  pickupPoints,
  photoDescription,
  questionComment,
  reviewComment,
  reviewRating,
  feedbackReply,
  promoCode,
  promoCodeSingleUse,
  promoCodeScopeMMA,
  promoCodeScopeAll,
  promoCodeScopeEvents,
  promoCodeScop,
  bookingDate,
  bookingPromoCode,
  bookingPackageId,
  bookingSlotId,
  bookingPassengersDetail,
  bookingReferrer,
  bookingPaymentMethod,
  bookingBillingInfo,
  bookingNewStatus,
  eventFilterLocations,
  eventFilterCategories,
  eventFilterDuration,
  eventFilterDate,
  eventFilterPrice,
  ipnURL,
  eventEquipments,
  facilities,
  eventActivities,
  profilePhoto,
  startingLocation,
  testimonial,
  reviewToken,
  rating,
  establishmentDate,
  numberOfGuides,
  license,
  Ownstransport,
  commission,
  accountNumber1,
  accountNumber2,
  accountNumber3,
  verificationCode,
  formPhoto,
  creator,
  promoEventLimit,
  promoCodeUserUsageLimit,
  promoCodeUsageLimit,
  promoCodePassengerLimit,
  blogSlug,
  priceBracket,
  isMMA,
  subLocations,
  noOfPromos,
  phone,
  isPerPersonPrice,
  ageLimit,
  promoCodeAllowedNetworks,
  forForeigners,
  tagId,
  tagName,
  startingLocationName,
  startingLocationId,
  categoryName,
  activityId,
  courseId,
  subActivityId,
  subActivityName,
  locationId,
  serviceId,
  subLocationId,
  locationName,
  serviceName,
  subLocationName,
  activityName,
  categoryId,
  equipmentId,
  isFilter,
  parent,
  isDomestic,
  verifyEvent,
  checkIn,
  checkOut,
  accommodationId,
  locations,
  activities,
  categories,
  subActivities,
  eventSubLocations,
  tags,
  promoCodeEndDateForReport,
  coursTitle,
  // courseAvailability,
  studentsDetail,
  groupSize,
  languages,
  skills,
  mobileInstuctor,
  categoryAlias,
  activityAlias,
  categoryDescription,
  activityDescription,
  // mmaPackages,
  services,
  allowedPassengerLimit,
  priceRange,
  eventType,
  equipmentName,
  facelityName,
  facilityId,
  whatsIncluded,
  wishlistIDs,
  coordinates,
  distance,
  date,
  type,
  tripStatus,
  itinerary,
  cancellationPolicy,
  tripPrice,
  tripDescription,
  tripDate,
  tripDuration,
  tripTitle,
  tripPhotoIds,
  emergencyMobile,
  service_name,
  origin_city_name,
  destination_city_name,
  deptime,
  time_id,
  schedule_id,
  route_id,
  number_of_seats,
  seat_numbers_male,
  seat_numbers_female,
  name,
  cnic,
  ticket_price,
  total_price,
  locationType,
  ObjectId,
  arrayOfObjectIds,
  optionalArrayOfObjectIds,
  dateOptional,
  time,
  passengersDetail,
  accommodationStatus
};

