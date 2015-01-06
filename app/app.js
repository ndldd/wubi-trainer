'use strict';

// Declare app level module which depends on views, and components
angular.module('wubi', [
    'ngRoute',
    'ngMaterial',
    'ngSanitize',
    'ui.bootstrap',

    'wubi.practiceView',
    'wubi.setupView',
    'wubi.infoView'

]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/setup'});
    }])
    .config(function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('wubiApp');
    });