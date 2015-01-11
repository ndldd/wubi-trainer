'use strict';

describe('myApp.tutorView module', function () {

    beforeEach(
        function () {
            module('tutorControllers', 'ngMaterial');
        }
    );

    beforeEach(function () {
        jasmine.addMatchers({
            toHaveFocus: function () {
                return {
                    compare: function (actual) {
                        return {
                            pass: document.activeElement === actual[0]
                        };
                    }
                };
            }
        });
    });
    describe('PracticeViewController controller', function () {

        xit('should ....', inject(function ($controller, $rootScope, $mdDialog) {
            //spec body
            var alertObj = {

                title: function () {

                },
                content: function () {

                },
                ariaLabel: function () {

                },
                ok: function () {

                },
                targetEvent: function () {

                }
            };

            var deps = {

                $scope: $rootScope.$new(),
                $mdSidenav: {},
                $mdDialog: $mdDialog,
                $location: {},
                keyCodes: {},
                characters: {}     ,
                feedbackService: {showAnswer:false},
            };


            var view1Ctrl = $controller('View1Ctrl', deps);
            expect(view1Ctrl).toBeDefined();
        }));
        xit("when the button is clicked it listens for keypresses", function () {

            // click on button

            // expect focu



        });
    });
});