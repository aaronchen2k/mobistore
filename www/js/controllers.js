'use strict';

angular.module('mobistore.controllers', [])
  .controller('ClientCtrl', ['$rootScope', '$scope', '$location', '$timeout', '$ionicHistory', 'Util', 'clientSrv', 
                             function($rootScope, $scope, $location, $timeout, $ionicHistory, Util, clientSrv) {
	  var platform = ionic.Platform.platform();
	  var isWebView = ionic.Platform.isWebView();
	  
	  $scope.client = {mobile: '16612345678', password: '123456'};
	  $scope.signon = function() {
		  clientSrv.signon($scope.client, platform);
	  }
	  
	  $scope.$on('$viewContentLoaded', function(event) {
	      
	  });
	  
  }])
  .controller('TabCtrl', ['$rootScope', '$scope', '$location', '$timeout', '$ionicHistory', 'Util', 'HomeOpt', 
                          function($rootScope, $scope, $location, $timeout, $ionicHistory, Util, HomeOpt) {
	  
	  $scope.toHome = function() {
		  $ionicHistory.nextViewOptions({ historyRoot: true });
		  $location.path('/tab/home');
	  }
  }])

  .controller('HomeCtrl', ['$rootScope', '$scope', '$state', '$location', '$timeout', '$ionicHistory', '$ionicModal', '$ionicPopover', 'Util', 'StringUtil', 'HomeOpt', 'ProductMdl', 'ProductOpt', 'SearchOpt', 
                           function($rootScope, $scope, $state, $location, $timeout, $ionicHistory, $ionicModal, $ionicPopover, Util, StringUtil, HomeOpt, ProductMdl, ProductOpt, SearchOpt) {
	  $rootScope.fromHome = true;
	  
	  $scope.$on('$ionicView.enter', function( scopes, states ) {
		  if ($scope.loaded) {
			  return;
		  }
		  
	 	  HomeOpt.opt({act: 'index'},function(json) {
//			  console.log(json);
			  $scope.categories = json.categories;
			  $scope.adverts = json.adverts;
			  $scope.products = json.products;	
			  $rootScope.shoppingcartItemNumb = json.shoppingcartItemNumb;
			  
			  if(json.code == 1) {
				  $scope.loaded = true;
			  }
		  });
	   });
	  
//	  window.addEventListener("orientationchange", function() {
//		　　$scope.resize();
//	  }, false);
//	  
//	  $scope.resize = function() {
//		  $scope.platform = ionic.Platform.platform();
//	    var width = Util.getScreenSize().w;
//	    var height = width * 0.57;
//	    
//	    if (ionic.Platform.isAndroid()window.devicePixelRatio) {
//	    	height = height / window.devicePixelRatio;
//	    	width = width / window.devicePixelRatio;
//	    }
//
//	    $scope.styleSlideHeight = {'height':height + 'px', 'width': width + 'px'};
//	  };
//	  $scope.resize();
 	  
	  $scope.menuShow = false;$scope.categories
	  $scope.showMenu = function() {
	      $scope.menuShow = !$scope.menuShow;
	  };
	
	  $scope.showCategory = function(item) {
		  console.log(item.id);
		  $rootScope.fromWhereToProducts = 'category';
		  $rootScope.categoryId = item.id;
		  $location.path('/tab/products');
		  $scope.menuShow = false;
	  };
	  
	  $scope.searchProducts = function() {
		  $rootScope.fromWhereToProducts = 'homebar';
		  $location.path('/tab/products');
	  };
	  $scope.showProdcut = function(id) {
		  $rootScope.showProductFromHome = true;
		  $location.path('/tab/product/'+ id);
	  };
  }])
  
  .controller('ProductsCtrl', ['$rootScope', '$scope', '$state', '$location', '$ionicModal', '$timeout', 'Util', 'StringUtil', 'CategoryOpt', 'ProductMdl', 'SearchOpt', 
                             function($rootScope, $scope,  $state, $location, $ionicModal, $timeout, Util, StringUtil, CategoryOpt, ProductMdl, SearchOpt) {
	  
	  $scope.inputData = {};
	  $scope.resultLoadKeywordsData = [];
	  $scope.showLoadKeywordsResult = false;
	  
	  $scope.$on('$ionicView.enter', function( scopes, states ) {
		  $scope.loadData(); // 初始化默认的列表数据 
	  });
	  
	  if (!$scope.modalLoaded) {
		  $ionicModal.fromTemplateUrl('templates/search/search.html', {
		    scope: $scope,
		    animation: 'slide-in'
		  }).then(function(modal) {
		    $rootScope.modal = modal;
		    $scope.modalLoaded = true;
		  });
	  }
	  
	  $scope.loadData = function() {
		  if (!$rootScope.fromHome) { // 浏览器刷新
			  $scope.search();
		  }
		  
		  if ($rootScope.fromWhereToProducts === 'homebar') { // from home search bar
			  $rootScope.fromWhereToProducts = '';
			  $scope.openModal();
		  } else if ($rootScope.fromWhereToProducts === 'category') { // from category
			  if (!$scope.tags) {
				  $scope.tags = {};
			  }
			  
			  if ($scope.tags.fromWhereToProducts != $rootScope.fromWhereToProducts // 来源不一样
					  || $scope.tags.categoryId != $rootScope.categoryId) { // 分类不一样
				  
				  $scope.tags.fromWhereToProducts = $rootScope.fromWhereToProducts;
				  $scope.tags.categoryId = $rootScope.categoryId;
				  
				  CategoryOpt.opt({act:'listProduct', categoryId: $scope.categoryId}).$promise.then(function(json) {
					  console.log(json);
					  $scope.products = json.data;
					  
					  $scope.loaded = true;
				  });
			  }
		  } else {
			  if (!$scope.loaded) {
			 	  SearchOpt.opt({act: 'search', keywords: ''},function(json) {
			 		  console.log(json);
					  $scope.products = json.data;
					  
					  $scope.loaded = true;
				  });
			  }
		  }
	  };
	  
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

	  $scope.search = function(keywords) {
		  $rootScope.fromWhereToProducts = 'search';
		  
		  if (StringUtil.isEmpty(keywords)) {
			  keywords = $scope.inputData.keywords;
		  }
		  
		  $rootScope.keywords = keywords;
		  console.log(keywords);
		  
		  $scope.showLoadKeywordsResult = false;
		  $scope.closeModal();
	 	  SearchOpt.opt({act: 'search', keywords: keywords},function(json) {
	 		  console.log(json);
			  $scope.products = json.data;
			  
			  $scope.loaded = true;
		  });
	 	  return false;
	  };
	  
	  $scope.keywordsChange = function() {
		  $scope.loadKeywords($scope.inputData.keywords)
	  };
	  
	  $scope.showProdcut = function(id) {
		  $location.path('/tab/product/'+ id);
	  };
	  
	  $scope.openModal = function() {
		  $scope.inputData = {};
		  $rootScope.modal.show();
		  
	 	  SearchOpt.opt({act: 'history'},function(json) {
			  console.log(json);
			  $scope.hots = json.hots;
			  $scope.histories = json.histories;
		  });
	  };
	  
	  $scope.cancel = function() {
		  $scope.closeModal();
		  
		  if (!$scope.loaded) {
			  SearchOpt.opt({act: 'search', keywords: $rootScope.keywords},function(json) {
		 		  console.log(json);
				  $scope.products = json.data;
				  
				  $scope.loaded = true;
			  });
		  }
	  };
	  
	  $scope.closeModal = function() {
	    $rootScope.modal.hide();
	  };
	  $scope.$on('$destroy', function() {
		  if ($rootScope.modal) {
			  $rootScope.modal.remove();
		  }
	  });
	  $scope.$on('modal.hidden', function() {
	    
	  });
	  $scope.$on('modal.removed', function() {
	    
	  });
  }])
  
  .controller('ProductCtrl', ['$rootScope', '$scope', '$state', '$location', '$ionicNavBarDelegate', '$ionicHistory', 'Util', 'ClientOpt', 'ProductMdl', 'ProductOpt', 'ShoppingcartOpt',
                              function($rootScope, $scope, $state, $location, $ionicNavBarDelegate, $ionicHistory, Util, ClientOpt, ProductMdl, ProductOpt, ShoppingcartOpt) {

	  $scope.shopping = {qty: 1};
	  var productId = $state.params.productId;
	  
	  $scope.$on('$ionicView.enter', function( scopes, states ) {
		  ProductOpt.opt({act:'get', productId: productId}).$promise.then(function(json) {
//			  console.log(json);
			  
			  $scope.product = json.data;
			  $scope.collectCls = json.isCollected? 'ion-android-favorite': 'ion-android-favorite-outline';
			  
			  console.log($ionicHistory.backView());
			  
			  if ($rootScope.showProductFromHome || $ionicHistory.backView() == null) {
				  $scope.myBackButtonShow = true;
				  $rootScope.showProductFromHome = false;
			  }
		  }); 
	  });
	  
	  $scope.toProducts = function(product) {
		  $scope.myBackButtonShow = false;
		  $ionicHistory.nextViewOptions({ historyRoot: true });
		  $location.path('/tab/products');
	  };
	  
	  $scope.collect = function(product) {
    	  console.log(product.id + '-' + $scope.isCollected);
    	  
    	  ProductOpt.opt({act:'collect', productId: product.id}).$promise.then(function(json) {
    		  console.log(json);
    		  if (json.code == 1) {
    			  $scope.collectCls = json.data? 'ion-android-favorite': 'ion-android-favorite-outline';
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
	  
	  $scope.$on('$ionicView.enter', function( scopes, states ) {
		  ShoppingcartOpt.opt({act: 'info'},function(json) {
//		  		console.log(json);
		  		
		  		$scope.cart = json.data;
		  		$scope.isEmpty = $scope.cart.totalAmount == 0;
		  		if (json.data.addresses.length > 0) {
		  			$scope.address = json.data.addresses[0];
		  		}
		  });
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

  .controller('MineCtrl', ['$state', '$rootScope', '$scope', '$location', 'ClientOpt', 
                           function($state, $rootScope, $scope, $location, ClientOpt) {
	  
	  $scope.$on('$ionicView.enter', function( scopes, states ) {
		  ClientOpt.opt({act: 'info', platform: ionic.Platform.platform()},function(json) {
		  		console.log(json);
		  		
		  		$scope.info = json;
		  });
	   });
	  
	  $scope.editProfile = function() {
		  $rootScope.client = $scope.info.client;
		  $location.path('/tab/profile');
	  };
	  
	  $scope.gotoMkt = function(url) {
		  console.log($scope.info.rateUrl);
	  };
	  
	  $scope.showOrders = function(orderFilter) {
		  $rootScope.fromCart = false;
		  
		  $rootScope.orderFilter = orderFilter;
		  $location.path('/tab/orders');
	  };
  }])
  .controller('ProfileCtrl', ['$state', '$rootScope', '$scope', '$location', '$ionicPopup', 'StringUtil', 'ClientOpt', 
                           function($state, $rootScope, $scope, $location, $ionicPopup, StringUtil, ClientOpt) {
	  if (!$rootScope.client) {
		  ClientOpt.opt({act: 'info', platform: ionic.Platform.platform()},function(json) {
		  		console.log(json);
		  		$rootScope.client = json.client;
		  });
	  }
	  
	  $scope.save = function() {
		  $rootScope.client.mobile = StringUtil.trim($rootScope.client.mobile);
		  $rootScope.client.nickName = StringUtil.trim($rootScope.client.nickName);
		  
		  if (StringUtil.isEmpty($rootScope.client.mobile) || StringUtil.isEmpty($rootScope.client.nickName)) {
			  var alertPopup = $ionicPopup.alert({
				     title: '用户名和姓名不能为空!',
				     okText: '确定',
				     okType: 'button-light'
			  });
			  return;
		  }
		  
		  var request = {act: 'save', mobile: $rootScope.client.mobile, nickName: $rootScope.client.nickName};
		  ClientOpt.opt(request, function(json) {
		  		console.log(json);
		  		$location.path('/tab/mine');
		  });
	  };
	  
	  $scope.$on('$ionicView.enter', function( scopes, states ) {
		  
	  });
  }])
  .controller('OrdersCtrl', ['$state', '$rootScope', '$scope', '$location', 'OrderOpt', 
                             function($state, $rootScope, $scope, $location, OrderOpt) {
	  console.log($rootScope.orderFilter);
	  
	  $scope.$on('$ionicView.enter', function( scopes, states ) {
		  OrderOpt.opt({act: 'list', filter: $rootScope.orderFilter},function(json) {
		  		console.log(json);
		  		
		  		$scope.orders = json.data;
		  });
	   });
	  
	  $scope.showOrder = function(id) {
		  $rootScope.fromCart = false;
		  $location.path('/tab/order/'+ id);
	  };
  }])
  .controller('OrderCtrl', ['$scope', '$state', '$ionicHistory', '$location', 'OrderOpt', 
                            function($scope, $state, $ionicHistory, $location, OrderOpt) {
	  $scope.tab = 1;
	  var orderId = $state.params.orderId;
	  
	  $scope.$on('$ionicView.enter', function( scopes, states ) {
		  OrderOpt.opt({act: 'info', orderId: orderId},function(json) {
		  		console.log(json);
		  		
		  		$scope.order = json.data;
		  });
	   });
	  
	  $scope.show = function(tab) {
			$scope.tab = tab;	
	  };
	  $scope.toMine = function(tab) {
		  $ionicHistory.nextViewOptions({
			  historyRoot: true
		  });
		  $location.path('/tab/mine');	
	  };
	  
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
