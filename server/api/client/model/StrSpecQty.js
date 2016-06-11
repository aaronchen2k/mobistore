"use strict";

const mongoose = require('mongoose');

var config = require('./config');

/**
 * @author aaron
 * 定义某个产品规格的库存
 * 比如 衬衫A-白-大号：库存100件
 */
const specQtySchema = {
	qty: {type: Number},
  enabled: {type: Boolean, default: true},
  
	product: {type: mongoose.Schema.Types.ObjectId, ref: 'StrProduct'},

	color: {type: mongoose.Schema.Types.ObjectId, ref: 'StrSpec'},
	size: {type: mongoose.Schema.Types.ObjectId, ref: 'StrSpec'}
}

module.exports = mongoose.Schema(specQtySchema, config.schemaOptions);
