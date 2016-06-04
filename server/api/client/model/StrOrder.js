"use strict";

const mongoose = require('mongoose');

var config = require('../../config');

const orderSchema = {
	_id: mongoose.Schema.ObjectId,
	
	currency: {type: String},
	payChannel: {type: Number},
	amount: {type: Number},
	freight: {type: Number},
	totalAmount: {type: Number},
	payAmount: {type: Number},
	
	recipient: {type: String, required: true, trim: true},
	recipientArea: {type: String, required: true, trim: true},
	recipientStreet: {type: String, required: true, trim: true},
	recipientAddress: {type: String, required: true, trim: true},
	recipientName: {type: String, required: true, trim: true},
	recipientPhone: {type: String, required: true, trim: true},

    createTime: {type: Date},
    payTime: {type: Date},
    shipTime: {type: Date},

	status: {type: String, required: true, trim: true},

	client: {type: mongoose.Schema.Types.ObjectId, ref: 'StrClient'},
	items: [{type: mongoose.Schema.Types.ObjectId, ref: 'StrOrderItems'}]
}

module.exports = mongoose.Schema(orderSchema, config.schemaOptions);