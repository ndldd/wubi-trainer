describe("RunnerModule", function () {
    beforeEach(function () {
        module('RunnerModule');
        module('tutorServices');
    });
    describe("runner", function () {

        var runner;
        var listMaker;

        beforeEach(inject(function (_runner_, _listMaker_, _$location_) {

            runner = _runner_;
            listMaker = _listMaker_;
            $location = _$location_;
        }));

        it("setting LearningQueue sets Queue and initialQueueLength", function () {

            var queue = [0, 1, 2];

            runner.setLearningQueue(queue);

            expect(runner.learningQueue).toBe(queue);
            expect(runner.initialQueueLength).toBe(3);

        });

        it("calls refill when list is empty", function () {
            spyOn(runner, 'refillList');
            runner.learningQueue = [];

            runner.getNext();

            expect(runner.refillList).toHaveBeenCalled();
        });
        it("runner calls makeListFromSelectionObject", function () {
            spyOn(listMaker, 'makeListFromSelectionObject').and.returnValue([1]);

            runner.refillList();

            expect(listMaker.makeListFromSelectionObject).toHaveBeenCalled();
        });

        it("after refill the learningQueue has the length of the listMaker list", function () {
            var fakeList = [1, 2, 3];
            spyOn(listMaker, 'makeListFromSelectionObject').and.returnValue(fakeList);

            runner.learningQueue = [];
            runner.refillList();

            expect(runner.learningQueue.length).toBe(fakeList.length);
        });
        it("refill throws exception when it returns a empty list", function () {
            spyOn(listMaker, 'makeListFromSelectionObject').and.returnValue([]);
            expect(function () {
                runner.refillList();
            }).toThrow();

        });
    });
    describe("runner service", function () {

        var runner;
        beforeEach(function () {
            module('RunnerModule');

        });


        describe("runner service ", function () {
            beforeEach(inject(function (_runner_) {
                runner = _runner_;
            }));
            it("instantiates", function () {
                expect(runner).toBeDefined();
            });

            it("calls percent update on when setting list", function () {
                spyOn(runner, 'updatePercent');

                runner.setLearningQueue([1, 2, 3]);

                expect(runner.updatePercent).toHaveBeenCalled();
            });
        });
        describe("runner service ", function () {

            var listMaker;
            var spy;


            it("calls percent update on refilling list", function () {

                module(function ($provide) {
                    $provide.factory('listMaker', function () {

                        spy = jasmine.createSpyObj('listMakerSpy', ['makeListFromSelection', 'makeListFromSelectionObject']);
                        spy.makeListFromSelection.and.returnValue([]);
                        spy.makeListFromSelectionObject.and.returnValue([1]);
                        return spy;
                    });
                });
                inject(function (_runner_ , _$location_) {

                    runner = _runner_;
                    //$location= _$location_;

                });


                spyOn(runner, 'updatePercent');

                runner.refillList({});

                expect(runner.updatePercent).toHaveBeenCalled();
                expect(spy.makeListFromSelectionObject).toHaveBeenCalled();
            });


        });
    });
});
