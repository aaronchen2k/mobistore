"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const shoppingCartSchema = {
    createTime: {type: Date},
    amount: {type: Number},
    freight: {type: Number},
    totalAmount: {type: Number},
    enabled: {type: Boolean, default: true},

    client: {type: mongoose.Schema.Types.ObjectId, ref: 'StrClient'},
    items: [{type: mongoose.Schema.Types.ObjectId, ref: 'StrShoppingCartItem'}]
}

module.exports = mongoose.Schema(shoppingCartSchema, config.schemaOptions);
