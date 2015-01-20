(function () {
    "use strict";
    angular.module('LookupViewControllers', ['LookupModule'])
        .controller("LookupViewController", ['$scope', 'lookupService', function ($scope, lookupService) {


            $scope.input = {hanzi: ''};
            $scope.output = {result: false};

            $scope.lookup = function () {
                $scope.output.result = lookupService.get($scope.input.hanzi);
            };
        }]);
}());