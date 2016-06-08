"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const configSchema = {
	androidMkt: {type: String, required: true, trim: true},
	iosMkt: {type: String, required: true, trim: true}
}

module.exports = mongoose.Schema(configSchema, config.schemaOptions);
