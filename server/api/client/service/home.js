"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const ProductDao = require('../dao/product');
const AdvertDao = require('../dao/advert');

module.exports = class HomeService {
    static getData(req, res) {
       return Promise.join(HomeService.getProducts(), HomeService.getAdverts(),
            function (products, adverts) {
                console.log('===', products, adverts);

                return new Promise((resolve, reject) => {
                    resolve(
                        {
                            code: 1,
                            data: {
                                products: products,
                                adverts: adverts,
                                shoppingcartItemNumb: 3
                            }
                        }
                    );
                });
            }
        );
    }

    static getProducts (req, res) {
        return ProductDao.list();
    }

    static getAdverts (req, res) {
        return  AdvertDao.list();
    }
};
