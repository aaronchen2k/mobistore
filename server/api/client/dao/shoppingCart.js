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

shoppingCartSchema.statics.computeItemsPriceAndSave = (clientId) => {
  return new Promise((resolve, reject) => {
    shoppingCartSchema.statics.getByClient(clientId).then(cart => {

      let items = cart.items;
      let amount = 0;
      let freight = 0;
      for (let i in items) {
        amount += items[i].amount;
        console.log('aa', items[i].freight);
      }

      for (let i in items) {
        freight += items[i].freightFreeIfTotalAmount <= amount? 0: items[i].freight;

        console.log('bb', items[i].freightFreeIfTotalAmount);
      }

      console.log('cc', amount, freight);
      cart.set({
        amount: amount,
        freight: freight,
        totalAmount: amount + freight
      });
      console.log('dd', cart);

      cart.save(function (err, doc) {
        console.log(33, doc);
        err ? reject(err)
          : resolve(doc);
      })
    }).catch(error => reject(error));
  });
};

const StrShoppingCart  = mongoose.model('StrShoppingCart', shoppingCartSchema);
module.exports = StrShoppingCart;
