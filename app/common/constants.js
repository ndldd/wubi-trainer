(function () {
    "use strict";
    angular.module('wubiConstants', [])

        .constant("KEYS", {
            "ENTER": 13,
            "ESC": 27,
            "SPACE": 32

        })
        .constant("CHARACTER_GROUPS", {

                    hooks: '&#8627;',//U+21Bx3
                    vertical: '&darr;',// U+219x3
                    horizontal: '&rarr;',//U+219x2
                    right_falling: '&#8600;',// U+219x8
                    left_falling: '&#8601;'  // U+219x9

        });

}());