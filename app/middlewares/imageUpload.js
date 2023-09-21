'use strict';
const restify = require('restify');
var multer = require('multer');
const config = require('../config');
// const mime = require('mime-types');
const fs = require('fs');
const uploadPath = config.get('photo.upload');
const removePath = config.get('photo.remove');
// const path = require('path');

const { /* MAX_IMAGE_SIZE,*/ MIME_TYPES, NUMBER_OF_IMAGES} = require('../constants/image');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    console.log(uploadPath);
    callback(null, uploadPath);
  },
  filename(req, file, callback) {
    const filename = `${file.fieldname}-${Date.now()}.jpeg`;
    callback(null, filename);
  }
});
const upload = multer({
  storage: storage
});
const imageUpload = upload.fields(NUMBER_OF_IMAGES);

async function imageValidation(req, res, next) {
  const { files } = req;
  const types = MIME_TYPES;
  // const maxSize = MAX_IMAGE_SIZE;

  const keys = Object.keys(files);
  keys.map((key) => {
    files[key].map(item => {
      const { mimetype /* size*/ } = item;

      if (!types.includes(mimetype)) {
        keys.map((keyname) => {
          fs.unlink(files[keyname][0].path, (err) => {
            if (err) throw err;
          });
        });
        return new restify.errors.ForbiddenError(`${mimetype} is not supported`);
      }
      // if (size > maxSize) {
      //   keys.map((keyname) => {
      //     fs.unlink(files[keyname][0].path, (err) => {
      //       if (err) throw err;
      //     });
      //   });
      //   throw new restify.errors.NotFoundError(`image is greater than ${maxSize} bytes`);

      // }
    });

  });

  await next();
}
async function imageRemove(req, res, next) {
  // const dir = path.join(__dirname, '../../uploads/');
  const { params } = req;
  console.log(removePath);
  fs.unlink(`${removePath}/${params.photoId}`, (err) => {
    if (err) throw err;
  });
  await next();
}
module.exports = {
  imageUpload,
  imageValidation,
  imageRemove
};
