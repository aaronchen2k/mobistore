"use strict";

const mongoose = require('mongoose');

var config = require('./config');

/**
 * @author aaron
 * 具体到某个产品，说明有哪些 规格
 * 比如 衬衫A-白、衬衫A-黑、衬衫A-大号
 */
const specProductSchema = {
  enabled: {type: Boolean, default: true},

	product: {type: mongoose.Schema.Types.ObjectId, ref: 'StrProduct'},
	spec: {type: mongoose.Schema.Types.ObjectId, ref: 'StrSpec'},
	specType: {type: mongoose.Schema.Types.ObjectId, ref: 'StrSpecType'},
}

module.exports = mongoose.Schema(specProductSchema, config.schemaOptions);
