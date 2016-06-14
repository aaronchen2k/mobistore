"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const CONSTANTS = require('../../../constants/constants');
const RecipientDao = require('../dao/recipient');

module.exports = class RecipientService {

  static save (address) {
    return new Promise((resolve, reject) => {

      RecipientDao.allNotDefault(address).then(recipient => {
        console.log(33, recipient);

        if (!address._id) {
          RecipientDao.create(address,
            function (err, doc) {
              err ? reject(err)
                : resolve(doc);
            });
        } else {
          RecipientDao.findById(address._id)
            .exec((err, doc) => {
              err ? reject(err): {};

              Object.keys(address).forEach(function(key) {
                if (key != '_id' && key != 'id') {
                  doc[key] = recipient[key];
                }
              });
              console.log(44, recipient);

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
