'use strict';

const debug = require('debug')('helper:randomHash');
const randomize = require('randomatic');

const URL = require('mongoose').model('Url');

const randomHash = async function() {
  let hash = await randomize('0aA', 7, { exclude: '0oOiIlL1' });
  debug(`Generated hash : ${hash}`);
  
  let used = await URL.findOne({ url_code: hash });
  if (used) await randomHash();
  
  return hash;
};

module.exports.randomHash = randomHash;
