"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const suggestionSchema = require('../model/StrSuggestion');

suggestionSchema.statics.list = () => {
    return new Promise((resolve, reject) => {
      let _query = {enabled: true};

      StrSuggestion.find(_query)
          .exec((err, json) => {
              err ? reject(err)
                  : resolve(json);
          });
      });
}

suggestionSchema.statics.save = (suggestion, clientId) => {
  return new Promise((resolve, reject) => {

    StrSuggestion.create({
        client: {_id: clientId},
        content: suggestion.content,
        date: new Date(),
        enabled: true},
      function (err, product) {
        err ? reject(err)
          : resolve(product);
      });
  });
}

const StrSuggestion  = mongoose.model('StrSuggestion', suggestionSchema);
module.exports = StrSuggestion;
