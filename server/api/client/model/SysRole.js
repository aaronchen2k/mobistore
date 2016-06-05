"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const roleSchema = {
    _id: mongoose.Schema.ObjectId,
    code: {type: String, required: true, trim: true},
    name: {type: String, required: true, trim: true},

    users : [{type: mongoose.Schema.Types.ObjectId, ref: 'SysUser'}]
}

module.exports = mongoose.Schema(roleSchema, config.schemaOptions);
