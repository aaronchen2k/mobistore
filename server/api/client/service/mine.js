"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const CONSTANTS = require('../../../constants/constants');

const CollectionDao = require('../dao/collection');
const MsgDao = require('../dao/msg');
const OrderDao = require('../dao/order');
const ConfigDao = require('../dao/config');
const ClientDao = require('../dao/client');

module.exports = class MineService {

  static getData(clientId) {
    return Promise.join(CollectionDao.count(clientId), MsgDao.count(clientId),
      OrderDao.counts(clientId), ConfigDao.get(), ClientDao.getWithDefaultRecipient(clientId),
      function (collectionCount, msgCount, orders, config, client) {
        // console.log(collectionCount, msgCount, orders, config, client);

        return new Promise((resolve, reject) => {
          resolve({
            collectionCount: collectionCount,
            msgCount: msgCount,

            waitPay: orders[CONSTANTS.orderStatus.init],
            waitShip: orders[CONSTANTS.orderStatus.paid],
            waitReceive: orders[CONSTANTS.orderStatus.shipping],
            waitRate: orders[CONSTANTS.orderStatus.received],

            androidMkt: config.androidMkt,
            iosMkt: config.iosMkt,
            client: client
          });
        });
      }
    );
  }

};
