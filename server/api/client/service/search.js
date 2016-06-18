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
      let _query = {};
      if (categoryId) {
        _query['category'] = categoryId;
      }

      let search = ProductDao.find(_query);
      if (keywords) {
        search.or([
          { name: new RegExp(keywords) },
          { descr: new RegExp(keywords) }
        ]);
      }

      search.limit(10)
        .sort({ recommend: 1 })
        .exec((err, json) => {
          err ? reject(err)
            : resolve(json);
        });
    });
  }

  static getHistories (clientId)  {
    return Promise.join(SearchHistoryDao.list(clientId), SearchHotDao.list(),
      function (histories, hots) {
        return new Promise((resolve, reject) => {
          resolve({
            histories: histories,
            hots: hots
          });
        });
      }
    );
  }

  static getMatchedKeywords (keywords)  {
    return new Promise((resolve, reject) => {

      let _query = {};
      let search = SearchHotDao.find(_query);
      if (keywords) {
        search.where( { keywords: new RegExp('.*'+keywords+'.*', '') } );
      }

      search.limit(10)
        .sort({ times: -1 })
        .exec((err, json) => {
          err ? reject(err)
            : resolve(json);
        });
    });
  }

};
