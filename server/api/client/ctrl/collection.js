"use strict";

const CONSTANTS = require('../../../constants/constants');
const CollectionDao = require('../dao/collection');

module.exports = class CollectionCtrl {
  static list(req, res) {
    CollectionDao.list(CONSTANTS.testClientId)
      .then(doc => res.status(200).json({
        code: 1,
        data: doc
      }))
      .catch(error => res.status(400).json(error));
  }

  static get(req, res) {

  }

  static save(req, res) {
    let _id = req.body.productId;

    CollectionDao.collect(_id, CONSTANTS.testClientId)
      .then(doc => res.status(200).json({
        code: 1,
        data: doc
      }))
      .catch(error => res.status(400).json(error));
  }
  
  static delete(req, res) {

  }
}
