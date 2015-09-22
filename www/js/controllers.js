'use strict';

angular.module('mobistore.controllers', [])
  .controller('ClientCtrl', ['$rootScope', '$scope', '$location', '$timeout', '$ionicHistory', 'Util', 'clientSrv', 
                             function($rootScope, $scope, $location, $timeout, $ionicHistory, Util, clientSrv) {
	  var platform = ionic.Platform.platform();
	  var isWebView = ionic.Platform.isWebView();
	  
	  $scope.client = {mobile: '18626203266', password: '123456'};
	  $scope.signon = function() {
		  clientSrv.signon($scope.client, platform);
	  }
	  
  }])
  .controller('TabCtrl', ['$rootScope', '$scope', '$location', '$timeout', '$ionicHistory', 'Util', 'HomeOpt', 
                          function($rootScope, $scope, $location, $timeout, $ionicHistory, Util, HomeOpt) {
	  
	  
  }])

  .controller('HomeCtrl', ['$scope', '$state', '$location', '$timeout', '$ionicHistory', 'Util', 'HomeOpt', 'ProductMdl', 'ProductOpt', 
                           function($scope, $state, $location, $timeout, $ionicHistory, Util, HomeOpt, ProductMdl, ProductOpt) {

	  window.addEventListener("orientationchange", function() {
		　　$scope.resize();
	  }, false)
	  
	  $scope.resize = function() {
		  $scope.platform = ionic.Platform.platform();
	    var width = Util.getScreenSize().w;
	    var height = width * 0.57;
	    $scope.styleSlideHeight = {'height':height + 'px', 'width': width + 'px'};
	  };
	  $scope.resize();
	  
	  HomeOpt.opt({act: 'index'},function(json) {
		  console.log(json);
		  $scope.categories = json.categories;
		  $scope.adverts = json.adverts;
		  $scope.products = json.products;	
	  });
 	 
	  $scope.menuShow = false;$scope.categories
	  $scope.showMenu = function() {
	      $scope.menuShow = !$scope.menuShow;
	  };
	
	  $scope.showCategory = function(item) {
		  console.log(item.id);
		  $location.path('/tab/category/' + item.id + '/products');
		  $scope.menuShow = false;
	  };
	  
	  $scope.showProdcut = function(id) {
		  $location.path('/tab/product/'+ id);
	  };
  }])
  
  .controller('CategoryCtrl', ['$scope', '$state', 'Util', 'ProductMdl', 'CategoryOpt', function($scope,  $state, Util, ProductMdl, CategoryOpt) {
	  var categoryId = $state.params.categoryId;
	  CategoryOpt.opt({act:'listProduct', categoryId: categoryId}).$promise.then(function(json) {
		  console.log(json);
		  $scope.productsIn = json.data;
	  });
  }])
  
  .controller('ProductCtrl', ['$rootScope', '$scope', '$state', 'Util', 'ProductMdl', 'ProductOpt', function($rootScope, $scope, $state, Util, ProductMdl, ProductOpt) {
	  var productId = $state.params.productId;
	  ProductMdl.get({id: productId}).$promise.then(function(vo) {
		  console.log(vo);
		  $scope.product = vo;
	  });
	  
	  $scope.addToShoppingcart = function(product) {
    	  console.log(product.id);
      };
	  
	  $scope.buy = function(product) {
    	  console.log(product.id);
      };
	  
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

  .controller('FindCtrl', function($scope) {
    var i = 0;
  })
  .controller('ShoppingcartCtrl', function($scope) {
    var i = 0;
  })
  .controller('MineCtrl', function($scope) {
    var i = 0;
  });
