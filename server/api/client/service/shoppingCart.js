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
          var _query = {product: productId, shoppingCart: cart.id};
          ShoppingCartItemDao.findOne(_query).exec((err, item) => {
              err ? reject(err): {};

              if (item != null) {
                ShoppingCartItemDao.update(item, product, qty).then(cartUpdated => {
                    resolve(cartUpdated);
                }).catch(error => reject(error));
              } else {
                ShoppingCartItemDao.create(product, qty, cart).then(cartUpdated => {
                    resolve(cartUpdated);
                }).catch(error => reject(error));
              }
            });
        });
      }
    );
  };
};
