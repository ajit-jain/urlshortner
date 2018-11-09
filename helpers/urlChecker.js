'use strict';

const debug = require('debug')('helpers:urlChecker');

module.exports.isValidUrl = async function(userInput) {
  debug(`Received URL : ${userInput}`);

  let match = await userInput.match(
    /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );

  debug(`Match : ${match}`);
  if (!match) return false;

  return true;
};
