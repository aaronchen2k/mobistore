"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const configSchema = require('../model/SysConfig');

configSchema.statics.get = () => {
    return new Promise((resolve, reject) => {
      let _query = {enabled: true};

      SysConfig
          .findOne(_query)
          .exec((err, json) => {
              err ? reject(err)
                  : resolve(json);
          });
      });
}

const SysConfig  = mongoose.model('SysConfig', configSchema);
module.exports = SysConfig;
