"use strict";

const Promise = require('bluebird');
const _ = require('lodash');

const CONSTANTS = require('../../../constants/constants');
const OrderDao = require('../dao/order');
const ClientDao = require('../dao/client');
const RecipientDao = require('../dao/recipient');
const ShoppingCartDao = require('../dao/shoppingCart');

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
          order.save(function (err, order) {
            err ? reject(err) : resolve( { order: order, shoppingCart: shoppingCart} );
          });

        });
      }
    );
  }

  static cancel(orderId) {

    return new Promise((resolve, reject) => {
      OrderDao.get(orderId).then(order => {

          var arr = [];
          order.items.forEach(function(item) {
            arr.push(OrderService.cancelItem(item));
          });

          Promise.all(arr).then(function() {
            order.set({ enabled: false });
            order.save(function (err, doc) {
              err ? reject(err): resolve(order);
            })
          }, function(reason) {
            reject(reason);
          })
        }).catch(error => reject(error));
    });
  }

  static cancelItem (item) {
    return new Promise((resolve, reject) => {
      item.set({
        enabled: false
      });

      item.save(function (err, doc) {
        err ? reject(err):
          resolve(doc);
      })
    });
  }

  static changeRecipient (orderId, recipientId)  {
    return Promise.join(OrderDao.get(orderId), RecipientDao.get(recipientId),
      function (order, recipient) {
        return new Promise((resolve, reject) => {
          order.set({
            recipient: recipient.id,
            recipientName: recipient.name,
            recipientPhone: recipient.phone,
            recipientArea: recipient.province + ' ' + recipient.city + ' ' + recipient.region,
            recipientStreet: recipient.street,
            recipientAddress: recipient.address,
          });
          order.save(function (err, doc) {
            err ? reject(err): resolve(doc);
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
