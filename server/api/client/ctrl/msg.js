"use strict";

const CONSTANTS = require('../../../constants/constants');
const MsgService = require('../service/msg');
const MsgDao = require('../dao/msg');

module.exports = class MsgCtrl {
  static list(req, res) {
    MsgDao.list(CONSTANTS.testClientId)
      .then(doc => res.status(200).json({
        code: 1,
        data: doc
      }))
      .catch(error => res.status(400).json(error));
  }

  static get(req, res) {

  }
  static save(req, res) {

  }
  static delete(req, res) {

  }
}
