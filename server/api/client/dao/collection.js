"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const collectionSchema = require('../model/StrCollection');
const CONSTANTS = require('../../../constants/constants');

collectionSchema.statics.isCollected = (id) => {
  return new Promise((resolve, reject) => {
    console.log({product: {_id: id}, client: {_id: CONSTANTS.testClientId}, enabled: true});

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

collectionSchema.statics.collect = (id) => {
    return new Promise((resolve, reject) => {
      let _query = {product: {_id: id}, client: {_id: CONSTANTS.testClientId}};

      StrCollection
        .findOne(_query, function(err, doc) {
          if (doc === null) {
            StrCollection.create({product: {_id: id},
                                  client: {_id: CONSTANTS.testClientId},
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

const StrCollection  = mongoose.model('StrCollection', collectionSchema);
module.exports = StrCollection;
