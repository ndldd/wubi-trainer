describe("data services", function () {

    beforeEach(function () {
        module('DataServicesModule');
    });

    describe("Character", function () {
        var Character;
        var char;


        var timeMock = 1419609373761;
        Date = function () {
            return {
                getTime: function () {
                    return timeMock;
                }
            };
        };

        beforeEach(inject(function (_Character_) {
            Character = _Character_;
            char = new Character({repetitionHistory:[]});


        }));


        it("instantiates", function () {

            expect(char).toBeDefined();
        });

        it("has get history ", function () {
            char = new Character({repetitionHistory:[]});

            var hist = char.getRepetitionHistory();

            expect(hist).toEqual([]);

        });
        it("removes one when history is larger than 10", function () {
            char = new Character({repetitionHistory:[]});

            var MAX_LENGTH = 10;
            for (var i = 0; i<MAX_LENGTH;i++ ){
                char.addToRepetitionHistory(false);
            }

            expect(char.repetitionHistory.length).toBe(MAX_LENGTH);
            char.addToRepetitionHistory(false);
            expect(char.repetitionHistory.length).toBe(MAX_LENGTH);

        });
        it("char", function () {

            //var newYearInBratislava = new TzDate(-1, '2009-12-31T23:00:00Z');

            var entry = {outcome: false, time: timeMock};

            var hist = char.addToRepetitionHistory(false);
            expect(hist).toEqual([entry]);
        });
        describe("history", function () {

            it("get history Average of zero if no history", function () {

                var avg= char.getAverage();
                expect(avg).toBe(0)
            });
            it("", function () {
                char.repetitionHistory= [
                    {outcome:true},
                    {outcome:true},
                    {outcome:false},
                    {outcome:false} ,
                ];
                var avg = char.getAverage();
                expect(avg).toBe(1)         ;
            });
        });



    });

});