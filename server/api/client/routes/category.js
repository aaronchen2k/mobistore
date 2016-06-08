"use strict";

const CategoryCtrl = require('../ctrl/category');

module.exports = class CategoryRoutes {
    static init(router) {
      router
        .route('/api/v1/categories')
        .get(CategoryCtrl.list)
        .post(CategoryCtrl.save);

      router
        .route('/api/v1/categories/:id')
        .get(CategoryCtrl.get)
        .delete(CategoryCtrl.delete);
    }
}
