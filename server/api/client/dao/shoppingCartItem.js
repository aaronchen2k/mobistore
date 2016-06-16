"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const shoppingCartItemSchema = require('../model/StrShoppingCartItem');
const ShoppingCartDao = require('./shoppingCart');

shoppingCartItemSchema.statics.create = (product, qty, cart, clientId) => {
  return new Promise((resolve, reject) => {
    var item = new StrShoppingCartItem({
      unitPrice: product.retailPrice,
      qty: qty,
      amount: product.retailPrice * qty,
      freight: product.freight,
      freightFreeIfTotalAmount: product.freightFreeIfTotalAmount,
      name: product.name,
      image: product.image,

      createTime: new Date(),
      product: product.id,
      shoppingCart: cart.id,
      enabled: true
    });
    item.save(function (err, item) {
      err ? reject(err): {};

      cart.items.push(item);
      cart.save(function (err, cart) {
        console.log(22, cart);

        err ? reject(err): {};

        ShoppingCartDao.computeItemsPriceAndSave(clientId).then(cart => {
          resolve(cart);
        }).catch(error => reject(error));
      })
    })
  });
};

shoppingCartItemSchema.statics.update = (item, product, qty, clientId) => {
  return new Promise((resolve, reject) => {
    let qtyTotal = item.qty + qty;
    item.set({
      qty: qtyTotal,
      unitPrice: product.retailPrice,
      amount: product.retailPrice * qtyTotal,
      freight: product.freight,
      freightFreeIfTotalAmount: product.freightFreeIfTotalAmount
    });

    item.save(function (err, doc) {
      console.log(22, doc);

      err ? reject(err): {};

      ShoppingCartDao.computeItemsPriceAndSave(clientId).then(cart => {
        console.log(44, cart);
        resolve(cart);
      }).catch(error => reject(error));
    })
  });
};

const StrShoppingCartItem  = mongoose.model('StrShoppingCartItem', shoppingCartItemSchema);
module.exports = StrShoppingCartItem;
