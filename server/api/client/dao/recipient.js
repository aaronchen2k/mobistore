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

recipientSchema.statics.allNotDefault = (recipient) => {
  return new Promise((resolve, reject) => {

    if (recipient.default) {
      StrRecipient.find({client: recipient.client})
        .exec((err, recipients) => {
          err ? reject(err) : {};

          var arr = [];
          recipients.forEach( rec => {
            if (rec._id != recipient._id) {
              arr.push(recipientSchema.statics.notDefault(rec));
            }
          });

          Promise.all(arr).then(function() {
            console.log("all items were set to notDefault");
            err ? reject(err)
              : resolve(recipient);
          }, function(reason) {
            console.log(reason);
            reject(reason);
          });
        });

    } else {
      resolve(recipient);
    }
  });
}

recipientSchema.statics.notDefault = (address) => {
  return new Promise((resolve, reject) => {
    address.set({
      default: false
    });
    address.save(function (err, item) {
      err ? reject(err): resolve(item);
    })
  });
}

const StrRecipient  = mongoose.model('StrRecipient', recipientSchema);
module.exports = StrRecipient;
