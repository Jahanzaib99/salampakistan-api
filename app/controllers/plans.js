'use strict';

const services = require('../services');

module.exports = {
  create,
  get,
  getDetails,
  remove,
  update,
  removeOne
};

/**
 * @api {post} /api/plans/:userId Create
 * @apiVersion 1.0.0
 * @apiName create
 * @apiGroup Plans
 *
 * @apiParam {String} name Name
 * @apiParam {Number} startDate startDate(YYYY-MM-DD)
 * @apiParam {Number} endDate endDate(YYYY-MM-DD)
 * @apiParam {Number} duration duration
 * @apiParam {Array} trips Trips ["tripId"]
 * @apiParam {Array} events Events ["eventId"]
 * @apiParam {Array} activities activities ["activityId"]
 * @apiParam {Array} locations locations ["locationId"]
 * @apiParam {Array} categories categories ["categoryId"]
 * @apiParam {Array} accommodations accommodations ["accommodationId"]
 *
 * @apiSuccess {String} response Message
 * @apiSuccessExample {JSON} Success-Response:
 * {
    "data": {
        "message": "Successfully added to plan",
        "id": "605d90bc9779e238c461c153"
    }
}
 */
function create(req, res, next) {
  let payload = {
    userId: req.params.userId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    duration: req.body.duration,
    name: req.body.name,
    trips: req.body.trips,
    events: req.body.events,
    activities: req.body.activities,
    locations: req.body.locations,
    categories: req.body.categories,
    accommodations: req.body.accommodations
  };
  return services.plans.create(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

/**
 * @api {put} /api/plans/:planId/update Update
 * @apiVersion 1.0.0
 * @apiName update
 * @apiGroup Plans
 *
 * @apiParam {String} name Name
 * @apiParam {Number} startDate startDate(YYYY-MM-DD)
 * @apiParam {Number} endDate endDate(YYYY-MM-DD)
 * @apiParam {Number} duration duration
 * @apiParam {String} trips Trips
 * @apiParam {String} events Events
 * @apiParam {String} activities activities
 * @apiParam {String} locations locations
 * @apiParam {String} categories categories
 * @apiParam {String} accommodations accommodations
 *
 * @apiSuccess {String} response Message
 * @apiSuccessExample {JSON} Success-Response:
 * {
    "data": {
        "message": "Successfully added to plan"
        }
}
 */
function update(req, res, next) {
  let payload = {
    planId: req.params.planId,
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    duration: req.body.duration,
    trips: req.body.trips,
    events: req.body.events,
    activities: req.body.activities,
    locations: req.body.locations,
    categories: req.body.categories,
    accommodations: req.body.accommodations
  };
  return services.plans.update(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

/**
 * @api {get} /api/plans/:userId Get
 * @apiVersion 1.0.0
 * @apiName get
 * @apiGroup Plans
 *
 * @apiSuccess {String} response
 * @apiSuccessExample {JSON} Success-Response:
 * {
    "data": [
        {
            "_id": "605d90bc9779e238c461c153",
            "trips": [
                {
                    "_id": "6040a3680ab52e37a4dab3b4",
                    "photoIds": [],
                    "isFeatured": true,
                    "startLocation": [
                        "5f6dea315ccd5165427742ae"
                    ],
                    "Locations": [
                        "5f6dea315ccd5165427742ae",
                        "5f66c2b05b6d27ff5e7d8ce4"
                    ],
                    "categories": [
                        "5fedfbb4ffd9b53211f0aa49",
                        "5f66c2b05b6d27ff5e7d8ce4"
                    ],
                    "activities": [
                        "5f973c65b20bb228794a683d",
                        "5f66bc2de008c9f9b58dacee"
                    ],
                    "facilities": [
                        "60212ddcce55ddd84341f0bd",
                        "600532edfd12542b40416d3a"
                    ],
                    "status": "draft",
                    "isActive": true,
                    "title": "Trip  to Swat",
                    "slug": "trip-to-swat-91vf7qxpi",
                    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    "duration": 15,
                    "price": 100,
                    "date": 1606762800000,
                    "vendorId": "600eb6243001299ad886f464",
                    "createdBy": "5f662fdf49e4e06fa4a07607",
                    "cancellationPolicy": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    "totalReviews": 0,
                    "totalRating": 0,
                    "averageRating": 0,
                    "itinerary": [],
                    "updatedAt": "2021-03-04T09:07:52.564Z",
                    "createdAt": "2021-03-04T09:07:52.564Z",
                    "__v": 0
                }
            ],
            "events": [
                {
                    "_id": "604623d1ec7b9207f46705ca",
                    "photoIds": [],
                    "surroundings": [
                        "5fa4715d09073a4f701ee275"
                    ],
                    "status": "draft",
                    "isActive": true,
                    "title": "jaritestq",
                    "slug": "atif-concert",
                    "description": "hello checking testing1",
                    "location": {
                        "coordinates": [
                            21.5204,
                            74.3587
                        ],
                        "_id": "6046258ca714830b8072ec99",
                        "type": "Point"
                    },
                    "address": "testing - address for checking1",
                    "city": "5f6126b58bccb721a5c8525b",
                    "province": "5f66bcaae008c9f9b58dacf0",
                    "startDate": 1606584458000,
                    "endDate": 1606584458000,
                    "startTime": "2020-11-28T17:27:38.000Z",
                    "endTime": "2020-11-28T17:27:38.000Z",
                    "numberOfPasses": 4,
                    "price": 200,
                    "vendorId": "5ff5e54db1d4100e583e8751",
                    "updatedAt": "2021-03-08T13:24:28.631Z",
                    "createdAt": "2021-03-08T13:17:05.477Z",
                    "__v": 0
                }
            ],
            "activities": [
                {
                    "_id": "5f66bc2de008c9f9b58dacee",
                    "photoIds": [
                        "6e580aa9-e652-432c-bac6-4fecb3688cc5"
                    ],
                    "isActive": true,
                    "type": "activity",
                    "name": "cliff diving",
                    "alias": "cliff diving",
                    "description": "You can’t be superman, but in Pakistan, you can get pretty close with an incredible cliff diving experience over breathtaking scenery.",
                    "longDescription": "Khanpur lake is a nice spot for day long trip, with blue water lake, some reasonable resorts for decent food and overnight stay, boating and jet sking, cliff diving or just a family/friends picnic. During winters (Jan/Feb), do enjoy Red Blood Oranges of Khanpur (Best in the world), and summers is nice especially for water fun. Other than resorts, won't find a shady place near the lake.",
                    "location": {
                        "coordinates": [
                            -79.3968307,
                            41.6656976
                        ],
                        "_id": "5f6d9a065ccd51654277429a",
                        "type": "Point"
                    },
                    "slug": "cliff-diving",
                    "url": "/activity/cliff-diving",
                    "createdBy": "5f662fdf49e4e06fa4a07607",
                    "updatedAt": "2020-09-25T07:22:05.909Z",
                    "createdAt": "2020-09-20T02:19:25.783Z",
                    "__v": 0,
                    "activityType": "",
                    "parentCategories": [
                        "5f66b9b8e008c9f9b58dacd8"
                    ],
                    "updatedBy": "5f61e7028bccb721a5c8525d",
                    "isFeatured": false
                }
            ],
            "locations": [
                {
                    "_id": "5f6dea315ccd5165427742ae",
                    "locationType": "",
                    "parentProvince": "punjab",
                    "parentCategories": [],
                    "parentActivities": [
                        "5f66bc11e008c9f9b58dacec"
                    ],
                    "totalRating": 0,
                    "averageRating": 0,
                    "totalReviews": 0,
                    "photoIds": [],
                    "isActive": true,
                    "type": "location",
                    "name": "serenity",
                    "alias": "Serenity Spa and Health Club",
                    "description": "Feeling exhausted? Full-body massage from Serenity is what you need. Experienced massage therapists will make sure that you get the best service.",
                    "longDescription": "Serenity Spa is a top-notch spa and one of the best massage centers in Islamabad. Its skilled staff knows how to treat every individual client according to their needs. Ensuring that the massage is done with care by experienced and qualified massage therapists.",
                    "location": {
                        "coordinates": [
                            72.987803,
                            33.683339
                        ],
                        "_id": "5fbb62337e1c0629db7c9690",
                        "type": "Point"
                    },
                    "weatherId": "33d7373d09/islamabad",
                    "slug": "serenity",
                    "url": "/location/serenity",
                    "createdBy": "5f60b084d79bedd8287f6d91",
                    "updatedAt": "2020-11-23T07:18:11.830Z",
                    "createdAt": "2020-09-25T13:01:37.243Z",
                    "__v": 0,
                    "updatedBy": "5f61e7028bccb721a5c8525d",
                    "isFeatured": false,
                    "surroundings": [
                        {
                            "_id": "5fa8f798aedb52223654bfd4",
                            "name": "hotels",
                            "iconName": "hotel.svg",
                            "typeKey": "lodging"
                        },
                        {
                            "_id": "5fa8f894aedb52223654bfd6",
                            "name": "parks",
                            "iconName": "park.svg",
                            "typeKey": "park"
                        },
                        {
                            "_id": "5fa8f9a8aedb52223654bfdc",
                            "name": "food",
                            "iconName": "Outline.svg",
                            "typeKey": "restaurant"
                        },
                        {
                            "_id": "5fa8fb49374cd63b5567cd91",
                            "name": "family tips",
                            "iconName": "family.svg",
                            "typeKey": "amusement_park"
                        },
                        {
                            "_id": "5fa8fc98374cd63b5567cd9c",
                            "name": "pharmacy",
                            "iconName": "pharmacy.svg",
                            "typeKey": "pharmacy"
                        },
                        {
                            "_id": "5fa8fdc9374cd63b5567cda0",
                            "name": "bakeries",
                            "iconName": "bakery.svg",
                            "typeKey": "bakery"
                        },
                        {
                            "_id": "5fa8fcbb374cd63b5567cd9d",
                            "name": "cafe or dhabba's",
                            "iconName": "cafe.svg",
                            "typeKey": "cafe"
                        },
                        {
                            "_id": "5fa8fc0e374cd63b5567cd98",
                            "name": "shops",
                            "iconName": "shop.svg",
                            "typeKey": "store"
                        },
                        {
                            "_id": "5fa8fbaa374cd63b5567cd93",
                            "name": "banks",
                            "iconName": "hostel.svg",
                            "typeKey": "bank"
                        }
                    ]
                }
            ],
            "categories": [
                {
                    "_id": "5f66c2b05b6d27ff5e7d8ce4",
                    "categoryType": "accomodation",
                    "photoIds": [],
                    "isActive": true,
                    "type": "category",
                    "name": "guest houses",
                    "alias": "guest houses",
                    "description": "Local houses often with great locations turned into accommodation that’ll fit nicely into your budget.",
                    "location": {
                        "coordinates": [
                            -79.3968307,
                            41.6656976
                        ],
                        "_id": "5f66c2b05b6d27ff5e7d8ce5",
                        "type": "Point"
                    },
                    "slug": "guest-houses",
                    "url": "/category/guest-houses",
                    "createdBy": "5f662fdf49e4e06fa4a07607",
                    "updatedAt": "2020-09-20T02:47:12.417Z",
                    "createdAt": "2020-09-20T02:47:12.417Z",
                    "__v": 0,
                    "isFeatured": false
                }
            ],
            "accommodations": [
                {
                    "_id": "602a33a48b9e13328c8ef0f7",
                    "hotelAmenities": [
                        "Newspaper",
                        "Room Service",
                        "Cleaning Services",
                        "Security",
                        "WiFi",
                        "24 Hour Reception"
                    ],
                    "photos": [],
                    "photoIds": [],
                    "isFeatured": false,
                    "totalRating": 0,
                    "averageRating": 0,
                    "totalReviews": 0,
                    "isActive": true,
                    "hotelName": "Park Lane Hotel",
                    "addressInfo": "73-C",
                    "city": "Karachi",
                    "overview": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    "email": "developers@findmyadventure.pk",
                    "mobile": "0332-2228829",
                    "zipcode": 79590,
                    "location": "5f6126b58bccb721a5c8525b",
                    "category": "5f66b9b8e008c9f9b58dacd8",
                    "hotelSource": "agoda",
                    "checkin": "12:00 PM",
                    "checkout": "12:00 PM",
                    "cancellationPolicyType": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    "vendor": "5f66b9b8e008c9f9b58dacd8",
                    "updatedAt": "2021-02-15T08:41:08.531Z",
                    "createdAt": "2021-02-15T08:41:08.531Z",
                    "__v": 0
                }
            ],
            "name": "Plan 1",
            "userId": "5f63463e72e916432e71de60",
            "user": {
                "firstName": "Fahad",
                "middleName": "hello",
                "lastName": "Saleem",
                "mobile": "031333806769",
                "gender": "female",
                "nic": "4420662104091",
                "dob": 857761200000,
                "companyName": null
            }
        }
    ]
}
 */
function get(req, res, next) {
  let payload = {
    userId: req.params.userId
  };
  return services.plans.get(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

/**
 * @api {get} /api/plans/:planId/details Get Details
 * @apiVersion 1.0.0
 * @apiName getDetails
 * @apiGroup Plans
 *
 * @apiSuccess {String} response
 * @apiSuccessExample {JSON} Success-Response:
 * {
    "data": [
        {
            "_id": "605d90bc9779e238c461c153",
            "trips": [
                {
                    "_id": "6040a3680ab52e37a4dab3b4",
                    "photoIds": [],
                    "isFeatured": true,
                    "startLocation": [
                        "5f6dea315ccd5165427742ae"
                    ],
                    "Locations": [
                        "5f6dea315ccd5165427742ae",
                        "5f66c2b05b6d27ff5e7d8ce4"
                    ],
                    "categories": [
                        "5fedfbb4ffd9b53211f0aa49",
                        "5f66c2b05b6d27ff5e7d8ce4"
                    ],
                    "activities": [
                        "5f973c65b20bb228794a683d",
                        "5f66bc2de008c9f9b58dacee"
                    ],
                    "facilities": [
                        "60212ddcce55ddd84341f0bd",
                        "600532edfd12542b40416d3a"
                    ],
                    "status": "draft",
                    "isActive": true,
                    "title": "Trip  to Swat",
                    "slug": "trip-to-swat-91vf7qxpi",
                    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    "duration": 15,
                    "price": 100,
                    "date": 1606762800000,
                    "vendorId": "600eb6243001299ad886f464",
                    "createdBy": "5f662fdf49e4e06fa4a07607",
                    "cancellationPolicy": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    "totalReviews": 0,
                    "totalRating": 0,
                    "averageRating": 0,
                    "itinerary": [],
                    "updatedAt": "2021-03-04T09:07:52.564Z",
                    "createdAt": "2021-03-04T09:07:52.564Z",
                    "__v": 0
                }
            ],
            "events": [
                {
                    "_id": "604623d1ec7b9207f46705ca",
                    "photoIds": [],
                    "surroundings": [
                        "5fa4715d09073a4f701ee275"
                    ],
                    "status": "draft",
                    "isActive": true,
                    "title": "jaritestq",
                    "slug": "atif-concert",
                    "description": "hello checking testing1",
                    "location": {
                        "coordinates": [
                            21.5204,
                            74.3587
                        ],
                        "_id": "6046258ca714830b8072ec99",
                        "type": "Point"
                    },
                    "address": "testing - address for checking1",
                    "city": "5f6126b58bccb721a5c8525b",
                    "province": "5f66bcaae008c9f9b58dacf0",
                    "startDate": 1606584458000,
                    "endDate": 1606584458000,
                    "startTime": "2020-11-28T17:27:38.000Z",
                    "endTime": "2020-11-28T17:27:38.000Z",
                    "numberOfPasses": 4,
                    "price": 200,
                    "vendorId": "5ff5e54db1d4100e583e8751",
                    "updatedAt": "2021-03-08T13:24:28.631Z",
                    "createdAt": "2021-03-08T13:17:05.477Z",
                    "__v": 0
                }
            ],
            "activities": [
                {
                    "_id": "5f66bc2de008c9f9b58dacee",
                    "photoIds": [
                        "6e580aa9-e652-432c-bac6-4fecb3688cc5"
                    ],
                    "isActive": true,
                    "type": "activity",
                    "name": "cliff diving",
                    "alias": "cliff diving",
                    "description": "You can’t be superman, but in Pakistan, you can get pretty close with an incredible cliff diving experience over breathtaking scenery.",
                    "longDescription": "Khanpur lake is a nice spot for day long trip, with blue water lake, some reasonable resorts for decent food and overnight stay, boating and jet sking, cliff diving or just a family/friends picnic. During winters (Jan/Feb), do enjoy Red Blood Oranges of Khanpur (Best in the world), and summers is nice especially for water fun. Other than resorts, won't find a shady place near the lake.",
                    "location": {
                        "coordinates": [
                            -79.3968307,
                            41.6656976
                        ],
                        "_id": "5f6d9a065ccd51654277429a",
                        "type": "Point"
                    },
                    "slug": "cliff-diving",
                    "url": "/activity/cliff-diving",
                    "createdBy": "5f662fdf49e4e06fa4a07607",
                    "updatedAt": "2020-09-25T07:22:05.909Z",
                    "createdAt": "2020-09-20T02:19:25.783Z",
                    "__v": 0,
                    "activityType": "",
                    "parentCategories": [
                        "5f66b9b8e008c9f9b58dacd8"
                    ],
                    "updatedBy": "5f61e7028bccb721a5c8525d",
                    "isFeatured": false
                }
            ],
            "locations": [
                {
                    "_id": "5f6dea315ccd5165427742ae",
                    "locationType": "",
                    "parentProvince": "punjab",
                    "parentCategories": [],
                    "parentActivities": [
                        "5f66bc11e008c9f9b58dacec"
                    ],
                    "totalRating": 0,
                    "averageRating": 0,
                    "totalReviews": 0,
                    "photoIds": [],
                    "isActive": true,
                    "type": "location",
                    "name": "serenity",
                    "alias": "Serenity Spa and Health Club",
                    "description": "Feeling exhausted? Full-body massage from Serenity is what you need. Experienced massage therapists will make sure that you get the best service.",
                    "longDescription": "Serenity Spa is a top-notch spa and one of the best massage centers in Islamabad. Its skilled staff knows how to treat every individual client according to their needs. Ensuring that the massage is done with care by experienced and qualified massage therapists.",
                    "location": {
                        "coordinates": [
                            72.987803,
                            33.683339
                        ],
                        "_id": "5fbb62337e1c0629db7c9690",
                        "type": "Point"
                    },
                    "weatherId": "33d7373d09/islamabad",
                    "slug": "serenity",
                    "url": "/location/serenity",
                    "createdBy": "5f60b084d79bedd8287f6d91",
                    "updatedAt": "2020-11-23T07:18:11.830Z",
                    "createdAt": "2020-09-25T13:01:37.243Z",
                    "__v": 0,
                    "updatedBy": "5f61e7028bccb721a5c8525d",
                    "isFeatured": false,
                    "surroundings": [
                        {
                            "_id": "5fa8f798aedb52223654bfd4",
                            "name": "hotels",
                            "iconName": "hotel.svg",
                            "typeKey": "lodging"
                        },
                        {
                            "_id": "5fa8f894aedb52223654bfd6",
                            "name": "parks",
                            "iconName": "park.svg",
                            "typeKey": "park"
                        },
                        {
                            "_id": "5fa8f9a8aedb52223654bfdc",
                            "name": "food",
                            "iconName": "Outline.svg",
                            "typeKey": "restaurant"
                        },
                        {
                            "_id": "5fa8fb49374cd63b5567cd91",
                            "name": "family tips",
                            "iconName": "family.svg",
                            "typeKey": "amusement_park"
                        },
                        {
                            "_id": "5fa8fc98374cd63b5567cd9c",
                            "name": "pharmacy",
                            "iconName": "pharmacy.svg",
                            "typeKey": "pharmacy"
                        },
                        {
                            "_id": "5fa8fdc9374cd63b5567cda0",
                            "name": "bakeries",
                            "iconName": "bakery.svg",
                            "typeKey": "bakery"
                        },
                        {
                            "_id": "5fa8fcbb374cd63b5567cd9d",
                            "name": "cafe or dhabba's",
                            "iconName": "cafe.svg",
                            "typeKey": "cafe"
                        },
                        {
                            "_id": "5fa8fc0e374cd63b5567cd98",
                            "name": "shops",
                            "iconName": "shop.svg",
                            "typeKey": "store"
                        },
                        {
                            "_id": "5fa8fbaa374cd63b5567cd93",
                            "name": "banks",
                            "iconName": "hostel.svg",
                            "typeKey": "bank"
                        }
                    ]
                }
            ],
            "categories": [
                {
                    "_id": "5f66c2b05b6d27ff5e7d8ce4",
                    "categoryType": "accomodation",
                    "photoIds": [],
                    "isActive": true,
                    "type": "category",
                    "name": "guest houses",
                    "alias": "guest houses",
                    "description": "Local houses often with great locations turned into accommodation that’ll fit nicely into your budget.",
                    "location": {
                        "coordinates": [
                            -79.3968307,
                            41.6656976
                        ],
                        "_id": "5f66c2b05b6d27ff5e7d8ce5",
                        "type": "Point"
                    },
                    "slug": "guest-houses",
                    "url": "/category/guest-houses",
                    "createdBy": "5f662fdf49e4e06fa4a07607",
                    "updatedAt": "2020-09-20T02:47:12.417Z",
                    "createdAt": "2020-09-20T02:47:12.417Z",
                    "__v": 0,
                    "isFeatured": false
                }
            ],
            "accommodations": [
                {
                    "_id": "602a33a48b9e13328c8ef0f7",
                    "hotelAmenities": [
                        "Newspaper",
                        "Room Service",
                        "Cleaning Services",
                        "Security",
                        "WiFi",
                        "24 Hour Reception"
                    ],
                    "photos": [],
                    "photoIds": [],
                    "isFeatured": false,
                    "totalRating": 0,
                    "averageRating": 0,
                    "totalReviews": 0,
                    "isActive": true,
                    "hotelName": "Park Lane Hotel",
                    "addressInfo": "73-C",
                    "city": "Karachi",
                    "overview": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    "email": "developers@findmyadventure.pk",
                    "mobile": "0332-2228829",
                    "zipcode": 79590,
                    "location": "5f6126b58bccb721a5c8525b",
                    "category": "5f66b9b8e008c9f9b58dacd8",
                    "hotelSource": "agoda",
                    "checkin": "12:00 PM",
                    "checkout": "12:00 PM",
                    "cancellationPolicyType": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    "vendor": "5f66b9b8e008c9f9b58dacd8",
                    "updatedAt": "2021-02-15T08:41:08.531Z",
                    "createdAt": "2021-02-15T08:41:08.531Z",
                    "__v": 0
                }
            ],
            "name": "Plan 1",
            "userId": "5f63463e72e916432e71de60",
            "user": {
                "firstName": "Fahad",
                "middleName": "hello",
                "lastName": "Saleem",
                "mobile": "031333806769",
                "gender": "female",
                "nic": "4420662104091",
                "dob": 857761200000,
                "companyName": null
            }
        }
    ]
}
 */
function getDetails(req, res, next) {
  let payload = {
    planId: req.params.planId
  };
  return services.plans.getDetails(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

/**
 * @api {delete} /api/plans/:planId/remove Remove
 * @apiVersion 1.0.0
 * @apiName remove
 * @apiGroup Plans
 *
 * @apiSuccess {String} response Message
 * @apiSuccessExample {JSON} Success-Response:
 * {
      "data": {
      "message": "Removed from plan"
   }
}
 */
function remove(req, res, next) {
  let payload = {
    planId: req.params.planId
  };
  return services.plans.remove(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

/**
 * @api {delete} /api/plans/:planId/update removeOne
 * @apiVersion 1.0.0
 * @apiName removeOne
 * @apiGroup Plans
 *
 * @apiParam {String} trips Trips
 * @apiParam {String} events Events
 * @apiParam {String} activities activities
 * @apiParam {String} locations locations
 * @apiParam {String} categories categories
 * @apiParam {String} accommodations accommodations
 *
 * @apiSuccess {String} response Message
 * @apiSuccessExample {JSON} Success-Response:
 * {
    "data": {
        "message": "Successfully removed from plan",
    }
}
 */
function removeOne(req, res, next) {
  let payload = {
    planId: req.params.planId,
    trips: req.query.trips,
    events: req.query.events,
    activities: req.query.activities,
    locations: req.query.locations,
    categories: req.query.categories,
    accommodations: req.query.accommodations
  };
  console.log(payload);
  return services.plans.removeOne(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}
