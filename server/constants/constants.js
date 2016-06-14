'use strict';

const CONSTANTS = {
  testClientId: '57541fad0cf01df6063a803d',
  orderStatus: {
    init: 'INIT',
    paying: 'PAYING',
    paid: 'PAID',
    shipping: 'SHIPPING',
    received: 'RECEIVED',
    rated: 'RATED',
    cancel: 'CANCEL',
    pay_fail: 'PAY_FAIL',
    shipping_fail: 'SHIPPING_FAIL'
  }
};

module.exports = CONSTANTS;
