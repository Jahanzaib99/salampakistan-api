'use strict';

const config = require('./app/config');

/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  app_name: ['PTDC-API'],
  agent_enabled: config.get('env') !== 'development',
  license_key: config.get('newrelic.licenseKey'),
  logging: {
    level: 'info'
  },
  error_collector: {
    ignore_status_codes: [400, 401, 403, 404, 409]
  }
};
