"use strict";

const RewardCtrl = require('../ctrl/reward');

module.exports = class RewardRoutes {
  static init(router) {
    router
      .route('/api/v1/rewards')
      .get(RewardCtrl.list)
      .post(RewardCtrl.save);

    router
      .route('/api/v1/rewards/:id')
      .get(RewardCtrl.get)
      .delete(RewardCtrl.delete);
  }
}
