'use strict';

const enums = require('../enums');
// const auth = require('../middlewares/auth');
const controllers = require('../controllers');

module.exports = (server) => {

  server.get(`${enums.url.baseUrl}/get_departure_cities`, controllers.cities.getDepartureCities);
  server.get(`${enums.url.baseUrl}/get_destination_cities`, controllers.cities.getDestinationCities);
  server.get(`${enums.url.baseUrl}/hotel_city_list`, controllers.cities.getHotelCityList);
};
