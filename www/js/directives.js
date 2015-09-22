'use strict';

angular.module('mobistore.directives', [])

.directive('hideTabBar', function($rootScope) {
    return {
        restrict: 'A',
        link: function($scope, $el) {
        	console.log(11111);
        	
            $rootScope.hideTabs = true;
            $scope.$on('$destroy', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
});
