'use strict';

angular.module('mobistore.services', [])

  .factory('productionRes', ['$resource', '$http', 'Constant', function($resource, $http, Constant){
      var res = $resource(Constant.ApiPath + 'production/:id', {id:'@id'});
      return res
  }])
  .factory('productionSrv', ['$http', 'Constant', function($http, Constant){

  }])

  .factory('tokenAuthSrv', ['$rootScope', '$cookies', '$q', '$http', '$location', 'Constant', 'StringUtil',
                                          function($rootScope, $cookies, $q, $http, $location, Constant, StringUtil){

       //return function () {
       //   if ($rootScope.userProfile) {
       //       if ($rootScope.userProfile.type === 'admin') {
       //           $location.path("/admin");
       //       } else {
       //           $location.path("/app/list");
       //       }
       //   } else {
       //       var userToken = $cookies.userToken;
       //
       //       if (!StringUtil.isEmpty(userToken)) {
       //           $http.post(Constant.ApiPath + 'user/signonWithToken', { token: userToken })
       //               .success(function (json) {
       //                   if (json.code === 1) {
       //                       $rootScope.userProfile = json.data;
       //                       if (json.data.type === 'admin') {
       //                           $location.path("/admin");
       //                       } else {
       //                           $location.path("/app/list");
       //                       }
       //                   } else {
       //                       $location.path("/signon");
       //                   }
       //               })
       //               .error(function () {
       //                   $location.path("/signon");
       //               });
       //       } else {
       //           $location.path("/signon");
       //       }
       //   }
       //}
  }]);
