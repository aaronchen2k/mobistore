"use strict";

const MsgCtrl = require('../ctrl/msg');

module.exports = class MsgRoutes {
    static init(router) {
      router
        .route('/api/v1/msgs')
        .get(MsgCtrl.list)
        .post(MsgCtrl.save);

      router
        .route('/api/v1/msgs/:id')
        .get(MsgCtrl.get)
        .delete(MsgCtrl.delete);
    }
}
