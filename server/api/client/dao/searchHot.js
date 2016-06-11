"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const searchHotSchema = require('../model/StrSearchHot');

searchHotSchema.statics.list = () => {
  return new Promise((resolve, reject) => {
    let _query = {enabled: true};

    StrSearchHot
      .find(_query)
      .limit(10)
      .sort({ times: -1 })
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

const StrSearchHot  = mongoose.model('StrSearchHot', searchHotSchema);
module.exports = StrSearchHot;
