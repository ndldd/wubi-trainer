(function () {
    "use strict";

    angular.module('wubi.practiceView', ['ngRoute', 'DataServicesModule','practiceViewControllers', 'tutorDirectives'])

        .config(['$routeProvider', function ($routeProvider) {


            $routeProvider.when('/practice', {
                templateUrl: 'view1/practiceView.tpl.html',
                controller: 'PracticeViewController',
                resolve: {
                    keyCodes: function (dataService) {

                        return dataService.getKeyCodes();

                    }

                }
            });

        }]);


}());
