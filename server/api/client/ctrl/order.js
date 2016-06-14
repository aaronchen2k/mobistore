"use strict";

const CONSTANTS = require('../../../constants/constants');

const OrderService = require('../service/order');
const OrderDao = require('../dao/order');

module.exports = class OrderCtrl {
  static list(req, res) {
    OrderDao.list(CONSTANTS.testClientId)
      .then(doc => res.status(200).json({
        code: 1,
        data: doc
      }))
      .catch(error => res.status(400).json(error));
  }

  static get(req, res) {
    let _id = req.params.id;

    OrderDao.get(_id)
      .then(data => res.status(200).json({
        code: 1,
        data: data
      }))
      .catch(error => res.status(400).json(error));
  }

  static changeRecipient(req, res) {
    let orderId = req.body.orderId;
    let recipientId = req.body.recipientId;

    OrderService.changeRecipient(orderId, recipientId)
      .then(order => res.status(200).json({
        code: 1,
        data: order
      }))
      .catch(error => res.status(400).json(error));
  }

  static cancel(req, res) {
    let _id = req.body.orderId;

    OrderService.cancel(_id)
      .then(data => res.status(200).json({
        code: 1,
        data: data
      }))
      .catch(error => res.status(400).json(error));
  }

  static pay(req, res) {
    let _id = req.params.id;
  }

  static save(req, res) {

  }
  static delete(req, res) {

  }
}
