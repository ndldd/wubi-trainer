(function () {
    "use strict";
    angular.module('RunnerModule', ['DataServicesModule', 'ListMakerModule'])
        .factory('runner', ['dataService', 'listMaker', '$log', 'tutor', '$location', function (dataService, listMaker, $log, tutor, $location) {
            //var SETUP_VIEW_PATH = 'setup';

            var service = {
                learningQueue: [],
                nextQueueIndex: 0,
                currentIndex: 0,
                percent: 0,
                initialQueueLength: 0,


                removeCurrent: function () {
                    this.learningQueue.splice(this.currentIndex, 1);
                },

                refillList: function () {
                    var list = listMaker.makeListFromSelectionObject();
                    if (list.length === 0) {
                        throw "RUNNER_HAS_EMPTY_REFILL_LIST";
                    }
                    for (var i = 0; i < list.length; i++) {
                        this.learningQueue.push(list[i]);
                    }
                    this.updatePercent();
                    if (listMaker.selection && listMaker.selection.random) {

                        this.randomize();
                    }

                },

                updatePercent: function () {
                    this.percent = (this.initialQueueLength - this.learningQueue.length) / this.initialQueueLength * 100;
                },

                setLearningQueue: function (list) {
                    this.learningQueue = list;
                    this.initialQueueLength = list.length;
                    this.updatePercent();
                    this.currentIndex = 0;
                    this.nextQueueIndex = 1;
                },

                getProgressPercent: function () {
                    this.updatePercent();
                    return this.percent;
                },

                getCurrent: function () {
                    return this.learningQueue[this.currentIndex];
                },

                getNext: function () {
                    //$log.log('runner next called');
                    // loop through the learning queue
                    if (this.learningQueue.length === 0) {
                        //$log.log('runner list is empty refill');
                        try {
                            this.refillList();
                        }
                        catch (e) {

                            $location.path('setup');

                        }
                        this.nextQueueIndex = 0;
                        this.currentIndex = 0;
                    }
                    if (this.nextQueueIndex >= this.learningQueue.length) {
                        this.nextQueueIndex = 0;
                    }
                    var currentElement = this.learningQueue[this.nextQueueIndex];
                    this.currentIndex = this.nextQueueIndex;
                    this.nextQueueIndex += 1;

                    this.updatePercent();
                    //$log.log('runner next returns', currentElement);
                    return currentElement;

                },
                start: function () {
                    //console.log('tutor', this.getCurrent());
                    //console.log('tutor', this.learningQueue[this.currentIndex]);
                    if (listMaker.selection && listMaker.selection.random) {
                        this.randomize();

                    }
                    tutor.set(this.getCurrent());
                },

                prompt: function () {
                    // save before removing!
                    dataService.saveCharacterToCash(this.getCurrent());
                    dataService.saveCache();
                    if (!tutor.wrongAnswerGiven) {
                        if (this.getCurrent().readyToRemove === true) {
                            this.removeCurrent(); // answered correct this time remove it from queue
                        }
                    }
                    // in any case show next character in the queue

                    var next = this.getNext();       // next in the queue
                    tutor.set(next);
                    console.log('next', tutor.currentCharacter);
                    return next;
                },

                randomize: function () {
                    var array = this.learningQueue;
                    for (var i = array.length - 1; i > 0; i--) {
                        var j = Math.floor(Math.random() * (i + 1));
                        var temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                    }
                    return array;
                }
            };

            return service;

        }]);


}());