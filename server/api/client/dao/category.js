"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const categorySchema = require('../model/StrCategory');

categorySchema.statics.list = () => {
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

const StrCategory  = mongoose.model('StrCategory', categorySchema);
module.exports = StrCategory;
