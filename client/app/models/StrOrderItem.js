"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const orderItemSchema = {
	unitPrice: {type: Number},
	qty: {type: Number},
	amount: {type: Number},
	name: {type: String, required: true, trim: true},
	image: {type: String, required: true, trim: true},
  enabled: {type: Boolean, default: true},

	product: {type: mongoose.Schema.Types.ObjectId, ref: 'StrProduct'},
	order: {type: mongoose.Schema.Types.ObjectId, ref: 'StrOrder'}
}

module.exports = mongoose.Schema(orderItemSchema, config.schemaOptions);
