"use strict";

const mongoose = require('mongoose');

var config = require('./config');
const CONSTANTS = require('../../../constants/constants');

const orderSchema = {
	currency: {type: String},
	payChannel: {type: Number},
	amount: {type: Number},
	freight: {type: Number},
	totalAmount: {type: Number},
	payAmount: {type: Number},

	recipientArea: {type: String},
	recipientStreet: {type: String},
	recipientAddress: {type: String},
	recipientName: {type: String},
	recipientPhone: {type: String},

  createTime: {type: Date},
  payTime: {type: Date},
  shipTime: {type: Date},

	status: {type: String, default: CONSTANTS.orderStatus.created},
  enabled: {type: Boolean, default: true},

  recipient: {type: mongoose.Schema.Types.ObjectId, ref: 'StrRecipient'},
	client: {type: mongoose.Schema.Types.ObjectId, ref: 'StrClient'},
	items: [{type: mongoose.Schema.Types.ObjectId, ref: 'StrOrderItems'}]
}

module.exports = mongoose.Schema(orderSchema, config.schemaOptions);
