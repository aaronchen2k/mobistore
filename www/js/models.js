'use strict';

angular.module('mobistore.models', [])

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

.factory('ShoppingcartMdl', ['$resource', 'Constant', function($resource, Constant){
    return $resource(Constant.ApiPath + 'shoppingcart/model/:id', {id:'@id'}, {});
}])

.factory('ShoppingcartOpt', ['$resource', 'Constant', function($resource, Constant){
    return $resource(Constant.ApiPath + 'shoppingcart/opt/:act', {act:'@act'}, {
        'opt': {method:'POST'}
    });
}])
.factory('SearchOpt', ['$resource', 'Constant', function($resource, Constant){
    return $resource(Constant.ApiPath + 'search/opt/:act', {act:'@act'}, {
        'opt': {method:'POST'}
    });
}]);
