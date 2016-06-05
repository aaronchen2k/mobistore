"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const shoppingCartSchema = {
    _id: mongoose.Schema.ObjectId,

    createTime: {type: Date},
    amount: {type: Number},
    freight: {type: Number},
    totalAmount: {type: Number},

	client: {type: mongoose.Schema.Types.ObjectId, ref: 'StrClient'},
	items: [{type: mongoose.Schema.Types.ObjectId, ref: 'StrShoppingCartItem'}]

}

module.exports = mongoose.Schema(shoppingCartSchema, config.schemaOptions);
