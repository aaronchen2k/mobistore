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
	  
	  $scope.$on('$viewContentLoaded', function(event) {
	      
	  });
	  
  }])
  .controller('TabCtrl', ['$rootScope', '$scope', '$location', '$timeout', '$ionicHistory', 'Util', 'HomeOpt', 
                          function($rootScope, $scope, $location, $timeout, $ionicHistory, Util, HomeOpt) {
	  
	  $scope.toHome = function() {
		  $ionicHistory.nextViewOptions({
			  historyRoot: true
		  });
		  $location.path('/tab/home');
	  }
  }])

  .controller('HomeCtrl', ['$rootScope', '$scope', '$state', '$location', '$timeout', '$ionicHistory', '$ionicModal', '$ionicPopover', 'Util', 'StringUtil', 'HomeOpt', 'ProductMdl', 'ProductOpt', 'SearchOpt', 
                           function($rootScope, $scope, $state, $location, $timeout, $ionicHistory, $ionicModal, $ionicPopover, Util, StringUtil, HomeOpt, ProductMdl, ProductOpt, SearchOpt) {
	  $rootScope.fromHome = true;
	  
 	  HomeOpt.opt({act: 'index'},function(json) {
		  console.log(json);
		  $scope.categories = json.categories;
		  $scope.adverts = json.adverts;
		  $scope.products = json.products;	
		  $rootScope.shoppingcartItemNumb = json.shoppingcartItemNumb;
	  });
	  
	  $scope.$on("$destroy", function() {
	       console.log('scope.$destroy');
	  });
	  $scope.$on( "$ionicView.enter", function() {
	       console.log('ionicView.enter');
	  });
	  $scope.$on( "$ionicView.leave", function() {
	       console.log('$ionicView.leave');
	  });
	  $scope.$on( "$ionicView.loaded", function() {
	       console.log('$ionicView.loaded');
	  });
	  
	  window.addEventListener("orientationchange", function() {
		　　$scope.resize();
	  }, false);
	  
	  $scope.resize = function() {
		  $scope.platform = ionic.Platform.platform();
	    var width = Util.getScreenSize().w;
	    var height = width * 0.57;
	    $scope.styleSlideHeight = {'height':height + 'px', 'width': width + 'px'};
	  };
	  $scope.resize();
 	  
	  $scope.menuShow = false;$scope.categories
	  $scope.showMenu = function() {
	      $scope.menuShow = !$scope.menuShow;
	  };
	
	  $scope.showCategory = function(item) {
		  console.log(item.id);
		  $location.path('/tab/category/' + item.id + '/products');
		  $scope.menuShow = false;
	  };
	  
	  $scope.listProducts = function() {
		  $location.path('/tab/products');
	  };
	  $scope.showProdcut = function(id) {
		  $location.path('/tab/product/'+ id);
	  };
	  
  }])
    .controller('CategoryCtrl', ['$scope', '$state', 'Util', 'ProductMdl', 'CategoryOpt', function($scope,  $state, Util, ProductMdl, CategoryOpt) {
	  var categoryId = $state.params.categoryId;
	  CategoryOpt.opt({act:'listProduct', categoryId: categoryId}).$promise.then(function(json) {
		  console.log(json);
		  $scope.products = json.data;
	  });
  }])
  
  .controller('ProductsCtrl', ['$rootScope', '$scope', '$state', '$location', '$ionicModal', 'Util', 'StringUtil', 'ProductMdl', 'SearchOpt', 
                             function($rootScope, $scope,  $state, $location, $ionicModal, Util, StringUtil, ProductMdl, SearchOpt) {
	  $scope.inputData = {};
	  $scope.resultLoadKeywordsData = [];
	  $scope.showLoadKeywordsResult = false;
	  
	  $scope.resetLoadKeywords = function() {
		  alert(1);
		  $scope.inputData = {};
		  $scope.resultLoadKeywordsData = [];
		  $scope.showLoadKeywordsResult = false;
	  };
	  $scope.loadKeywords = function(keywords) {
		  console.log(keywords);
		  
//		  keywords = StringUtil.trim(keywords);
		  keywords = keywords.replace(/(^\s*)|(\s*$)/g, '');
		  if (StringUtil.isEmpty(keywords)) {
			  $scope.resultLoadKeywordsData = [];
			  $scope.showLoadKeywordsResult = false;
			  return;
		  }
	 	  SearchOpt.opt({act: 'getMatchedKeywords', keywords: keywords},function(json) {
			  $scope.resultLoadKeywordsData = json.data;
			  $scope.showLoadKeywordsResult = true;
		  });
	  };
	  
	  $scope.loadData = function() {
	 	  SearchOpt.opt({act: 'search', keywords: ''},function(json) {
	 		  console.log(json);
			  $scope.products = json.data;
		  });
	  };
	  $scope.loadData(); // 初始化默认的列表数据
	  
	  $scope.search = function(keywords) {
		  if (StringUtil.isEmpty(keywords)) {
			  keywords = $scope.inputData.keywords;
		  }
		  
		  console.log(keywords);
		  
		  $scope.showLoadKeywordsResult = false;
		  $scope.closeModal();
	 	  SearchOpt.opt({act: 'search', keywords: keywords},function(json) {
	 		  console.log(json);
			  $scope.products = json.data;
		  });
	  };
	  
	  $scope.keywordsChange = function() {
		  $scope.loadKeywords($scope.inputData.keywords)
	  };
	  
	  $scope.showProdcut = function(id) {
		  $location.path('/tab/product/'+ id);
	  };
	  
	  $scope.openModal = function() {
		  $scope.inputData = {};
	 	  SearchOpt.opt({act: 'history'},function(json) {
			  console.log(json);
			  $scope.hots = json.hots;
			  $scope.histories = json.histories;
		  });
		
	    $scope.modal.show();
	  };
	  $scope.closeModal = function() {
	    $scope.modal.hide();
	  };
	  $scope.$on('$destroy', function() {
	    $scope.modal.remove();
	  });
	  $scope.$on('modal.hidden', function() {
	    
	  });
	  $scope.$on('modal.removed', function() {
	    
	  });
	  
	  $ionicModal.fromTemplateUrl('templates/search/search.html', {
	    scope: $scope,
	    animation: 'slide-in'
	  }).then(function(modal) {
	    $scope.modal = modal;
	    $scope.openModal();
	  });
  }])
  
  .controller('ProductCtrl', ['$rootScope', '$scope', '$state', 'Util', 'ClientOpt', 'ProductMdl', 'ProductOpt', 'ShoppingcartOpt',
                              function($rootScope, $scope, $state, Util, ClientOpt, ProductMdl, ProductOpt, ShoppingcartOpt) {
	  $scope.shopping = {qty: 1};
	  var productId = $state.params.productId;
	  
	  ProductOpt.opt({act:'get', productId: productId}).$promise.then(function(json) {
		  console.log(json);
		  
		  $scope.product = json.data;
		  $scope.isCollected = json.isCollected;
		  $rootScope.shoppingcartItemNumb = json.shoppingcartItemNumb;
	  });
	  
	  $scope.collect = function(product) {
    	  console.log(product.id);
    	  
    	  if ($scope.isCollected) {
    		  return;
    	  }
    	  
    	  ProductOpt.opt({act:'collect', productId: product.id}).$promise.then(function(json) {
    		  console.log(json);
    		  if (json.code == 1) {
    			  $scope.isCollected = true;
    		  }
    	  });
      };
	  
	  $scope.addToShoppingcart = function(product) {
    	  console.log(product.id);
    	  
    	  ShoppingcartOpt.opt({act:'addto', productId: product.id, qty: $scope.shopping.qty}).$promise.then(function(json) {
    		  console.log(json);
    		  
    		  var car = json.data;
    		  $rootScope.shoppingcartItemNumb = car.items.length;
    		  
    	  });
      };
	  
	  $scope.buy = function(product) {
    	  console.log(product.id);
    	  
    	  ShoppingcartOpt.opt({act:'buy', productId: product.id}).$promise.then(function(json) {
    		  console.log(json);
    	  });
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
  })
  .controller('MsgCtrl', ['$scope', '$state', '$location', 
                          function($scope, $state, $location) {
	  var error = $state.params.error;
	  
	  if (error == -200) {
		  $scope.msg = {
    			  title: '服务请求错误',
    			  descr: '请联系系统管理人员！'
    	  };
	  } else {
		  $scope.msg = {
    			  title: '未知错误',
    			  descr: '请联系系统管理人员！'
    	  };
	  }
	  
	  $scope.backTo = function() {
		  $location.path('/tab/home');
	  }
	  
  }]);
