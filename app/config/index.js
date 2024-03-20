'use strict';

const convict = require('convict');
const path = require('path');

let config = convict({
  env: {
    doc: 'Application environment',
    format: ['development', 'staging', 'production'],
    env: 'NODE_ENV',
    default: 'development'
  },
  sendgrid: {
    apiKey: {
      doc: 'SendGrid API Key',
      format: String,
      default: ''
    }
  },
  server: {
    port: {
      doc: 'Port to bind',
      format: 'port',
      default: 5000
    },
    appURL: {
      doc: 'Web-App URL',
      format: String,
      default: 'https://portal.salampakistan.gov.pk'
    }
  },
  mongodb: {
    host: {
      doc: 'Database host name/IP',
      format: String,
      default: '172.19.20.30'
    },
    port: {
      doc: 'Database port',
      format: 'port',
      default: 27017
    },
    db: {
      doc: 'Database name',
      format: String,
      default: 'ptdc'
    },
    username: {
      doc: 'Database username',
      format: String,
      default: 'ptdc'
    },
    password: {
      doc: 'Database password',
      format: String,
      default: 'ptdc'
    }
  },
  newrelic: {
    licenseKey: {
      doc: 'New Relic License Key',
      format: String,
      default: ''
    }
  },
  logs: {
    token: {
      doc: 'Loggly token',
      format: String,
      default: ''
    },
    subdomain: {
      doc: 'Loggly subdomain',
      format: String,
      default: 'ptdc'
    },
    directory: {
      doc: 'Logs directory',
      format: String,
      default: path.join(__dirname, '../logs/')
    }
  },
  token: {
    secret: {
      doc: 'Token secret key',
      format: String,
      default: 'SomeSecretKey'
    },
    auth: {
      expiresIn: {
        doc: 'Token expiry time (Auth)',
        format: 'duration',
        default: '1 day'
      }
    }
  },
  azureStorage: {
    accountName: {
      doc: 'Azure Storage Account Name',
      format: String,
      default: ''
    },
    accessKey: {
      doc: 'Azure Storage Access Key',
      format: String,
      default: ''
    }
  },
  bookMe: {
    api_key: {
      doc: 'bookMe Api Key',
      format: String,
      default: ''
    },
    Authorization: {
      doc: 'bookMe Authorization',
      format: String,
      default: ''
    }
  },
  photo: {
    upload: {
      doc: 'Upload Route',
      format: String,
      // default: path.join(__dirname, '../../../../../../mnt/data/pictures/')
      default: path.join(__dirname, '../../../../pictures/')
    },
    remove: {
      doc: 'Remove Route',
      format: String,
      // default: path.join(__dirname, '../../../../../../mnt/data/pictures/')
      default: path.join(__dirname, '../../../../pictures/')
    }
  }
});

// Load environment dependent configuration
// config.loadFile(path.join(__dirname, './' + process.env.NODE_ENV + '.json'));
config.loadFile(path.join(__dirname, './development.json'));

config.BOOK_ME_URL = 'https://bookme.pk/REST/API';
config.BOOK_ME_URL_HOTELS = 'https://bookme.pk/api/v1';

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;

