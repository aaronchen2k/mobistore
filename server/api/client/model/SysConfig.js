"use strict";

const mongoose = require('mongoose');

var config = require('../../config');

const configSchema = {
	_id: mongoose.Schema.ObjectId,
	androidMkt: {type: String, required: true, trim: true},
	iosMkt: {type: String, required: true, trim: true}
}

module.exports = mongoose.Schema(configSchema, config.schemaOptions);
