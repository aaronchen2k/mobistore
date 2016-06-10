"use strict";

const SearchService = require('../service/search');

module.exports = class SearchCtrl {
  static getHistory(req, res) {

  }
  static getMatchedKeywords(req, res) {

  }
  static query(req, res) {
    let _categoryId = req.body.categoryId;
    let _keywords = req.body.keywords;

    SearchService.getData(_categoryId, _keywords)
      .then(data => res.status(200).json({
        code: 1,
        data: data
      }))
      .catch(error => res.status(400).json(error));
  }
}
