"use strict";

const SearchCtrl = require('../ctrl/search');

module.exports = class SearchRoutes {
    static init(router) {
      router
        .route('/api/v1/search/getHistory')
        .post(SearchCtrl.getHistory);

      router
        .route('/api/v1/search/getMatchedKeywords')
        .post(SearchCtrl.getMatchedKeywords);

      router
        .route('/api/v1/search/query')
        .post(SearchCtrl.query);
    }
}
