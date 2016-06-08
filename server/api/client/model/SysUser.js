"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const userSchema = {
    email: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true},
    nick_name: {type: String, required: true, trim: true},
    last_login_time: {type: Date},

    roles : [{type: mongoose.Schema.Types.ObjectId, ref: 'SysRole'}]
};

module.exports = mongoose.Schema(userSchema, config.schemaOptions);
