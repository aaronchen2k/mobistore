"use strict";

const CONSTANTS = require('../../../constants/constants');
const SuggestionDao = require('../dao/suggestion');

module.exports = class SuggestionCtrl {
  static list(req, res) {

  }
  static get(req, res) {

  }
  static save(req, res) {
    let suggestion = req.body.suggestion;

    SuggestionDao.save(suggestion, CONSTANTS.testClientId)
      .then(suggestion => res.status(200).json({
        code: 1,
        data: suggestion
      }))
      .catch(error => res.status(400).json(error));
  }
  static delete(req, res) {

  }
}
