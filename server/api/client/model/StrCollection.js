"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const collectionSchema = {

	collect_time: {type: Date},

	client: {type: mongoose.Schema.Types.ObjectId, ref: 'StrClient'},
	product: {type: mongoose.Schema.Types.ObjectId, ref: 'StrProduct'},
  enabled: {type: Boolean}
}

module.exports = mongoose.Schema(collectionSchema, config.schemaOptions);
