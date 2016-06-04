"use strict";

const mongoose = require('mongoose');

var config = require('../../config');

const recipientSchema = {
	_id: mongoose.Schema.ObjectId,
	
    name: {type: String, required: true, trim: true},
    phone: {type: String, required: true, trim: true},
    province: {type: String, required: true, trim: true},
    city: {type: String, required: true, trim: true},
    region: {type: String, required: true, trim: true},
    street: {type: String, required: true, trim: true},
    address: {type: String, required: true, trim: true},
    default: {type: Boolean, required: true, trim: true},

	client: {type: mongoose.Schema.Types.ObjectId, ref: 'StrClient'}
}

module.exports = mongoose.Schema(recipientSchema, config.schemaOptions);