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

orderSchema.statics.counts = (clientId) => {
  return new Promise((resolve, reject) => {
    var rules = [{client: mongoose.Types.ObjectId(clientId)}, {enabled: true}];

    StrOrder.aggregate(
      [
        { $match: {$and: rules} },
        { $group:  {
          _id: '$status',
          count: { $sum: 1 }
        }},
      ], function(err, docs) {

        let ret = {};
        docs.forEach(function (doc) {
          ret[doc['_id']] = doc['count'];
        });

        err ? reject(err)
          : resolve(ret);
      }
    );
  });
}

const StrOrder  = mongoose.model('StrOrder', orderSchema);
module.exports = StrOrder;
