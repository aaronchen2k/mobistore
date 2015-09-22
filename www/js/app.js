'use strict';

// Ionic MobiStore App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'mobistore' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'mobistore.services' is found in services
// 'mobistore.controllers' is found in controllers
angular.module('mobistore', ['ngResource', 'ionic', 'ngCookies', 
                             'mobistore.utils', 'mobistore.filters', 'mobistore.models', 'mobistore.controllers', 'mobistore.services'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $provide, $httpProvider, $ionicConfigProvider) {
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
	.state('signon', {
	    url: '/signon',
	    templateUrl: 'templates/signon.html',
	    controller: 'ClientCtrl'
	  })

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: 'TabCtrl'
      })

      // Each tab has its own nav history stack:
      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('tab.category', {
        url: '/category/:categoryId/products',
        views: {
          'tab-home': {
            templateUrl: 'templates/category/products.html',
            controller: 'CategoryCtrl'
          }
        }
      })
      .state('tab.product', {
        url: '/product/:productId',
        views: {
          'tab-home': {
            templateUrl: 'templates/product/product.html',
            controller: 'ProductCtrl'
          }
        }
      })
      .state('tab.find', {
        url: '/find',
        views: {
          'tab-find': {
            templateUrl: 'templates/find.html',
            controller: 'FindCtrl'
          }
        }
      })
      .state('tab.shoppingcart', {
        url: '/shoppingcart',
        views: {
          'tab-shoppingcart': {
            templateUrl: 'templates/shoppingcart.html',
            controller: 'ShoppingcartCtrl'
          }
        }
      })
      .state('tab.mine', {
        url: '/mine',
        views: {
          'tab-mine': {
            templateUrl: 'templates/mine.html',
            controller: 'MineCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

    // register the interceptor as a service
    $provide.factory('myHttpInterceptor', ['$rootScope', '$cookies', '$q', '$location', 'Constant', 
                                           function($rootScope, $cookies, $q, $location, Constant) {
      return {
        'request': function(config) {
        	
          if (!config.params) {
        	  config.params = {};
          }
          
          if (config.url.indexOf('/api/') > -1 && config.params) {
        	  console.log(config);
        	  config.params.pageSize = Constant.PageSize;
        	  config.params.token = $cookies.userToken;
          }
          
          return config || $q.when(config);
        },

        'requestError': function(rejection) {
          // do something on error
          //if (canRecover(rejection)) {
          //  return responseOrNewPromise
          //}
          return $q.reject(rejection);
        },

        'response': function(response) {
        	if (response.data.code < 0) {
        		$location.path("/signon");;
        	}
        	
          return response;
        },

        'responseError': function(rejection) {
          console.log('responseError');
          $location.path("/signon");
          return $q.reject(rejection);
        }
      };
    }]);

    $httpProvider.interceptors.push('myHttpInterceptor');
    
    
  });
