"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const shoppingCartSchema = {
    create_time: {type: Date},
    amount: {type: Number},
    freight: {type: Number},
    total_amount: {type: Number},
    enabled: {type: Boolean},

    client: {type: mongoose.Schema.Types.ObjectId, ref: 'StrClient'},
    items: [{type: mongoose.Schema.Types.ObjectId, ref: 'StrShoppingCartItem'}]
}

module.exports = mongoose.Schema(shoppingCartSchema, config.schemaOptions);
