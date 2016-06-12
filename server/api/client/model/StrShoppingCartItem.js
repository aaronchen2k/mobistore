"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const shoppingCartItemSchema = {
  createTime: {type: Date},
	unitPrice: {type: Number},
	qty: {type: Number},
	amount: {type: Number},
	freight: {type: Number},
	freightFreeIfTotalAmount: {type: Number},
	name: {type: String, required: true, trim: true},
	image: {type: String, required: true, trim: true},
  enabled: {type: Boolean, default: true},
  checkout: {type: Boolean, default: false},
  
	product: {type: mongoose.Schema.Types.ObjectId, ref: 'StrProduct'},
	shoppingCart: {type: mongoose.Schema.Types.ObjectId, ref: 'StrShoppingCart'}
}

module.exports = mongoose.Schema(shoppingCartItemSchema, config.schemaOptions);
