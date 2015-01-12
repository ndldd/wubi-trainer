(function () {
    "use strict";

    angular.module('wubi.lookupView', ['ngRoute', 'DataServicesModule', 'LookupViewControllers'])

        .config(['$routeProvider', function ($routeProvider) {


            $routeProvider.when('/lookup', {
                templateUrl: 'lookup-view/lookup-view.tpl.html',
                controller: 'LookupViewController',
                resolve: {
                    keyCodes: function (dataService) {

                        return dataService.getKeyCodes();

                    }

                }
            });

        }]);


}());
