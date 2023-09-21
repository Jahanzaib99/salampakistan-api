'use strict';

let mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
let ObjectId = mongoose.Schema.ObjectId;
const constants = require('../constants');

const options = { discriminatorKey: 'type' };

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});
let tagsSchema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true },
  alias: { type: String },
  slug: { type: String, sparse: true },
  url: { type: String },
  photoIds: [],
  // isDomestic: { type: Boolean },
  isActive: { type: Boolean, default: true },
  location: {
    type: pointSchema,
    required: true
  },
  createdBy: {
    type: ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: ObjectId,
    ref: 'User'
  }
}, options);
tagsSchema.plugin(timestamps);

let startingLocationsSchema = new mongoose.Schema({}, options);
let othersSchema = new mongoose.Schema({}, options);
let servicesSchema = new mongoose.Schema({}, options);
let equipmentsSchema = new mongoose.Schema({}, options);
// let facilitiesSchema = new mongoose.Schema({}, options);

const Tag = mongoose.model('tags', tagsSchema);
const StartingLocation = Tag.discriminator(constants.tag.type.startingLocation, startingLocationsSchema);
const Other = Tag.discriminator(constants.tag.type.others, othersSchema);
const Service = Tag.discriminator(constants.tag.type.service, servicesSchema);
const Equipment = Tag.discriminator(constants.tag.type.equipment, equipmentsSchema);
// const Facility = Tag.discriminator(constants.tag.type.facility, facilitiesSchema);

module.exports = {
  self: Tag,
  StartingLocation: StartingLocation,
  Other: Other,
  Service: Service,
  Equipment: Equipment
  // Facility: Facility
};
