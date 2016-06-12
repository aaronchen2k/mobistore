"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const CONSTANTS = require('../../../constants/constants');
const OrderDao = require('../dao/order');
const OrderItemDao = require('../dao/orderItem');
const ClientDao = require('../dao/client');
const ShoppingCartDao = require('../dao/shoppingCart');
const ShoppingCartItemDao = require('../dao/shoppingCartItem');

module.exports = class OrderService {
  static create(clientId) {

    return Promise.join(ClientDao.get(clientId), ShoppingCartDao.getByClient(clientId),
      function (client, shoppingCart) {

        return new Promise((resolve, reject) => {

          let recipient = client.recipients[0];
          var order = new OrderDao({
            client: client.id,
            recipient: recipient.id,
            recipientName: recipient.name,
            recipientPhone: recipient.phone,
            recipientArea: recipient.province + ' ' + recipient.city + ' ' + recipient.region,
            recipientStreet: recipient.street,
            recipientAddress: recipient.address,
            createTime: new Date(),

            amount: shoppingCart.amount,
            freight: shoppingCart.freight,
            totalAmount: shoppingCart.totalAmount,

            items: []
          });
          console.log(111, order);
          order.save(function (err, order) {
            err ? reject(err) : resolve( { order: order, shoppingCart: shoppingCart} );
          });

        });
      }
    );
  }

  static getDetail(id) {
    return Promise.join(ProductDao.get(id), CollectionDao.isCollected(id),
      function (product, isCollected) {
        return new Promise((resolve, reject) => {
          resolve({
            product: product,
            isCollected: isCollected
          });
        });
      }
    );
  }
};
