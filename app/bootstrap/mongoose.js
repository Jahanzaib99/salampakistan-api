'use strict';

const config = require('../config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = (server) => {
  let uri = `mongodb://${config.get('mongodb.host')}:${config.get('mongodb.port')}/${config.get('mongodb.db')}`;
  // let uri = `mongodb+srv://${config.get('mongodb.username')}:${config.get('mongodb.password')}@fma.45lhq.mongodb.net/${config.get('mongodb.db')}?retryWrites=true&w=majority`;
  mongoose.connection.on('open', () => {
    server.log.info(`Database connected: ${uri}`);
  });

  mongoose.connect(uri, {
    // user: config.get('mongodb.username'),
    // pass: config.get('mongodb.password'),
    // useMongoClient: true
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};
