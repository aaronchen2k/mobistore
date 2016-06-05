"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');


const shoppingCartSchema = require('../model/StrShoppingCart');

shoppingCartSchema.statics.getItemNumb = (clientId) => {
  console.log(clientId);
    return new Promise((resolve, reject) => {
      let _query = {'client': clientId};

      StrShoppingCart
          .findOne(clientId)
          .populate('items')
          .exec((err, json) => {
            console.log(json);
              err ? reject(err)
                  : resolve(json.items.length);
          });
      });
}

const StrShoppingCart  = mongoose.model('StrShoppingCart', shoppingCartSchema);
module.exports = StrShoppingCart;
