'use strict';

const repos = require('../repositories');
const helpers = require('../helpers');
const restify = require('restify');
const validations = require('../validations');
const messages = require('../messages');
// const enums = require('../enums');
const stringSimilarity = require('string-similarity');
const _ = require('lodash');
const { hotelCity } = require('../constants/bookMe');
// const { objectId } = require('../validations/rules');
// const { expect } = require('chai');
// const enums = require('../enums');
// const trip = require('../enums/trip');
// const moment = require('moment');
// const moment = require('moment-timezone');
// const util = require('util');
// const pipeConstant = require('../constants/pipedrive');
// let ObjectId = require('mongoose').Types.ObjectId;
// const constants = require('../constants');

module.exports = {
  search,
  detail,
  create,
  update,
  remove,
  get,
  addRoom,
  removeRoom,
  updateRoom,
  uploadRoomPhotos,
  removeRoomPhotos,
  updateStatus
};

async function search(payload) {
  let finalResponse = [];
  let searchedCityName = [];
  payload.body = {
    dep_date: payload.dep_date,
    return_date: payload.return_date,
    no_of_adults: payload.no_of_adults,
    no_of_children: payload.no_of_children,
    no_of_infants: payload.no_of_infants,
    rooms: payload.rooms
  };
  if (payload.cityName) {
    _.each(hotelCity, function(data) {
      searchedCityName.push(data.city_name.toLowerCase());
    });
    let matches = stringSimilarity.findBestMatch(((payload.cityName.replace(/%20/g, ' ')).toLowerCase()), searchedCityName);
    if (matches.bestMatch.rating > 0.7) {
      payload.cityName = matches.bestMatch.target;
    }
    _.each(hotelCity, function(data) {
      if (payload.cityName && (data.city_name).toLowerCase() === ((payload.cityName).replace(/%20/g, ' ')).toLowerCase()) {
        payload.body.to = data.id;
      };
    });
  }
  payload.httpMethod = 'post';
  payload.convert = false;
  payload.endpoint = 'hotel-search';
  let hotelSearch = await helpers.bookMe.fetchHotelData(payload);
  let get = await repos.hotel.get(payload);
  let adjustListResponse = await helpers.hotel.adjustListResponse(get);
  if (hotelSearch.status) {
    for (let i = 0; i < hotelSearch.data.length; i++) {
      let hotel = hotelSearch.data[i];
      hotel = {
        hotelRefId: hotel.hotelRefId ? hotel.hotelRefId : '',
        hotelId: hotel._id,
        AccommodationTypeName: hotel.hotelInfo.AccommodationTypeName,
        hotelName: hotel.hotelInfo.Name,
        hotelSource: hotel.hotelInfo.HotelSource,
        currencyCode: hotel.hotelInfo.CurrencyCode,
        hotelLocation: hotel.hotelInfo.HotelLocation,
        // description: hotel.hotelInfo.Description,
        roomsLeft: parseInt(hotel.hotelInfo.rooms_left, 10),
        images: hotel.hotelInfo.multi_images,
        featuredImage: hotel.hotelInfo.Image,
        addressInfo: hotel.addressInfo.address.streetInfo,
        rating: hotel.hotelRating.rating,
        hotelAmenities: Object.values(hotel.hotelAmenities),
        overview: hotel.overview ? hotel.overview : '',
        minimumRate: parseInt((hotel.hotelRateInfo.MinimumAmount).split('R')[1], 10),
        cancellationPolicyType: hotel.hotelInfo.cancellation_policy_type,
        // maximumAmount: hotel.hotelRateInfo.MaximumAmount,
        maximumRate: parseInt((hotel.hotelRateInfo.MaximumAmount).split('R')[1], 10),
        // changedRate: hotel.hotelRateInfo.changedRate,
        discountedRate: hotel.sortByPrice
        // priceStartingFrom: hotel.hotelRateInfo.priceStartingFrom,
        // sortByPrice: hotel.sortByPrice
      };
      await finalResponse.push(hotel);
    }
  }
  finalResponse = finalResponse.concat(adjustListResponse.data);
  let count = finalResponse.length;
  // sort by price or rating
  if (payload.sortBy && payload.sortBy !== '' && finalResponse && finalResponse.length > 0) {
    if (payload.sortBy === 'price') {
      finalResponse = _.sortBy(finalResponse, 'discountedRate');
    } else if (payload.sortBy === '-price') {
      finalResponse = _.sortBy(finalResponse, 'discountedRate').reverse();
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
    data: {
      Hotels: finalResponse,
      refId: hotelSearch.ref_id
    },
    meta: {
      pageSize: payload.pageSize,
      skip: payload.skip,
      total: count
    }
  });
}

async function detail(payload) {
  let hotelDetails;
  if (payload.hotelSource === 'bookme') {
    payload.body = {
      refId: payload.refId,
      hotelRefId: payload.hotelRefId,
      checkin_date: payload.checkin_date,
      checkout_date: payload.checkout_date,
      no_of_adults: payload.no_of_adults,
      rooms: payload.rooms
    };
    payload.httpMethod = 'post';
    payload.convert = false;
    payload.endpoint = 'hotel-details';
    hotelDetails = await helpers.bookMe.fetchHotelData(payload);
    if (!hotelDetails.status) {
      throw new restify.errors.ConflictError(hotelDetails.message);
    }
    return hotelDetails.data;
  } else {
    hotelDetails = await repos.hotel.findById(payload.hotelId);
    if (!hotelDetails) {
      throw new restify.errors.ConflictError('Something Went Wrong');
    }
    // get hotel photos urls
    let adjustDetailResponse = await helpers.hotel.adjustDetailResponse(hotelDetails);

    let RoomDetail = [];
    if (hotelDetails.rooms && hotelDetails.rooms.length > 0) {

      hotelDetails.rooms.forEach(async(room) => {
        // got room photos urls
        await helpers.hotel.adjustDetailResponse(room);
        let roomObje = {
          RoomDetails: {},
          ratePlanInfo: []
        };
        roomObje.RoomDetails.RoomId = room._id;
        roomObje.RoomDetails.RoomName = room.RoomName;
        roomObje.RoomDetails.HotelSource = room.HotelSource;
        roomObje.RoomDetails.RoomDescription = room.RoomDescription;
        roomObje.RoomDetails.RoomSize = room.RoomSize;
        roomObje.RoomDetails.BedSize = room.BedSize;
        roomObje.RoomDetails.RoomFacilityName = room.RoomFacilityName;

        if (payload.checkin_date && payload.checkout_date) {
          let date1 = new Date(payload.checkin_date);
          let date2 = new Date(payload.checkout_date);
          roomObje.RoomDetails.nights = new Date(date2.getTime() - date1.getTime()).getUTCDate();
          // roomObje.RoomDetails.nights = dif.getUTCDate();
        }
        roomObje.RoomDetails.roomImages = room.photos ? room.photos : [];

        if (payload.checkin_date && payload.checkout_date) {

          // rate plan calculation
          let date1 = new Date(payload.checkin_date);
          let date2 = new Date(payload.checkout_date);
          let dif = new Date(date2.getTime() - date1.getTime()).getUTCDate();
          let ratePlan = {
            RatePlanId: '1',
            RatePlanName: 'Best Available Rate',
            RefundStatus: room.RefundStatus,
            MaxPerson: room.MaxPerson,
            NoOfRoomsAvailable: room.NoOfRoomsAvailable,
            ratePerDate: [],
            ratePriceInfo: {
              nights: dif,
              totalPrice: room.Rate * dif,
              originalPrice: room.Rate * dif,
              changedPrice: room.Rate * dif,
              totalTax: [
                {
                  TaxSorting: 0,
                  TaxId: 1,
                  TaxTypeId: 2,
                  TaxName: 'G.S.T',
                  TaxType: room.taxApplicable ? 'Included' : 'Excluded',
                  TaxPriceMode: 'Percent',
                  TaxValue: room.taxPercentage,
                  TaxChargeType: 'Gross Amount',
                  TaxChargeTypeId: 1
                }
              ],
              totalPriceWithTax: ((room.taxPercentage / 100) * (room.Rate * dif)) + room.Rate * dif,
              orignalPriceWithTax: ((room.taxPercentage / 100) * (room.Rate * dif)) + room.Rate * dif,
              priceStartingFrom: room.Rate,
              sortByPrice: room.Rate,
              currency: 'PKR',
              orignalCurrency: 'PKR'
            }
          };
          let incrementalDate = payload.checkin_date;
          for (let i = 0; i < dif; i++) {
            ratePlan.ratePerDate.push({
              Date: incrementalDate,
              Rate: room.Rate,
              ConvertedRate: room.Rate
            });
            incrementalDate = new Date(incrementalDate);
            incrementalDate.setDate(incrementalDate.getDate() + 1);
            incrementalDate = incrementalDate.toISOString().slice(0, 10);
          }
          roomObje.ratePlanInfo.push(ratePlan);
        }

        RoomDetail.push(roomObje);
      });
    }
    let modifiedData = {
      hotelDetails: {
        basicInfo: {
          AccommodationId: hotelDetails._id,
          Name: hotelDetails.hotelName,
          HotelLocation: hotelDetails.location.alias,
          Description: hotelDetails.description,
          NearbyAreas: '',
          AreaOfInterest: hotelDetails.description,
          EmailId: hotelDetails.email,
          Website: '',
          Rating: hotelDetails.averageRating,
          Currency: 'PKR'

        },
        hotelRating: {
          rating: hotelDetails.averageRating
        }
      },
      addressInfo: {
        address: {
          CoordinateLocation: {
            Latitude: hotelDetails.location.location.coordinates[0],
            Longitude: hotelDetails.location.location.coordinates[1]
          }
        },
        streetInfo: ''
      },
      contactInfo: [
        {
          Type: 'Business',
          Number: hotelDetails.mobile
        },
        {
          Type: 'Fax',
          Number: hotelDetails.mobile
        }
      ],
      checkInInfo: {
        CheckInTime: hotelDetails.checkin,
        CheckOutTime: hotelDetails.checkin,
        CheckInDate: payload.checkin_date ? payload.checkin_date : '',
        CheckOutDate: payload.checkout_date ? payload.checkout_date : ''
      },
      amenities: hotelDetails.hotelAmenities,
      HotelRateDetail: RoomDetail,
      media: []
    };

    // add media
    if (adjustDetailResponse.photos && adjustDetailResponse.photos.length > 0) {
      _.forEach(adjustDetailResponse.photos, (photo) => {
        modifiedData.media.push({ 'url': photo });
      });
    }
    if (payload.usageSource === 'web') {
      return modifiedData;
    } else {
      return hotelDetails;
    }
  }
}

async function create(payload) {
  await validations.validatePayload(payload, {
    properties: {
    }
  });
  let findById = await repos.user.findById(payload.auth.userId);
  if (!findById) {
    throw new restify.errors.NotFoundError(messages.user.notFound);
  }

  // if (payload.checkin >= payload.checkout) {
  //   throw new restify.errors.ForbiddenError('Hotel check out time must be greater than check in time.');
  // }

  let create = await repos.hotel.create(payload);
  if (!create) {
    throw new restify.errors.ConflictError('Something Went Wrong!');
  }
  return ({
    message: messages.hotel.success,
    id: create._id
  });
}

async function update(payload) {
  await validations.validatePayload(payload, {
    properties: {
      accommodationsId: validations.rules.objectId
    }
  });
  let findById = await repos.user.findById(payload.auth.userId);
  if (!findById) {
    throw new restify.errors.NotFoundError(messages.user.notFound);
  }
  let findByIdHotel = await repos.hotel.findById(payload.accommodationsId);
  if (!findByIdHotel) {
    throw new restify.errors.NotFoundError(messages.hotel.notFound);
  }

  // if (payload.checkin >= payload.checkout) {
  //   throw new restify.errors.ForbiddenError('Hotel check out time must be greater than check in time.');
  // }

  let update = await repos.hotel.update(payload);
  if (!update) {
    throw new restify.errors.ConflictError('Something Went Wrong!');
  }
  return ({
    message: messages.hotel.update,
    id: update._id
  });
}

async function remove(payload) {
  await validations.validatePayload(payload, {
    properties: {
      accommodationsId: validations.rules.objectId
    }
  });
  let findById = await repos.user.findById(payload.auth.userId);
  if (!findById) {
    throw new restify.errors.NotFoundError(messages.user.notFound);
  }
  let findByIdHotel = await repos.hotel.findById(payload.accommodationsId);
  if (!findByIdHotel) {
    throw new restify.errors.NotFoundError(messages.hotel.notFound);
  }
  let remove = await repos.hotel.remove(payload);
  if (!remove) {
    throw new restify.errors.ConflictError('Something Went Wrong!');
  }
  return ({
    message: messages.hotel.delete
  });
}

async function get(payload) {
  await validations.validatePayload(payload, {
    properties: {
    }
  });
  let findById = await repos.user.findById(payload.auth.userId);
  if (!findById) {
    throw new restify.errors.NotFoundError(messages.user.notFound);
  }
  let get = await repos.hotel.get(payload);
  if (!get) {
    throw new restify.errors.NotFoundError(messages.hotel.notFound);
  }

  return ({
    data: get.data,
    meta: {
      pageSize: payload.pageSize,
      skip: payload.skip,
      total: get.total
    }
  });
}

async function addRoom(payload) {
  await validations.validatePayload(payload, {
    properties: {
    }
  });
  let findById = await repos.user.findById(payload.auth.userId);
  if (!findById) {
    throw new restify.errors.NotFoundError(messages.user.notFound);
  }
  let findByIdHotel = await repos.hotel.findById(payload.accommodationsId);
  if (!findByIdHotel) {
    throw new restify.errors.NotFoundError(messages.hotel.notFound);
  }

  findByIdHotel.rooms.push(payload);
  let addRoom = await repos.hotel.addRoom(findByIdHotel);
  if (!addRoom) {
    throw new restify.errors.ConflictError('Something Went Wrong!');
  }
  findByIdHotel = await repos.hotel.findById(payload.accommodationsId);
  if (!findByIdHotel) {
    throw new restify.errors.NotFoundError(messages.hotel.notFound);
  }
  return ({
    message: messages.hotel.roomAdd,
    id: findByIdHotel.rooms[findByIdHotel.rooms.length - 1]._id
  });
}

async function removeRoom(payload) {
  await validations.validatePayload(payload, {
    properties: {
    }
  });
  let findById = await repos.user.findById(payload.auth.userId);
  if (!findById) {
    throw new restify.errors.NotFoundError(messages.user.notFound);
  }

  // find a hotel
  let findByIdHotel = await repos.hotel.findById(payload.accommodationsId);
  if (!findByIdHotel) {
    throw new restify.errors.NotFoundError(messages.hotel.notFound);
  }
  // find a room inside a hotel
  const findByIdRoom = findByIdHotel.rooms.id(payload.roomId);
  if (!findByIdRoom) {
    throw new restify.errors.NotFoundError(messages.hotel.roomNotFound);
  }
  // remove a room from a hotel
  findByIdHotel.rooms.id(payload.roomId).remove();

  // save updated hotel after removing a room
  return findByIdHotel.save()
    .then((data) => {
      return ({
        message: messages.hotel.roomRemoved
      });
    })
    .catch(() => {
      throw new restify.errors.ConflictError('Something Went Wrong!');
    });
}

async function updateRoom(payload) {
  await validations.validatePayload(payload, {
    properties: {
    }
  });
  let findById = await repos.user.findById(payload.auth.userId);
  if (!findById) {
    throw new restify.errors.NotFoundError(messages.user.notFound);
  }

  // find a hotel
  let findByIdHotel = await repos.hotel.findById(payload.accommodationsId);
  if (!findByIdHotel) {
    throw new restify.errors.NotFoundError(messages.hotel.notFound);
  }
  // find a room inside a hotel
  const findByIdRoom = findByIdHotel.rooms.id(payload.roomId);
  if (!findByIdRoom) {
    throw new restify.errors.NotFoundError(messages.hotel.roomNotFound);
  }

  findByIdHotel.rooms.id(payload.roomId).RoomName = payload.RoomName;
  findByIdHotel.rooms.id(payload.roomId).HotelSource = payload.HotelSource;
  findByIdHotel.rooms.id(payload.roomId).RoomDescription = payload.RoomDescription;
  findByIdHotel.rooms.id(payload.roomId).RoomSize = payload.RoomSize;
  findByIdHotel.rooms.id(payload.roomId).BedSize = payload.BedSize;
  findByIdHotel.rooms.id(payload.roomId).NoOfRoomsAvailable = payload.NoOfRoomsAvailable;
  findByIdHotel.rooms.id(payload.roomId).MaxPerson = payload.MaxPerson;
  findByIdHotel.rooms.id(payload.roomId).RoomFacilityName = payload.RoomFacilityName;
  findByIdHotel.rooms.id(payload.roomId).Rate = payload.Rate;
  findByIdHotel.rooms.id(payload.roomId).discountedRate = payload.discountedRate;
  findByIdHotel.rooms.id(payload.roomId).RefundStatus = payload.RefundStatus;
  findByIdHotel.rooms.id(payload.roomId).taxApplicable = payload.taxApplicable;
  findByIdHotel.rooms.id(payload.roomId).taxPercentage = payload.taxPercentage;

  // save updated room
  return findByIdHotel.save()
    .then((data) => {
      return ({
        message: messages.hotel.roomUpdated
      });
    })
    .catch((err) => {
      console.log(err);
      throw new restify.errors.ConflictError('Something Went Wrong!');
    });

}

async function uploadRoomPhotos(payload) {
  let photoId;

  await validations.validatePayload(payload, {
    properties: {
    }
  });
  let findById = await repos.user.findById(payload.auth.userId);
  if (!findById) {
    throw new restify.errors.NotFoundError(messages.user.notFound);
  }

  // find a hotel
  let findByIdHotel = await repos.hotel.findById(payload.accommodationsId);
  if (!findByIdHotel) {
    throw new restify.errors.NotFoundError(messages.hotel.notFound);
  }
  // find a room inside a hotel
  const findByIdRoom = findByIdHotel.rooms.id(payload.roomId);
  if (!findByIdRoom) {
    throw new restify.errors.NotFoundError(messages.hotel.roomNotFound);
  }
  // let photo = await helpers.photo.upload(new Buffer(payload.photo, 'base64'), constants.photo.tagsPhoto, constants.photo.tagsThumbnail, constants.photo.resize.false);
  // (findByIdHotel.rooms.id(payload.roomId).photoIds).push(photo);
  photoId = payload.photo[0].filename;
  console.log(photoId);
  findByIdHotel.rooms.id(payload.roomId).photoIds = photoId;

  // save updated room
  return findByIdHotel.save()
    .then(() => {
      return ({
        id: photoId,
        photo: helpers.photo.getURL(photoId, false),
        thumbnail: helpers.photo.getURL(photoId, true),
        message: messages.hotel.roomPhotoUploaded
      });
    })
    .catch((err) => {
      console.log(err);
      throw new restify.errors.ConflictError('Something Went Wrong!');
    });

}

async function removeRoomPhotos(payload) {
  await validations.validatePayload(payload, {
    properties: {
    }
  });
  // let findById = await repos.user.findById(payload.auth.userId);
  // if (!findById) {
  //   throw new restify.errors.NotFoundError(messages.user.notFound);
  // }

  // find a hotel
  let findByIdHotel = await repos.hotel.findById(payload.accommodationsId);
  if (!findByIdHotel) {
    throw new restify.errors.NotFoundError(messages.hotel.notFound);
  }
  // find a room inside a hotel
  const findByIdRoom = findByIdHotel.rooms.id(payload.roomId);
  if (!findByIdRoom) {
    throw new restify.errors.NotFoundError(messages.hotel.roomNotFound);
  }

  if (findByIdRoom.photoIds.indexOf(payload.photoId) < 0) {
    throw new restify.errors.ForbiddenError('Invalid PhotoId');
  }
  findByIdRoom.photoIds.pull(payload.photoId);

  // save updated room
  return findByIdHotel.save()
    .then(() => {
      return ({
        message: messages.hotel.roomPhotoRemoved
      });
    })
    .catch((err) => {
      console.log(err);
      throw new restify.errors.ConflictError('Something Went Wrong!');
    });
}

function updateStatus(payload) {

  return validations.validatePayload(payload, {
    properties: {
      accommodationsId: validations.rules.objectId,
      status: validations.rules.accommodationStatus
    }
  })
    .then(repos.hotel.findById.bind(this, payload.accommodationsId))
    .then((hotel) => {
      if (!hotel) {
        throw new restify.errors.ConflictError(messages.hotel.notFound);
      }
      return repos.hotel.updateStatus(payload);
    })
    .then((response) => {
      return Promise.resolve({
        message: messages.hotel.updateStatus
      });
    });

}
