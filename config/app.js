'use strict';

const debug = require('debug')('config:app');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const mongoose = require('./mongoose');
const routes = require('./../routes');

const app = express();
mongoose.createConnection();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './../public')));

app.use(routes);

module.exports = app;
