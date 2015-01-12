angular.module('LookupModule', ['DataServicesModule']).factory('lookupService', ['dataService', function (dataService) {
    var service = {


        get: function (hanzi) {


            return this.dictionary[hanzi];
        }
    };

    dataService.getDict().then(function (data) {
        console.log(data);
        service.dictionary = data;
    });


    return service;
}]);