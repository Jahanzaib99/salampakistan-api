'use strict';

const moment = require('moment');
const _ = require('lodash');

module.exports = function traceMiddleware(req, res, next) {
  req._startTime = moment().valueOf();

  let payload = !req.body ? null : _.size(JSON.stringify(req.body)) > 1024 ? '--too-large--' : _.cloneDeep(req.body);

  if (_.result(payload, 'password')) {
    payload.password = '--hidden--';
  }

  if (_.result(payload, 'newPassword')) {
    payload.newPassword = '--hidden--';
  }

  function traceRequest() {
    res.removeListener('finish', traceRequest);
    res.removeListener('close', traceRequest);

    let responseTime = moment().valueOf() - req._startTime;
    req.log.info({ payload, req, responseTime }, 'Request');
  }

  res.on('finish', traceRequest);
  res.on('close', traceRequest);

  next();
};
