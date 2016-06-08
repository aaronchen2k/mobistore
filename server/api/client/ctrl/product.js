"use strict";

const ProductService = require('../service/product');
const ProductDao = require('../dao/product');
const CollectionDao = require('../dao/collection');
const CONSTANTS = require('../../../constants/constants');

module.exports = class ProductCtrl {

  static collect(req, res) {
    let _id = req.body.productId;

    CollectionDao
      .collect(_id, CONSTANTS.testClientId)
      .then(product => res.status(200).json({
        code: 1,
        data: product
      }))
      .catch(error => res.status(400).json(error));
  }

  static list(req, res) {
    ProductDao
      .list()
      .then(products => res.status(200).json(products))
      .catch(error => res.status(400).json(error));
  }

  static get(req, res) {
    let _id = req.params.id;

    ProductService
      .getDetail(_id)
      .then(data => res.status(200).json({
        code: 1,
        data: data,

      }))
      .catch(error => res.status(400).json(error));
  }

  static save(req, res) {

  }
  static delete(req, res) {

  }
}
