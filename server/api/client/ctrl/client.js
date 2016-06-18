"use strict";

const CONSTANTS = require('../../../constants/constants');
const ClientService = require('../service/client');
const ClientDao = require('../dao/client');

module.exports = class ClientCtrl {
  static signup(req, res) {

  }
  static signon(req, res) {

  }
  static signout(req, res) {

  }
  static forgotPassword(req, res) {

  }
  static resetPassword(req, res) {

  }
  static getProfile(req, res) {
    ClientDao.getProfile(CONSTANTS.testClientId).then(product => res.status(200).json({
        code: 1,
        data: product
      }))
      .catch(error => res.status(400).json(error));
  }

  static saveProfile(req, res) {
    let profile = req.body.profile;

    ClientDao.saveProfile(profile, CONSTANTS.testClientId)
      .then(profile => res.status(200).json({
        code: 1,
        data: profile
      }))
      .catch(error => res.status(400).json(error));
  }

  static list(req, res) {

  }
  static get(req, res) {

  }
  static save(req, res) {

  }
  static delete(req, res) {

  }
}
