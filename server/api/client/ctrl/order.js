"use strict";

const OrderService = require('../service/order');
const OrderDao = require('../dao/order');

module.exports = class OrderCtrl {
  static list(req, res) {

  }

  static get(req, res) {
    let _id = req.params.id;

    OrderDao
      .get(_id)
      .then(data => res.status(200).json({
        code: 1,
        data: data
      }))
      .catch(error => res.status(400).json(error));
  }

  static changeRecipient(req, res) {
    let _id = req.params.id;
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
