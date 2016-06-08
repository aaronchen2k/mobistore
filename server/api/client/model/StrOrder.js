"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const orderSchema = {
	currency: {type: String},
	pay_channel: {type: Number},
	amount: {type: Number},
	freight: {type: Number},
	total_amount: {type: Number},
	pay_amount: {type: Number},

	recipient: {type: String, required: true, trim: true},
	recipient_area: {type: String, required: true, trim: true},
	recipient_street: {type: String, required: true, trim: true},
	recipient_address: {type: String, required: true, trim: true},
	recipient_name: {type: String, required: true, trim: true},
	recipient_phone: {type: String, required: true, trim: true},

  create_time: {type: Date},
  pay_time: {type: Date},
  ship_time: {type: Date},

	status: {type: String, required: true, trim: true},

	client: {type: mongoose.Schema.Types.ObjectId, ref: 'StrClient'},
	items: [{type: mongoose.Schema.Types.ObjectId, ref: 'StrOrderItems'}]
}

module.exports = mongoose.Schema(orderSchema, config.schemaOptions);
