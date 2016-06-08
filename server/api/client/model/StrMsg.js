"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const msgSchema = {
	send_time: {type: Date},
	title: {type: String, required: true, trim: true},
	descr: {type: String, required: true, trim: true},

	client: {type: mongoose.Schema.Types.ObjectId, ref: 'StrClient'}

}

module.exports = mongoose.Schema(msgSchema, config.schemaOptions);
