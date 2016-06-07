"use strict";

const ProductCtrl = require('../ctrl/product');

module.exports = class ProductRoutes {
    static init(router) {
        router
            .route('/api/v1/products')
            .get(ProductCtrl)
            .post(ProductCtrl.create);

        router
            .route('/api/v1/products/:id')
            .get(ProductCtrl.get)
            .delete(ProductCtrl.delete);

        router
          .route('/api/v1/products/collect')
          .post(ProductCtrl.collect);
    }
}
