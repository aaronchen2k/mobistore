"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const shoppingCartItemSchema = require('../model/StrShoppingCartItem');
const ShoppingCartDao = require('./shoppingCart');

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
    item.save(function (err, item) {
      err ? reject(err): {};

      cart.items.push(item);
      cart.save(function (err, cart) {
        err ? reject(err): {};

        shoppingCartItemSchema.statics.computeItemsPriceAndSave(cart.id).then(cart => {
          resolve(cart);
        }).catch(error => reject(error));
      })
    })
  });
};

shoppingCartItemSchema.statics.update = (item, product, qty) => {
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
      err ? reject(err): {};

      shoppingCartItemSchema.statics.computeItemsPriceAndSave(item.shoppingCart).then(cart => {
        resolve(cart);
      }).catch(error => reject(error));
    })
  });
};

shoppingCartItemSchema.statics.computeItemsPriceAndSave = (cartId) => {
  return new Promise((resolve, reject) => {
    ShoppingCartDao.findOne({_id: cartId})
      .populate('items')
      .exec((err, cart) => {
        err ? reject(err): {};
          let items = cart.items;
          let amount = 0;
          let freight = 0;
          for (let i in items) {
            amount += items[i].amount;
          }
          for (let i in items) {
            freight += items[i].freightFreeIfTotalAmount >= amount? 0: items[i].freight;
          }

        console.log(amount, freight);
          cart.set({
            amount: amount,
            freight: freight,
            totalAmount: amount + freight
          });
          cart.save(function (err, doc) {
            err ? reject(err)
              : resolve(doc);
          })
      });
  });
};

const StrShoppingCartItem  = mongoose.model('StrShoppingCartItem', shoppingCartItemSchema);
module.exports = StrShoppingCartItem;
