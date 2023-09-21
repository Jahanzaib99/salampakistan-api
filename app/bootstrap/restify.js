'use strict';

const restify = require('restify');
const util = require('util');
const cors = require('cors');
const trace = require('../middlewares/trace');
const pagination = require('../middlewares/pagination');

module.exports = (server) => {
  server.pre(cors());
  server.use(restify.fullResponse());
  server.use(restify.queryParser({ mapParams: false }));
  // server.use(restify.bodyParser({
  //   mapParams: false,
  //   uploadDir: '/var/tmp/'

  // }));
  server.use(restify.jsonBodyParser());
  server.use(restify.requestLogger(), trace);
  server.use(pagination);
};

function ContextError(error, context) {
  restify.RestError.call(this, {
    restCode: error.body.code,
    statusCode: error.statusCode,
    message: error.message,
    constructorOpt: ContextError
  });
  this.name = error.body.code;
  this.context = context;
}

util.inherits(ContextError, restify.RestError);
restify.ContextError = ContextError;
