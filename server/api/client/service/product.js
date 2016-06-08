"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const CONSTANTS = require('../../../constants/constants');
const ProductDao = require('../dao/product');
const CollectionDao = require('../dao/collection');

module.exports = class ProductService {
    static getDetail(id) {
       return Promise.join(ProductDao.get(id), CollectionDao.isCollected(id),
            function (product, isCollected) {
                return new Promise((resolve, reject) => {
                    resolve({
                          product: product,
                          isCollected: isCollected
                    });
                });
            }
        );
    }
};
