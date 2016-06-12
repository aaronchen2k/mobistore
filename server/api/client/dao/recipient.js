"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const clientSchema = require('../model/StrClient');
const recipientSchema = require('../model/StrRecipient');


const StrRecipient  = mongoose.model('StrRecipient', recipientSchema);
module.exports = StrRecipient;
