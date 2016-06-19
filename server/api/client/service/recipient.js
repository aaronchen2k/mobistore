"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const CONSTANTS = require('../../../constants/constants');
const ClientDao = require('../dao/client');
const RecipientDao = require('../dao/recipient');

module.exports = class RecipientService {

  static save (recipient0, clientId) {
    return new Promise((resolve, reject) => {

      RecipientDao.allNotDefault(recipient0, clientId).then(recipient => {
        if (!recipient0._id) {
          recipient0.client =  {_id: clientId};
          RecipientDao.create(recipient0,
            function (err, doc) {
              err ? reject(err): {};

              ClientDao.getWithAllRecipient(clientId).then(client => {
                client.recipients.push(doc._id);
                client.save(
                  function (err, clt) {
                    err ? reject(err)
                      : resolve(doc);
                  });
              }).catch(error => reject(error));
            });
        } else {
          RecipientDao.findById(recipient0._id)
            .exec((err, doc) => {
              err ? reject(err): {};

              Object.keys(recipient0).forEach(function(key) {
                if (key != '_id' && key != 'id') {
                  doc[key] = recipient0[key];
                }
              });

              doc.save(
                function (err, doc) {
                  err ? reject(err)
                    : resolve(doc);
                });
            });
        }
      });
    });
  }
};
