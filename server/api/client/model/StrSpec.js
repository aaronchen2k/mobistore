"use strict";

const mongoose = require('mongoose');

var config = require('../../config');

/**
 * @author aaron
 * 产品的规格，规格会影响价格，不同于属性
 * 比如 颜色-红色、尺寸-大号
 */
const specSchema = {
	id: mongoose.Schema.ObjectId,
	name: {type: String, required: true, trim: true},
	descr: {type: String, required: true, trim: true},

	type: {type: mongoose.Schema.Types.ObjectId, ref: 'StrSpecType'},
}

module.exports = mongoose.Schema(specSchema, config.schemaOptions);