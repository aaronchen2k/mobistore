"use strict";

const AreaCtrl = require('../ctrl/area');

module.exports = class AreaRoutes {
    static init(router) {
      router
        .route('/api/v1/areas')
        .post(AreaCtrl.list);
    }

}
