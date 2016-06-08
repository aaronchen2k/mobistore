"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const shoppingCartItemSchema = require('../model/StrShoppingCartItem');

shoppingCartItemSchema.statics.create = (product, qty, cart) => {
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
      item.save(function (err) {
        err ? reject(err)
          : resolve(item);
      })
    });
};

const StrShoppingCartItem  = mongoose.model('StrShoppingCartItem', shoppingCartItemSchema);
module.exports = StrShoppingCartItem;
