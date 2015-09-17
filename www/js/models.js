'use strict';

angular.module('mobistore.models', [])

.factory('ProductMdl', ['$resource', 'Constant', function($resource, Constant){
    return $resource(Constant.ApiPath + 'test/model/:id', {id:'@id'}, {});
}])

.factory('ProductOpt', ['$resource', 'Constant', function($resource, Constant){
    return $resource(Constant.ApiPath + 'test/opt/:act', {act:'@act'}, {
        'opt': {method:'POST'}
    });
}]);
