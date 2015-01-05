(function () {
    "use strict";
    angular.module('tutorDirectives', ['services', 'wubiConstants', 'feedbackModule'])
        .directive('syncFocusWith', ['$timeout', '$rootScope', function ($timeout, $rootScope) {
            return {
                restrict: 'A',
                scope: {
                    focusValue: "=syncFocusWith"
                },
                link: function ($scope, $element, attrs) {
                    $scope.$watch("focusValue", function (currentValue, previousValue) {
                        $timeout(function () {
                            if (currentValue === true) {


                                $element[0].focus();


                            } else if (currentValue === false) {


                                $element[0].blur();

                            }
                        }, 0);

                    });
                }
            };
        }])


        .directive('showAnswerViaChannel', ['feedbackChannel', function (feedbackChannel) {
            return {
                template: '<div ng-show="eventReceived"> wrong via channel</div>',
                link: function (scope) {

                    feedbackChannel.subscribe(scope, function () {
                        scope.eventReceived = true;
                    });

                }

            };

        }])
        .directive('showAnswer', ['feedbackService', function (feedbackService) {
            return {
                template: '<div ng-show="visible"> hallo</div>',
                link: function (scope, el, attrs) {

                    scope.$watch(scope.display.showAnswerByService, function (nv, ov) {
                    });
                }

            };
        }])

        .directive('ngEnter', ['keyEventHandler', 'KEYS', function (keyEventHandler, KEYS) {
            return {
                link: function (scope, element, attrs) {
                    // element has focus

                    element.bind("keydown", function (event) {

                        var keyPressed = event.which;
                        if (keyPressed === KEYS.ESC) {

                            scope.$apply(function () {
                                scope.stopFocusInput();
                            });
                        }
                        else {
                            if (keyPressed === KEYS.SPACE) {
                                if (scope.keyboard.isFocused) {              // stopfocus input
                                    scope.stopFocusInput();
                                }
                                else {
                                    scope.startFocusInput();
                                }

                            }
                            scope.$apply(function () {
                                keyEventHandler.handle(keyPressed);
                            });
                            event.preventDefault();

                        }
                    });
                }
            };
        }]);
}());