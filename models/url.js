'use strict';

const debug = require('debug')('models:url');
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
  {
    full_url: {
      type: String,
      unique: [true, 'Full url already present'],
      required: [true, 'Full URL is required'],
    },
    url_code: {
      type: String,
      unique: true,
      required: true,
    },
    hit_count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function(doc, ret, options) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model('Url', urlSchema);
