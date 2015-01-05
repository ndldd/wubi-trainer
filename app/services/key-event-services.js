(function () {
    "use strict";
    angular.module('services', ['tutorServices', 'wubiConstants', 'feedbackModule', 'RunnerModule']).

        factory('keyEventHandler', ['tutor', 'KEYS', 'feedbackService', 'runner', '$mdSidenav', function (tutor, KEYS, feedbackService, runner, $mdSidenav) {
            return {
                handle: function (keyNumber) {

                    var notCheckedKeys = [KEYS.ENTER, KEYS.ESCAPE, KEYS.SPACE];

                    if ((notCheckedKeys.indexOf(keyNumber) === -1)) {

                        tutor.check(keyNumber);
                        if (tutor.promptNext) {
                            // tutor could check answer was correct

                            runner.prompt();
                        }


                    }
                    if (keyNumber === KEYS.SPACE) {
                        $mdSidenav('right').toggle();
                        tutor.markWrong();
                    }
                    if (keyNumber === KEYS.ENTER) {
                        feedbackService.toggleKeyboardVisibilty();
                    }

                }
            };
        }

        ]);
}());