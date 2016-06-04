"use strict";

const mongoose = require('mongoose');

var config = require('../../config');

const orderItemSchema = {
	_id: mongoose.Schema.ObjectId,
	
	unitPrice: {type: Number},
	qty: {type: Number},
	amount: {type: Number},
	name: {type: String, required: true, trim: true},
	image: {type: String, required: true, trim: true},

	product: {type: mongoose.Schema.Types.ObjectId, ref: 'StrProduct'},
	strOrder: {type: mongoose.Schema.Types.ObjectId, ref: 'StrOrder'}
}

module.exports = mongoose.Schema(orderItemSchema, config.schemaOptions);