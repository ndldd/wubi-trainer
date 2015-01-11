describe("Hanzi Module", function () {
    describe("Creation", function () {
        var Hanzi;
        beforeEach(function () {
            module('HanziModule');
        });
        beforeEach(inject(function (_Hanzi_) {
            Hanzi = _Hanzi_;
        }));

        it("instantiates", function () {

            var hanzi = new Hanzi();
            expect(hanzi).toBeDefined();

        });
    });
    describe("hanzi inherits from Character", function () {
        var Character;
        var Hanzi;
        var hanzi;
        beforeEach(function () {
            module('HanziModule');
            inject(function (_Character_, _Hanzi_) {
                Character = _Character_;
                Hanzi = _Hanzi_;
            });
        });

        it("subclasses Character", function () {
            hanzi = new Hanzi();

            expect((hanzi instanceof Character)).toBe(true);
        });
        it("constructor works", function () {
            hanzi = new Hanzi({key: 99});

            expect(hanzi.key).toEqual(99);
        });

        it("has wubi codes", function () {
            var code = ['awqd'];
            hanzi = new Hanzi({wubiCode: code});
            expect(hanzi.wubiCode).toEqual(code);
        });

        it("has a unicodeCharacter", function () {
            character = '是',
            hanzi  = new Hanzi({character: character});

            expect(hanzi.character).toEqual(character);
        });

    });

});