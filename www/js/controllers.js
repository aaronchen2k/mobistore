'use strict';

angular.module('mobistore.controllers', [])

  .controller('TabCtrl', ['$scope', '$timeout', '$ionicSlideBoxDelegate', 'Util', 'HomeOpt', function($scope, $timeout, $ionicSlideBoxDelegate, Util, HomeOpt) {
	  $scope.menuShow = false;
      $scope.showMenu = function() {
          $scope.menuShow = !$scope.menuShow;
          console.log($scope.menuShow);
      };
      
    HomeOpt.opt({act: 'index'},function(json) {
    	console.log(json);
    	$scope.categories = json.categories;
    	$scope.adverts = json.adverts;
    	$scope.products = json.products;
    	
  	});
  }])

  .controller('HomeCtrl', ['$scope', 'Util', 'HomeOpt', 'ProductMdl', 'ProductOpt', function($scope, Util, HomeOpt, ProductMdl, ProductOpt) {
	    $scope.platform = ionic.Platform.platform();
	    var width = Util.getScreenSize().w;
	    var height = width * 0.57;
	    $scope.styleSlideHeight = {'height':height + 'px', 'width': width + 'px'};
	    
//	    // 查找
//	    ProductMdl.get({ id: '1'}).$promise.then(function(p1) {
//	        console.log(p1);
//	        
//	        // 新增
//	        p1.id = '';
//	        ProductMdl.save(p1).$promise.then(function(p2) {
//	        	console.log(p2);
//	        	
//	        	// 更新
//	        	p2.name += '=';
//	        	ProductMdl.save(p2).$promise.then(function(p3) {
//		        	console.log(p3);
//		        	
//		        	// 查询
//		        	ProductMdl.query({'startIndex': 0},function (ls) {
//		      	      console.log(ls);
//		      	      	
//		      	      	// 信息
//			      	  	ProductOpt.opt({act: 'doSomething', 'param': 'test'},function(json) {
//			      	  		console.log(json);
//				      	});
//		      	  	});
//		        });
//	        });
//	        
//	    });

  }])

  .controller('CategoryCtrl', function($scope) {

  })
  .controller('ShoppingcartCtrl', function($scope) {
    var i = 0;
  })
  .controller('MineCtrl', function($scope) {
    var i = 0;
  });
