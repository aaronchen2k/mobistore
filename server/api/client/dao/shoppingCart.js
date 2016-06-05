"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const shoppingCartSchema = require('../model/StrShoppingCart');

shoppingCartSchema.statics.getItemNumb = (clientId) => {
    return new Promise((resolve, reject) => {
        let _query = {'client._id': clientId};

      StrShoppingCart
          .findOne(_query)
          .populate('items')
          .exec((err, json) => {
              err ? reject(err)
                  : resolve(json);
          });
      });
}

const StrShoppingCart  = mongoose.model('StrShoppingCart', shoppingCartSchema);
module.exports = StrShoppingCart;
