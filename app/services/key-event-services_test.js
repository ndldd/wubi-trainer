describe("services", function () {

    describe("keyEventHandler", function () {


        var tutor, keyEventHandler;

        beforeEach(function () {
            module('services', function ($provide) {
                    $provide.value('$mdSidenav', function () {
                        return {
                            toggle: function () {
                            }
                        }
                    });
                }
            );
            module('wubiConstants');

        });

        beforeEach(inject(function (_keyEventHandler_, _KEYS_, _tutor_) {
            keyEventHandler = _keyEventHandler_;
            tutor = _tutor_;
            KEYS = _KEYS_;
            spyOn(tutor, 'check');


        }));


        it("has a handle function", function () {
            expect(keyEventHandler).toBeDefined();
            expect(keyEventHandler.handle).toBeDefined();

        });

        it('lets tutor check on certain key', function () {
            keyEventHandler.handle(33);

            expect(tutor.check).toHaveBeenCalled();
        });

        it("does not check for esc/space /enter", function () {
            keyEventHandler.handle(KEYS.ENTER);
            expect(tutor.check).not.toHaveBeenCalled();


            keyEventHandler.handle(KEYS.ESCAPE);
            expect(tutor.check).not.toHaveBeenCalled();

            keyEventHandler.handle(KEYS.SPACE);
            expect(tutor.check).not.toHaveBeenCalled();
        });


    });
});