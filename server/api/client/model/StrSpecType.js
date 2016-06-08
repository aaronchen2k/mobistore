"use strict";

const mongoose = require('mongoose');

var config = require('./config');

/**
 * @author aaron
 * 产品的规格类型
 * 比如 颜色、尺寸
 */
const specTypeSchema = {
	name: {type: String, required: true, trim: true},
	descr: {type: String, required: true, trim: true},

}

module.exports = mongoose.Schema(specTypeSchema, config.schemaOptions);
