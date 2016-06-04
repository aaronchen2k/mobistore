"use strict";

const mongoose = require('mongoose');

var config = require('../../config');

const viewHistorySchema = {
	_id: mongoose.Schema.ObjectId,
	viewTime: {type: Date},

	client: {type: mongoose.Schema.Types.ObjectId, ref: 'StrClient'},
	product: {type: mongoose.Schema.Types.ObjectId, ref: 'StrProduct'}
}

module.exports = mongoose.Schema(viewHistorySchema, config.schemaOptions);