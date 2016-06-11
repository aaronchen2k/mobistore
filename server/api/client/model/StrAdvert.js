"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const advertSchema = {
	title: {type: String, required: true, trim: true},
	descr: {type: String, required: true, trim: true},
	image: {type: String, required: true, trim: true},
  enabled: {type: Boolean, default: true},

	product: {type: mongoose.Schema.Types.ObjectId, ref: 'StrProduct'}
}

module.exports = mongoose.Schema(advertSchema, config.schemaOptions);
