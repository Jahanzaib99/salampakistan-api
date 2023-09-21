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
const { services, originCities } = require('../constants/bookMe');
const _ = require('lodash');
// const pipeConstant = require('../constants/pipedrive');
// let ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  get,
  getSeatsInfo
};

async function get(payload) {
  let finalResponse = [];
  if (!payload.origin_city_name && payload.origin_city_name === '' || payload.origin_city_name === undefined) {
    throw new restify.errors.ConflictError('Origin City is Required');
  } if (!payload.destination_city_name || payload.destination_city_name === '' || payload.destination_city_name === undefined) {
    throw new restify.errors.ConflictError('Destination City is Required');
  } if (!payload.date && payload.date === '' || payload.date === undefined) {
    throw new restify.errors.ConflictError('Please Select Date of Travel');
  }
  payload.origin_city_name = (payload.origin_city_name).replace(/%20/g, ' ');
  payload.destination_city_name = (payload.destination_city_name).replace(/%20/g, ' ');
  payload.date = (payload.date).replace(/%20/g, ' ');
  let searchedServiceId;
  let searchedServiceName;
  let searchedOriginCityId;
  let searchedOriginCityName;
  let OriginCityName = [];
  let searchedDestinationCityId;
  let searchedDestinationCityName;
  let DestinationCityName = [];
  let serviceName = [];
  let destinationCityPayload = {
    httpMethod: 'POST',
    endpoint: 'get_destination_cities',
    body: {}
  };
  if(payload.service_name) {
    _.each(services, function(data) {
      if (payload.service_name) {
        serviceName.push(data.service_name.toLowerCase());
      };
    });
    let matches = stringSimilarity.findBestMatch(((payload.service_name.replace(/%20/g, ' ')).toLowerCase()), serviceName);
    if(matches.bestMatch.rating > 0.7) {
      payload.service_name = matches.bestMatch.target;
    }
    _.each(services, function(data) {
      if (payload.service_name && ((data.service_name).toLowerCase()).includes(`${((payload.service_name).replace(/%20/g, ' ')).toLowerCase()}`)) {
        searchedServiceId = data.service_id;
        searchedServiceName = data.service_name;
        destinationCityPayload.body['service_id'] = data.service_id;
      };
    });
    if(!searchedServiceId) {
      throw new restify.errors.ConflictError('Failed to find Service');
    }
  }
  _.each(originCities, function(data) {
    if (payload.origin_city_name) {
      OriginCityName.push(data.origin_city_name.toLowerCase());
    };
  });
  let matches = stringSimilarity.findBestMatch(((payload.origin_city_name).toLowerCase()), OriginCityName);
  if(matches.bestMatch.rating > 0.7) {
    payload.origin_city_name = matches.bestMatch.target;
  }
  _.each(originCities, function(data) {
    if (payload.origin_city_name && ((data.origin_city_name).toLowerCase()).includes((payload.origin_city_name).toLowerCase())) {
      searchedOriginCityId = data.origin_city_id;
      searchedOriginCityName = data.origin_city_name;
      destinationCityPayload.body['origin_city_id'] = data.origin_city_id;
    };
  });

  if(!searchedOriginCityId) {
    throw new restify.errors.ConflictError('Failed to find Origin City');
  }
  let destinationCities = await helpers.bookMe.fetchData(destinationCityPayload);
  if(!destinationCities.success) {
    throw new restify.errors.ConflictError('Failed to find destinations');
  } else {
    _.each(destinationCities.cities, function(data) {
      if (payload.destination_city_name) {
        DestinationCityName.push(data.destination_city_name.toLowerCase());
      };
    });
    matches = stringSimilarity.findBestMatch(((payload.destination_city_name).toLowerCase()), DestinationCityName);
    if(matches.bestMatch.rating > 0.7) {
      payload.destination_city_name = matches.bestMatch.target;
    }
    _.each(destinationCities.cities, function(data) {
      if (payload.destination_city_name && ((data.destination_city_name).toLowerCase()).includes((payload.destination_city_name).toLowerCase())) {
        searchedDestinationCityId = data.destination_city_id;
        searchedDestinationCityName = data.destination_city_name;
      };
    });
  }

  if(!searchedDestinationCityId) {
    throw new restify.errors.ConflictError('Failed to find destinations');
  }

  let allBusServicesPayload = {
    origin_city_id: searchedOriginCityId,
    destination_city_id: searchedDestinationCityId,
    service_id: searchedServiceId
  };
  payload.body = allBusServicesPayload;
  payload.httpMethod = 'post';
  payload.endpoint = 'allBusServices';
  let allBusServices = await helpers.bookMe.fetchData(payload);
  if(!allBusServices.success) {
    throw new restify.errors.ConflictError('Failed to fetch bus service');
  };
  let timingsPayload = {
    origin_city_id: searchedOriginCityId,
    destination_city_id: searchedDestinationCityId,
    service_id: searchedServiceId,
    date: payload.date
  };
  payload.body = timingsPayload;
  payload.httpMethod = 'post';
  payload.endpoint = 'bus_times';
  let timings = await helpers.bookMe.fetchData(payload);
  if(!timings.times) {
    throw new restify.errors.ConflictError('No Bus available on the specified date');
  }
  for (let i = 0 ; i < timings.times.length; i++) {
    let time = timings.times[i];
    time = {
      departureCityName: searchedOriginCityName ? searchedOriginCityName : time.departure_city_name,
      arrivalCityName: searchedDestinationCityName ? searchedDestinationCityName : time.arrival_city_name,
      serviceName: searchedServiceName ? searchedServiceName : time.service_name,
      serviceId: time.service_id,
      departureTime: time.time,
      date: payload.date,
      arrivalTime: time.arrtime,
      originalFare: parseInt(`${time.original_fare}`, 10),
      discountedFare: parseInt(`${time.fare}`, 10),
      totalSeats: time.seats,
      availableSeats: time.available_seats,
      busName: time.busname,
      bustype: time.bustype,
      facilities: time.facilities,
      rating: time.rating,
      duration: time.duration,
      thumbnail: time.thumbnail,
      departureTerminalAddress: time.departure_terminal_address,
      arrivalTerminalAddress: time.arrival_terminal_address,
      time_id: time.time_id,
      schedule_id: time.schedule_id,
      route_id: time.route_id,
      source: 'bookMe'
    };
    await finalResponse.push(time);
  }

  // sort by price or rating
  if (payload.sortBy && payload.sortBy !== '' && finalResponse && finalResponse.length > 0) {
    if (payload.sortBy === 'price') {
      finalResponse = _.sortBy(finalResponse, 'discountedFare');
    } else if (payload.sortBy === '-price') {
      finalResponse = _.sortBy(finalResponse, 'discountedFare').reverse();
    } else if (payload.sortBy === 'rating') {
      finalResponse = _.sortBy(finalResponse, 'rating');
    } else if (payload.sortBy === '-rating') {
      finalResponse = _.sortBy(finalResponse, 'rating').reverse();
    }
  }

  // pagination
  if (payload.skip > 0) {
    finalResponse = finalResponse.splice(payload.skip);
  }
  if (payload.pageSize > 0) {
    finalResponse = finalResponse.slice(0, payload.pageSize);
  };

  return ({
    data: finalResponse,
    meta: {
      pageSize: payload.pageSize,
      skip: payload.skip,
      total: timings.times.length
    }
  });
}

async function getSeatsInfo(payload) {
  if (!payload.origin_city_name && payload.origin_city_name === '' || payload.origin_city_name === undefined) {
    throw new restify.errors.ConflictError('Origin City is Required');
  } if (!payload.destination_city_name || payload.destination_city_name === '' || payload.destination_city_name === undefined) {
    throw new restify.errors.ConflictError('Destination City is Required');
  } if (!payload.date && payload.date === '' || payload.date === undefined) {
    throw new restify.errors.ConflictError('Please Select Date of Travel');
  }
  payload.origin_city_name = (payload.origin_city_name).replace(/%20/g, ' ');
  payload.destination_city_name = (payload.destination_city_name).replace(/%20/g, ' ');
  payload.date = (payload.date).replace(/%20/g, ' ');
  let searchedServiceId = payload.service_id;
  let searchedOriginCityId;
  let searchedDestinationCityId;
  let searchedOriginCityName = [];
  let searchedDestinationCityName = [];
  let destinationCityPayload = {
    httpMethod: 'POST',
    endpoint: 'get_destination_cities',
    body: {}
  };
  // _.each(services, function(data) {
  //   if (payload.service_name && (data.service_name).toLowerCase() === ((payload.service_name).replace(/%20/g, ' ')).toLowerCase()) {
  //     searchedServiceId = data.service_id;
  //     destinationCityPayload.body['service_id'] = data.service_id;
  //   };
  // });
  // if(!searchedServiceId) {
  //   throw new restify.errors.ConflictError('Failed to find Service');
  // }

  _.each(originCities, function(data) {
    if (payload.origin_city_name) {
      searchedOriginCityName.push(data.origin_city_name.toLowerCase());
    };
  });
  let matches = stringSimilarity.findBestMatch(((payload.origin_city_name).toLowerCase()), searchedOriginCityName);
  if(matches.bestMatch.rating > 0.7) {
    payload.origin_city_name = matches.bestMatch.target;
  }
  _.each(originCities, function(data) {
    if (payload.origin_city_name && ((data.origin_city_name).toLowerCase()).includes((payload.origin_city_name).toLowerCase())) {
      searchedOriginCityId = data.origin_city_id;
      destinationCityPayload.body['origin_city_id'] = data.origin_city_id;
    };
  });
  if(!searchedOriginCityId) {
    throw new restify.errors.ConflictError('Failed to find Origin City');
  }
  let destinationCities = await helpers.bookMe.fetchData(destinationCityPayload);
  if(!destinationCities.success) {
    throw new restify.errors.ConflictError('Failed to find destinations');
  } else {
    _.each(destinationCities.cities, function(data) {
      if (payload.destination_city_name) {
        searchedDestinationCityName.push(data.destination_city_name.toLowerCase());
      };
    });
    matches = stringSimilarity.findBestMatch(((payload.destination_city_name).toLowerCase()), searchedDestinationCityName);
    if(matches.bestMatch.rating > 0.7) {
      payload.destination_city_name = matches.bestMatch.target;
    }
    _.each(destinationCities.cities, function(data) {
      if (payload.destination_city_name && ((data.destination_city_name).toLowerCase()).includes((payload.destination_city_name).toLowerCase())) {
        searchedDestinationCityId = data.destination_city_id;
      };
    });
  }
  if(!searchedDestinationCityId) {
    throw new restify.errors.ConflictError('Failed to find destinations');
  }
  let seatInfoPayload = {
    departure_city_id: searchedOriginCityId,
    arrival_city_id: searchedDestinationCityId,
    service_id: searchedServiceId,
    date: payload.date,
    deptime: payload.deptime,
    time_id: payload.time_id,
    schedule_id: payload.schedule_id,
    route_id: payload.route_id,
    seats: payload.totalSeats
  };
  payload.body = seatInfoPayload;
  payload.httpMethod = 'post';
  payload.endpoint = 'seats_info';
  let seatInfo = await helpers.bookMe.fetchData(payload);
  if(!seatInfo.success) {
    throw new restify.errors.ConflictError(`${seatInfo.message}`);
  }
  return ({
    seatPlan: seatInfo.seatplan,
    total_seats: seatInfo.total_seats,
    total_available: seatInfo.total_available,
    available_seats: seatInfo.available_seats,
    total_occupied: seatInfo.total_occupied,
    occupied_seats_male: seatInfo.occupied_seats_male,
    occupied_seats_female: seatInfo.occupied_seats_female,
    total_reserved: seatInfo.total_reserved,
    reserved_seats_male: seatInfo.reserved_seats_male,
    reserved_seats_female: seatInfo.reserved_seats_female
  });
}
