'use strict';

const services = require('../services');
// const config = require('../config');
const enums = require('../enums');

module.exports = {
  getAllBookings,
  reserveTrip,
  reserveEvents,
  updateStatus,
  findById,
  remove,
  reserveBusSeat,
  airlineReservation,
  reserveHotel
};

function getAllBookings(req, res, next) {
  let payload = {
    tripId: req.query.tripId,
    userId: req.query.userId,
    vendorId: req.query.vendorId,
    status: req.query.status,
    // tripDate: req.body.tripDate,
    type: req.query.type,
    pageSize: req.query.pageSize,
    skip: req.query.skip,
    auth: req.auth
  };
  return services.booking.getAllBookings(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function reserveTrip(req, res, next) {
  let payload = {
    tripId: req.params.tripId,
    // orderRefNum: req.body.orderRefNum,
    // reservationExpiry: req.body.reservationExpiry,
    passengersDetail: req.body.passengersDetail,
    // paymentMethod: req.body.paymentMethod,
    // address: req.body.address,
    // city: req.body.city,
    status: enums.booking.status.new
    // paymentDate: req.body.paymentDate
  };
  return services.booking.reserveTrip(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}
function reserveEvents(req, res, next) {
  let payload = {
    eventId: req.params.eventId,
    // orderRefNum: req.body.orderRefNum,
    // reservationExpiry: req.body.reservationExpiry,
    passengersDetail: req.body.passengersDetail,
    // paymentMethod: req.body.paymentMethod,
    // address: req.body.address,
    // city: req.body.city,
    status: enums.booking.status.new
    // paymentDate: req.body.paymentDate
  };
  return services.booking.reserveEvents(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function updateStatus(req, res, next) {
  let payload = {
    bookingId: req.params.bookingId,
    status: req.body.status,
    auth: req.auth
  };
  return services.booking.updateStatus(payload)
    .then((response) => {
      res.send(200, response);
    })
    .catch(next);
}

function findById(req, res, next) {
  let payload = {
    bookingId: req.params.bookingId,
    auth: req.auth
  };
  return services.booking.findById(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function remove(req, res, next) {
  let payload = {
    bookingId: req.params.bookingId,
    auth: req.auth
  };
  return services.booking.remove(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

/**
 * @api {post} /bus/bookings busBooking
 * @apiVersion 1.0.0
 * @apiName Bus Booking
 * @apiGroup Booking
 * @apiPermission user
 *
 * @apiParam {String} origin_city_name Origin City Name
 * @apiParam {String} destination_city_name Destination City Name
 * @apiParam {String} service_id service id
 * @apiParam {String} date Date
 * @apiParam {String} deptime Departure Time
 * @apiParam {String} time_id Time Id
 * @apiParam {String} schedule_id Schedule Id
 * @apiParam {String} route_id Route Id
 * @apiParam {String} number_of_seats Number of Seats
 * @apiParam {String} seat_numbers_male seat_numbers_male
 * @apiParam {String} seat_numbers_female seat_numbers_female
 * @apiParam {String} name Name
 * @apiParam {String} email Email
 * @apiParam {String} phone Phone
 * @apiParam {String} cnic CNIC
 * @apiParam {String} ticket_price Ticket Price
 * @apiParam {String} total_price Total Price
 * @apiParam {Number} claim_id Claim Id Optional
 *
 * @apiSuccess {String} response Bus Booking
 * @apiSuccessExample {JSON} Success-Response:
 *
 * "data": {
 *   "message": "Booking has been created.",
 *  "data": "60239ea5823e232024c14902"
 *  }
 */
function reserveBusSeat(req, res, next) {
  let payload = {
    origin_city_name: req.body.origin_city_name,
    destination_city_name: req.body.destination_city_name,
    service_id: req.body.service_id,
    date: req.body.date,
    deptime: req.body.deptime,
    time_id: req.body.time_id,
    schedule_id: req.body.schedule_id,
    route_id: req.body.route_id,
    number_of_seats: req.body.number_of_seats,
    seat_numbers_male: req.body.seat_numbers_male,
    seat_numbers_female: req.body.seat_numbers_female,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    cnic: req.body.cnic,
    ticket_price: req.body.ticket_price,
    total_price: req.body.total_price,
    claim_id: req.body.claim_id
  };
  return services.booking.reserveBusSeat(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

/**
 * @api {post} /airline/bookings airlineBooking
 * @apiVersion 1.0.0
 * @apiName airline Booking
 * @apiGroup Booking
 * @apiPermission user
 *
 * @apiParam {String} no_of_adults no_of_adults Required
 * @apiParam {String} no_of_children no_of_children Optional
 * @apiParam {String} no_of_infants no_of_infants Optional
 * @apiParam {String} ref_id ref_id Required
 * @apiParam {String} journey_ref_id journey_ref_id Required
 * @apiParam {Array} traveler_type traveler_type Required | ADT(Adult)/CNN(Child)/INF(Infant)
 * @apiParam {Array} prefix prefix Required Required
 * @apiParam {Array} firstname firstname Required
 * @apiParam {Array} lastname lastname Required
 * @apiParam {Array} gender gender Optional For Domestic Flight | Required For International Journey
 * @apiParam {Array} age age  Optional For Domestic Flight | Required For International Journey
 * @apiParam {Array} dob dob  Optional For Domestic Flight | Required For International Journey
 * @apiParam {Array} seat seat  Required Air Segment Key:(Seat Code | *For Auto Assign), Air Segment Key:(Seat Code | *For Auto Assign)
 * @apiParam {Array} passenger_country passenger_country  Optional For Domestic Flight | Required For International Journey
 * @apiParam {Array} nationality nationality  Optional For Domestic Flight | Required For International Journey
 * @apiParam {Array} passport_no passport_no  Optional For Domestic Flight | Required For International Journey
 * @apiParam {Array} passport_expiry passport_expiry  Optional For Domestic Flight | Required For International Journey
 * @apiParam {Array} passport_no passport_no  Optional For Domestic Flight | Required For International Journey
 * @apiParam {String} address_name address_name Optional
 * @apiParam {String} street street Optional
 * @apiParam {String} city city Optional
 * @apiParam {String} state state Optional
 * @apiParam {String} postal_code postal_code Optional
 * @apiParam {String} country country Required
 * @apiParam {String} area_code area_code Optional
 * @apiParam {String} country_code country_code Optional
 * @apiParam {String} location location Optional
 * @apiParam {String} phone_number phone_number Required
 * @apiParam {String} email email Required
 * @apiParam {String} cnic cnic Optional
 *
 * @apiSuccess {String} response Airline Booking
 * @apiSuccessExample {JSON} Success-Response:
 *
 * "data": {
 *   "message": "Booking has been created.",
 *  "data": "60239ea5823e232024c14902"
 *  }
 */

function airlineReservation(req, res, next) {
  let payload = {
    no_of_adults: req.body.no_of_adults,
    no_of_children: req.body.no_of_children,
    no_of_infants: req.body.no_of_infants,
    ref_id: req.body.ref_id,
    journey_ref_id: req.body.journey_ref_id,
    traveler_type: req.body.traveler_type,
    prefix: req.body.prefix,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    age: req.body.age,
    dob: req.body.dob,
    seat: req.body.seat,
    passenger_country: req.body.passenger_country,
    nationality: req.body.nationality,
    passport_no: req.body.passport_no,
    passport_expiry: req.body.passport_expiry,
    address_name: req.body.address_name,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    postal_code: req.body.postal_code,
    country: req.body.country,
    area_code: req.body.area_code,
    country_code: req.body.country_code,
    location: req.body.location,
    phone_number: req.body.phone_number,
    email: req.body.email,
    cnic: req.body.cnic
    // auth: req.auth
  };
  return services.booking.airlineReservation(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}

function reserveHotel(req, res, next) {
  let payload = {
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    hotelName: req.body.hotelName,
    accomodationId: req.body.hotelRefId,
    roomId: req.body.roomId,
    noOfRooms: req.body.noOfRooms,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    cnic: req.body.cnic
  };
  return services.booking.reserveHotel(payload)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
}
