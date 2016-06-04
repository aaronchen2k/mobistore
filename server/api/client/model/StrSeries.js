"use strict";

const mongoose = require('mongoose');

var config = require('../../config');

const seriesSchema = {
	_id: mongoose.Schema.ObjectId,
	
	name: {type: String, required: true, trim: true},
	descr: {type: String, required: true, trim: true},

	brand: {type: mongoose.Schema.Types.ObjectId, ref: 'StrBrand'}
}

module.exports = mongoose.Schema(seriesSchema, config.schemaOptions);