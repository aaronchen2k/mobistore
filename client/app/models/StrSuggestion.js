"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const suggestionSchema = {
  enabled: {type: Boolean, default: true},
	content: {type: String, required: true, trim: true},
  date: {type: Date},
	client: {type: mongoose.Schema.Types.ObjectId, ref: 'StrClient'}
}

module.exports = mongoose.Schema(suggestionSchema, config.schemaOptions);
