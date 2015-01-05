describe("List Module", function () {

    describe("listMaker", function () {
        var listMaker;

        beforeEach(function () {
            module('ListMakerModule')
        });
        beforeEach(inject(function (_listMaker_) {
            listMaker = _listMaker_;
        }));

        it("instantiates", function () {

            expect(listMaker).toBeDefined();
        });
        it("sets Selection Object", function () {
            var selection = {sets: {}};

            listMaker.setSelection(selection);

            expect(listMaker.selection).toBe(selection);
        });

        it("saves full character list", function () {
            listMaker.selection = {sets: {}};

            listMaker.makeListFromSelectionObject();

            expect(listMaker.fullList).toEqual([]);
        });

        it("saves difficult character lists", function () {
            listMaker.selection = {sets: {}, filtered: 'yes'};

            listMaker.makeListFromSelectionObject();

            expect(listMaker.difficultList).toEqual([]);
        });

        it("creates the lists when it sets the lists", function () {
            spyOn(listMaker, 'makeListFromSelectionObject');

            var selection = {sets: {}};
            listMaker.setSelection(selection);

            expect(listMaker.makeListFromSelectionObject).toHaveBeenCalledWith(selection);
        });
        it("when makeListFromSelectionObject is called with out Object it uses the stored one", function () {
            spyOn(listMaker, 'makeListFromSelection');
            var fakeSets = {0: 'fakeSet'};
            listMaker.selection = {sets: fakeSets};

            listMaker.makeListFromSelectionObject();


            expect(listMaker.makeListFromSelection).toHaveBeenCalledWith(fakeSets);
        });

        it("when makeListFromSelectionObject is called with Object it uses the object", function () {
            spyOn(listMaker, 'makeListFromSelection');
            var fakeSets = {0: 'fakeSet'};
            listMaker.selection = {sets: fakeSets};

            listMaker.makeListFromSelectionObject({});

            expect(listMaker.makeListFromSelection).not.toHaveBeenCalledWith(fakeSets);
        });


        it("makeListFromSelection throws an exception when there is no character set", function () {
            expect(function () {
                    listMaker.makeListFromSelection();
                }
            ).toThrow();
        });

    });
     describe("listMaker", function () {
        var listMaker;
        var resultList;
        var dataService;
        var cache;
        var Character;

        beforeEach(function () {
            module('ListMakerModule');
        });
        beforeEach(function () {

            cache = [1, 2, 3];


            dataService = {cache: cache};
            module(function ($provide) {
                $provide.value('dataService', dataService);
            });

        });

        beforeEach(inject(function (_listMaker_, _Character_) {
            listMaker = _listMaker_;
            Character = _Character_


        }));


        it("create a listMaker", function () {
            expect(listMaker).toBeDefined();

        });
        describe("selection of characters", function () {

            var select;
            var oneFalse;
            beforeEach(function () {
                select = new Character({repetitionHistory: [{outcome: false}]});
                oneFalse = new Character({repetitionHistory: [{outcome: true}]});
            });
            it("make list with difficult characters", function () {

                cache = [
                    select,
                    select,
                ];
                dataService.cache = cache;

                resultList = listMaker.makeDifficultItemList(10);
                expect(resultList).toEqual([select, select]);

            });
            it("exclude difficult ones", function () {
                cache = [
                    select,
                    select,
                    oneFalse,
                ];
                dataService.cache = cache;

                resultList = listMaker.makeDifficultItemList();
                expect(resultList).toEqual([select, select, oneFalse]);

            });

        });
    });
});
