"use strict";

const CONSTANTS = require('../../../constants/constants');
const RecipientService = require('../service/recipient');
const RecipientDao = require('../dao/recipient');

module.exports = class RecipientCtrl {
  static list(req, res) {
    RecipientDao.listByClient(CONSTANTS.testClientId)
      .then(data => res.status(200).json({
        code: 1,
        data: data
      }))
      .catch(error => res.status(400).json(error));
  }

  static get(req, res) {
    let _id = req.params.id;

    RecipientDao.get(_id)
      .then(data => res.status(200).json({
        code: 1,
        data: data
      }))
      .catch(error => res.status(400).json(error));
  }

  static save(req, res) {
    let recipient = req.body.recipient;
    RecipientService.save(recipient, CONSTANTS.testClientId)
      .then(data => res.status(200).json({
        code: 1,
        data: data
      }))
      .catch(error => res.status(400).json(error));
  }

  static delete(req, res) {
    let _id = req.params.id;

  }

}
