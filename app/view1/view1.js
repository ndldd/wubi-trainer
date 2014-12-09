'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])
    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which !==27 && event.which !==32) {
                    console.log('keypress' + String(event.which));

                    scope.$apply(function(){

                    scope.doSomething(event.which);
                    })  ;

                }
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    })

    .controller('View1Ctrl', ['$scope','testDataService','trainerService', function ($scope, testDataService, trainerService) {

        $scope.testList = testDataService.testList;
        $scope.input = {lastKeystroke:''};
        $scope.doSomething = function (number) {
            $scope.input.lastKeystroke = number;

            //alert('test' + number);
        };
    }]);