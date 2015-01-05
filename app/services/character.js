angular.module('CharacterModule', [])
    .service('Character', ['$log', function ($log) {

        var Character = function (data) {
            if (angular.isDefined(data)) {

                this.key = data.key;
                this.character = data.character;
                this.group = data.group;
                this.repetitionHistory = angular.isDefined(data.repetitionHistory) ? data.repetitionHistory : []
                this.status = angular.isDefined(data.status) ? data.status : 'unseen';
            }
            else {
                $log.error('CHARACTER: no data');
            }
            //this.status = 'unseen';

            //this.repetitionHistory = [];

        };
        //Character.prototype

        Character.prototype.getRepetitionHistory = function () {
            return this.repetitionHistory;
        };
        Character.prototype.addToRepetitionHistory = function (newItem) {
            var MAX_LENGTH = 10;

            if (this.repetitionHistory.length === MAX_LENGTH) {
                this.repetitionHistory.shift();
            }

            this.repetitionHistory.push({outcome: newItem, time: new Date().getTime()});
            return this.repetitionHistory;
        };
        Character.prototype.getEase = function () {
            value = 0;
            if (this.repetitionHistory.length > 6) {
                return this.getAverage();
            }
            return value;
        };
        Character.prototype.getAverage = function () {
            var correct = 0;
            var wrong = 0;

            angular.forEach(this.repetitionHistory, function (entry) {


                if (entry.outcome === true) {
                    correct += 1;
                }
                else if (entry.outcome === false) {
                    wrong += 1;
                }


            });
            wrong = wrong === 0 ? 1 : wrong;

            return correct / wrong;

        };


        return Character;
    }]);

