'use strict';

angular.module('mobistore.utils', [])

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
