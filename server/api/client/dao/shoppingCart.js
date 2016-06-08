"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const shoppingCartSchema = require('../model/StrShoppingCart');
const ShoppingCartItem = require('./shoppingCartitem');
const Product = require('./product');

shoppingCartSchema.statics.getItemNumb = (clientId) => {
    return new Promise((resolve, reject) => {
      let _query = {'client': clientId};

      StrShoppingCart
          .findOne(_query)
          .populate('items')
          .exec((err, json) => {
              err ? reject(err)
                  : resolve(json && json.items? json.items.length: 0);
          });
      });
}

shoppingCartSchema.statics.getData = (clientId) => {
  return shoppingCartSchema.statics.createIfNeeded(clientId);
}

shoppingCartSchema.statics.createIfNeeded = (clientId) => {
  return new Promise((resolve, reject) => {
    let _query = {'client': clientId};

    StrShoppingCart
      .findOne(_query)
      .populate('items')
      .exec((err, doc) => {
        if (doc === null) {
          StrShoppingCart.create({
              createTime: new Date(),
              amount: 0,
              freight: 0,
              totalAmount: 0,
              client: {_id: clientId},
              items: [],
              enabled: true},
            function (err, doc) {
              err ? reject(err)
                : resolve(doc);
            });
        } else {
          err ? reject(err)
            : resolve(doc);
        }
      });
  });
}

const StrShoppingCart  = mongoose.model('StrShoppingCart', shoppingCartSchema);
module.exports = StrShoppingCart;
