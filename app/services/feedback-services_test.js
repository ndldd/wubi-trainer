describe("feedback services", function () {
    describe("feedback service", function () {
        var feedbackService;
        var feedbackChannel;
        var spy;

        beforeEach(function () {
            module('feedbackModule');
            module(function ($provide) {

                spy = jasmine.createSpyObj('spy', ['publishWrongAnswerGiven', 'publishCorrectAnswerGiven', 'publishVisibilityChange'])
                $provide.value('feedbackChannel', spy);
            });
        });
        beforeEach(inject(function (_feedbackService_) {


            feedbackService = _feedbackService_;
            //feedbackChannel = _feedbackChannel_
        }));
        afterEach(function () {
            //feedbackChannel.publishCorrectAnswerGiven.reset();
            //feedbackChannel.publishWrongAnswerGiven.reset();
        });

        it("feedback service", function () {
            feedbackService.revealAnswer();

            expect(feedbackService.showAnswer).toBe(true);
        });
        it("signals", function () {
            var signal = {answer: 'wrong'};

            feedbackService.processResult(signal);

            expect(spy.publishWrongAnswerGiven).toHaveBeenCalled();
            expect(spy.publishCorrectAnswerGiven).not.toHaveBeenCalled();

        });

        it("signals", function () {
            var signal = {answer: 'correct'};

            feedbackService.processResult(signal);

            expect(spy.publishCorrectAnswerGiven).toHaveBeenCalled();
            expect(spy.publishWrongAnswerGiven).not.toHaveBeenCalled();
        });


    });
});