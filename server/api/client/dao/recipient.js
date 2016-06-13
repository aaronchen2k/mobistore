"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const clientSchema = require('../model/StrClient');
const recipientSchema = require('../model/StrRecipient');

recipientSchema.statics.listByClient = (clientId) => {
  return new Promise((resolve, reject) => {
    let _query = {client: clientId, enabled: true};

    StrRecipient.find(_query)
      .exec((err, json) => {
        err ? reject(err)
          : resolve(json);
      });
  });
}

recipientSchema.statics.get = (id) => {
  return new Promise((resolve, reject) => {
    if (!_.isString(id))
      return reject(new TypeError('id is not a valid string.'));

    StrRecipient
      .findById(id)
      .exec((err, doc) => {
        err ? reject(err)
          : resolve(doc);
      });
  });
}

const StrRecipient  = mongoose.model('StrRecipient', recipientSchema);
module.exports = StrRecipient;
