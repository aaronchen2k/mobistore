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
  static remove(req, res) {
    let _itemId = req.body.itemId;

    ShoppingCartService
      .remove(_itemId, CONSTANTS.testClientId)
      .then(data => { res.status(200).json({code: 1, data: data});})
      .catch(error => { res.status(400).json(error);} );
  }
  static changeQty(req, res) {
    let _itemId = req.body.itemId;
    let _itemQty = req.body.itemQty;

    ShoppingCartService
      .changeQty(_itemId, _itemQty, CONSTANTS.testClientId)
      .then(data => { res.status(200).json({code: 1, data: data}); })
      .catch(error => res.status(400).json(error));
  }
  static clear(req, res) {
    ShoppingCartService
      .clear(CONSTANTS.testClientId)
      .then(data => { res.status(200).json({code: 1, data: data});})
      .catch(error => res.status(400).json(error));
  }
  static checkout(req, res) {
    ShoppingCartService
      .checkout(CONSTANTS.testClientId)
      .then(data => { res.status(200).json({code: 1, data: data});})
      .catch(error => res.status(400).json(error));
  }
}
