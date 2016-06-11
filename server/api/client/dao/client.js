"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const clientSchema = require('../model/StrClient');

clientSchema.statics.get = (clientId) => {
  return new Promise((resolve, reject) => {
    let _query = {_id: clientId, enabled: true};

    StrClient
      .findOne(_query)
      .exec((err, json) => {
        err ? reject(err)
          : resolve(json);
      });
  });
}

const StrClient  = mongoose.model('StrClient', clientSchema);
module.exports = StrClient;
