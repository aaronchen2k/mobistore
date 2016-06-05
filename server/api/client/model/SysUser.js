"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const userSchema = {
    _id: mongoose.Schema.ObjectId,
    email: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true},
    nickName: {type: String, required: true, trim: true},
    lastLoginTime: {type: Date},

    roles : [{type: mongoose.Schema.Types.ObjectId, ref: 'SysRole'}]
};

module.exports = mongoose.Schema(userSchema, config.schemaOptions);
