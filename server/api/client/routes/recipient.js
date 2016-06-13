"use strict";

const RecipientCtrl = require('../ctrl/recipient');

module.exports = class RecipientRoutes {
    static init(router) {
      router
        .route('/api/v1/recipients')
        .get(RecipientCtrl.list)
        .post(RecipientCtrl.save);

      router
        .route('/api/v1/recipients/:id')
        .get(RecipientCtrl.get)
        .delete(RecipientCtrl.delete);

    }
}
