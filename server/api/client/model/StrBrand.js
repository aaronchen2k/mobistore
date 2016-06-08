"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const brandSchema = {
	name: {type: String, required: true, trim: true},
	descr: {type: String, required: true, trim: true},

	series: {type: mongoose.Schema.Types.ObjectId, ref: 'StrSeries'}
}

module.exports = mongoose.Schema(brandSchema, config.schemaOptions);
