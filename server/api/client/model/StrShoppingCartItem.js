"use strict";

const mongoose = require('mongoose');

var config = require('../../config');

const shoppingCartItemSchema = {
	_id: mongoose.Schema.ObjectId,
	
	unitPrice: {type: Number},
	qty: {type: Number},
	amount: {type: Number},
	freight: {type: Number},
	freightFreeIfTotalAmount: {type: Number},
	name: {type: String, required: true, trim: true},
	image: {type: String, required: true, trim: true},

	product: {type: mongoose.Schema.Types.ObjectId, ref: 'StrProduct'},
	shoppingCart: {type: mongoose.Schema.Types.ObjectId, ref: 'StrShoppingCart'}
}

module.exports = mongoose.Schema(shoppingCartItemSchema, config.schemaOptions);