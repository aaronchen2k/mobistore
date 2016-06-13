"use strict";

const OrderService = require('../service/order');
const OrderDao = require('../dao/order');

module.exports = class OrderCtrl {
  static changeRecipient(req, res) {

  }
  static cancel(req, res) {

  }
  static pay(req, res) {

  }

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
  static save(req, res) {

  }
  static delete(req, res) {

  }
}
