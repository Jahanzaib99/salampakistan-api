'use strict';

const services = require('../services');
// const config = require('../config');
// const enums = require('../enums');

module.exports = {
  get,
  getSeatsInfo
};

/**
 * @api {get} /api/all_bus_services getAllBus
 * @apiVersion 1.0.0
 * @apiName getAllBus
 * @apiGroup Bus
 * @apiPermission Guest
 *
 * @apiParam {String} origin_city_name Origin City Name
 * @apiParam {String} destination_city_name Destination City Name
 * @apiParam {String} service_name service Name
 * @apiParam {String} date Date
 * @apiParam {Number} pageSize Page Size
 * @apiParam {Number} skip Skip
 * @apiParam {String} sortBy Sort By
 *
 * @apiSuccess {String} response Get All Bus Services
 * @apiSuccessExample {JSON} Success-Response:
 * {
 *          "departureCityName": "Lahore",
            "arrivalCityName": "Islamabad",
            "serviceName": "Skybus",
            "serviceId": 26,
            "departureTime": "10:00",
            "date": "2021-02-13",
            "arrivalTime": "",
            "originalFare": 1400,
            "discountedFare": 1400,
            "totalSeats": "29",
            "availableSeats": 6,
            "busName": "Premium",
            "bustype": "Youtong",
            "facilities": [
                {
                    "id": "5",
                    "name": "Free WIFI",
                    "img": "https://bookmepk.s3.eu-central-1.amazonaws.com/static/assets/img/transport_facility/free_wifi.png"
                },
                {
                    "id": "6",
                    "name": "Headphones",
                    "img": "https://bookmepk.s3.eu-central-1.amazonaws.com/static/assets/img/transport_facility/headphones.png"
                },
                {
                    "id": "12",
                    "name": "Regular seat",
                    "img": "https://bookmepk.s3.eu-central-1.amazonaws.com/static/assets/img/transport_facility/regular_seat.png"
                }
            ],
            "rating": 5,
            "duration": "06 Hours 40 Minutes",
            "thumbnail": "https://bookmepk.s3.eu-central-1.amazonaws.com/static/custom/upload/transport/skybus.png",
            "departureTerminalAddress": "Band Road Lahore",
            "arrivalTerminalAddress": "Faizabad, Islamabad",
            "time_id": 82590,
            "schedule_id": 0,
            "route_id": 0,
            "source": "BookMe"
 */

function get(req, res, next) {
  let payload = {
    pageSize: req.query.pageSize,
    skip: req.query.skip,
    sortBy: req.query.sortBy,
    origin_city_name: req.query.origin_city_name,
    destination_city_name: req.query.destination_city_name,
    service_name: req.query.service_name,
    date: req.query.date
  };
  return services.bus.get(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

/**
 * @api {get} /api/seats_info Seats Info
 * @apiVersion 1.0.0
 * @apiName seats_info
 * @apiGroup Bus
 * @apiPermission Guest
 *
 * @apiParam {String} origin_city_name Origin City Name
 * @apiParam {String} destination_city_name Destination City Name
 * @apiParam {String} service_id serviceId
 * @apiParam {String} date Date
 * @apiParam {String} deptime Departure Time
 * @apiParam {String} time_id Time Id
 * @apiParam {String} schedule_id Schedule Id
 * @apiParam {String} route_id Route Id
 * @apiParam {Number} totalSeats Total Seats
 *
 * @apiSuccess {String} response Get Bus Info
 * @apiSuccessExample {JSON} Success-Response:

    "data": {
        "rows": 11,
        "cols": 5,
        "seats": 45,
        "seatplan": [
            {
                "seat_id": 1,
                "seat_name": "1",
                "seat_female": false,
                "seat_position": "0_0",
                "seat_enabled": true,
                "seat_restrictmale": false
            }
        ]
        "total_seats": 31,
        "total_available": 1,
        "available_seats": "17",
        "total_occupied": 30,
        "occupied_seats_male": "28,8,7,15,18,21,24,31,30,6,9,12,5,10,11,27,19,20,22,23,25,26,29",
        "occupied_seats_female": "1,2,3,4,13,14,16",
        "total_reserved": 0,
        "reserved_seats_male": "",
        "reserved_seats_female": ""
    }
**/

function getSeatsInfo(req, res, next) {
  let payload = {
    origin_city_name: req.query.origin_city_name,
    destination_city_name: req.query.destination_city_name,
    service_id: req.query.service_id,
    date: req.query.date,
    deptime: req.query.deptime,
    time_id: req.query.time_id,
    schedule_id: req.query.schedule_id,
    route_id: req.query.route_id,
    totalSeats: req.query.totalSeats
  };
  return services.bus.getSeatsInfo(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

