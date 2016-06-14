"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const clientSchema = require('../model/StrClient');
const StrRecipient = require('../dao/recipient');

clientSchema.statics.get = (clientId) => {
  return new Promise((resolve, reject) => {
    let _query = {_id: clientId, enabled: true};

    StrClient
      .findOne(_query)
      .populate({
        path: 'recipients',
        match: { enabled: true, default: true }
      })
      .exec((err, json) => {
        err ? reject(err)
          : resolve(json);
      });
  });
}

clientSchema.statics.getProfile = (clientId) => {
  return new Promise((resolve, reject) => {
    let _query = {_id: clientId, enabled: true};

    StrClient.findOne(_query)
      .exec((err, json) => {
        err ? reject(err)
          : resolve(json);
      });
  });
}

clientSchema.statics.saveProfile = (profile, clientId) => {
  return new Promise((resolve, reject) => {
    let _query = {_id: clientId, enabled: true};
    // StrClient.update(_query, {nickName: profile.nickName, mobile: profile.mobile}, function (err, doc) {
    //   err ? reject(err)
    //     : resolve(doc);
    // });

    StrClient.findOne(_query)
      .exec((err, doc) => {
        err ? reject(err): {};

        console.log(11, profile);

        doc.set({nickName: profile.nickName, mobile: profile.mobile});
        console.log(22, doc);
        doc.save(function (err, doc) {
          err ? reject(err)
            : resolve(doc);
        })
      });
  });
}

const StrClient  = mongoose.model('StrClient', clientSchema);
module.exports = StrClient;
