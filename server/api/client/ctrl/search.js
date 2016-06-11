"use strict";

const CONSTANTS = require('../../../constants/constants');
const SearchService = require('../service/search');

module.exports = class SearchCtrl {
  static getHistory(req, res) {
    SearchService.getHistories(CONSTANTS.testClientId)
      .then(data => res.status(200).json({
        code: 1,
        data: data
      }))
      .catch(error => res.status(400).json(error));
  }
  static getMatchedKeywords(req, res) {
    let _keywords = req.body.keywords;

    SearchService.getMatchedKeywords(_keywords)
      .then(data => res.status(200).json({
        code: 1,
        data: data
      }))
      .catch(error => res.status(400).json(error));
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
