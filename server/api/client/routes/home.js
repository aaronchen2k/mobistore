"use strict";

const HomeCtrl = require('../ctrl/home');

module.exports = class HometRoutes {
    static init(router) {
        router
            .route('/api/v1/home/index')
            .post(HomeCtrl.loadData);
    }
}
