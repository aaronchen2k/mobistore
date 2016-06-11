"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const CONSTANTS = require('../../../constants/constants');
const CategoryDao = require('../dao/category');
const ProductDao = require('../dao/product');
const SearchHistoryDao = require('../dao/searchHistory');
const SearchHotDao = require('../dao/searchHot');

module.exports = class SearchService {
  static getData (categoryId, keywords)  {

    return Promise.join(SearchService.search(categoryId, keywords), CategoryDao.list(),
      function (products, categories) {

        return new Promise((resolve, reject) => {
          resolve({
            products: products,
            categories: categories
          });
        });
      }
    );
  }

  static search (categoryId, keywords) {
    return new Promise((resolve, reject) => {
      let _query = {category: categoryId}; //, keywords: keywords};
      ProductDao
        .find(_query)
        .exec((err, json) => {
          err ? reject(err)
            : resolve(json);
        });
    });
  }
};
