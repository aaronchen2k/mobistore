'use strict';

angular.module('mobistore.filters', [])

.filter('imgPath', ['Constant', 'StringUtil', function(Constant, StringUtil) {
    return function(url, external) {
        if (StringUtil.isEmpty(url)) {
            return undefined;
        }
        if (StringUtil.isEmpty(external))  {
        	external = true;
        }

        if (external) {
            url = Constant.WebPath + url;
        }
        return url;
    }
}])

.filter('thumbPath', ['Constant', 'StringUtil', function(Constant, StringUtil) {
    return function(url) {
        if (StringUtil.isEmpty(url)) {
            return undefined;
        }
        var inx = url.lastIndexOf('/');
        var rst = url.substring(0, inx + 1) + 'thumbnail' + url.substring(inx);
        return rst;
    }
}]);