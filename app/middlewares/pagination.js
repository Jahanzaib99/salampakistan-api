'use strict';

const _ = require('lodash');

const paginationDefaults = {
  pageSize: 5,
  skip: 0
};

// Casts pagination related query params to integer
module.exports = (req, res, next) => {
  let checks = _.keys(paginationDefaults);

  _.each(checks, (check) => {
    let convert = parseInt(+req.query[check], 10);
    req.query[check] = _.isNaN(convert) || _.lt(convert, 0) ? paginationDefaults[check] : convert;
  });

  if (req.query.pageSize) {
    req.query.pageSize = _.clamp(req.query.pageSize, 0, 30);
  }

  next();
};
