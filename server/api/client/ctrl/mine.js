"use strict";

const CONSTANTS = require('../../../constants/constants');
const MineService = require('../service/mine');

module.exports = class MineCtrl {

  static info(req, res) {
    MineService
      .getData(CONSTANTS.testClientId)
      .then(data => {
        res.status(200).json({code: 1, data: data});
      })
      .catch(error => res.status(400).json(error));
  }

  static suggest(req, res) {

  }

}
