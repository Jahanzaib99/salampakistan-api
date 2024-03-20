'use strict';
const dotenv = require('dotenv');
dotenv.config();
require('newrelic');

const config = require('./config');
const restify = require('restify');
const restifyRdirect = require('restify-redirect');
const log = require('./bootstrap/log');
const scheduler = require('./schedulers/scheduler.js');
const path = require('path');

let server = restify.createServer({
  name: 'PTDC-API',
  log: log,
  formatters: {
    'application/json': require('./formatters/json')
  }
});
require('./bootstrap/restify')(server);
require('./bootstrap/mongoose')(server);
server.use(restifyRdirect());
require('./routes')(server);

server.get(/\/apidoc\/?.*/, restify.serveStatic({
  directory: __dirname,
  default: 'index.html'
}));

server.get(/\/web\/?.*/, restify.serveStatic({
  directory: __dirname,
  default: 'index.html'
}));

server.get(/(^\/$)|(\.(html|js|css|scss|png|jpg|gif|svg|tff|otf|eot|woff|woff2)$)/, restify.serveStatic({
  directory: 'app/web',
  default: 'index.html'
}));

server.get(
  /\/(.*)?.*/,
  restify.plugins.serveStatic({
    directory: path.join(__dirname, '../../../pictures/')
  })
);

server.listen(process.env.PORT || config.get('server.port'), () => {
  server.log.info('%s listening at %s', server.name, server.url);
  scheduler.executeScheduler();

});

process.on('unhandledRejection', (err) => {
  server.log.error(err);
});
