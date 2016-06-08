"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const categorySchema = {
	code: {type: String, required: true, trim: true},
	name: {type: String, required: true, trim: true},
	descr: {type: String, required: true, trim: true},
	image: {type: String, required: true, trim: true}
}

module.exports = mongoose.Schema(categorySchema, config.schemaOptions);
