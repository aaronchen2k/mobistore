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
}])

.filter('orderStatus', ['Constant', 'StringUtil', function(Constant, StringUtil) {
    return function(order) {
    	if (!order) {
    		return;
    	}
    	
    	var s = order.status;
    	var status;
        
        if (s === 'INIT') {
        	status = '未支付';
        } else if (s === 'PAYING') {
        	status = '支付中';
        } else if (s === 'PAID'){
        	status = '已支付';
        } else if (s === 'SHIPPING'){
        	status = '发货中';
        } else if (s === 'RECEIVED'){
        	status = '已收货';
        } else if (s === 'RATED'){
        	status = '已评价';
        } else if (s === 'CANCEL'){
        	status = '已取消';
        } else if (s === 'PAY_FEATURE'){
        	status = '支付错误';
        } else if (s === 'SHIPPING_FEATURE'){
        	status = '快递问题';
        }

        return status;
    }
}])
.filter('booleanToCn', ['Constant', 'StringUtil', function(Constant, StringUtil) {
    return function(bl) {
        if (bl == true) {
        	return '是';
        } else {
        	return '否';
        }
        
        var inx = url.lastIndexOf('/');
        var rst = url.substring(0, inx + 1) + 'thumbnail' + url.substring(inx);
        return rst;
    }
}]);
