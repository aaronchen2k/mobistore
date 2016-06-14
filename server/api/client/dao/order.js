"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const orderSchema = require('../model/StrOrder');
const orderItemSchema = require('../model/StrOrderItem');

orderSchema.statics.list = (clientId) => {
    return new Promise((resolve, reject) => {

      let _query = {client: clientId, enabled: true};

      StrOrder.find(_query)
          .populate('items')
          .exec((err, orders) => {
              err ? reject(err): {};

            orders.forEach(order => {
              order.image = order.items[0].image;
            });
            resolve(orders);
          });
      });
}

orderSchema.statics.get = (id) => {
  return new Promise((resolve, reject) => {
    let _query = {_id: id};

    StrOrder
      .findOne(_query)
      .populate({
        path: 'items',
        match: { enabled: true}
      })
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
