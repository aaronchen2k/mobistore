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
   	});
  }])

  .controller('HomeCtrl', ['$scope', '$state', '$location', 'Util', 'HomeOpt', 'ProductMdl', 'ProductOpt', function($scope, $state, $location, Util, HomeOpt, ProductMdl, ProductOpt) {
	  $scope.resize = function() {
		  $scope.platform = ionic.Platform.platform();
	    var width = Util.getScreenSize().w;
	    var height = width * 0.57;
	    $scope.styleSlideHeight = {'height':height + 'px', 'width': width + 'px'};
	  };
	  $scope.resize();
	  
	  window.addEventListener("orientationchange", function() {
		　　$scope.resize();
	  }, false)
	  
	 HomeOpt.opt({act: 'index'},function(json) {
    	console.log(json);
    	$scope.products = json.products;
    	
  	 });
	  
	  $scope.showProdcut = function(item) {
		  console.log($location.path());
		  $location.path('/tab/product/'+ item.id);
	  };
  }])
  
  .controller('ProductCtrl', ['$scope', '$state', 'Util', 'ProductMdl', 'ProductOpt', function($scope,  $state, Util, ProductMdl, ProductOpt) {
	  
	  var productId = $state.params.productId;
	  ProductMdl.get({id: productId}).$promise.then(function(vo) {
		  console.log(vo);
		  $scope.product = vo;
	  });
	  
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
