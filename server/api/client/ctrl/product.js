"use strict";

const ProductService = require('../service/product');
const ProductDao = require('../dao/product');
const CollectionDao = require('../dao/collection');

module.exports = class ProductCtrl {
    static list(req, res) {
        ProductDao
            .list()
            .then(products => res.status(200).json(products))
            .catch(error => res.status(400).json(error));
    }

    static get(req, res) {
        let _id = req.params.id;

        ProductService
            .getDetail(_id)
            .then(data => res.status(200).json({
              code: 1,
              data: data,

            }))
            .catch(error => res.status(400).json(error));
    }

    static collect(req, res) {
      let _id = req.body.productId;

      CollectionDao
        .collect(_id)
        .then(product => res.status(200).json({
          code: 1,
          data: product
        }))
        .catch(error => res.status(400).json(error));
    }

    static create(req, res) {
        let _product = req.body;

        ProductDao
            .create(_product)
            .then(product => res.status(201).json(product))
            .catch(error => res.status(400).json(error));
    }

    static delete(req, res) {
        let _id = req.params.id;

        ProductDao
            .delete(_id)
            .then(() => res.status(200).end())
            .catch(error => res.status(400).json(error));
    }
}
