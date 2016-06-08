"use strict";

const mongoose = require('mongoose');

var config = require('./config');

const clientSchema = {
    mobile: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true},
    nick_name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    auth_token: {type: String, required: true, trim: true},
    verify_code: {type: String, required: true, trim: true},
    last_login_time: {type: Date},
    reward_points: {type: Number},

    // 当前登录的设备类型
    client_platform: {type: String, required: true, trim: true},
    // 当前登录的浏览器类型
    client_agent: {type: String, required: true, trim: true},
    // 友盟设备Token
    device_token: {type: String, required: true, trim: true},

	addresses: [{type: mongoose.Schema.Types.ObjectId, ref: 'StrRecipient'}]
}

module.exports = mongoose.Schema(clientSchema, config.schemaOptions);
