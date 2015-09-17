'use strict';

angular.module('mobistore.controllers', [])

  .controller('TabCtrl', ['$scope', 'Util', function($scope, Util) {
	  $scope.menuShow = false;
      $scope.showMenu = function() {
          $scope.menuShow = !$scope.menuShow;
          console.log($scope.menuShow);
      };
  }])

  .controller('HomeCtrl', ['$scope', 'Util', 'ProductMdl', 'ProductOpt', function($scope, Util, ProductMdl, ProductOpt) {
	    $scope.platform = ionic.Platform.platform();
	    var width = Util.getScreenSize().w;
	    var height = width * 0.32;
	    $scope.styleSlideHeight = {'height':height + 'px'};
	    
	    // 查找
	    ProductMdl.get({ id: '1'}).$promise.then(function(p1) {
	        console.log(p1);
	        
	        // 新增
	        p1.id = '';
	        ProductMdl.save(p1).$promise.then(function(p2) {
	        	console.log(p2);
	        	
	        	// 更新
	        	p2.name += '=';
	        	ProductMdl.save(p2).$promise.then(function(p3) {
		        	console.log(p3);
		        	
		        	// 查询
		        	ProductMdl.query({'startIndex': 0},function (ls) {
		      	      console.log(ls);
		      	      	
		      	      	// 信息
			      	  	ProductOpt.opt({act: 'doSomething', 'param': 'test'},function(json) {
			      	  		console.log(json);
				      	});
		      	  	});
		        });
	        });
	        
	    });

  }])

  .controller('CategoryCtrl', function($scope) {

  })
  .controller('ShoppingcartCtrl', function($scope) {
    var i = 0;
  })
  .controller('MineCtrl', function($scope) {
    var i = 0;
  });
