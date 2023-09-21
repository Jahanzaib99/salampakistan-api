'use strict';

const services = require('../services');
// const config = require('../config');
// const enums = require('../enums');

module.exports = {
  search,
  detail,
  create,
  update,
  remove,
  updateStatus,
  get,
  addRoom,
  removeRoom,
  updateRoom,
  uploadRoomPhotos,
  removeRoomPhotos
};

/**
 * @api {get} /api/hotel-search hotelSearch
 * @apiVersion 1.0.0
 * @apiName searchHotel
 * @apiGroup Hotel
 * @apiPermission Guest
 *
 * @apiParam {String} cityName Destination City Name
 * @apiParam {String} dep_date Departure Date
 * @apiParam {String} return_date Return Date
 * @apiParam {Number} no_of_adults No of Adults
 * @apiParam {Number} no_of_children No of Children
 * @apiParam {Number} no_of_infants No of Infants
 * @apiparam {Number} rooms Rooms
 * @apiParam {Number} pageSize Page Size
 * @apiParam {Number} skip Skip
 * @apiParam {String} sortBy Sort By rating/price
 *
 * @apiSuccess {String} response Search Hotel
 * @apiSuccessExample {JSON} Success-Response:
 *      {
                "hotelRefId": "8878ac54bd969460832c98647e63f798",
                "AccommodationTypeName": "Hotel",
                "hotelName": "Haidery International Hotel",
                "hotelSource": "Ascendant",
                "currencyCode": "PKR",
                "hotelLocation": "Lahore",
                "roomsLeft": "6",
                "images": [
                    "https://dmk1l4uo76ng3.cloudfront.net/Image/AccomodationImages/10461/Temp_10461_1.jpg",
                    "https://dmk1l4uo76ng3.cloudfront.net/Image/AccomodationImages/10461/Temp_10461_5.jpeg",
                    "https://dmk1l4uo76ng3.cloudfront.net/Image/AccomodationImages/10461/Temp_10461_6.jpeg",
                    "https://dmk1l4uo76ng3.cloudfront.net/Image/AccomodationImages/10461/Temp_10461_7.jpeg",
                    "https://dmk1l4uo76ng3.cloudfront.net/Image/AccomodationImages/10461/Temp_10461_8.jpeg"
                ],
                "featuredImage": "https://dmk1l4uo76ng3.cloudfront.net/Image/AccomodationImages/10461/Temp_10461_1.jpg",
                "addressInfo": "Fouji Bus Stop Near Niazi Bus Stand band Road",
                "rating": "1",
                "hotelAmenities": [
                    "Newspaper",
                    "Room Service",
                    "Cleaning Services",
                    "Security",
                    "WiFi",
                    "24 Hour Reception"
                ],
                "minimumRate": 2000,
                "discountedRate": 1500
            }
 */

function search(req, res, next) {
  let payload = {
    pageSize: req.query.pageSize,
    skip: req.query.skip,
    sortBy: req.query.sortBy,
    cityName: req.query.cityName,
    dep_date: req.query.dep_date,
    return_date: req.query.return_date,
    no_of_adults: req.query.no_of_adults,
    no_of_children: req.query.no_of_children,
    no_of_infants: req.query.no_of_infants,
    rooms: req.query.rooms
  };
  return services.hotel.search(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

/**
 * @api {get} /api/hotel-detail hoteldetail
 * @apiVersion 1.0.0
 * @apiName detailHotel
 * @apiGroup Hotel
 * @apiPermission Guest
 *
 *
 * @apiParam {String} refId refId
 * @apiParam {String} hotelRefId Hotel Ref Id
 * @apiParam {String} checkin_date checkin Date
 * @apiParam {Number} checkout_date checkout Date
 * @apiParam {Number} no_of_adults No of Adults
 * @apiparam {Number} rooms Rooms
 *
 * @apiSuccess {String} response detail Hotel
 * @apiSuccessExample {JSON} Success-Response:
        "hotelDetails": {
            "basicInfo": {
                "AccommodationId": 113,
                "Name": "Ambassador Hotel",
                "HotelLocation": "Lahore",
                "Description": "Friendly staff, Secure environment, Comfortable rooms",
                "NearbyAreas": "Lahore Shimla Hill",
                "AreaOfInterest": "Restaurants on site, Breakfast available, Spacious parking",
                "LogoURL": "",
                "EmailId": "ambsales@gmail.com",
                "Website": "https://www.facebook.com/asifidreesi6",
                "Rating": 4,
                "Currency": "PKR"
            },
            "hotelRating": {
                "rating": 4
            },
            "addressInfo": {
                "address": {
                    "CoordinateLocation": {
                        "Latitude": "31.5613",
                        "Longitude": "74.3378"
                    }
                },
                "streetInfo": "7 Davis Road, Lahore, Punjab"
            },
            "contactInfo": [
                {
                    "Type": "Business",
                    "Number": "03214876643"
                },
                {
                    "Type": "Fax",
                    "Number": "03214876643"
                }
            ],
            "checkInInfo": {
                "CheckInTime": "14:00",
                "CheckOutTime": "13:00",
                "CheckInDate": "2020-10-28",
                "CheckOutDate": "2020-10-29"
            },
            "amenities": {
                "1": "Parking",
                "2": "Outdoor",
                "4": "Air Condition",
                "5": "24 Hours Electricity",
                "6": "Elevator",
                "7": "Security Guards",
                "8": "Ironing",
                "9": "Car Hire Facility",
                "10": "Room Service Facility",
                "11": "Event Facilities",
                "12": "Storage Room",
                "13": "House Keeping",
                "15": "Children Of Age 10 Free",
                "16": "Newspaper"
            },
            "HotelRateDetail": [
                {
                    "RoomDetails": {
                        "RoomId": 154,
                        "RoomName": "Executive",
                        "HotelSource": "Bookme",
                        "RoomDescription": "Rooms are fully loaded with centrally heated and cooling facility",
                        "RoomSize": "450",
                        "BedSize": "",
                        "RefundStatus": 2,
                        "RoomFacilityGroupName": "Internet Facility, Lockers, Room Service and attached bath rooms",
                        "RoomFacilityName": "Internet Facility, Lockers, Room Service and attached bath rooms",
                        "nights": 1,
                        "photoIds": [
                            "https://bookme.pk/images/hotels/rooms/160518899693713.jpg"
                        ]
                    },
                    "ratePlanInfo": [
                        {
                            "RatePlanId": 39,
                            "RatePlanName": "Executive Single",
                            "RefundStatus": 2,
                            "NoOfBedRooms": 0,
                            "MaxPerson": 1,
                            "NoOfRoomsAvailable": 36,
                            "otherDetails": {
                                "BreakFastTypeName": "Breakfast Buffet",
                                "BreakFastDescription": "Breakfast will be served from 7:00am to 10:00am",
                                "CancellationPolicyType": "Charged",
                                "CancellationPolicy": "Free Cancellation up to 24 hours before arrival.",
                                "BookingPolicy": "CNIC / Passport required at the time of check in.",
                                "NoShowPolicyType": "Charged",
                                "NoShowPolicy": "100% charge in case of no-show"
                            },
                            "ratePerDate": "",
                            "ratePriceInfo": {
                                "nights": 1,
                                "totalPrice": 7500,
                                "originalPrice": 10000,
                                "changedPrice": 10000,
                                "totalTax": [
                                    {
                                        "TaxPriceMode": "Percent",
                                        "TaxType": "Excluded",
                                        "TaxName": "G.S.T",
                                        "TaxValue": 16
                                    }
                                ],
                                "totalPriceWithTax": 9100,
                                "priceStartingFrom": 7500,
                                "sortByPrice": 7500,
                                "currency": "PKR"
                            }
                        },
                        {
                            "RatePlanId": 40,
                            "RatePlanName": "Executive Double",
                            "RefundStatus": 2,
                            "NoOfBedRooms": 0,
                            "MaxPerson": 2,
                            "NoOfRoomsAvailable": 18,
                            "otherDetails": {
                                "BreakFastTypeName": "Breakfast Buffet",
                                "BreakFastDescription": "Breakfast will be served from 7:00am to 10:00am",
                                "CancellationPolicyType": "Charged",
                                "CancellationPolicy": "Free Cancellation up to 24 hours before arrival.",
                                "BookingPolicy": "CNIC / Passport required at the time of check in.",
                                "NoShowPolicyType": "Charged",
                                "NoShowPolicy": "100% charge in case of no-show"
                            },
                            "ratePerDate": "",
                            "ratePriceInfo": {
                                "nights": 1,
                                "totalPrice": 8250,
                                "originalPrice": 11000,
                                "changedPrice": 11000,
                                "totalTax": [
                                    {
                                        "TaxPriceMode": "Percent",
                                        "TaxType": "Excluded",
                                        "TaxName": "G.S.T",
                                        "TaxValue": 16
                                    }
                                ],
                                "totalPriceWithTax": 10010,
                                "priceStartingFrom": 8250,
                                "sortByPrice": 8250,
                                "currency": "PKR"
                            }
                        }
                    ]
                }
            ]
        },
        "media": [
            {
                "url": "https://bookme.pk/images/hotels/gallery/160518871148499.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/160518871154789.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/160518871210808.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/160518871275103.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/160518871258996.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/160518871297153.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/160518871367549.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/160518871420997.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/16051887804851.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/160518878066968.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/160518878010150.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/160518878150645.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/160518878116242.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/160518878111258.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/160518878126932.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/16051887828782.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/160518878375127.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/160518878310811.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/160518884934306.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/1605188849100786.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/160518884939652.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/160518885111441.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/160518885211865.jpg"
            },
            {
                "url": "https://bookme.pk/images/hotels/gallery/160518885230999.jpg"
            }
        ]
 */

function detail(req, res, next) {
  let payload = {
    pageSize: req.query.pageSize,
    skip: req.query.skip,
    refId: req.query.refId,
    hotelRefId: req.query.hotelRefId,
    checkin_date: req.query.checkin_date,
    checkout_date: req.query.checkout_date,
    no_of_adults: req.query.no_of_adults,
    rooms: req.query.rooms,
    hotelId: req.query.hotelId,
    hotelSource: req.query.hotelSource,
    usageSource: req.query.usageSource || 'web'

  };
  return services.hotel.detail(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

/**
 * @api {get} /api/accommodations Create accommodations
 * @apiVersion 1.0.0
 * @apiName CreateAccommodations
 * @apiGroup Hotel
 * @apiPermission Admin,vendor
 *
 *
 * @apiParam {String} hotelName hotelName
 * @apiParam {String} addressInfo addressInfo
 * @apiParam {String} city city
 * @apiParam {String} hotelAmenities hotelAmenities Array
 * @apiParam {String} overview overview
 * @apiparam {String} description description
 * @apiparam {String} email email
 * @apiparam {String} mobile mobile
 * @apiParam {Number} zipcode zipcode
 * @apiParam {String} location locationId
 * @apiParam {String} category categoryId
 * @apiParam {String} vendor vendorId
 * @apiParam {String} hotelSource hotelSource
 * @apiParam {String} checkin checkin
 * @apiparam {String} checkout checkout
 * @apiparam {String} cancellationPolicyType cancellationPolicyType
 * @apiparam {Boolean} isFeatured isFeatured
 * @apiParam {Number} rate Rate
 *
 * @apiSuccess {String} response Create accommodations
 * @apiSuccessExample {JSON} Success-Response:
        "message": "Hotel has been created.",
        "id": "6027f97352bf351d2c692471"
 */

function create(req, res, next) {
  let payload = {
    hotelName: req.body.hotelName,
    addressInfo: req.body.addressInfo,
    city: req.body.city,
    hotelAmenities: req.body.hotelAmenities,
    overview: req.body.overview,
    description: req.body.description,
    email: req.body.email,
    mobile: req.body.mobile,
    zipcode: req.body.zipcode,
    location: req.body.location,
    category: req.body.category,
    hotelSource: req.body.hotelSource,
    checkin: req.body.checkin,
    checkout: req.body.checkout,
    cancellationPolicyType: req.body.cancellationPolicyType,
    isFeatured: req.body.isFeatured,
    vendor: req.body.vendor,
    rate: req.body.rate,
    auth: req.auth
  };
  return services.hotel.create(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

/**
 * @api {put} /api/accommodations/:accommodationsId update accommodations
 * @apiVersion 1.0.0
 * @apiName updateAccommodations
 * @apiGroup Hotel
 * @apiPermission Admin,vendor
 *
 *
 * @apiParam {String} accommodationsId accommodationsId
 * @apiParam {String} hotelName hotelName
 * @apiParam {String} addressInfo addressInfo
 * @apiParam {String} city city
 * @apiParam {String} hotelAmenities hotelAmenities Array
 * @apiParam {String} overview overview
 * @apiparam {String} description description
 * @apiparam {String} email email
 * @apiparam {String} mobile mobile
 * @apiParam {Number} zipcode zipcode
 * @apiParam {String} location locationId
 * @apiParam {String} category categoryId
 * @apiParam {String} vendor vendorId
 * @apiParam {String} hotelSource hotelSource
 * @apiParam {String} checkin checkin
 * @apiparam {String} checkout checkout
 * @apiparam {String} cancellationPolicyType cancellationPolicyType
 * @apiparam {Boolean} isFeatured isFeatured
 * @apiParam {Number} rate Rate
 *
 * @apiSuccess {String} response update accommodations
 * @apiSuccessExample {JSON} Success-Response:
        "message": "Hotel has been updated.",
        "id": "6027f97352bf351d2c692471"
 */

function update(req, res, next) {
  let payload = {
    accommodationsId: req.query.accommodationsId || req.params.accommodationsId,
    hotelName: req.body.hotelName,
    addressInfo: req.body.addressInfo,
    city: req.body.city,
    hotelAmenities: req.body.hotelAmenities,
    overview: req.body.overview,
    description: req.body.description,
    email: req.body.email,
    mobile: req.body.mobile,
    zipcode: req.body.zipcode,
    location: req.body.location,
    category: req.body.category,
    hotelSource: req.body.hotelSource,
    checkin: req.body.checkin,
    checkout: req.body.checkout,
    cancellationPolicyType: req.body.cancellationPolicyType,
    isFeatured: req.body.isFeatured,
    vendor: req.body.vendor,
    rate: req.body.rate,
    auth: req.auth
  };
  return services.hotel.update(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function remove(req, res, next) {
  let payload = {
    accommodationsId: req.query.accommodationsId || req.params.accommodationsId,
    auth: req.auth
  };
  return services.hotel.remove(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function get(req, res, next) {
  let payload = {
    vendorId: req.query.vendorId,
    skip: req.query.skip,
    keywords: req.query.keywords,
    pageSize: req.query.pageSize,
    auth: req.auth
  };
  return services.hotel.get(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function addRoom(req, res, next) {
  let payload = {
    accommodationsId: req.query.accommodationsId || req.params.accommodationsId,
    RoomName: req.body.RoomName,
    HotelSource: req.body.HotelSource,
    RoomDescription: req.body.RoomDescription,
    RoomSize: req.body.RoomSize,
    BedSize: req.body.BedSize,
    NoOfRoomsAvailable: req.body.NoOfRoomsAvailable,
    MaxPerson: req.body.MaxPerson,
    RoomFacilityName: req.body.RoomFacilityName,
    photoIds: req.body.photoIds,
    Rate: req.body.Rate,
    discountedRate: req.body.discountedRate,
    RefundStatus: req.body.RefundStatus,
    taxApplicable: req.body.RefundStatus || false,
    taxPercentage: req.body.taxPercentage || 0,

    auth: req.auth
  };
  return services.hotel.addRoom(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function removeRoom(req, res, next) {
  let payload = {
    accommodationsId: req.query.accommodationsId || req.params.accommodationsId,
    roomId: req.query.roomId || req.params.roomId,
    auth: req.auth
  };
  return services.hotel.removeRoom(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function updateRoom(req, res, next) {
  let payload = {
    accommodationsId: req.query.accommodationsId || req.params.accommodationsId,
    roomId: req.query.roomId || req.params.roomId,
    RoomName: req.body.RoomName,
    HotelSource: req.body.HotelSource,
    RoomDescription: req.body.RoomDescription,
    RoomSize: req.body.RoomSize,
    BedSize: req.body.BedSize,
    NoOfRoomsAvailable: req.body.NoOfRoomsAvailable,
    MaxPerson: req.body.MaxPerson,
    RoomFacilityName: req.body.RoomFacilityName,
    photoIds: req.body.photoIds,
    Rate: req.body.Rate,
    discountedRate: req.body.discountedRate,
    RefundStatus: req.body.RefundStatus,
    taxApplicable: req.body.taxApplicable || false,
    taxPercentage: req.body.taxPercentage || 0,
    auth: req.auth
  };
  return services.hotel.updateRoom(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}
// upload room photo
function uploadRoomPhotos(req, res, next) {
  let payload = {
    accommodationsId: req.query.accommodationsId || req.params.accommodationsId,
    roomId: req.query.roomId || req.params.roomId,
    photo: req.files.photo,
    auth: req.auth
  };
  return services.hotel.uploadRoomPhotos(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

// remove room photo
function removeRoomPhotos(req, res, next) {
  let payload = {
    accommodationsId: req.query.accommodationsId || req.params.accommodationsId,
    roomId: req.query.roomId || req.params.roomId,
    photoId: req.params.photoId || req.query.photoId,
    auth: req.auth
  };
  return services.hotel.removeRoomPhotos(payload)
    .then((response) => {
      res.send(200, response);
    });
}
function updateStatus(req, res, next) {
  let payload = {
    accommodationsId: req.query.accommodationsId || req.params.accommodationsId,
    status: req.body.status,
    auth: req.auth
  };
  return services.hotel.updateStatus(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}
