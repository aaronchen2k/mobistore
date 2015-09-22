'use strict';

angular.module('mobistore.services', [])

.factory('clientSrv', ['$rootScope', '$cookies', '$q', '$http', '$location', 'Constant', 'StringUtil', 'ClientOpt',
                                        function($rootScope, $cookies, $q, $http, $location, Constant, StringUtil, ClientOpt){

     return {
    	 signon: function (client) {
    		 console.log(client);
    		 
    		 ClientOpt.opt({act: 'signon', mobile: client.mobile, password: client.password}).$promise.then(function(json) {
       		  	console.log(json);

                if (json.code == 1) {
                	$cookies.userToken = json.token;
                    $rootScope.userProfile = json.data;
                    $location.path("/tab/home");
                } else {
                    $location.path("/signon");
                }
             });
    	 },
    	 signonWithToken: function () {
	        if ($rootScope.userProfile) {
	            if ($rootScope.userProfile.type === 'admin') {
	                $location.path("/admin");
	            } else {
	                $location.path("/app/list");
	            }
	        } else {
	            var userToken = $cookies.userToken;
	
	            if (!StringUtil.isEmpty(userToken)) {
	            	ClientOpt.opt({act: signonWithToken, token: userToken}).$promise.then(function(json) {
	          		  	console.log(json);
	
		                if (json.code === 1) {
		                    $rootScope.userProfile = json.data;
		                    $location.path("/tab/home");
		                } else {
		                    $location.path("/signon");
		                }
	                    });
	            } else {
	                $location.path("/signon");
	            }
	        }
	     }
     }
}]);