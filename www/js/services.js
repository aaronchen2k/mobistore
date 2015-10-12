'use strict';

angular.module('mobistore.services', [])

.factory('clientSrv', ['$rootScope', '$cookies', '$q', '$http', '$location', '$ionicPopup', 'Constant', 'StringUtil', 'ClientOpt',
                                        function($rootScope, $cookies, $q, $http, $location, $ionicPopup, Constant, StringUtil, ClientOpt){

     return {
    	 signon: function (client) {
    		 client = angular.extend(client, {act: 'signon'});
    		 ClientOpt.opt(client).$promise.then(function(json) {
       		  	console.log(json);

                if (json.code == 1) {
                	$cookies.put('userToken', json.token);
                    $rootScope.userProfile = json.data;
                    $location.path("/tab/home");
                } else {
                    $location.path("/signon");
                }
             });
    	 },
    	 signout: function (client) {
         	$cookies.put('userToken', null);
            $rootScope.userProfile = null;
            $location.path('/signon');
    	 },
    	 signup: function (client) {
    		 client = angular.extend(client, {act: 'signup'});
    		 ClientOpt.opt(client).$promise.then(function(json) {
        		 console.log(json);

                 if (json.code == 1) {
                 	$cookies.put('userToken', json.token);
                     $rootScope.userProfile = json.data;
                     $location.path("/tab/home");
                 } else {
	       			  var alertPopup = $ionicPopup.alert({
	 				     title: json.msg,
	 				     okText: '确定', okType: 'button-light' });
                 }
              });
     	 },

    	 resetPassword: function (client) {
    		 client = angular.extend(client, {act: 'resetPassword'});
    		 ClientOpt.opt(client).$promise.then(function(json) {
        		 console.log(json);

                 if (json.code == 1) {
                 	$cookies.put('userToken', json.token);
                    $rootScope.userProfile = json.data;
                    $location.path("/tab/home");
                 } else {
	       			  var alertPopup = $ionicPopup.alert({
	 				     title: json.msg,
	 				     okText: '确定', okType: 'button-light' });
                 }
              });
     	 },
    	 
//    	 signonWithToken: function () {
//	        if ($rootScope.userProfile) {
//	            if ($rootScope.userProfile.type === 'admin') {
//	                $location.path("/admin");
//	            } else {
//	                $location.path("/app/list");
//	            }
//	        } else {
//	            var userToken = $cookies.userToken;
//	
//	            if (!StringUtil.isEmpty(userToken)) {
//	            	ClientOpt.opt({act: signonWithToken, token: userToken}).$promise.then(function(json) {
//	          		  	console.log(json);
//	
//		                if (json.code === 1) {
//		                    $rootScope.userProfile = json.data;
//		                    $location.path("/tab/home");
//		                } else {
//		                    $location.path("/signon");
//		                }
//	                    });
//	            } else {
//	                $location.path("/signon");
//	            }
//	        }
//	     }
    	 
     }
}]);