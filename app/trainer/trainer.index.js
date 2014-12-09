(function () {
'use strict';

angular.module('trainer', ['ngRoute', 'trainer.services'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/trainer', {
    templateUrl: 'trainer/trainer.tpl.html',
    controller: 'trainerCtrl'
  });
}])

.controller('trainerCtrl', [function() {

}]);



})();
