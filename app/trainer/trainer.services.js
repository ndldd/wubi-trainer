(function () {


    angular.module('trainer.services', []).factory('testDataService', [function () {
        var service = {
            'testList': [
                {order: 1, pinyin: 'hao', code: ['h', 'ao']},
                {order: 2, pinyin: 'shuang', code: ['sh', 'uang']},
                {order: 3, pinyin: 'pin', code: ['p', 'in']},
                {order: 4, pinyin: 'yin', code: ['y', 'in']},
            ],
            'testSequence':[
                [1,1,1,2,3,1,1,5,6,3]
            ],
            keyStrokeDict: {1:"in", 2:"p"}


        };
        return service;
    }])

        .factory('trainerService', [function () {
            var service = {



                checkInput: function (input, testSequence) {
                    // input passt zur test Sequence,
                    // wait for next
                    // finish testSequence if finished

                },

                loop: function () {
                    // keep checking test input until the test is finished,
                },
                stop: function () {
                    // finish test
                }
            };
            return service;
        }]);

})();