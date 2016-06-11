"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const CONSTANTS = require('../../../constants/constants');
const ShoppingCartDao = require('../dao/shoppingCart');
const ShoppingCartItemDao = require('../dao/shoppingCartItem');
const ProductDao = require('../dao/product');

module.exports = class ShoppingCartService {
  static addTo (productId, qty, clientId)  {
    return Promise.join(ShoppingCartDao.createIfNeeded(clientId), ProductDao.get(productId),
      function (cart, product) {
        return new Promise((resolve, reject) => {
          var _query = {product: productId, shoppingCart: cart.id, enabled: true};
          ShoppingCartItemDao.findOne(_query).exec((err, item) => {
              err ? reject(err): {};

              if (item != null) {
                ShoppingCartItemDao.update(item, product, qty, clientId).then(cartUpdated => {
                    resolve(cartUpdated);
                }).catch(error => reject(error));
              } else {
                ShoppingCartItemDao.create(product, qty, cart, clientId).then(cartUpdated => {
                    resolve(cartUpdated);
                }).catch(error => reject(error));
              }
            });
        });
      }
    );
  }

  static clear (clientId)  {
      return new Promise((resolve, reject) => {
        ShoppingCartDao.getByClient(clientId).then(cart => {
          let items = cart.items;
          var arr = [];
          for (let i in items) {
            arr.push(ShoppingCartService.disableItem(items[i]));
          }
          Promise.all(arr).then(function() {
            console.log("all items were disabled");
            cart.set({ amount: 0, freight: 0, totalAmount: 0 , items: []});
            cart.save(function (err, doc) {
              err ? reject(err)
                : resolve(doc);
            })
          }, function(reason) {
            console.log(reason);
            reject(reason);
          })
        }).catch(error => reject(error));
      });
  }

  static remove (itemId, clientId)  {
    return new Promise((resolve, reject) => {
      ShoppingCartDao
        .findOne({'client': clientId})
        .populate('items') // including disabled items
        .exec((err, cart) => {
          err ? reject(err): {};

          let found = false; // not to remove other client's item
          cart.items.forEach(function (item, index) {
            if (itemId == item._id) {
              found = true;
              cart.items.splice(index, 1);
            }
          });

          if (found) {
            let _query = {_id: itemId};

            ShoppingCartItemDao
              .findOne(_query)
              .exec((err, item) => {
                err ? reject(err): {};

                item.set({ enabled: false });
                item.save(function (err, item) {
                  err ? reject(err) : {};

                  cart.save(function (err, doc) {
                    err ? reject(err): {};

                    ShoppingCartItemDao.computeItemsPriceAndSave(clientId).then(cart => {
                      resolve(cart);
                    }).catch(error => reject(error));
                  })
                })
              });
          }
      }).catch(error => reject(error));
    });
  }

  static changeQty (itemId, itemQty, clientId)  {
    return new Promise((resolve, reject) => {
      ShoppingCartDao
        .findOne({'client': clientId})
        .populate('items') // including disabled items
        .exec((err, cart) => {
          err ? reject(err): {};

          let found = false; // not to remove other client's item
          cart.items.forEach(function (item, index) {
            if (itemId == item._id) {
              found = true;
            }
          });

          if (found) {
            let _query = {_id: itemId};

            ShoppingCartItemDao
              .findOne(_query)
              .exec((err, item) => {
                err ? reject(err): {};

                item.set({ qty: itemQty, amount: item.unitPrice * itemQty });
                item.save(function (err, item) {
                  err ? reject(err) : {};

                  ShoppingCartItemDao.computeItemsPriceAndSave(clientId).then(cart => {
                    resolve(cart);
                  }).catch(error => reject(error));
                })
              });
          }
        }).catch(error => reject(error));
    });
  }

  static disableItem (item)  {
    return new Promise((resolve, reject) => {
      item.set({
        enabled: false
      });
      item.save(function (err, item) {
        err ? reject(err): resolve(item);
      })
    });
  }
};
