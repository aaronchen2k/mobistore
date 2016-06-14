"use strict";

const CollectionCtrl = require('../ctrl/collection');

module.exports = class CollectionRoutes {
    static init(router) {
      router
        .route('/api/v1/collections')
        .get(CollectionCtrl.list)
        .post(CollectionCtrl.save);

      router
        .route('/api/v1/collections/:id')
        .get(CollectionCtrl.get)
        .delete(CollectionCtrl.delete);
    }
}
