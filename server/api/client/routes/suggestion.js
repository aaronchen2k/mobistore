"use strict";

const SuggestionCtrl = require('../ctrl/suggestion');

module.exports = class SuggestionRoutes {
    static init(router) {
      router
        .route('/api/v1/suggestions')
        .get(SuggestionCtrl.list)
        .post(SuggestionCtrl.save);

      router
        .route('/api/v1/suggestions/:id')
        .get(SuggestionCtrl.get)
        .delete(SuggestionCtrl.delete);
    }
}
