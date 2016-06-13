"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const orderItemSchema = require('../model/StrOrderItem');

const StrOrderItem  = mongoose.model('StrOrderItem', orderItemSchema);
module.exports = StrOrderItem;
