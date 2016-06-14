"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const msgSchema = require('../model/StrMsg');

msgSchema.statics.list = (clientId) => {
    return new Promise((resolve, reject) => {
      let _query = {client: clientId, enabled: true};

      StrMsg.find(_query)
          .exec((err, json) => {
              err ? reject(err)
                  : resolve(json);
          });
      });
}

msgSchema.statics.count = (clientId) => {
  return new Promise((resolve, reject) => {
    var rules = [{client: mongoose.Types.ObjectId(clientId)}, {enabled: true}, {isRead: false}];

    StrMsg.aggregate(
      [
        { $match: {$and: rules} },
        { $group:  {
          _id: '$_id',
          count: { $sum: 1 }
        }},
      ], function(err, docs) {
        let ret = docs.length > 0? docs[0]['count']: 0;

        err ? reject(err)
          : resolve(ret);
      }
    );
  });
}

const StrMsg  = mongoose.model('StrMsg', msgSchema);
module.exports = StrMsg;
