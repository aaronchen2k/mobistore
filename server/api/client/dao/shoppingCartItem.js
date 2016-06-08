"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const shoppingCartItemSchema = require('../model/StrShoppingCartItem');

shoppingCartItemSchema.statics.create = (product, qty, cart) => {
  console.log(product);
  console.log(product.retail_price, qty);

  return new Promise((resolve, reject) => {
      var item = new StrShoppingCartItem({
        unit_price: product.retail_price,
        qty: qty,
        amount: product.retail_price * qty,
        freight: product.freight,
        freight_free_if_total_amount: product.freight_free_if_total_amount,
        name: product.name,
        image: product.image,

        create_time: new Date(),
        product: product.id,
        shopping_cart: cart.id,
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
