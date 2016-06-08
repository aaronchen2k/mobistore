"use strict";

const MineCtrl = require('../ctrl/mine');

module.exports = class MineRoutes {
    static init(router) {
        router
            .route('/api/v1/mine/info')
            .post(MineCtrl.info);

        router
            .route('/api/v1/mine/suggest')
            .delete(MineCtrl.suggest);
    }
}
