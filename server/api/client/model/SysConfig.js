"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const configSchema = {
	android_mkt: {type: String, required: true, trim: true},
	ios_mkt: {type: String, required: true, trim: true}
}

module.exports = mongoose.Schema(configSchema, config.schemaOptions);
