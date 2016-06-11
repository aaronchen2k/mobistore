"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const shoppingCartSchema = require('../model/StrShoppingCart');

shoppingCartSchema.statics.getByClient = (clientId) => {
  return new Promise((resolve, reject) => {
    let _query = {'client': clientId};

    StrShoppingCart
      .findOne(_query)
      .populate({
        path: 'items',
        match: { enabled: true}
      })
      .exec((err, cart) => {
        err ? reject(err)
          : resolve(cart);
      });
  });
};

shoppingCartSchema.statics.getItemNumb = (clientId) => {
    return new Promise((resolve, reject) => {
      shoppingCartSchema.statics.getByClient(clientId).then(cart => {
          resolve(cart && cart.items? cart.items.length: 0);
      }).catch(error => reject(error));
    });
}

shoppingCartSchema.statics.getData = (clientId) => {
  return shoppingCartSchema.statics.createIfNeeded(clientId);
}

shoppingCartSchema.statics.createIfNeeded = (clientId) => {
  return new Promise((resolve, reject) => {
    let _query = {'client': clientId};

    shoppingCartSchema.statics.getByClient(clientId).then(cart => {
      if (cart === null) {
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

        resolve(cart);
      }
    }).catch(error => reject(error));

  });
}

const StrShoppingCart  = mongoose.model('StrShoppingCart', shoppingCartSchema);
module.exports = StrShoppingCart;
