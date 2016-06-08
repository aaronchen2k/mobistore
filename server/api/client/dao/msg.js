"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const msgSchema = require('../model/StrMsg');

msgSchema.statics.list = () => {
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

const StrMsg  = mongoose.model('StrMsg', msgSchema);
module.exports = StrMsg;
