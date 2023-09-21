'use strict';

module.exports = {
  // user permissions
  Permissions: {
    superAdmin: {
      accomodations: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      surroundings: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      pressRelase: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      media: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      users: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      events: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      trips: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      news: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      locations: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      categories: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      activities: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      facilities: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      languages: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      bookings: {
        get: true
      },
      complaintMangement: {
        get: true
      },
      dashboardPermission: {
        cards: {
          trips: true,
          events: true,
          accomodations: true,
          locations: true,
          activities: true,
          vendors: true,
          customers: true,
          bookings: true
        },
        lineCharts: {
          trips: true,
          events: true,
          accomodations: true
        },
        pieCharts: {
          trips: true,
          events: true,
          accomodations: true,
          locations: true,
          activities: true,
          vendors: true,
          customers: true
        }
      }
    },
    admin: {
      accomodations: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      surroundings: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      pressRelase: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      media: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      users: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      events: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      trips: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      news: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      locations: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      categories: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      activities: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      facilities: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      languages: {
        post: true,
        get: true,
        delete: true,
        update: true
      },
      bookings: {
        get: true
      },
      complaintMangement: {
        get: true
      },
      dashboardPermission: {
        cards: {
          trips: true,
          events: true,
          accomodations: true,
          locations: true,
          activities: true,
          vendors: true,
          customers: true,
          bookings: true
        },
        lineCharts: {
          trips: true,
          events: true,
          accomodations: true
        },
        pieCharts: {
          trips: true,
          events: true,
          accomodations: true,
          locations: true,
          activities: true,
          vendors: true,
          customers: true
        }
      }
    },
    vendor: {
      hotel: {
        accomodations: {
          post: true,
          get: true,
          delete: true,
          update: true
        },
        surroundings: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        pressRelase: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        media: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        users: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        events: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        trips: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        news: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        locations: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        categories: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        activities: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        facilities: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        languages: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        bookings: {
          get: true
        },
        complaintMangement: {
          get: true
        },
        dashboardPermission: {
          cards: {
            trips: false,
            events: false,
            accomodations: true,
            locations: false,
            activities: false,
            vendors: false,
            customers: false,
            bookings: false
          },
          lineCharts: {
            trips: false,
            events: false,
            accomodations: true
          },
          pieCharts: {
            trips: false,
            events: false,
            accomodations: true,
            locations: false,
            activities: false,
            vendors: false,
            customers: false
          }
        }
      },
      tripAndEvent: {
        accomodations: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        surroundings: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        pressRelase: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        media: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        users: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        events: {
          post: true,
          get: true,
          delete: true,
          update: true
        },
        trips: {
          post: true,
          get: true,
          delete: true,
          update: true
        },
        news: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        locations: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        categories: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        activities: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        facilities: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        languages: {
          post: false,
          get: false,
          delete: false,
          update: false
        },
        bookings: {
          get: true
        },
        complaintMangement: {
          get: true
        },
        dashboardPermission: {
          cards: {
            trips: true,
            events: true,
            accomodations: false,
            locations: false,
            activities: false,
            vendors: false,
            customers: false,
            bookings: false
          },
          lineCharts: {
            trips: true,
            events: true,
            accomodations: false
          },
          pieCharts: {
            trips: true,
            events: true,
            accomodations: false,
            locations: false,
            activities: false,
            vendors: false,
            customers: false
          }
        }
      }},
    employee: {
      accomodations: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      surroundings: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      pressRelase: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      media: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      users: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      events: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      trips: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      news: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      locations: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      categories: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      activities: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      facilities: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      languages: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      bookings: {
        get: true
      },
      complaintMangement: {
        get: true
      },
      dashboardPermission: {
        cards: {
          trips: true,
          events: true,
          accomodations: true,
          locations: true,
          activities: true,
          vendors: true,
          customers: true,
          bookings: true
        },
        lineCharts: {
          trips: true,
          events: true,
          accomodations: true
        },
        pieCharts: {
          trips: true,
          events: true,
          accomodations: true,
          locations: true,
          activities: true,
          vendors: true,
          customers: true
        }
      }
    },
    customer: {
      accomodations: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      surroundings: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      pressRelase: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      media: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      users: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      events: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      trips: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      news: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      locations: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      categories: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      activities: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      facilities: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      languages: {
        post: false,
        get: true,
        delete: false,
        update: false
      },
      bookings: {
        get: true
      },
      complaintMangement: {
        get: true
      },
      dashboardPermission: {
        cards: {
          trips: true,
          events: true,
          accomodations: true,
          locations: true,
          activities: true,
          vendors: true,
          customers: true,
          bookings: true
        },
        lineCharts: {
          trips: true,
          events: true,
          accomodations: true
        },
        pieCharts: {
          trips: true,
          events: true,
          accomodations: true,
          locations: true,
          activities: true,
          vendors: true,
          customers: true
        }
      }
    }
  }
};
