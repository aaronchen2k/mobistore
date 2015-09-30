'use strict';

angular.module('mobistore.directives', [])

.directive('hideTabBar', ['$rootScope', function($rootScope) {
    return {
        restrict: 'A',
        link: function($scope, $el) {
            $rootScope.hideTabs = true;
            $scope.$on('$destroy', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
}]);
