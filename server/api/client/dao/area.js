"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const areaSchema = require('../model/SysArea');

areaSchema.statics.list = () => {
    return new Promise((resolve, reject) => {
      let _query = {enabled: true};

      StrArea
          .find(_query)
          .exec((err, json) => {
              err ? reject(err)
                  : resolve(json);
          });
      });
}

const StrArea  = mongoose.model('StrArea', areaSchema);
module.exports = StrArea;
