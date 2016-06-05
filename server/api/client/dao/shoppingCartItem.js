"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const shoppingCartItemSchema = require('../model/StrShoppingCartItem');


const StrShoppingCartItem  = mongoose.model('StrShoppingCartItem', shoppingCartItemSchema);
module.exports = StrShoppingCartItem;
