'use strict';

angular.module('wubi.infoView', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/info', {
            templateUrl: 'view3/info-view.tpl.html',
            controller: 'InfoController'
        });
    }])
    .controller('InfoController', ['$scope', function ($scope) {
    }]);