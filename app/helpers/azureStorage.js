'use strict';

const azure = require('azure-storage');
const url = require('url');
const config = require('../config');

module.exports = {
  createBlob,
  getBlobURL,
  deleteBlob,
  createBlobFile
};

const protocol = 'https';
const accountName = config.get('azureStorage.accountName');
const accessKey = config.get('azureStorage.accessKey');
const blobEndpoint = `https://${accountName}.blob.core.windows.net/`;

const blobSvc = azure.createBlobService(`DefaultEndpointsProtocol=${protocol};AccountName=${accountName};AccountKey=${accessKey};BlobEndpoint=${blobEndpoint}`);

function createBlob(containerName, blobName, data) {
  return new Promise((resolve, reject) => {
    blobSvc.createBlockBlobFromText(containerName, blobName, data, (err, result) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
}

function getBlobURL(containerName, blobName) {
  return url.resolve(blobEndpoint, `${containerName}/${blobName}`);
}

function deleteBlob(containerName, blobName) {
  return new Promise((resolve, reject) => {
    blobSvc.deleteBlob(containerName, blobName, (err, result) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
}

function createBlobFile(containerVideos, name, path, options) {

  return new Promise((resolve, reject) => {
    blobSvc.createBlockBlobFromLocalFile(containerVideos, name, path, options, (err, result) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
}
