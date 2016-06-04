"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const productSchema = require('../model/StrProduct');

productSchema.statics.list = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        StrProduct
          .find(_query)
          .exec((err, json) => {
              err ? reject(err)
                  : resolve(json);
          });
      });
}

productSchema.statics.get = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('id is not a valid string.'));

        StrProduct
            .findById(id)
            .exec((err, product) => {
                err ? reject(err)
                    : resolve(product);
            });
    });
}

productSchema.statics.create = (product) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(product))
          return reject(new TypeError('product is not a valid object.'));

      let _product = new StrProduct(product);

    _product.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

productSchema.statics.delete = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('id is not a valid string.'));

        StrProduct
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const StrProduct  = mongoose.model('StrProduct', productSchema);
module.exports = StrProduct;
