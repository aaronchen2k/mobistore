"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const searchHotSchema = require('../model/StrSearchHot');

searchHotSchema.statics.list = () => {
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

const StrSearchHot  = mongoose.model('StrSearchHot', searchHotSchema);
module.exports = StrSearchHot;
