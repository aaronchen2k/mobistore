"use strict";

const mongoose = require('mongoose');

var config = require('../../config');

const suggestionSchema = {
	_id: mongoose.Schema.ObjectId,
	content: {type: String, required: true, trim: true},

	client: {type: mongoose.Schema.Types.ObjectId, ref: 'StrClient'}
}

module.exports = mongoose.Schema(suggestionSchema, config.schemaOptions);