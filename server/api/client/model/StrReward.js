"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const rewardSchema = {
	rewardPoints: {type: Number},
	rewardTime: {type: Date},
	source: {type: String, required: true, trim: true},

	client: {type: mongoose.Schema.Types.ObjectId, ref: 'StrClient'}
}

module.exports = mongoose.Schema(rewardSchema, config.schemaOptions);
