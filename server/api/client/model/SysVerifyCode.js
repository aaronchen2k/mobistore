"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const verifyCodeSchema = {
	code: {type: String, required: true, trim: true},
	createTime: {type: Date, default: Date.now},
	expireTime: {type: Date},

	user: {type: mongoose.Schema.Types.ObjectId, ref: 'SysUser'}
}

module.exports = mongoose.Schema(verifyCodeSchema, config.schemaOptions);
