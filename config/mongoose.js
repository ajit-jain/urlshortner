'use strict';

const debug = require('debug')('config:mongoose');
const mongoose = require('mongoose');

const config = require('./config');

const createConnection = function() {
  const mongooseOptions = {
    keepAlive: true,
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
  };

  debug('connecting to mongo database...');
  mongoose.Promise = global.Promise;

  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);

  mongoose.connect(
    `mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`,
    mongooseOptions
  );

  mongoose.connection.on('connected', () => {
    debug(
      `Connected to database : mongodb://${config.DB_HOST}:${config.DB_PORT}/${
        config.DB_NAME
      }`
    );
    console.log(
      `Connected to database : mongodb://${config.DB_HOST}:${config.DB_PORT}/${
        config.DB_NAME
      }`
    );
  });
  mongoose.connection.on('error', () => {
    debug(
      `Error connecting to database : mongodb://${config.DB_HOST}:${
        config.DB_PORT
      }/${config.DB_NAME}`
    );
    console.log(
      `Error connecting to database : mongodb://${config.DB_HOST}:${
        config.DB_PORT
      }/${config.DB_NAME}`
    );
  });
};

module.exports.createConnection = createConnection;
