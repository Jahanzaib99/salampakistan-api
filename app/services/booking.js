'use strict';

const repos = require('../repositories');
const helpers = require('../helpers');
// const enums = require('../enums');
const messages = require('../messages');
const validations = require('../validations');
const restify = require('restify');
// const trip = require('../enums/trip');
const moment = require('moment');
// const moment = require('moment-timezone');
// const util = require('util');
const { originCities } = require('../constants/bookMe');
const _ = require('lodash');
// const pipeConstant = require('../constants/pipedrive');
// let ObjectId = require('mongoose').Types.ObjectId;
const ObjectID = require('mongodb').ObjectID;
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

function getAllBookings(payload) {
  return repos.booking.findAll(payload)
    .then((bookings) => {
      return {
        data: bookings.data,
        meta: {
          pageSize: payload.pageSize,
          skip: payload.skip,
          total: bookings.total
        }
      };
    });
}

function reserveTrip(payload) {
  return validations.validatePayload(payload, {
    properties: {
      tripId: validations.rules.ObjectId('tripId'),
      passengersDetail: validations.rules.passengersDetail,
      status: validations.rules.textRequired('status')
    }
  })
    .then(() => {
      return Promise.all([
        repos.trip.findById(payload.tripId),
        repos.user.findByEmail(payload.passengersDetail.email)
      ]);
    })
    .then(async(response) => {
      let trip = response[0];
      let user = response[1];
      if (!trip) {
        throw new restify.errors.ConflictError(messages.trip.notFound);
      }
      if(trip) {
        let vendor = await repos.user.findById(trip.vendorId);
        let vendorName;
        let email;
        if(!vendor) {
          vendorName = 'PTDC';
          email = 'hello@ptdc.pk';
        }else{
          vendorName = vendor.profile.firstName;
          email = vendor.accounts.email;
        }
        let subject = 'Booking Request';
        let text = 'Booking Request';
        let html = `<H1>Welcome to PTDC </H1>.
        <p>Hey <b>${vendorName}</b>,</p>
        <p>A Customer has requested booking for Trip: <b>${trip.title}</b> with following details.</p>
        <ol>
        <li>Name: <b>${payload.passengersDetail.fullName}</b></li>
        <li>Mobile: <b>${payload.passengersDetail.mobile}</b></li>
        <li>Email: <b>${payload.passengersDetail.email}</b></li>
        <li>isChild: <b>${payload.passengersDetail.isChild}</b></li>
        <li>noOfAdults: <b>${payload.passengersDetail.noOfAdults}</b></li>
        <li>noOfChildren: <b>${payload.passengersDetail.noOfChildren}</b></li>
        </ol>
        <p>
        <p>
            Kind Regards,<br />
            Team PTDC
        </p>`;
        await helpers.email.sendEmail(email, subject, text, html)
          .then((res) => {
            console.log('email sent');
          })
          .catch((err) => {
            console.error(err);
          });
      }
      if (!user) {
        // singup the new user here
        let password = '592483';
        try {
          password = makeid(6);
        } catch (error) {
          password = '592483';
        }
        let signupUser = {
          fullName: payload.passengersDetail.fullName,
          mobile: payload.passengersDetail.phone,
          email: payload.passengersDetail.email,
          gender: 'male',
          password: password,
          confirmPassword: password,
          dob: '2019-07-11'
        };
        user = await signup(signupUser);
      }
      payload.userId = user._id;
      payload.amount = trip.price;
      payload.type = 'trip';
      payload.subtotal = (trip.price * payload.passengersDetail.noOfAdults) + (trip.price * payload.passengersDetail.noOfChildren);
      payload.tripDate = trip.date;
      payload.vendorId = trip.vendorId;
      return repos.booking.create(payload);
    })
    .then((response) => {
      return Promise.resolve({
        message: messages.booking.success,
        data: response._id
      });
    });
}

function reserveEvents(payload) {
  return validations.validatePayload(payload, {
    properties: {
      eventId: validations.rules.ObjectId('eventId'),
      passengersDetail: validations.rules.passengersDetail,
      status: validations.rules.textRequired('status')
    }
  })
    .then(() => {
      return Promise.all([
        repos.events.findById(payload.eventId),
        repos.user.findByEmail(payload.passengersDetail.email)
      ]);
    })
    .then(async(response) => {
      let events = response[0];
      let user = response[1];
      if (!events) {
        throw new restify.errors.ConflictError(messages.events.notFound);
      }
      if(events) {
        let vendor = await repos.user.findById(events.vendorId);
        let vendorName;
        let email;
        if(!vendor) {
          vendorName = 'PTDC';
          email = 'hello@ptdc.pk';
        }else{
          vendorName = vendor.profile.firstName;
          email = vendor.accounts.email;
        }
        let subject = 'Booking Request';
        let text = 'Booking Request';
        let html = `<H1>Welcome to PTDC </H1>.
        <p>Hey <b>${vendorName}</b>,</p>
        <p>A Customer has requested booking for Event: <b>${events.title}</b> with following details.</p>
        <ol>
        <li>Name: <b>${payload.passengersDetail.fullName}</b></li>
        <li>Mobile: <b>${payload.passengersDetail.mobile}</b></li>
        <li>Email: <b>${payload.passengersDetail.email}</b></li>
        <li>isChild: <b>${payload.passengersDetail.isChild}</b></li>
        <li>noOfAdults: <b>${payload.passengersDetail.noOfAdults}</b></li>
        <li>noOfChildren: <b>${payload.passengersDetail.noOfChildren}</b></li>
        </ol>
        <p>
        <p>
            Kind Regards,<br />
            Team PTDC
        </p>`;
        await helpers.email.sendEmail(email, subject, text, html)
          .then((res) => {
            console.log('email sent');
          })
          .catch((err) => {
            console.error(err);
          });
      }
      if (!user) {
        // singup the new user here
        let password = '592483';
        try {
          password = makeid(6);
        } catch (error) {
          password = '592483';
        }
        let signupUser = {
          fullName: payload.passengersDetail.fullName,
          mobile: payload.passengersDetail.phone,
          email: payload.passengersDetail.email,
          gender: 'male',
          password: password,
          confirmPassword: password,
          dob: '2019-07-11'
        };
        user = await signup(signupUser);
      }
      payload.userId = user._id;
      payload.amount = events.price;
      payload.type = 'events';
      payload.subtotal = (events.price * payload.passengersDetail.noOfAdults) + (events.price * payload.passengersDetail.noOfChildren);
      payload.tripDate = events.date;
      payload.vendorId = events.vendorId;
      return repos.booking.create(payload);
    })
    .then((response) => {
      return Promise.resolve({
        message: messages.booking.success,
        data: response._id
      });
    });
}

function updateStatus(payload) {
  return validations.validatePayload(payload, {
    properties: {
      bookingId: validations.rules.objectId,
      status: validations.rules.bookingNewStatus
    }
  })
    .then(repos.booking.findById.bind(this, payload.bookingId))
    .then((booking) => {
      if (!booking) {
        throw new restify.errors.ConflictError(messages.booking.notFound);
      }
      return repos.booking.updateStatus(payload);
    })
    .then((response) => {
      return Promise.resolve({
        message: messages.booking.success
      });
    });
}

function findById(payload) {
  return repos.booking.findById(payload.bookingId)
    .then((bookings) => {
      if (!bookings) {
        throw new restify.errors.ConflictError(messages.booking.notFound);
      }
      return Promise.resolve(bookings);
    });
}

function remove(payload) {
  return validations.validatePayload(payload, {
    properties: {
      bookingId: validations.rules.objectId
    }
  })
    .then(repos.booking.findById.bind(this, payload.bookingId))
    .then((booking) => {
      if (!booking) {
        throw new restify.errors.ConflictError(messages.booking.notFound);
      }
      return repos.booking.remove(payload);
    })
    .then((response) => {
      return Promise.resolve({
        message: messages.booking.remove
      });
    });
}

async function reserveBusSeat(payload) {
  await validations.validatePayload(payload, {
    properties: {
      service_id: validations.rules.textRequired('service_id'),
      origin_city_name: validations.rules.origin_city_name,
      destination_city_name: validations.rules.destination_city_name,
      date: validations.rules.date,
      deptime: validations.rules.deptime,
      time_id: validations.rules.time_id,
      schedule_id: validations.rules.schedule_id,
      route_id: validations.rules.route_id,
      number_of_seats: validations.rules.number_of_seats,
      seat_numbers_male: validations.rules.seat_numbers_male,
      seat_numbers_female: validations.rules.seat_numbers_female,
      name: validations.rules.name,
      email: validations.rules.email,
      phone: validations.rules.phone,
      cnic: validations.rules.cnic,
      ticket_price: validations.rules.ticket_price,
      total_price: validations.rules.total_price
    }
  });
  let user;
  Promise.all([repos.user.findByEmail(payload.email)]).then((res) => {
    if (res[0] === null) {
      // singup the new user here
      let password = '592483';
      try {
        password = makeid(6);
      } catch (error) {
        password = '592483';
      }
      let signupUser = {
        fullName: payload.name,
        mobile: payload.phone,
        email: payload.email,
        gender: 'male',
        password: password,
        confirmPassword: password,
        dob: '2019-07-11'
      };
      user = signup(signupUser);
    } else {
      user = res[0];
    }

  });

  // payload.service_name = (payload.service_name).replace(/%20/g, ' ');
  payload.origin_city_name = (payload.origin_city_name).replace(/%20/g, ' ');
  payload.destination_city_name = (payload.destination_city_name).replace(/%20/g, ' ');
  payload.date = (payload.date).replace(/%20/g, ' ');
  // let searchedServiceId;
  let searchedOriginCityId;
  let searchedDestinationCityId;
  let destinationCityPayload = {
    httpMethod: 'POST',
    endpoint: 'get_destination_cities',
    body: {}
  };
  // _.each(services, function(data) {
  //   if (payload.service_name && (data.service_name).toLowerCase() === (payload.service_name).toLowerCase()) {
  //     searchedServiceId = data.service_id;
  //     destinationCityPayload.body['service_id'] = data.service_id;
  //   };
  // });
  _.each(originCities, function(data) {
    if (payload.origin_city_name && (data.origin_city_name).toLowerCase() === (payload.origin_city_name).toLowerCase()) {
      searchedOriginCityId = data.origin_city_id;
      destinationCityPayload.body['origin_city_id'] = data.origin_city_id;
    };
  });
  if (!searchedOriginCityId) {
    throw new restify.errors.ConflictError('Failed to find Origin City');
  }
  let destinationCities = await helpers.bookMe.fetchData(destinationCityPayload);
  if (!destinationCities.success) {
    throw new restify.errors.ConflictError('Failed to find destinations');
  } else {
    _.each(destinationCities.cities, function(data) {
      if (payload.destination_city_name && (data.destination_city_name).toLowerCase() === (payload.destination_city_name).toLowerCase()) {
        searchedDestinationCityId = data.destination_city_id;
      };
    });
  }
  if (!searchedDestinationCityId) {
    throw new restify.errors.ConflictError('Failed to find destinations');
  }
  let bookingPayload = {
    origin_city_id: searchedOriginCityId,
    arrival_city_id: searchedDestinationCityId,
    service_id: payload.service_id,
    date: payload.date,
    deptime: payload.deptime,
    time_id: payload.time_id,
    schedule_id: payload.schedule_id,
    route_id: payload.route_id,
    number_of_seats: payload.number_of_seats,
    seat_numbers_male: payload.seat_numbers_male,
    seat_numbers_female: payload.seat_numbers_female,
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    cnic: payload.cnic,
    ticket_price: payload.ticket_price,
    total_price: payload.total_price,
    claim_id: payload.claim_id
  };
  payload.body = bookingPayload;
  payload.httpMethod = 'post';
  payload.endpoint = 'save_bus_seats_order';
  let booking = await helpers.bookMe.fetchData(payload);
  if (!booking.success) {
    throw new restify.errors.ConflictError(`${booking.message}`);
  }
  booking.type = 'bus';
  booking.userId = user._id;
  let bookingResponse = await repos.booking.create(booking);
  if (!bookingResponse) {
    throw new restify.errors.ConflictError(messages.booking.error);
  };
  return ({
    message: messages.booking.success,
    data: bookingResponse._id
  });
}

async function airlineReservation(payload) {
  await validations.validatePayload(payload, {
    properties: {
      firstname: validations.rules.textRequired('firstname'),
      phone_number: validations.rules.textRequired('phone_number'),
      email: validations.rules.textRequired('email'),
      cnic: validations.rules.textRequired('cnic')
    }
  });
  let user;
  Promise.all([repos.user.findByEmail(payload.email)]).then((res) => {

    if (res[0] === null) {
      // singup the new user here
      let password = '592483';
      try {
        password = makeid(6);
      } catch (error) {
        password = '592483';
      }
      let signupUser = {
        fullName: payload.firstname,
        mobile: payload.phone,
        email: payload.email,
        gender: 'male',
        password: password,
        confirmPassword: password,
        dob: '2019-07-11'
      };
      user = signup(signupUser);
    }

    user = res[0];
  });
  payload.body = {
    no_of_adults: payload.no_of_adults,
    no_of_children: payload.no_of_children,
    no_of_infants: payload.no_of_infants,
    ref_id: payload.ref_id,
    journey_ref_id: payload.journey_ref_id,
    traveler_type: payload.traveler_type ? (payload.traveler_type) : undefined,
    prefix: payload.prefix ? (payload.prefix) : undefined,
    firstname: payload.firstname ? (payload.firstname) : undefined,
    lastname: payload.lastname ? (payload.lastname) : undefined,
    gender: payload.gender ? (payload.gender) : undefined,
    age: payload.age ? (payload.age) : undefined,
    dob: payload.dob ? (payload.dob) : undefined,
    seat: payload.seat ? (payload.seat) : undefined,
    passenger_country: payload.passenger_country ? (payload.passenger_country) : undefined,
    nationality: payload.nationality ? (payload.nationality) : undefined,
    passport_no: payload.passport_no ? (payload.passport_no) : undefined,
    passport_expiry: payload.passport_expiry ? (payload.passport_expiry) : undefined,
    // traveler_type: [payload.traveler_type],
    // prefix: [payload.prefix],
    // firstname: [payload.firstname],
    // lastname: [payload.lastname],
    // gender: [payload.gender],
    // age: [payload.age],
    // dob: [payload.dob],
    // seat: [payload.seat],
    // passenger_country: [payload.passenger_country],
    // nationality: [payload.nationality],
    // passport_no: [payload.passport_no],
    // passport_expiry: [payload.passport_expiry],
    address_name: payload.address_name,
    street: payload.street,
    city: payload.city,
    state: payload.state,
    postal_code: payload.postal_code,
    country: payload.country,
    area_code: payload.area_code,
    country_code: payload.country_code,
    location: payload.location,
    phone_number: payload.phone_number,
    email: payload.email,
    cnic: payload.cnic
  };
  payload.httpMethod = 'post';
  payload.convert = false;
  payload.endpoint = 'flight.php?reservation';
  console.log('booking service payload ---------------------------->', payload);
  let booking = await helpers.bookMe.fetchData(payload);
  console.log('booking service response ---------------------------->', booking);
  // if (booking.status === 'error') {
  // throw new restify.errors.ConflictError(`${booking.msg}`);
  // }
  booking.data.type = 'airline';
  booking.data.userId = user._id;
  let bookingResponse = await repos.booking.create(booking.data);
  if (!bookingResponse) {
    throw new restify.errors.ConflictError(messages.booking.error);
  };
  if(bookingResponse) {
    let subject = 'Booking';
    let text = 'Booking';
    let html = `<H1>Welcome to PTDC </H1>.
    <p>Hey <b>${payload.firstname}</b>,</p>
    <p>We have recived your booking request with following details.</p>
    <ol>
    <li>Name: <b>${payload.firstname}</b></li>
    <li>Mobile: <b>${payload.phone_number}</b></li>
    <li>Email: <b>${payload.email}</b></li>
    <li>No Of Adults: <b>${payload.no_of_adults}</b></li>
    <li>No Of Children: <b>${payload.no_of_children || 0}</b></li>
    </ol>
    <p>
    <p>
        Kind Regards,<br />
        Team PTDC
    </p>`;
    await helpers.email.sendEmail(payload.email, subject, text, html)
      .then((res) => {
        console.log('email sent');
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return ({
    message: messages.booking.success,
    data: bookingResponse._id
  });
}

async function reserveHotel(payload) {
  await validations.validatePayload(payload, {
    properties: {
      accomodationId: validations.rules.textRequired('hotelId'),
      hotelName: validations.rules.textRequired('hotelName'),
      noOfRooms: validations.rules.numRequired('noOfRooms'),
      checkIn: validations.rules.date,
      checkOut: validations.rules.date,
      name: validations.rules.name,
      email: validations.rules.email,
      phone: validations.rules.phone,
      cnic: validations.rules.cnic
    }
  });
  let user;
  let res = await repos.user.findByEmail(payload.email);
  if (!res) {
    // singup the new user here
    let password = '592483';
    try {
      password = makeid(6);
    } catch (error) {
      password = '592483';
    }
    let signupUser = {
      fullName: payload.name,
      mobile: payload.phone,
      email: payload.email,
      gender: 'male',
      password: password,
      confirmPassword: password,
      dob: '2019-07-11'
    };
    user = await signup(signupUser);
  } else {
    user = res;
  }
  if(!ObjectID.isValid(payload.accomodationId)) {
    payload.type = 'hotel';
    payload.userId = user._id;
    payload.hotelId = payload.accomodationId;
    payload.accomodationId = undefined;
    payload.roomId = undefined;
    let booking = await repos.booking.create(payload);
    if (!booking) {
      throw new restify.errors.ConflictError(messages.booking.error);
    };
    return ({
      message: messages.booking.success,
      data: booking._id
    });
  }
  let hotel = await repos.hotel.findById(payload.accomodationId);
  if (!hotel) {
    throw new restify.errors.NotFoundError(messages.hotel.notExists);
  }
  const findByIdRoom = hotel.rooms.id(payload.roomId);
  if (!findByIdRoom) {
    throw new restify.errors.NotFoundError(messages.hotel.roomNotFound);
  }
  if(hotel) {
    let vendor = await repos.user.findById(hotel.vendor);
    let vendorName;
    let email;
    if(!vendor) {
      vendorName = 'PTDC';
      email = 'hello@ptdc.pk';
    }else{
      vendorName = vendor.profile.firstName;
      email = vendor.accounts.email;
    }
    let subject = 'Booking Request';
    let text = 'Booking Request';
    let html = `<H1>Welcome to PTDC </H1>.
    <p>Hey <b>${vendorName}</b>,</p>
    <p>A Customer has requested booking for Hotel: <b>${hotel.hotelName}</b> with following details.</p>
    <p>Room: <b>${findByIdRoom.RoomName}</b>,</p>
    <ol>
    <li>Name: <b>${payload.name}</b></li>
    <li>Mobile: <b>${payload.phone}</b></li>
    <li>Email: <b>${payload.email}</b></li>
    <li>No Of Rooms: <b>${payload.noOfRooms}</b></li>
    <li>Check In Date: <b>${payload.checkIn}</b></li>
    <li>Check Out Date: <b>${payload.checkOut}</b></li>
    </ol>
    <p>
    <p>
        Kind Regards,<br />
        Team PTDC
    </p>`;
    await helpers.email.sendEmail(email, subject, text, html)
      .then((res) => {
        console.log('email sent');
      })
      .catch((err) => {
        console.error(err);
      });
  }
  payload.type = 'hotel';
  payload.userId = user._id;
  let booking = await repos.booking.create(payload);
  if (!booking) {
    throw new restify.errors.ConflictError(messages.booking.error);
  };
  return ({
    message: messages.booking.success,
    data: booking._id
  });
}

// create new verification code
function makeid(length) {
  var result = '';
  var characters = '0123456789abcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// sign up new guest user
async function signup(payload) {
  return repos.user.findByEmail(payload.email)
    .then((user) => {
      if (user) {
        throw new restify.errors.ConflictError(messages.user.signup.exists);
      }
      return helpers.crypt.hash(payload.password)
        .then((hash) => Promise.resolve({
          type: 'customer',
          // social: enums.auth.social.local,
          email: payload.email,
          hash: hash,
          profile: {
            firstName: payload.fullName,
            mobile: payload.mobile,
            gender: payload.gender,
            nic: payload.nic,
            dob: moment(payload.dob).startOf('day').valueOf()
          }
        }));
    })
    .then(repos.user.create)
    // send usr credentials here
    // .then(_signin.bind(this, payload))
    .then(async(response) => {
      response.message = messages.user.signup.success;
      response.created = true;

      payload.customer = true;
      let subject = 'User Created';
      let text = 'User has been created';
      let html = `<H1>Welcome to PTDC </H1>.
      <p>Hey <b>${payload.fullName}</b>,</p>
      <p>We have created an account for you with the following credentials.</p>
      <p>Email: <b>${payload.email}</b></p>
      <p>Password: <b>${payload.password}</b></p>
      <p>
      <p>
          Kind Regards,<br />
          Team PTDC
      </p>`;
      await helpers.email.sendEmail(payload.email, subject, text, html)
        .then((res) => {
          console.log('email sent');
        })
        .catch((err) => {
          console.error(err);
        });
      return Promise.resolve(response);
    });
}
