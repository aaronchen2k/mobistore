"use strict";

const ClientCtrl = require('../ctrl/client');

module.exports = class ClientRoutes {
  static init(router) {
    router
      .route('/api/v1/client/signup')
      .post(ClientCtrl.signup);
    router
      .route('/api/v1/client/signon')
      .post(ClientCtrl.signon);
    router
      .route('/api/v1/client/signout')
      .post(ClientCtrl.signout);
    router
      .route('/api/v1/client/forgotPassword')
      .post(ClientCtrl.forgotPassword);
    router
      .route('/api/v1/client/resetPassword')
      .post(ClientCtrl.resetPassword);

    router
      .route('/api/v1/client/profile/get')
      .post(ClientCtrl.getProfile);
    router
      .route('/api/v1/client/profile/save')
      .post(ClientCtrl.saveProfile);
  }
}
