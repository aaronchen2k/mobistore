"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const rewardSchema = require('../model/StrReward');

rewardSchema.statics.list = () => {
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

const StrReward  = mongoose.model('StrReward', rewardSchema);
module.exports = StrReward;
