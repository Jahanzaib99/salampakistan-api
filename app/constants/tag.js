'use strict';

module.exports = {
  type: {
    activity: 'activity',
    category: 'category',
    location: 'location',
    subLocation: 'subLocation',
    startingLocation: 'startingLocation',
    others: 'others',
    service: 'service',
    equipment: 'equipment',
    facility: 'facility'
  },
  photo: {
    width: 960,
    height: 540
  },
  thumbnail: {
    width: 270,
    height: 200
  },
  activityTypes: [
    'trip',
    'event'
  ],
  categoryTypes: [
    'destination',
    'accomodation',
    'trip',
    'event'
  ],
  locationTypes: [
    'city',
    'province',
    'museum'
  ]
};
