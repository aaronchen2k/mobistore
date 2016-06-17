"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const clientSchema = {
    mobile: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true},
    nickName: {type: String, required: true, trim: true},
    email: {type: String, trim: true},
    authToken: {type: String, trim: true},
    verifyCode: {type: String, trim: true},
    lastLoginTime: {type: Date},
    rewardPoints: {type: Number, default: 0},
    enabled: {type: Boolean, default: true},

    // 当前登录的设备类型
    clientPlatform: {type: String, trim: true},
    // 当前登录的浏览器类型
    clientAgent: {type: String, trim: true},
    // 友盟设备Token
    deviceToken: {type: String, trim: true},

    recipients: [{type: mongoose.Schema.Types.ObjectId, ref: 'StrRecipient'}]
}

module.exports = mongoose.Schema(clientSchema, config.schemaOptions);
