'use strict';

require('dotenv').config();
require('./models');

const debug = require('debug')('index');
const http = require('http');

const app = require('./config/app');
const config = require('./config/config');

const server = http.createServer(app);

server.listen(config.PORT);
server.on('listening', () => {
  debug(`Server started on port ${config.PORT} in ${config.NODE_ENV} mode`);
  console.log(
    `Server started on port ${config.PORT} in ${config.NODE_ENV} mode`
  );
});
server.on('error', () => {
  debug(
    `Error starting server on port ${config.PORT} in ${config.NODE_ENV} mode`
  );
  console.error(
    `Error starting server on port ${config.PORT} in ${config.NODE_ENV} mode`
  );
});
server.on('close', () => {
  debug(`Server on port ${config.PORT} in ${config.NODE_ENV} mode stopped !`);
  console.log(
    `Server on port ${config.PORT} in ${config.NODE_ENV} mode stopped !`
  );
});
