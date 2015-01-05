'use strict';

describe('wubi.setupView module', function () {


    describe('setupViewController', function () {
        var listMaker, controller, scope, runner;

        var dependencies;
        var defaultSelection;
        beforeEach(function () {
            module('wubi.setupView', function ($provide) {
                //runner =
                //listMaker = {
                //    name: 'fake',
                //    makeListFromSelectionObject: function () {
                //    },
                //    makeListFromSelection: function () {
                //    },
                //    filterList: function () {
                //    },
                //    setSelection: function () {
                //    }
                //};
                //$provide.value('listMaker', listMaker)
            });
        });
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            listMaker = jasmine.createSpyObj('spy', ['setSelection', 'makeListFromSelection', 'makeListFromSelectionObject', 'filterList']);
            listMaker.makeListFromSelection.and.returnValue('fullList');
            listMaker.filterList.and.returnValue('filterList');
            listMaker.name = 'spy';

            defaultSelection = {defaultSelection: {2: false}};
            runner = {
                setLearningQueue: function () {
                }

            };
            runner = jasmine.createSpyObj('runner', ['setLearningQueue']);

            dependencies = {
                $scope: scope,
                listMaker: listMaker,
                runner: runner,
                dataService: {},
                Selection: function () {
                    return defaultSelection;
                }
            };

            controller = $controller('setupViewController', dependencies);


        }));
        afterEach(function () {

            listMaker.makeListFromSelectionObject.calls.reset();
        });
        it('instantiates', function () {
            expect(controller).toBeDefined();
        });

        it("hands over default selection to listmaker for list creation", function () {
            expect(listMaker.setSelection).toHaveBeenCalledWith(defaultSelection);
        });

        it("when changing selection object list is made", function () {
            scope.input.selection[2] = true;
            scope.$digest();
            scope.input.selection[2] = false;
            scope.$digest();

            expect(listMaker.makeListFromSelection.calls.count()).toBe(2);
        });

        it("when changing filter list from default no to yes lists are made", function () {
            scope.input.filtered = 'no';
            scope.$digest();
            scope.input.filtered = 'yes';
            scope.$digest();
            expect(listMaker.makeListFromSelection.calls.count()).toBe(2);
        });

        it("when update is called lists are also set", function () {

            scope.updateLists();
            expect(runner.setLearningQueue).toHaveBeenCalledWith('fullList');
        });

        it("when creating runner gets a learning queue", function () {
            expect(runner.setLearningQueue.calls.count()).toBe(1);
            //expect(runner.initialQueueLength).toBe(1);
        });

        it("clicking on list button sets ", function () {

        });

    });
});