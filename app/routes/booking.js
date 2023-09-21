'use strict';

const enums = require('../enums');
const auth = require('../middlewares/auth');
const controllers = require('../controllers');

module.exports = (server) => {
  // trip booking
  server.post(`${enums.url.baseUrl}/trip/:tripId/bookings`, /* auth.required([enums.user.type.admin, enums.user.type.superAdmin, enums.user.type.vendor, enums.user.type.customer, enums.user.type.employee]), */ controllers.booking.reserveTrip);
  // event booking
  server.post(`${enums.url.baseUrl}/events/:eventId/bookings`, /* auth.required([enums.user.type.admin, enums.user.type.superAdmin, enums.user.type.vendor, enums.user.type.customer, enums.user.type.employee]), */ controllers.booking.reserveEvents);
  // bus booking
  server.post(`${enums.url.baseUrl}/bus/bookings`, /* auth.required([enums.user.type.admin, enums.user.type.superAdmin, enums.user.type.vendor, enums.user.type.customer, enums.user.type.employee]) , */ controllers.booking.reserveBusSeat); // bus booking
  // Airline Booking
  server.post(`${enums.url.baseUrl}/airline/bookings`, /* auth.required([enums.user.type.admin, enums.user.type.vendor, enums.user.type.customer, enums.user.type.employee]),*/ controllers.booking.airlineReservation); // airline booking
  // Hotel Booking
  server.post(`${enums.url.baseUrl}/accomodations/bookings`, /* auth.required([enums.user.type.admin, enums.user.type.superAdmin, enums.user.type.vendor, enums.user.type.customer, enums.user.type.employee]) , */ controllers.booking.reserveHotel); // Internal Hotels booking
  // GetAll
  server.get(`${enums.url.baseUrl}/bookings`, /* auth.required([enums.user.type.admin, enums.user.type.employee, enums.user.type.vendor, enums.user.type.superAdmin]), */ controllers.booking.getAllBookings);
  // update status
  server.put(`${enums.url.baseUrl}/bookings/:bookingId/updateStatus`, auth.required([enums.user.type.admin, enums.user.type.vendor, enums.user.type.superAdmin, enums.user.type.employee]), controllers.booking.updateStatus);
  // get by id
  server.get(`${enums.url.baseUrl}/bookings/:bookingId`, /* auth.required([enums.user.type.admin, enums.user.type.vendor, enums.user.type.superAdmin, enums.user.type.employee]), */ controllers.booking.findById);
  // remove
  server.del(`${enums.url.baseUrl}/bookings/:bookingId`, auth.required([enums.user.type.admin, enums.user.type.vendor, enums.user.type.superAdmin, enums.user.type.employee]), controllers.booking.remove);

};
