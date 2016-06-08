"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const verifyCodeSchema = {
	code: {type: String, required: true, trim: true},
	create_time: {type: Date, default: Date.now},
	expire_time: {type: Date},

	user: {type: mongoose.Schema.Types.ObjectId, ref: 'SysUser'}
}

module.exports = mongoose.Schema(verifyCodeSchema, config.schemaOptions);
