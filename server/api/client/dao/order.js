"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const orderSchema = require('../model/StrOrder');

orderSchema.statics.list = () => {
    return new Promise((resolve, reject) => {
      let _query = {};

      StrOrder
          .find(_query)
          .exec((err, json) => {
              err ? reject(err)
                  : resolve(json);
          });
      });
}

const StrOrder  = mongoose.model('StrOrder', orderSchema);
module.exports = StrOrder;
