"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const dbConst = require('../../../constants/db.json');
const ProductDao = require('../dao/product');
const ShoppingCartDao = require('../dao/shoppingCart');
const ShoppingCartItemDao = require('../dao/shoppingCartItem');
const StrAdvert = require('../dao/advert');

module.exports = class HomeService {
    static getData(req, res) {
       return Promise.join(HomeService.getProducts(), HomeService.getAdverts(), HomeService.getShoppingCartItemNumb(),
            function (products, adverts, shoppingCartItemNumb) {
                // console.log('===', products, adverts, shoppingCartItemNumb);

                return new Promise((resolve, reject) => {
                    resolve({
                            code: 1,
                            data: {
                                products: products,
                                adverts: adverts,
                                shoppingCartItemNumb: shoppingCartItemNumb
                            }
                        });
                });
            }
        );
    }

    static getProducts () {
        return ProductDao.list();
    }

    static getAdverts () {
        return  StrAdvert.list();
    }

    static getShoppingCartItemNumb () {
      return  ShoppingCartDao.getItemNumb(dbConst.testUserId);
    }
};
