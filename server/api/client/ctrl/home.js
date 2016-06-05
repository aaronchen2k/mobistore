"use strict";

const HomeService = require('../service/home');

module.exports = class HomeCtrl {
    static loadData(req, res) {

        HomeService
            .getData()
            .then(data => res.status(200).json(data))
            .catch(error => res.status(400).json(error));
    }
}
