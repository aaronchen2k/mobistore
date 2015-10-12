'use strict';

angular.module('mobistore.models', [])

//var models = ['client', 'home'];
//for (var i = 0; i < models.length; i++) {
//	angular.module('mobistore.models', [])
//		.factory(StringUtil.upcaseFirst(name) + 'Opt', ['$resource', 'Constant', function($resource, Constant){
//	    return $resource(Constant.ApiPath + name+ '/opt/:act', {act:'@act'}, {
//	        'opt': {method:'POST'}
//	    });
//	}])
//	console.log(StringUtil.upcaseFirst(name) + 'Opt');
//}

.factory('ClientOpt', ['$resource', 'Constant', function($resource, Constant){
    return $resource(Constant.ApiPath + 'client/opt/:act', {act:'@act'}, {
        'opt': {method:'POST'}
    });
}])

.factory('HomeOpt', ['$resource', 'Constant', function($resource, Constant){
    return $resource(Constant.ApiPath + 'home/opt/:act', {act:'@act'}, {
        'opt': {method:'POST'}
    });
}])

.factory('CategoryOpt', ['$resource', 'Constant', function($resource, Constant){
    return $resource(Constant.ApiPath + 'category/opt/:act', {act:'@act'}, {
        'opt': {method:'POST'}
    });
}])

.factory('ProductMdl', ['$resource', 'Constant', function($resource, Constant){
    return $resource(Constant.ApiPath + 'product/model/:id', {id:'@id'}, {});
}])

.factory('ProductOpt', ['$resource', 'Constant', function($resource, Constant){
    return $resource(Constant.ApiPath + 'product/opt/:act', {act:'@act'}, {
        'opt': {method:'POST'}
    });
}])

.factory('ShoppingcartOpt', ['$resource', 'Constant', function($resource, Constant){
    return $resource(Constant.ApiPath + 'shoppingcart/opt/:act', {act:'@act'}, {
        'opt': {method:'POST'}
    });
}])
.factory('OrderOpt', ['$resource', 'Constant', function($resource, Constant){
    return $resource(Constant.ApiPath + 'order/opt/:act', {act:'@act'}, {
        'opt': {method:'POST'}
    });
}])
.factory('AddressOpt', ['$resource', 'Constant', function($resource, Constant){
    return $resource(Constant.ApiPath + 'address/opt/:act', {act:'@act'}, {
        'opt': {method:'POST'}
    });
}])
.factory('MsgOpt', ['$resource', 'Constant', function($resource, Constant){
    return $resource(Constant.ApiPath + 'msg/opt/:act', {act:'@act'}, {
        'opt': {method:'POST'}
    });
}])
.factory('CollectionOpt', ['$resource', 'Constant', function($resource, Constant){
    return $resource(Constant.ApiPath + 'collection/opt/:act', {act:'@act'}, {
        'opt': {method:'POST'}
    });
}])
.factory('SearchOpt', ['$resource', 'Constant', function($resource, Constant){
    return $resource(Constant.ApiPath + 'search/opt/:act', {act:'@act'}, {
        'opt': {method:'POST'}
    });
}]);
