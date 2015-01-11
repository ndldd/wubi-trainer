(function () {
    "use strict";
    angular.module('HanziModule', ['CharacterModule']).
        factory('Hanzi', ['Character', function (Character) {


            var Hanzi = function (data) {
                Character.call(this, data);
                if (angular.isDefined(data)) {
                    this.wubiCode = (angular.isDefined(data.wubiCode)) ? data.wubiCode : [];
                }
            };

            Hanzi.prototype = Object.create(Character.prototype);

            return Hanzi;


        }]);
}());