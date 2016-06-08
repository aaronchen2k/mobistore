"use strict";
const mongoose = require('mongoose');

var config = require('./config');

const areaSchema = {
	area_name: {type: String, required: true, trim: true},
	short_name: {type: String, required: true, trim: true},
	lng: {type: String, required: true, trim: true},
	lat: {type: String, required: true, trim: true},
	level : {type: Number},
  position: {type: String, required: true, trim: true},
  sort: {type: Number},

	parent: {type: mongoose.Schema.Types.ObjectId, ref: 'SysArea'}
}

module.exports = mongoose.Schema(areaSchema, config.schemaOptions);

