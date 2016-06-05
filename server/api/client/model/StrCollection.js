"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const collectionSchema = {
	_id: mongoose.Schema.ObjectId,

	collectTime: {type: Date},

	client: {type: mongoose.Schema.Types.ObjectId, ref: 'StrClient'},
	product: {type: mongoose.Schema.Types.ObjectId, ref: 'StrProduct'}

}

module.exports = mongoose.Schema(collectionSchema, config.schemaOptions);
