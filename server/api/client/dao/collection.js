"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const collectionSchema = require('../model/StrCollection');
const CONSTANTS = require('../../../constants/constants');

collectionSchema.statics.list = (clientId) => {
  return new Promise((resolve, reject) => {
    let _query = {client: clientId, enabled: true};

    StrCollection.find(_query)
      .populate('product')
      .exec((err, cart) => {
        err ? reject(err)
          : resolve(cart);
      });
  });
}

collectionSchema.statics.isCollected = (id) => {
  return new Promise((resolve, reject) => {

    let _query = {product: {_id: id}, client: {_id: CONSTANTS.testClientId}, enabled: true};

    StrCollection
      .findOne(_query, function(err, doc) {

        if (err) {
          reject(err);
        }
        if (doc === null) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
  });
}

collectionSchema.statics.collect = (productId, clientId) => {
    return new Promise((resolve, reject) => {
      let _query = {product: {_id: productId}, client: {_id: clientId}, enabled: true};

      StrCollection
        .findOne(_query, function(err, doc) {
          if (doc === null) {
            StrCollection.create({product: {_id: productId},
                                  client: {_id: clientId},
                                  date: new Date(),
                                  enabled: true},
              function (err, product) {
                err ? reject(err)
                  : resolve(product);
              });
          } else {
            doc.set({ enabled: !doc.enabled });
            doc.save(function (err, product) {
              err ? reject(err)
                : resolve(product);
            })
          }
        });
    });
}

collectionSchema.statics.count = (clientId) => {
  return new Promise((resolve, reject) => {
    var rules = [{client: mongoose.Types.ObjectId(clientId)}, {enabled: true}];

    StrCollection.aggregate(
      [
        { $match: {$and: rules} },
        { $group:  {
          _id: '$_id',
          count: { $sum: 1 }
        }},
      ], function(err, docs) {
        let ret = docs.length > 0? docs[0]['count']: 0;

        err ? reject(err)
          : resolve(ret);
      }
    );
  });
}

const StrCollection  = mongoose.model('StrCollection', collectionSchema);
module.exports = StrCollection;
