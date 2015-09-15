'use strict';

angular.module('mobistore.utils', [])

  .factory('Constant', ['$location', function($location) {
    var PAGE_SIZE = 6;
    var SERVICE_URL_DEVELOP  = "http://localhost:9000/";
    var SERVICE_URL_PRODUCTION = "http://appset.cn/"

    var ApiVer = 'v1';
    var ApiPath = 'N/A';

    var url = $location.absUrl();
    if (url.indexOf("localhost") > -1 || url.indexOf("192.168") > -1 || url.indexOf("10.0") > -1) { // development
      ApiPath =  SERVICE_URL_DEVELOP + 'api/' + ApiVer + '/';
    } else {    // production
      ApiPath =  SERVICE_URL_PRODUCTION + 'api/' + ApiVer + '/';
    }

    return {
      PAGE_SIZE: PAGE_SIZE,
      ApiVer: ApiVer,
      ApiPath: ApiPath,

      HTTP_RETURN_CODE_SUCCESS: 1,
      HTTP_RETURN_CODE_FAIL: 0,
      HTTP_RETURN_CODE_NO_MORE: -100
    };
  }])

  .factory('Vari', [function() {
    return {
      Test: null
    };
  }])

  .factory('Util', [function(){
    return {
      getScreenSize: function () {
        var sh = window.screen.height;
        if (document.body.clientHeight < sh) {
          sh = document.body.clientHeight;
        }

        var sw = window.screen.width;
        if (document.body.clientWidth < sw) {
          sw = document.body.clientWidth;
        }
        return {h: sh, w: sw};
      }
    }
}]);
