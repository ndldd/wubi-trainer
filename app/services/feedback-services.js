angular.module('feedbackModule', [])
    .factory('feedbackService', ['feedbackChannel', '$log', function (feedbackChannel, $log) {
        var service = {
            showAnswer: false,
            showKeyBoard: false,
            revealAnswer: function () {

                this.showAnswer = true;
                //$log.log('feedback service show Answer true');
                feedbackChannel.publishVisibilityChange(true);
            },
            toggleKeyboardVisibilty: function () {
                this.showKeyBoard = !this.showKeyBoard;
            },
            hideAnswer: function () {
                this.showAnswer = false;
            },
            processResult: function (result) {

                //$log.log("RESULT : ", result);
                if (result.answer === "wrong") {

                    feedbackChannel.publishWrongAnswerGiven();
                }
                if (result.answer === "correct") {

                    feedbackChannel.publishCorrectAnswerGiven();
                }
            },
            warn : function(){

                //alert('warning');
            }
        };

        return service;
    }])
    .service('feedbackChannel', ['$rootScope', '$log', function ($rootScope, $log) {
        var CHANGE_VISIBILITY = 'changeVisibilityMessage';
        var changeVisibility;
        var onChangeVisibility;

        var ANSWER_GIVEN = 'answerGiven';
        // used to publish events
        var publishVisibilityChange = function (passedIn) {
            //var wrongAnswer = function () {
            $rootScope.$broadcast(CHANGE_VISIBILITY, {showAnswer: passedIn});
        };

        // used to subscribe to an event
        // subscriber scope passed in to listen to events, and trigger a handler on the subscriber
        var subscribe = function ($scope, handler) {        // need to pass scope so it can listen
            $scope.$on(CHANGE_VISIBILITY, function (event, message) {
                // note that the handler is passed the problem domain parameters
                handler(message.correctAnswer);
            });
        };
        var subscribeAnswerGiven = function ($scope, handler) {


            $scope.$on(ANSWER_GIVEN, function (event, message) {
                handler(message);

            });
        };

        var publishWrongAnswerGiven = function (passedIn) {
            //$log.log('wrong answer given');

            $rootScope.$broadcast(ANSWER_GIVEN, 'WRONG');
        };


        var publishCorrectAnswerGiven = function (passedIn) {
            //$log.log('correct answer given');
            $rootScope.$broadcast(ANSWER_GIVEN, 'CORRECT');
        };

        return {
            publishVisibilityChange: publishVisibilityChange,     // sent
            subscribe: subscribe,      // subscribe with handler
            publishWrongAnswerGiven: publishWrongAnswerGiven,
            publishCorrectAnswerGiven: publishCorrectAnswerGiven,
            subscribeAnswerGiven: subscribeAnswerGiven,

        };
    }]);