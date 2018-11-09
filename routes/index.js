'use strict';

const debug = require('debug')('routes:index');
const path = require('path');
const router = require('express').Router({ strict: false });

const urlController = require('./../controllers/url');

router
  .route('/')
  .get((req, res) => {
    debug('Sending index.html...');
    res.sendFile(path.join(__dirname, './../public/html/index.html'));
  })
  .post(urlController.fullUrl);

router.get('/:url_code', urlController.shortUrl);

module.exports = router;
