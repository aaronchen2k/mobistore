"use strict";

const CONSTANTS = require('../../../constants/constants');
const ProductService = require('../service/product');
const ProductDao = require('../dao/product');
const CollectionDao = require('../dao/collection');

module.exports = class ProductCtrl {
  
  static list(req, res) {
    ProductDao
      .list()
      .then(products => res.status(200).json(products))
      .catch(error => res.status(400).json(error));
  }

  static getWithCartNumb(req, res) {
    let _id = req.params.id;

    ProductService
      .getWithCartNumb(_id)
      .then(data => res.status(200).json({
        code: 1,
        data: data
      }))
      .catch(error => res.status(400).json(error));
  }

  static save(req, res) {

  }
  static delete(req, res) {

  }
}
