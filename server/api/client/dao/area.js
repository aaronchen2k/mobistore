"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const areaSchema = require('../model/SysArea');

areaSchema.statics.listByParentId = (level, parentId) => {
    return new Promise((resolve, reject) => {

      let _query = {parentId: parentId, level: level};

      SysArea.find(_query)
          .exec((err, json) => {

            err ? reject(err)
                : resolve(json);
        });
    });
}

const SysArea  = mongoose.model('SysArea', areaSchema);
module.exports = SysArea;
