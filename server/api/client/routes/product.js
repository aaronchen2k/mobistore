"use strict";

const ProductCtrl = require('../ctrl/product');

module.exports = class ProductRoutes {
  static init(router) {
    router
      .route('/api/v1/products/collect')
      .post(ProductCtrl.collect);

    router
      .route('/api/v1/products')
      .get(ProductCtrl.list)
      .post(ProductCtrl.save);

    router
      .route('/api/v1/products/:id')
      .get(ProductCtrl.getWithCartNumb)
      .delete(ProductCtrl.delete);

  }
}
