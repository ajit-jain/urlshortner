'use strict';

const debug = require('debug')('controllers:url');
const path = require('path');
const mongoose = require('mongoose');

const isValidUrl = require('./../helpers/urlChecker').isValidUrl;
const randomHash = require('./../helpers/randomHash').randomHash;
const URL = mongoose.model('Url');

const shortUrl = async (req, res) => {
  debug(`Short URL: ${req.params.url_code}`);
  try {
    let item = await URL.findOneAndUpdate(
      { url_code: req.params.url_code },
      { $inc: { hit_count: 1 } }
    );
    if (item) {
      debug(`Item found: ${item}`);
      res.redirect(item.full_url);
    } else throw new Error('URL code not found');
  } catch (err) {
    debug(`${err.error || err.message || err}`);
    res.redirect('/');
  }
};

const fullUrl = async (req, res, next) => {
  let fullUrl = req.body.fullUrl;
  debug(`Received URL: ${fullUrl}`);

  try {
    if (!fullUrl.substring(0, 4).indexOf('http') == 0)
      fullUrl = 'http://' + fullUrl;

    if (!(await isValidUrl(fullUrl))) throw new Error('Not a qualified URL');

    let present = await URL.findOne({ full_url: fullUrl });
    if (present) {
      debug(`URL already present : ${fullUrl}`);
      debug(`Returned hash : ${present.url_code}`);
      return res.send(present);
    }

    let item = await new URL();
    let hash = await randomHash();
    debug(`Generated Hash ${hash}`);
    item.full_url = fullUrl;
    item.url_code = hash;
    await item.save();
    
    res.send(item);
  } catch (err) {
    debug(`${err.error || err.message || err}`);
    res.redirect('/');
  }
};

module.exports.shortUrl = shortUrl;
module.exports.fullUrl = fullUrl;
