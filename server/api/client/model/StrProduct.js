"use strict";

const mongoose = require('mongoose');

var config = require('./config.js');

const productSchema = {
	name: {type: String, required: true, trim: true},
	descr: {type: String, required: true, trim: true},
	image: {type: String, required: true, trim: true},

	freight: {type: Number},
	freightFreeIfTotalAmount: {type: Number},
	orderPeriod: {type: Number},
	qty: {type: Number},
	startTime: {type: Date},
	endTime: {type: Date},

	mass: {type: Number},
	capacity: {type: Number},
	color: {type: String, required: true, trim: true},
	size: {type: String, required: true, trim: true},

	batchNumb: {type: String, required: true, trim: true},
	productionDate: {type: Date},
	shelfLife: {type: Number},

	recommend: {type: Boolean},
	hot: {type: Boolean},
	promotion: {type: Boolean},

	collect: {type: Number, default: 0},
  retailPrice: {type: Number},
	discountPrice: {type: Number},

	tags: {type: String, required: true, trim: true},
	category: {type: mongoose.Schema.Types.ObjectId, ref: 'StrClient'}
}

module.exports = mongoose.Schema(productSchema, config.schemaOptions);
