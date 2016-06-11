"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const searchHistorySchema = require('../model/StrSearchHistory');

searchHistorySchema.statics.list = (clientId) => {
  return new Promise((resolve, reject) => {
    let _query = {client: clientId, enabled: true};

    StrSearchHistory
        .find(_query)
        .limit(10)
        .sort({ searchTime: -1 })
        .exec((err, docs) => {
          err ? reject(err): {};

          let ret = [];
          docs.forEach(function (doc) {
            ret.push(doc['keywords']);
          });
          resolve(ret);
        });
    });
}

const StrSearchHistory  = mongoose.model('StrSearchHistory', searchHistorySchema);
module.exports = StrSearchHistory;
