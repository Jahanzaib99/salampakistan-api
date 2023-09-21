'use strict';

const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');
const timestamps = require('mongoose-timestamp');
const enums = require('../enums');

const options = { discriminatorKey: 'type' };

let schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  status: { type: String, default: enums.booking.status.new },
  isActive: { type: Boolean, default: true }
}, options);
schema.plugin(timestamps);

let tripSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.ObjectId, ref: 'Trip' },
  orderRefNum: Number,
  tripDate: Number,
  reservationExpiry: Number,
  passengersDetail: [
    {
      _id: false,
      fullName: String,
      mobile: String,
      email: String,
      idCard: String,
      isChild: Boolean,
      noOfAdults: Number,
      noOfChildren: Number
    }
  ],
  subtotal: Number,
  paymentMethod: { type: String, default: enums.booking.status.paymentMethod },
  paymentMethodCharges: { type: Number, default: 0 },
  amount: Number,
  billingInfo: {
    address: String,
    city: String
  },
  paymentDate: Number,
  vendorId: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, options);

let eventsSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.ObjectId, ref: 'Events' },
  orderRefNum: Number,
  tripDate: Number,
  reservationExpiry: Number,
  passengersDetail: [
    {
      _id: false,
      fullName: String,
      mobile: String,
      email: String,
      idCard: String,
      isChild: Boolean,
      noOfAdults: Number,
      noOfChildren: Number
    }
  ],
  subtotal: Number,
  paymentMethod: { type: String, default: enums.booking.status.paymentMethod },
  paymentMethodCharges: { type: Number, default: 0 },
  amount: Number,
  billingInfo: {
    address: String,
    city: String
  },
  paymentDate: Number,
  vendorId: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, options);

let busSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  booking_id: String,
  reference_booking_id: String,
  service_name: String,
  departure_city: String,
  arrival_city: String,
  departure_date: String,
  departure_time: String,
  total_seats: String,
  seat_numbers_male: String,
  seat_numbers_female: String,
  net_amount: Number,
  handling_charges: Number,
  discount: Number,
  promocode: String,
  promo_discount: Number,
  total_amount: Number,
  final_fare: Number,
  name: String,
  phone: String,
  email: String,
  city: String,
  address: String
}, options);

let airlineSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  universal_locator_code: String,
  status: String,
  provider_reservation_info_key: String,
  reservation_locator_code: String,
  owning_pcc: String,
  air_reservation_locator_code: String,
  supplier_locator_code: String,
  air_segment: Array,
  booking_id: String,
  order_ref_id: String

}, options);

let hotelSchema = new mongoose.Schema({
  checkIn: Number,
  checkOut: Number,
  hotelId: String,
  hotelName: String,
  accomodationId: { type: mongoose.Schema.ObjectId, ref: 'hotels'},
  roomId: { type: mongoose.Schema.ObjectId, ref: 'hotels'},
  noOfRooms: Number
}, options);

const Booking = mongoose.model('Booking', schema);
const tripBooking = Booking.discriminator('tripBooking', tripSchema);
const eventsBooking = Booking.discriminator('eventsBooking', eventsSchema);
const busBooking = Booking.discriminator('busBooking', busSchema);
const airlineBooking = Booking.discriminator('airlineBooking', airlineSchema);
const hotelBooking = Booking.discriminator('hotelBooking', hotelSchema);

// module.exports = mongoose.model('Booking', schema);
module.exports = {
  Booking: Booking,
  tripBooking: tripBooking,
  eventsBooking: eventsBooking,
  busBooking: busBooking,
  airlineBooking: airlineBooking,
  hotelBooking: hotelBooking
};
