"use strict";

const ShoppingCartCtrl = require('../ctrl/shoppingCart');

module.exports = class ShoppingCartRoutes {
  static init(router) {

    router
      .route('/api/v1/shoppingCart/info')
      .post(ShoppingCartCtrl.info);
    router
      .route('/api/v1/shoppingCart/addTo')
      .post(ShoppingCartCtrl.addTo);
    router
      .route('/api/v1/shoppingCart/changeQty')
      .post(ShoppingCartCtrl.changeQty);
    router
      .route('/api/v1/shoppingCart/checkout')
      .post(ShoppingCartCtrl.checkout);
    router
      .route('/api/v1/shoppingCart/clear')
      .post(ShoppingCartCtrl.clear);
  }
}
