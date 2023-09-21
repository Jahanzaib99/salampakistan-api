'use strict';

const Booking = require('../models/Booking');
const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');

module.exports = {
  create,
  findAll,
  findById,
  updateStatus,
  remove
};

function create(payload) {
  let booking = {
    userId: payload.userId,
    tripId: payload.tripId,
    eventId: payload.eventId,
    orderRefNum: payload.orderRefNum,
    tripDate: payload.tripDate,
    reservationExpiry: payload.reservationExpiry,
    passengersDetail: payload.passengersDetail,
    subtotal: payload.subtotal,
    paymentMethod: payload.paymentMethod,
    paymentMethodCharges: payload.paymentMethodCharges,
    amount: payload.amount,
    billingInfo: payload.billingInfo,
    status: payload.tripStatus,
    paymentDate: payload.paymentDate,
    vendorId: payload.vendorId
  };
  switch (payload.type) {
    case 'trip':
      return Booking.tripBooking.create(booking);
    case 'events':
      return Booking.eventsBooking.create(booking);
    case 'bus':
      let bus = {
        userId: payload.userId,
        booking_id: payload.booking_id,
        reference_booking_id: payload.reference_booking_id,
        service_name: payload.service_name,
        departure_city: payload.departure_city,
        arrival_city: payload.arrival_city,
        departure_date: payload.departure_date,
        departure_time: payload.departure_time,
        total_seats: payload.total_seats,
        seat_numbers_male: payload.seat_numbers_male,
        seat_numbers_female: payload.seat_numbers_female,
        net_amount: payload.net_amount,
        handling_charges: payload.handling_charges,
        discount: payload.discount,
        promocode: payload.promocode,
        promo_discount: payload.promo_discount,
        total_amount: payload.total_amount,
        final_fare: payload.final_fare,
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        city: payload.city,
        address: payload.address
      };
      return Booking.busBooking.create(bus);
    case 'airline':
      let airline = {
        userId: payload.userId,
        universal_locator_code: payload.universal_locator_code ? payload.universal_locator_code : '',
        provider_reservation_info_key: payload.provider_reservation_info_key ? payload.provider_reservation_info_key : '',
        reservation_locator_code: payload.reservation_locator_code ? payload.reservation_locator_code : '',
        owning_pcc: payload.owning_pcc ? payload.owning_pcc : '',
        air_reservation_locator_code: payload.air_reservation_locator_code ? payload.air_reservation_locator_code : '',
        supplier_locator_code: payload.supplier_locator_code ? payload.supplier_locator_code : '',
        air_segment: payload.air_segment ? payload.air_segment : [],
        booking_id: payload.booking_id ? payload.booking_id : '',
        order_ref_id: payload.order_ref_id ? payload.order_ref_id : ''
      };
      return Booking.airlineBooking.create(airline);
    case 'hotel':
      let hotel = {
        userId: payload.userId,
        hotelName: payload.hotelName,
        hotelId: payload.hotelId,
        checkIn: moment(payload.checkIn),
        checkOut: moment(payload.checkOut),
        accomodationId: payload.accomodationId,
        roomId: payload.roomId,
        noOfRooms: payload.noOfRooms
      };
      return Booking.hotelBooking.create(hotel);

    default:
      throw new Error('Invalid Booking type');
  }

}

function updateStatus(payload) {
  let data = {
    status: payload.status
  };
  data = _.omitBy(data, _.isUndefined);
  return Booking.Booking.update({
    _id: payload.bookingId
  }, {
    $set: data
  });
};

function findById(bookingId) {
  let matchObj = { isActive: true };
  if (bookingId) {
    bookingId = mongoose.Types.ObjectId(bookingId);
    matchObj['_id'] = {
      $eq: bookingId
    };
  }
  matchObj = _.omitBy(matchObj, _.isUndefined);
  let pipeline = [
    {
      $match: matchObj
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'users'
      }
    },
    {
      $lookup: {
        from: 'trips',
        localField: 'tripId',
        foreignField: '_id',
        as: 'trips'
      }
    },
    {
      $lookup: {
        from: 'events',
        localField: 'eventId',
        foreignField: '_id',
        as: 'events'
      }
    },
    {
      $unwind: { path: '$users', preserveNullAndEmptyArrays: true }
    },
    {
      $unwind: { path: '$trips', preserveNullAndEmptyArrays: true }
    },
    {
      $unwind: { path: '$events', preserveNullAndEmptyArrays: true }
    },
    {
      $project: {
        _id: '$_id',
        paymentMethodCharges: '$paymentMethodCharges',
        status: '$status',
        isActive: '$isActive',
        type: '$type',
        userId: '$userId',
        tripId: '$tripId',
        eventId: '$eventId',
        eventName: '$events.title',
        eventStartDate: '$events.startDate',
        eventEndDate: '$events.endDate',
        tripName: '$trips.title',
        tripDate: '$tripDate',
        passengersDetail: '$passengersDetail',
        subtotal: '$subtotal',
        paymentMethod: '$paymentMethod',
        amount: '$amount',
        billingInfo: '$billingInfo',
        vendorId: '$vendorId',
        updatedAt: '$updatedAt',
        createdAt: '$createdAt',
        usersProfile: '$users.profile',
        hotelName: '$hotelName'
      }
    }
    // {
    //   $unwind: { path: '$data', preserveNullAndEmptyArrays: true }
    // }
  ];
  return Booking.Booking.aggregate(pipeline).exec()
    .then((response) => {
      return response[0];
    });
}

function remove(payload) {
  let data = {
    isActive: false
  };
  data = _.omitBy(data, _.isUndefined);
  return Booking.Booking.update({
    _id: payload.bookingId
  }, {
    $set: data
  });
};

function findAll(payload) {
  let payloadSkip = payload.skip;
  let payloadPageSize = payload.pageSize;
  if (payload.pageSize === 0) {
    payloadSkip = 0;
    payloadPageSize = { $size: '$data' };
  }

  let matchObj = { isActive: true };
  if (payload.vendorId) {
    payload.vendorId = mongoose.Types.ObjectId(payload.vendorId);
    matchObj['vendorId'] = {
      $eq: payload.vendorId
    };
  }
  if (payload.userId) {
    payload.userId = mongoose.Types.ObjectId(payload.userId);
    matchObj['userId'] = {
      $eq: payload.userId
    };
  }
  if (payload.tripId) {
    payload.tripId = mongoose.Types.ObjectId(payload.tripId);
    matchObj['tripId'] = {
      $eq: payload.tripId
    };
  }
  if (payload.status) {
    matchObj['status'] = {
      $eq: payload.status
    };
  }
  if (payload.type) {
    matchObj['type'] = {
      $eq: payload.type
    };
  }

  matchObj = _.omitBy(matchObj, _.isUndefined);
  let pipeline = [
    {
      $match: matchObj
    },
    {
      $sort: { createdAt: -1 }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'users'
      }
    },
    {
      $lookup: {
        from: 'trips',
        localField: 'tripId',
        foreignField: '_id',
        as: 'trips'
      }
    },
    {
      $lookup: {
        from: 'events',
        localField: 'eventId',
        foreignField: '_id',
        as: 'events'
      }
    },
    {
      $lookup: {
        from: 'hotels',
        localField: 'accomodationId',
        foreignField: '_id',
        as: 'accomodation'
      }
    },
    {
      $unwind: { path: '$users', preserveNullAndEmptyArrays: true }
    },
    {
      $unwind: { path: '$trips', preserveNullAndEmptyArrays: true }
    },
    {
      $unwind: { path: '$events', preserveNullAndEmptyArrays: true }
    },
    {
      $unwind: { path: '$accomodation', preserveNullAndEmptyArrays: true }
    },
    {
      $group: {
        _id: null,
        data: {
          $push: {
            _id: '$_id',
            paymentMethodCharges: '$paymentMethodCharges',
            status: '$status',
            isActive: '$isActive',
            type: '$type',
            userId: '$userId',
            tripId: '$tripId',
            eventId: '$eventId',
            eventName: '$events.title',
            eventStartDate: '$events.startDate',
            eventEndDate: '$events.endDate',
            tripName: '$trips.title',
            tripDate: '$tripDate',
            passengersDetail: '$passengersDetail',
            subtotal: '$subtotal',
            paymentMethod: '$paymentMethod',
            amount: '$amount',
            billingInfo: '$billingInfo',
            vendorId: '$vendorId',
            updatedAt: '$updatedAt',
            createdAt: '$createdAt',
            usersProfile: '$users.profile',
            universal_locator_code: '$universal_locator_code',
            provider_reservation_info_key: '$provider_reservation_info_key',
            reservation_locator_code: '$reservation_locator_code',
            owning_pcc: '$owning_pcc',
            air_reservation_locator_code: '$air_reservation_locator_code',
            supplier_locator_code: '$supplier_locator_code',
            air_segment: '$air_segment',
            booking_id: '$booking_id',
            order_ref_id: '$order_ref_id',
            reference_booking_id: '$reference_booking_id',
            service_name: '$service_name',
            departure_city: '$departure_city',
            arrival_city: '$arrival_city',
            departure_date: '$departure_date',
            departure_time: '$departure_time',
            total_seats: '$total_seats',
            seat_numbers_male: '$seat_numbers_male',
            seat_numbers_female: '$seat_numbers_female',
            net_amount: '$net_amount',
            handling_charges: '$handling_charges',
            discount: '$discount',
            promocode: '$promocode',
            promo_discount: '$promo_discount',
            total_amount: '$total_amount',
            final_fare: '$final_fare',
            name: '$name',
            phone: '$phone',
            email: '$email',
            city: '$city',
            address: '$address',
            accomodation: '$accomodation',
            checkIn: '$checkIn',
            checkOut: '$checkOut',
            noOfRooms: '$noOfRooms',
            roomId: '$roomId',
            hotelName: '$hotelName'

          }
        }
      }
    },
    {
      $project: {
        data: {
          $slice: ['$data', payloadSkip, payloadPageSize]
        },
        total: {
          $size: '$data'
        }
      }
    }
  ];
  return Booking.Booking.aggregate(pipeline).exec()
    .then((response) => {
      response = _.head(response);
      if (!response) {
        response = {
          total: 0,
          data: []
        };
      }
      return response;
    });
}
