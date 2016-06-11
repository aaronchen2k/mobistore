"use strict";

const CONSTANTS = require('../../../constants/constants');
const ShoppingCartService = require('../service/shoppingCart');
const ShoppingCartDao = require('../dao/shoppingCart');

module.exports = class ShoppingCartCtrl {
  static info(req, res) {
    ShoppingCartDao
      .getData(CONSTANTS.testClientId)
      .then(data => { res.status(200).json({code: 1, data: data}); })
      .catch(error => res.status(400).json(error));
  }
  static addTo(req, res) {
    let _productId = req.body.productId;
    let _qty = req.body.qty;

    ShoppingCartService
      .addTo(_productId, _qty, CONSTANTS.testClientId)
      .then(data => { res.status(200).json({code: 1, data: data}); })
      .catch(error => res.status(400).json(error));
  }
  static changeQty(req, res) {

  }
  static clear(req, res) {
    ShoppingCartService
      .clear(CONSTANTS.testClientId)
      .then(data => { res.status(200).json({code: 1, data: data}); console.log(data); })
      .catch(error => res.status(400).json(error));
  }
  static checkout(req, res) {

  }
}
