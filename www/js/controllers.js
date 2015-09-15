'use strict';

angular.module('mobistore.controllers', [])

  .controller('HomeCtrl', ['$scope', 'Util', 'productionRes', function($scope, Util, productionRes) {
    productionRes.get({'startIndex': 0},function (json) {
      console.log(json);
      $scope.productions = json.data;
    });

    $scope.platform = ionic.Platform.platform();
    var width = Util.getScreenSize().w;
    var height = width * 0.32;
    $scope.styleSlideHeight = {'height':height + 'px'};
  }])

  .controller('CategoryCtrl', function($scope) {

  })
  .controller('ShoppingcartCtrl', function($scope) {
    var i = 0;
  })
  .controller('MineCtrl', function($scope) {
    var i = 0;
  });
