"use strict";

const express = require('express');
const HomeRoutes = require('../api/client/routes/home');
const ProductRoutes = require('../api/client/routes/product');

module.exports = class Routes {
   static init(app, router) {
       HomeRoutes.init(router);
       ProductRoutes.init(router);

       app.use(express.static(__dirname + '/../../public/'));

       app.all('*', function(req, res,next) {
           console.log('req.headers.origin = ' + req.headers.origin);

           /**
            * Response settings
            * @type {Object}
            */
           var responseSettings = {
               "AccessControlAllowOrigin": req.headers.origin,
               "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
               "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
               "AccessControlAllowCredentials": true
           };

           /**
            * Headers
            */
           res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
           res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
           res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
           res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

           if ('OPTIONS' == req.method) {
               res.send(200);
           }
           else {
               next();
           }
       });

       app.use('/', router);
   }
}
