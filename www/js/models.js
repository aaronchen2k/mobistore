'use strict';

angular.module('mobistore.models', [])

.factory('ProductMdl', ['$resource', 'Constant', function($resource, Constant){
    return $resource(Constant.ApiPath + 'product/model/:id', {id:'@id'}, {});
}])

.factory('ProductOpt', ['$resource', 'Constant', function($resource, Constant){
    return $resource(Constant.ApiPath + 'product/opt/:act', {act:'@act'}, {
        'opt': {method:'POST'}
    });
}]);
