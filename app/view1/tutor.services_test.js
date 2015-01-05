describe("tutorServices", function () {
    "use strict";

    var ST_EXTRA_REP = 'extraRepetition';
    var ST_UNSEEN = 'unseen';
    var keyCodes;

    beforeEach(function () {
        module('tutorServices', function ($provide) {
            $provide.value('keyCodes', {"82": {"letter": "r ", "groupId": "32"}});
        });
    });

    describe("tutor service", function () {
        var tutor;
        var spy;


        beforeEach(function () {
            module('tutorServices', function ($provide) {
                spy = jasmine.createSpyObj('service', ['revealAnswer', 'warn', 'hideAnswer', 'processResult']);
                $provide.value('keyCodes', {"82": {"letter": "r ", "groupId": "32"}});
                $provide.value('feedbackService', spy);
            });
            module('RunnerModule');


        });

        beforeEach(inject(function (_tutor_, _keyCodes_) {

            tutor = _tutor_;
            keyCodes = _keyCodes_;
        }));
        describe("checking", function () {
            var currentCharacter;
            beforeEach(function () {
                currentCharacter = {
                    key: "f",
                    character: "f05.png",
                    status: null,
                    group: "horizontal",
                    $$hashKey: "object:50"
                };

            });
            it("when checking: sets status to extra repetiton on wrong answer", function () {
                currentCharacter.status = "unseen";
                currentCharacter.addToRepetitionHistory = function () {
                };
                tutor.set(currentCharacter);

                tutor.keyCodes = {66: {letter: "B"}};
                tutor.solution.key = "B";

                tutor.check(22);
                expect(tutor.currentCharacter.status).not.toBe(ST_UNSEEN);
                expect(tutor.currentCharacter.status).toBe(ST_EXTRA_REP);


            });

            it("on set, the default is not to warn", function () {
                currentCharacter.status = 'unseen';
                tutor.set(currentCharacter);

                expect(spy.warn).not.toHaveBeenCalled();
            });


            it("on set warns if extra Repetition ", function () {

                currentCharacter.status = ST_EXTRA_REP;

                tutor.set(currentCharacter);

                expect(spy.warn).toHaveBeenCalled();

            });
        });
        describe("updating status of characters", function () {

            var currentCharacter;
            beforeEach(function () {
                currentCharacter = {
                    key: "f",
                    character: "f05.png",
                    status: null,
                    group: "horizontal",
                    $$hashKey: "object:50"
                };
                tutor.keyCodes = {999: {letter: "f"}};
                tutor.solution.key = "f";
                tutor.currentCharacter = currentCharacter;
                tutor.currentCharacter.addToRepetitionHistory = function () {
                }
            });

            it('marks as ready to remove if unseen and correct key', function () {
                tutor.currentCharacter.status = "unseen";

                tutor.check(999);

                expect(tutor.currentCharacter.readyToRemove).toBe(true);

            });
            it('marks as ready to remove if correct previously and correct key', function () {
                tutor.currentCharacter.status = "correct";

                tutor.check(999);

                expect(tutor.currentCharacter.readyToRemove).toBe(true);

            });

            it('does not mark as ready to remove when extra repetition', function () {
                tutor.currentCharacter.status = ST_EXTRA_REP;
                tutor.check(999);

                expect(tutor.currentCharacter.readyToRemove).toBe(false);
            });

        });


        xit("does not show Answer if correct", function () {
            tutor.keyCodes = {66: {letter: "B"}};
            tutor.solution.key = "B";

            tutor.check(66);

            expect(spy.revealAnswer).not.toHaveBeenCalled();
        });
        xit("shows Answer if wrong", function () {
            tutor.keyCodes = {66: {letter: "B"}};
            tutor.solution.key = "C";

            tutor.check(66);
            expect(spy.revealAnswer).toHaveBeenCalled();
        });

    });



});