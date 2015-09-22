'use strict';

angular.module('mobistore.services', [])

.factory('clientSrv', ['$rootScope', '$cookieStore', '$q', '$http', '$location', 'Constant', 'StringUtil', 'ClientOpt',
                                        function($rootScope, $cookieStore, $q, $http, $location, Constant, StringUtil, ClientOpt){

     return {
    	 signon: function (client) {
    		 console.log(client);
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