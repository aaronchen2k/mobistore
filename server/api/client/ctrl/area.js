"use strict";

const AreaService = require('../service/area');
const AreaDao = require('../dao/area');

module.exports = class AreaCtrl {

  static list(req, res) {
    let type = req.body.type;
    let provinceId = req.body.provinceId;
    let cityId = req.body.cityId;
    let level = undefined;
    let parentId = undefined;

    if(type == 'region') {
      level = 3;
      parentId = cityId;
    } else if (type == 'city') {
      level = 2;
      parentId = provinceId;
    } else {
      level = 1;
      parentId = 0;
    }

    AreaDao.listByParentId(level, parentId)
      .then(data => {
        res.status(200).json({code: 1, data: data});
      })
      .catch(error => res.status(400).json(error));

  }

}
