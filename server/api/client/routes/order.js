"use strict";

const OrderCtrl = require('../ctrl/order');

module.exports = class OrderRoutes {
    static init(router) {
      router
        .route('/api/v1/orders')
        .get(OrderCtrl.list)
        .post(OrderCtrl.save);

      router
        .route('/api/v1/orders/:id')
        .get(OrderCtrl.get)
        .delete(OrderCtrl.delete);

      router
        .route('/api/v1/orders/changeRecipient')
        .post(OrderCtrl.changeRecipient);
      router
        .route('/api/v1/orders/cancel')
        .post(OrderCtrl.cancel);
      router
        .route('/api/v1/orders/pay')
        .post(OrderCtrl.pay);

    }
}
