"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const searchHistorySchema = {
	search_time: {type: Date},
  keywords: {type: String, required: true, trim: true},

	client: {type: mongoose.Schema.Types.ObjectId, ref: 'StrClient'}

}

module.exports = mongoose.Schema(searchHistorySchema, config.schemaOptions);
