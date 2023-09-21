'use strict';

const config = require('../config');
const restify = require('restify');
const MongooseError = require('mongoose').Error;

module.exports = (req, res, body, cb) => {
  let response = {};

  if (body instanceof Error) {
    req.log.error(body);

    if (body instanceof MongooseError) {
      res.statusCode = 412;
    } else if (!(body instanceof restify.HttpError)) {
      res.statusCode = 500;
    }

    response = {
      statusCode: body.statusCode,
      error: {
        name: body.name,
        message: body.message,
        context: body.context,
        stack: body.stack
      }
    };

    if (config.get('env') !== 'development') {
      response.error.stack = undefined;
    }
  } else if (body.data && body.meta) {
    response = {
      statusCode: res.statusCode,
      data: body.data,
      meta: body.meta
    };
  } else if (Buffer.isBuffer(body)) {
    response = { data: body.toString('base64') };
  } else {
    response = {
      statusCode: res.statusCode,
      data: body
    };
  }

  response = JSON.stringify(response);
  return cb(null, response);
};
