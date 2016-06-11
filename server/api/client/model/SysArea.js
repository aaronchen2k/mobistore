"use strict";
const mongoose = require('mongoose');

var config = require('./config');

const areaSchema = {
	areaName: {type: String, required: true, trim: true},
	shortName: {type: String, required: true, trim: true},
	lng: {type: String, required: true, trim: true},
	lat: {type: String, required: true, trim: true},
	level : {type: Number},
  position: {type: String, required: true, trim: true},
  sort: {type: Number},
  enabled: {type: Boolean, default: true},

	parent: {type: mongoose.Schema.Types.ObjectId, ref: 'SysArea'}
}

module.exports = mongoose.Schema(areaSchema, config.schemaOptions);

