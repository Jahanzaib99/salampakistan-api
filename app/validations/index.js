'use strict';

const validator = require('revalidator');
const imageSize = require('image-size');
const restify = require('restify');
const _ = require('lodash');
const rules = require('./rules');

module.exports = {
  validateImage,
  validatePayload,
  rules
};

function validateImage(photoBase64, schema) {
  let defaultError = 'Image validation error.';

  return new Promise((resolve) => {
    let errors = [];

    let buffer = new Buffer(photoBase64, 'base64');

    if (schema.fileSize > 0 && buffer.fileSize > schema.fileSize) {
      errors.push(schema.messages.fileSize || defaultError);
    }

    let dimension = imageSize(buffer);
    let ratio = dimension.width / dimension.height;

    if (schema.ratio && schema.ratio + 0.001 < ratio && schema.ratio - 0.001 > ratio) {
      errors.push(schema.messages.ratio || defaultError);
    }

    if (schema.minWidth && schema.minWidth > dimension.width) {
      errors.push(schema.messages.minWidth || defaultError);
    }

    if (schema.maxWidth && schema.maxWidth < dimension.width) {
      errors.push(schema.messages.maxWidth || defaultError);
    }

    if (schema.minHeight && schema.minHeight > dimension.height) {
      errors.push(schema.messages.minHeight || defaultError);
    }

    if (schema.maxHeight && schema.maxHeight < dimension.height) {
      errors.push(schema.messages.maxHeight || defaultError);
    }

    let imageType = _.isString(schema.imageType) ? [schema.imageType] : schema.imageType;
    if (_.isArray(imageType) && !_.includes(imageType, dimension.type)) {
      errors.push(schema.messages.imageType || defaultError);
    }

    if (errors.length > 0) {
      throw new restify.errors.BadRequestError(errors[0]);
    }

    return resolve(buffer);
  });
}

function validatePayload(payload, schema) {
  return new Promise((resolve) => {
    _validateSchema(schema);

    let result = validator.validate(payload, schema);

    if (!result.valid) {
      throw new restify.errors.BadRequestError(result.errors[0]);
    }

    return resolve(payload);
  });
}

function _validateSchema(schema, parents) {
  parents = parents || [];

  _.each(schema, (value, key) => {
    if (value === undefined) {
      parents.push(key);
      let breadcrumb = parents.join(' > ');
      throw new ReferenceError(`${breadcrumb} in rules is not defined`);
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      parents.push(key);
      _validateSchema(value, parents);
      parents.pop();
    }
  });
}
