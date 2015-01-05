(function () {
    "use strict";
    angular.module('wubiValues', []).constant("keyCodes",['dataService', function(dataService){

        return dataService.getKeyCodes();

    }]);

}());
