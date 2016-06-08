"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const shoppingCartItemSchema = {
  create_time: {type: Date},
	unit_price: {type: Number},
	qty: {type: Number},
	amount: {type: Number},
	freight: {type: Number},
	freight_free_if_total_amount: {type: Number},
	name: {type: String, required: true, trim: true},
	image: {type: String, required: true, trim: true},
  enabled: {type: Boolean},

	product: {type: mongoose.Schema.Types.ObjectId, ref: 'StrProduct'},
	shopping_cart: {type: mongoose.Schema.Types.ObjectId, ref: 'StrShoppingCart'}
}

module.exports = mongoose.Schema(shoppingCartItemSchema, config.schemaOptions);
