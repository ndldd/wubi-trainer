describe("Lookup Service", function () {

    describe("creation", function () {
        var lookupService;
        beforeEach(function () {
            module('LookupModule');


        });
        beforeEach(inject(function (_lookupService_) {
            lookupService = _lookupService_;
        }));


        it("instantiates", function () {

            expect(lookupService).toBeDefined();
        });


        it("get a hanzi", function () {
            var result;
            result = lookupService.get('x');

            expect(result).toBeDefined();
            expect(result).toBe([]);
        });
    });
});