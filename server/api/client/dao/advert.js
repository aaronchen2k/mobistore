"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const advertSchema = require('../model/StrAdvert');

advertSchema.statics.list = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        StrAdvert
          .find(_query)
          .exec((err, json) => {
              err ? reject(err)
                  : resolve(json);
          });
      });
}

const StrAdvert  = mongoose.model('StrAdvert', advertSchema);
module.exports = StrAdvert;
