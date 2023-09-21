'use strict';

module.exports = {
  status: {
    draft: 'draft',
    pendingReview: 'pendingReview',
    published: 'published',
    private: 'private',
    closed: 'closed'
  },
  //   addonType: {
  //     single: 'single',
  //     multiple: 'multiple'
  //   },
  availabilityType: {
    fixedDate: 'fixedDate',
    weekly: 'weekly',
    daily: 'daily'
  },
  sortKeyMap: {
    name: 'title',
    date: 'nextAvailability',
    price: 'nextAvailabilityMinPrice'
  }
};
