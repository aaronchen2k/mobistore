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

recipientSchema.statics.allNotDefault = (recipient, clientId) => {
  return new Promise((resolve, reject) => {
      let otherHasDefault = false;
      StrRecipient.find({client: clientId, isDefault: true})
        .exec((err, recipients) => {
          err ? reject(err) : {};

          var arr = [];
          recipients.forEach( rec => {
            if (rec._id != recipient._id) {
              if (rec.isDefault) {
                otherHasDefault = true;
              }

              arr.push(recipientSchema.statics.notDefault(rec));
            }
          });

          if (recipient.isDefault) {
            Promise.all(arr).then(function () {
              console.log("all items were set to notDefault");
              err ? reject(err)
                : resolve(recipient);
            }, function (reason) {
              reject(reason);
            });
          } else if (!otherHasDefault) {
            recipient.isDefault = true;
            resolve(recipient);
          }
        });

  });
}

recipientSchema.statics.notDefault = (address) => {
  return new Promise((resolve, reject) => {
    address.set({
      isDefault: false
    });
    address.save(function (err, item) {
      err ? reject(err): resolve(item);
    })
  });
}

const StrRecipient  = mongoose.model('StrRecipient', recipientSchema);
module.exports = StrRecipient;
