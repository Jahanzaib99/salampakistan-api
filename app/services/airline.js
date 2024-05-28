'use strict';

// const repos = require('../repositories');
const helpers = require('../helpers');
const restify = require('restify');
const stringSimilarity = require('string-similarity');
// const enums = require('../enums');
// const trip = require('../enums/trip');
// const moment = require('moment');
// const moment = require('moment-timezone');
// const util = require('util');
const _ = require('lodash');
const { Airports } = require('../constants/bookMe');
const { default: Axios } = require('axios');
// const pipeConstant = require('../constants/pipedrive');
// let ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  airports,
  airlines,
  searchAirports,
  searchAir
};

async function airports(payload) {
  let finalResponse = [];
  payload.body = {};
  payload.httpMethod = 'post';
  payload.convert = false;
  payload.endpoint = 'flight.php?airports';
  let airports = await helpers.bookMe.fetchData(payload);
  await Promise.all(
    airports.map((airport) => {
      airport = {
        cityName: airport.cityName,
        cityCode: airport.cityCode
      };
      finalResponse.push(airport);
    }));
  let res = _.uniqBy(finalResponse, 'cityName');
  return res;
}

function airlines(payload) {
  payload.body = {};
  let searchedAirportName = [];
  if(payload.countryName) {
    _.each(Airports, function(data) {
      searchedAirportName.push(data.countryName.toLowerCase());
    });
    let matches = stringSimilarity.findBestMatch(((payload.countryName.replace(/%20/g, ' ')).toLowerCase()), searchedAirportName);
    if(matches.bestMatch.rating > 0.7) {
      payload.countryName = matches.bestMatch.target;
    }
    _.each(Airports, function(data) {
      if (payload.countryName && (data.countryName).toLowerCase() === ((payload.countryName).replace(/%20/g, ' ')).toLowerCase()) {
        payload.body['code'] = data.countryCode;
      };
    });
  }
  console.log(payload.countryName);
  if (payload.countryName && !payload.body.code) {
    throw new restify.errors.ConflictError('Country not Found');
  }
  payload.httpMethod = 'post';
  payload.convert = false;
  payload.endpoint = 'flight.php?airlines';
  return helpers.bookMe.fetchData(payload)
    .then((data) => {
      return data;
    });
}

function searchAirports(payload) {
  payload.body = {};
  let searchedAirportName = [];
  if(payload.cityName) {
    _.each(Airports, function(data) {
      searchedAirportName.push(data.cityName.toLowerCase());
    });
    let matches = stringSimilarity.findBestMatch(((payload.cityName.replace(/%20/g, ' ')).toLowerCase()), searchedAirportName);
    if(matches.bestMatch.rating > 0.7) {
      payload.cityName = matches.bestMatch.target;
    }
    _.each(Airports, function(data) {
      if (payload.cityName && (data.cityName).toLowerCase() === ((payload.cityName).replace(/%20/g, ' ')).toLowerCase()) {
        payload.body['query'] = data.cityCode;
      };
    });
  }
  if (payload.cityName && !payload.body.query) {
    throw new restify.errors.ConflictError('City not Found');
  }
  payload.httpMethod = 'post';
  payload.convert = false;
  payload.endpoint = 'flight.php?search_airports';
  return helpers.bookMe.fetchData(payload)
    .then((data) => {
      if(data.status === false) {
        throw new restify.errors.ConflictError('Airports not Found');
      }
      return data;
    });
}

async function searchAir(payload) {
  try {
    let data = JSON.stringify(payload);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://mosafir.pk/API/PTDC/flights_listing',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'PreferredRetDate=Apr%2004%2C%202024; ci_session=cfa47cf56ec2f5f3aaaf83beba2d84e0a3507619; guestRandNo=92397438433636; preferredDepDate=Mar%2027%2C%202024'
      },
      data: data
    };

    // Return the promise chain
    return await fetchData(config, payload);
  } catch (error) {
    throw error;
  }
}

async function fetchData(config, payload) {
  try {
    const response = await Axios.request(config);
    // const total = 100; // Assuming total is calculated somewhere
    // console.log("reponse data", response.data);
    return response.data;
  } catch (error) {
    // Handle error if needed
    return { error: error.message }; // Return error message if an error occurs
  }
}

// async function airlineDetails(payload, airSearch) {
//   let finalResponse = [];
//   for(let i = 0; i < airSearch.data.length; i++) {
//     let airline = airSearch.data[i];
//     let outbound_route_values = Object.values(airline.outbound_route ? airline.outbound_route : '');
//     outbound_route_values.pop();
//     let inbound_route_values;
//     if (airline.inbound_route !== undefined) {
//       inbound_route_values = Object.values(airline.inbound_route ? airline.inbound_route : '');
//       inbound_route_values.pop();
//     };

//     // calling airprice api
//     let data = {
//       no_of_adults: payload.no_of_adults,
//       no_of_children: payload.no_of_children,
//       no_of_infants: payload.no_of_infants,
//       ref_id: airSearch.ref_id,
//       journey_ref_id: airline.journey_ref_id
//     };
//     payload.body = data;
//     payload.httpMethod = 'post';
//     payload.convert = false;
//     payload.endpoint = 'flight.php?air_price';
//     finalResponse.push(
//       await helpers.bookMe.fetchData(payload).then((airPrice) => (
//         {
//           // airPrice: airPrice.data.fare,
//           journey_ref_id: airline.journey_ref_id,
//           outboundRoute: outbound_route_values,
//           outboundRouteIsConnectingFlight: airline.outbound_route.is_connecting_flight,
//           inboundRoute: inbound_route_values ? inbound_route_values : [],
//           inboundRouteIsConnectingFlight: airline.inbound_route !== undefined ? airline.inbound_route.is_connecting_flight : '',
//           isRefundable: airline.is_refundable,
//           changePenalty: typeof (airPrice.data.refund.change_penalty) === 'string' ? parseInt((airPrice.data.refund.change_penalty).split('R')[1], 10) : airPrice.data.refund.change_penalty,
//           cancelPenalty: typeof (airPrice.data.refund.cancel_penalty) === 'string' ? parseInt((airPrice.data.refund.cancel_penalty).split('R')[1], 10) : airPrice.data.refund.cancel_penalty,
//           approxTotalPrice: typeof (airPrice.data.fare.approx_total_price) === 'string' ? parseInt((airPrice.data.fare.approx_total_price).split('R')[1], 10) : airPrice.data.fare.approx_total_price,
//           taxes: typeof (airPrice.data.fare.taxes) === 'string' ? parseInt((airPrice.data.fare.taxes).split('R')[1], 10) : airPrice.data.fare.taxes,
//           discount: airPrice.data.fare.discount,
//           direction: airline.direction,
//           source: 'bookMe',
//           air_segment: airPrice.data.air_segment
//         }))
//     );
//   }
//   return finalResponse;
// }
