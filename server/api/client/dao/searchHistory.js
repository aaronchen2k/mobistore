"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const searchHistorySchema = require('../model/StrSearchHistory');

searchHistorySchema.statics.list = () => {
    return new Promise((resolve, reject) => {
      let _query = {};

      StrCategory
          .find(_query)
          .exec((err, json) => {
              err ? reject(err)
                  : resolve(json);
          });
      });
}

const StrSearchHistory  = mongoose.model('StrSearchHistory', searchHistorySchema);
module.exports = StrSearchHistory;
