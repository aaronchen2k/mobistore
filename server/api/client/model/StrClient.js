"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const clientSchema = {
    mobile: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true},
    nick_name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    authToken: {type: String, required: true, trim: true},
    verifyCode: {type: String, required: true, trim: true},
    lastLoginTime: {type: Date},
    rewardPoints: {type: Number},

    // 当前登录的设备类型
    clientPlatform: {type: String, required: true, trim: true},
    // 当前登录的浏览器类型
    clientAgent: {type: String, required: true, trim: true},
    // 友盟设备Token
    deviceToken: {type: String, required: true, trim: true},

	  addresses: [{type: mongoose.Schema.Types.ObjectId, ref: 'StrRecipient'}]
}

module.exports = mongoose.Schema(clientSchema, config.schemaOptions);
