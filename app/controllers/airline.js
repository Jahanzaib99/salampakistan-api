'use strict';

const services = require('../services');
// const config = require('../config');
// const enums = require('../enums');

module.exports = {
  airports,
  airlines,
  searchAirports,
  searchAir
};

/**
 * @api {get} /api//airports getAirports
 * @apiVersion 1.0.0
 * @apiName get Airports
 * @apiGroup Airline
 * @apiPermission Guest
 *
 *
 * @apiSuccess {String} response Get All Airports
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *      "cityName": "Annaba",
 *      "cityCode": "LHE"
 * }
 */

function airports(req, res, next) {
  let payload = {
    pageSize: req.query.pageSize,
    skip: req.query.skip
  };
  return services.airline.airports(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

/**
 * @api {get} /api/airlines getAirlines
 * @apiVersion 1.0.0
 * @apiName get Airlines
 * @apiGroup Airline
 * @apiPermission Guest
 *
 * @apiParam {String} countryName Country Name
 *
 * @apiSuccess {String} response Get All Airlines
 * @apiSuccessExample {JSON} Success-Response:
   {
        "id": 3871,
        "name": "Pakistan International Airlines",
        "alias": "PIA Pakistan International",
        "iata": "PK",
        "icao": "PIA",
        "callsign": "PAKISTAN",
        "country": "Pakistan",
        "active": "Y"
    }
 */

function airlines(req, res, next) {
  let payload = {
    pageSize: req.query.pageSize,
    skip: req.query.skip,
    countryName: req.query.countryName
  };
  return services.airline.airlines(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

/**
 * @api {get} /api/searchAirports searchAirports
 * @apiVersion 1.0.0
 * @apiName searchAirports
 * @apiGroup Airline
 * @apiPermission Guest
 *
 * @apiParam {String} cityName City Name
 *
 * @apiSuccess {String} response airports
 * @apiSuccessExample {JSON} Success-Response:
    {
        "id": 1739,
        "code": "KHI",
        "name": "Quaid E Azam International",
        "cityCode": "KHI",
        "cityName": "Karachi",
        "countryName": "PAKISTAN",
        "countryCode": "PK",
        "timezone": "5",
        "lat": "24.906547",
        "lon": "67.160797",
        "numAirports": 1,
        "city": "true"
    }
 */

function searchAirports(req, res, next) {
  let payload = {
    pageSize: req.query.pageSize,
    skip: req.query.skip,
    cityName: req.query.cityName
  };
  return services.airline.searchAirports(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

/**
 * @api {get} /api/searchAir searchAir
 * @apiVersion 1.0.0
 * @apiName searchAir
 * @apiGroup Airline
 * @apiPermission Guest

    @apiParam {String} departureCityName Departure City Name
    @apiParam {String} destinationCityName Destination City Name
    @apiParam {String} dep_date Departure Date
    @apiParam {String} return_date Return Date
    @apiParam {String} no_of_adults No of Adults
    @apiParam {String} no_of_children No of Children
    @apiParam {String} no_of_infants No of Infants
    @apiParam {String} cabin Cabin
 *  @apiParam {Number} pageSize Page Size
 *  @apiParam {Number} skip Skip
 *  @apiParam {String} sortBy Sort By rating/price

 *
 * @apiSuccess {String} response Search Air
 * @apiSuccessExample {JSON} Success-Response:
   {
    "data": {
        "airline": [
            {
                "journey_ref_id": "961b1da6bf3d5f9959e4c600a834fd3a",
                "outboundRoute": [
                    {
                        "class": "V",
                        "cabin_class": "Economy",
                        "fare_info_ref_key": "L7aAWf5xnDKARUcR/SAAAA==",
                        "fare_basis": "VOWPROMO",
                        "baggage_allowance": {
                            "weight": "20",
                            "unit": "Kilograms",
                            "pieces": 0
                        },
                        "air_segment_ref_key": "L7aAWf5xnDKAKUcR/SAAAA==",
                        "flight_detail_ref_key": "L7aAWf5xnDKALUcR/SAAAA==",
                        "flight_time": "105",
                        "flight_time_readable": "0:1:45",
                        "travel_time": 105,
                        "travel_time_readable": "00:01:45",
                        "plane": "32A",
                        "equipment": "32A",
                        "group": "0",
                        "carrier": "PK",
                        "airline": "Pakistan International Airlines",
                        "airline_logo": "https://bookmepk.s3.eu-central-1.amazonaws.com/static/images/airlines/PK.svg",
                        "flight": "PK302",
                        "flight_number": "302",
                        "from": "KHI",
                        "from_airport": "Jinnah International Airport",
                        "from_city_name": "Karachi",
                        "to": "LHE",
                        "to_airport": "Alama Iqbal International Airport",
                        "to_city_name": "Lahore",
                        "depart": "2021-03-24T08:00:00.000+05:00",
                        "arrival": "2021-03-24T09:45:00.000+05:00",
                        "distance": "636",
                        "e_ticket_ability": "Yes",
                        "change_of_plane": "false",
                        "participant_level": "Secure Sell",
                        "link_availability": "true",
                        "polled_availablility_option": "Polled avail used",
                        "optional_services_indicator": "false",
                        "availability_source": "S",
                        "availability_display_type": "Fare Shop/Optimal Shop"
                    }
                ],
                "outboundRouteIsConnectingFlight": false,
                "inboundRoute": [],
                "inboundRouteIsConnectingFlight": "",
                "isRefundable": true,
                "changePenalty": null,
                "cancelPenalty": null,
                "approxTotalPrice": 9860,
                "taxes": 1990,
                "discount": 393,
                "direction": "one_way",
                "source": "bookMe",
                "air_segment": [
                    {
                        "baggage_allowance": [
                            "20K",
                            "BAGGAGE DISCOUNTS MAY APPLY BASED ON FREQUENT FLYER STATUS/ ONLINE CHECKIN/FORM OF PAYMENT/MILITARY/ETC."
                        ],
                        "air_segment_ref_key": "dGQ/VfsxnDKAki4cCTAAAA==",
                        "host_token": {
                            "key": "dGQ/VfsxnDKAni4cCTAAAA==",
                            "token": "GFB10101ADT00  01VOWPROMO                              010001#GFB200010101NADTV3302150000200005992J#GFMCER 302N1500 PK ADTVOWPROMO"
                        },
                        "group": "0",
                        "carrier": "PK",
                        "airline": "Pakistan International Airlines",
                        "airline_logo": "https://bookmepk.s3.eu-central-1.amazonaws.com/static/images/airlines/PK.svg",
                        "flight": "PK302",
                        "flight_number": "302",
                        "provider_code": "1G",
                        "from": "KHI",
                        "from_airport": "Jinnah International Airport",
                        "from_city_name": "Karachi",
                        "to": "LHE",
                        "to_airport": "Alama Iqbal International Airport",
                        "to_city_name": "Lahore",
                        "depart": "2021-03-24T08:00:00.000+05:00",
                        "arrival": "2021-03-24T09:45:00.000+05:00",
                        "flight_time": "105",
                        "travel_time": "105",
                        "distance": "636",
                        "class": "V",
                        "plane": "32A",
                        "equipment": "32A",
                        "change_of_plane": false,
                        "optional_services_indicator": false,
                        "availability_source": "S",
                        "availability_display_type": "Fare Specific Fare Quote Unbooked"
                    }
                ]
            }
        ],
        "refId": "2c009ed5e00fdb3c7776fc083ecfb291",
        "meta": {
            "pageSize": 1,
            "skip": 0,
            "total": 10
        }
    }
}
 */

function searchAir(req, res, next) {
  let payload = {
    pageSize: req.query.pageSize,
    skip: req.query.skip,
    sortBy: req.query.sortBy,
    departureCityName: req.query.departureCityName,
    destinationCityName: req.query.destinationCityName,
    dep_date: req.query.dep_date,
    return_date: req.query.return_date,
    no_of_adults: req.query.no_of_adults,
    no_of_children: req.query.no_of_children,
    no_of_infants: req.query.no_of_infants,
    cabin: req.query.cabin
  };
  return services.airline.searchAir(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}
