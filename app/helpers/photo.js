'use strict';

// const { reject } = require('lodash');
const uuid = require('node-uuid');
// const sharp = require('sharp');
const storage = require('./azureStorage');
// const constants = require('../constants');

// const containerPhotos = 'photos';
// const containerThumbnails = 'thumbnails';
const containerPTDCPhotos = 'ptdc-photos';
const containerPTDCThumbnails = 'ptdc-thumbnails';
module.exports = {
  upload,
  getURL,
  remove
};

function upload(photoBuffer, dimension, dimensionThumbnail, resize) {
  let blobName = uuid.v4();
  return new Promise((resolve, reject) => {
    if (resize) {
      resolve(Promise.all([
        // dimension ? _resize(dimension.width, dimension.height) : Promise.resolve(photoBuffer),
        // dimensionThumbnail ? _resize(dimensionThumbnail.width, dimensionThumbnail.height) : _resize(constants.photo.defaultThumbnail.width, constants.photo.defaultThumbnail.height)
      ]));
    } else {
      resolve(Promise.all([
        Promise.resolve(photoBuffer),
        Promise.resolve(photoBuffer)
      ]));
    }
  })
    .then((data) => {
      return Promise.all([
        storage.createBlob(containerPTDCPhotos, blobName, data[0]),
        storage.createBlob(containerPTDCThumbnails, blobName, data[1])
      ]);
    })
    .then(() => {
      return Promise.resolve(blobName);
    });

  // function _resize(width, height) {
  //   return new Promise((resolve, reject) => {
  //     // sharp(photoBuffer)
  //       // .resize(width, height)
  //       .toBuffer((err, buffer) => {
  //         if (err) {
  //           return reject(err);
  //         }
  //         return resolve(buffer);
  //       });
  //   });
  // }
}

function getURL(blobName, thumbnail) {
  // return storage.getBlobURL(thumbnail ? containerPTDCThumbnails : containerPTDCPhotos, blobName);
  // return `http://localhost:5000/${blobName}`;
  return `https://api.salampakistan.gov.pk/${blobName}`;
}

function remove(blobName) {
  return Promise.all([
    storage.deleteBlob(containerPTDCPhotos, blobName),
    storage.deleteBlob(containerPTDCThumbnails, blobName)
  ])
    .then(() => {
      return Promise.resolve(true);
    });
}
