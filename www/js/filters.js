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

//    	FEATURE("FEATURE"), INIT("INIT"),IN_PROGRESS("IN_PROGRESS"),SUCCESSED("SUCCESS");
//    	FEATURE("BACK"), INIT("INIT"),IN_PROGRESS("IN_PROGRESS"),SUCCESSED("SUCCESS");
    	
    	var payStatus = order.payStatus;
    	var shipStatus = order.shipStatus;
    	var status;
        if (shipStatus != 'INIT') {
            if (shipStatus === 'IN_PROGRESS') {
            	status = '发货中';
            } else if (shipStatus === 'SUCCESS') {
            	status = '已签收';
            } else if (shipStatus === 'BACK'){
            	status = '已退回';
            }
        } else {
        	if (payStatus === 'IN_PROGRESS') {
            	status = '支付已提交';
            } else if (shipStatus === 'SUCCESS') {
            	status = '支付已完成';
            } else if (shipStatus === 'FEATURE'){
            	status = '支付失败';
            } else {
            	status = '未支付';
            }
        }
        return status;
    }
}]);
