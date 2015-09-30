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
		  $rootScope.categoryId = item.id;
		  $location.path('/tab/products');
		  $scope.menuShow = false;
	  };
	  
	  $scope.listProducts = function() {
		  $rootScope.showSearch = true;
		  $location.path('/tab/products');
	  };
	  $scope.showProdcut = function(id) {
		  $location.path('/tab/product/'+ id);
	  };
	  
  }])
  
  .controller('ProductsCtrl', ['$rootScope', '$scope', '$state', '$location', '$ionicModal', 'Util', 'StringUtil', 'CategoryOpt', 'ProductMdl', 'SearchOpt', 
                             function($rootScope, $scope,  $state, $location, $ionicModal, Util, StringUtil, CategoryOpt, ProductMdl, SearchOpt) {
	  $scope.inputData = {};
	  $scope.resultLoadKeywordsData = [];
	  $scope.showLoadKeywordsResult = false;
	  
	  $scope.resetLoadKeywords = function() {
		  $scope.inputData = {};
		  $scope.resultLoadKeywordsData = [];
		  $scope.showLoadKeywordsResult = false;
	  };
	  $scope.loadKeywords = function(keywords) {
		  console.log(keywords);
		  
		  keywords = StringUtil.trim(keywords);
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
		  var categoryId = $rootScope.categoryId;
		  if (!StringUtil.isEmpty(categoryId)) {
			  $rootScope.categoryId = '';
			  CategoryOpt.opt({act:'listProduct', categoryId: categoryId}).$promise.then(function(json) {
				  console.log(json);
				  $scope.products = json.data;
			  });
		  } else {
			  SearchOpt.opt({act: 'search', keywords: ''},function(json) {
		 		  console.log(json);
				  $scope.products = json.data;
			  });  
		  }
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
	    if ($rootScope.showSearch) {
	    	$rootScope.showSearch = false;
	    	$scope.openModal();
	    }
	  });
  }])
  
  .controller('ProductCtrl', ['$rootScope', '$scope', '$state', '$location', 'Util', 'ClientOpt', 'ProductMdl', 'ProductOpt', 'ShoppingcartOpt',
                              function($rootScope, $scope, $state, $location, Util, ClientOpt, ProductMdl, ProductOpt, ShoppingcartOpt) {
	  $scope.shopping = {qty: 1};
	  var productId = $state.params.productId;
	  
	  ProductOpt.opt({act:'get', productId: productId}).$promise.then(function(json) {
		  console.log(json);
		  
		  $scope.product = json.data;
		  $scope.isCollected = json.isCollected;
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
    		  
    		  $rootScope.shoppingcartItemNumb = json.data.items.length;
    		  
    	  });
      };
	  
	  $scope.buy = function(product) {
    	  console.log(product.id);
    	  
    	  ShoppingcartOpt.opt({act:'buy', productId: product.id}).$promise.then(function(json) {
    		  console.log(json);
    	  });
      };
      $scope.toShoppingcart = function(product) {
    	  $rootScope.hideTabs = false;
    	  $location.path('/tab/shoppingcart');
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
  .controller('ShoppingcartCtrl', ['$rootScope', '$scope', '$location', '$ionicModal', '$ionicPopover', 'StringUtil', 'ShoppingcartOpt', 'OrderOpt',  
                                   function($rootScope, $scope, $location, $ionicModal, $ionicPopover, StringUtil, ShoppingcartOpt, OrderOpt) {
	  $scope.isEmpty = false;
	  
	  ShoppingcartOpt.opt({act: 'info'},function(json) {
	  		console.log(json);
	  		
	  		$scope.cart = json.data;
	  		$scope.isEmpty = $scope.cart.totalAmount == 0;
	  		if (json.data.addresses.length > 0) {
	  			$scope.address = json.data.addresses[0];
	  		}
	  });
	  
	  $scope.qtyChange = function(item) {
			console.log(item);	
			if (StringUtil.isEmpty(StringUtil.trim(item.qty))) {
				return;
			}
			ShoppingcartOpt.opt({act: 'changeQty', itemId: item.id, itemQty: item.qty}, function(json) {
		  		console.log(json);
		  		
		  		$scope.cart = json.data;
		  		$scope.isEmpty = $scope.cart.totalAmount == 0;
			});
	  };
	  
	  $scope.clear = function() {
		  ShoppingcartOpt.opt({act:'clear'}).$promise.then(function(json) {
    		  console.log(json);
    		  $scope.cart = json.data;
    		  $scope.isEmpty = $scope.cart.totalAmount == 0;
    		  $rootScope.shoppingcartItemNumb = 0;
    	  });	
	  };
	  $scope.checkout = function() {
		  var request = {act:'checkout'};
		  request = angular.extend(request, $scope.address);
		  
		  if ($rootScope.shoppingcartItemNumb > 0) {
			  ShoppingcartOpt.opt(request).$promise.then(function(json) {
	    		  console.log(json);
	    		  
	    		  $rootScope.shoppingcartItemNumb = 0;
	    		  var orderId = json.orderId
	    		  $rootScope.fromCart = true;
	    		  $location.path('/tab/order/' + orderId);
	    	  });
		  }
	  };
  }])

  .controller('FindCtrl', ['$scope', function($scope) {
    var i = 0;
  }])

  .controller('MineCtrl', ['$state', '$rootScope', '$scope', '$location', 'OrderOpt', 
                           function($state, $rootScope, $scope, $location, OrderOpt) {
	  $scope.showOrders = function() {
		  $rootScope.fromCart = false;
		  $location.path('/tab/orders');
	  };
  }])
  .controller('OrdersCtrl', ['$state', '$rootScope', '$scope', '$location', 'OrderOpt', 
                             function($state, $rootScope, $scope, $location, OrderOpt) {
	  var orderId = $state.params.orderId;
	  
	  OrderOpt.opt({act: 'list', orderId: orderId},function(json) {
	  		console.log(json);
	  		
	  		$scope.orders = json.data;
	  });
	  
	  $scope.showOrder = function(id) {
		  $rootScope.fromCart = false;
		  $location.path('/tab/order/'+ id);
	  };
  }])
  .controller('OrderCtrl', ['$scope', '$state', '$ionicHistory', '$location', 'OrderOpt', 
                            function($scope, $state, $ionicHistory, $location, OrderOpt) {
	  $scope.tab = 1;
	  
	  $scope.show = function(tab) {
			$scope.tab = tab;	
	  };
	  $scope.toMine = function(tab) {
		  $ionicHistory.nextViewOptions({
			  historyRoot: true
		  });
		  $location.path('/tab/mine');	
	  };
	  
	  var orderId = $state.params.orderId;
	  
	  OrderOpt.opt({act: 'info', orderId: orderId},function(json) {
	  		console.log(json);
	  		
	  		$scope.order = json.data;
	  });
	  
  }])
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
