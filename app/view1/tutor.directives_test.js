describe("", function () {
    'use strict';

    var handler;
    beforeEach(function () {


        module('tutorDirectives', function ($provide) {

            handler = jasmine.createSpyObj('service', ['handle']);

            $provide.value('keyEventHandler', handler);
            $provide.value('tutor', {});
        });
        //module('tutorServices');
        module('ngMaterial');
        module('services');
        //module('testmodule');
    });


    xdescribe("ngEnter", function () {
        var $compile,
            $rootScope,
            el,
            tutor;

        var inner, outer, spy, element;


        beforeEach(inject(function (_$compile_, _$rootScope_, _tutor_) {


            $compile = _$compile_;
            $rootScope = _$rootScope_;
            tutor = _tutor_;
            tutor.check = function () {
                return false;
            };


        }));
        beforeEach(function () {

            inner = angular.element('<div ng-enter> </div>');
            outer = $(inner).wrap("<div></div>");


            spy = jasmine.createSpyObj('spy', ['toggleKeyBoard', 'hideLastAnswerCorrect', 'markWrong', 'toggleGroupHint', 'revealAnswer']);
            outer.data('$hanziDisplayController', spy);

            var $scope = $rootScope.$new();
            $scope.startFocusInput = function () {
            };
            element = $compile(outer)($scope);


        });
        afterEach(function () {
            //spy.reset();
        });

        it("on key down calls required controller method", function () {
            var e = $.Event("keydown");
            e.which = 13;


            $(inner).trigger(e);

            expect(spy.toggleKeyBoard).toHaveBeenCalled();
        });

        it("on when peeking at character mark character as false", function () {

            var e = $.Event("keydown");
            e.which = 32;

            $(inner).trigger(e);

            expect(spy.markWrong).toHaveBeenCalled();

        });

        it("passes Key Events to handler", function () {

            var e = $.Event("keydown");
            e.which = 43;
            $(inner).trigger(e);
            expect(handler.handle).toHaveBeenCalledWith(e.which);
        });

    });

    describe("correctAnswerHint", function () {
        var $compile, $rootScope;
        var $scope, element;
        var $interpolate;
        var $parse;
        beforeEach(inject(function (_$rootScope_, _$compile_, _$interpolate_, _$parse_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $interpolate = _$interpolate_;
            $parse = _$parse_;
            $scope.visible = true;
            $scope.model = {show: false, filename: 'u34.png'};

            var el = angular.element('<correct-answer-hint visible="model.show" character="model.filename"> </correct-answer-hint>');

            element = $compile(el)($scope);

        }));
    });
});