(function () {
    "use strict";
    angular.module('tutorServices', ['DataServicesModule', 'feedbackModule', 'HanziModule'])


        .factory('tutor', ['dataService', 'feedbackService', '$log', 'Hanzi', function (dataService, feedbackService, $log, Hanzi) {

            var ST_EXTRA_REP = "extraRepetition";
            var ST_BETTER = 'better';
            var ST_CORRECT = 'correct';
            var NUMBER_EXTRA_KEYSTROKES = 3;

            var service = {
                solution: {key: 42},
                alreadyFalseAnwserGiven: false,
                wrongAnswerGiven: false,
                currentCharacter: null,
                keyCodes: null,
                extraKeystrokes: 0,
                inputSequence: '',
                // called when changing a character
                set: function (x) {

                    if (angular.isDefined(x)) {
                        this.solution = x;
                        this.wrongAnswerGiven = false;
                        this.currentCharacter = x;

                        if (x.status === ST_EXTRA_REP) {
                            $log.log('tutor: warning previous wrong');
                            feedbackService.warn();

                        }
                    }
                    this.inputSequence = '';
                },

                check: function (number) {
                    if (this.solution instanceof Hanzi) {
                        this.checkHanzi(number)
                    }
                    else {

                        this.checkComponent(number);
                    }
                },
                checkHanzi: function (number) {
                    console.log(this.solution.wubiCode);
                    console.log(number);

                    this.promptNext = false;
                    try {

                        console.log(this.keyCodes[number].letter);

                        this.inputSequence += this.keyCodes[number].letter.trim();
                        console.log(this.inputSequence);
                        if (this.solution.wubiCode[0].indexOf(this.inputSequence) !== 0) {
                            this.inputSequence = '';
                            var result = {answer: 'wrong'};
                                                              feedbackService.processResult(result);

                        }
                        if (this.solution.wubiCode[0] === this.inputSequence) {
                            console.log('correct');
                            this.currentCharacter.readyToRemove = true;
                            this.currentCharacter.status = ST_CORRECT;
                            this.promptNext = true;
                            this.inputSequence = '';
                            var result = {answer: ST_CORRECT};
                            feedbackService.processResult(result);

                            return true;

                        }

                    }
                    catch
                        (e) {
                        $log.info('no keycode');
                    }

                }
                ,
                checkComponent: function (number) {
                    var result = {
                        status: null,
                        answer: null
                    };

                    feedbackService.hideAnswer();

                    if (angular.isDefined(this.keyCodes)) {
                        if (number in this.keyCodes && this.solution.key) {

                            if (this.keyCodes[number].letter.trim() === this.solution.key.trim()) {
                                // in this case the correct key was pressed;
                                /// todo:if side bar was opened mark it as wrong,

                                if (this.checkPromptNext()) {      // no extra keystrokes left
                                    if (this.currentCharacter.status === ST_EXTRA_REP) {
                                        this.currentCharacter.status = ST_BETTER;

                                        this.currentCharacter.readyToRemove = false;

                                    }
                                    else if (this.currentCharacter.status === ST_BETTER) {
                                        this.currentCharacter.status = ST_CORRECT;


                                    }

                                    else {
                                        this.currentCharacter.readyToRemove = true;
                                    }

                                    this.promptNext = true;
                                    $log.log('adding character history');
                                    this.currentCharacter.addToRepetitionHistory(true);
                                }
                                result.answer = ST_CORRECT;

                                feedbackService.processResult(result);
                                return true;
                            }
                        }
                    }

                    else {
                        $log.error('tutor keyCodes not defined');
                        throw "keyCodes not defined";
                    }

                    // always return false unless correct key is pressed
                    this.wrongAnswerGiven = true;
                    if (this.currentCharacter !== null) {
                        var status = ST_EXTRA_REP;
                        this.currentCharacter.status = status;
                        this.currentCharacter.readyToRemove = false;
                        this.currentCharacter.addToRepetitionHistory(false);
                        result.status = status;
                        result.answer = 'wrong';

                    }


                    feedbackService.processResult(result);
                    feedbackService.revealAnswer();
                    this.setExtraKeystrokes();
                    this.promptNext = false;
                    return true;

                }
                ,
                setExtraKeystrokes: function () {
                    //console.log('setting extra Keystrokes: ');
                    this.extraKeystrokes = NUMBER_EXTRA_KEYSTROKES;
                }
                ,
                checkPromptNext: function () {
                    if (this.extraKeystrokes > 0) {

                        //console.log('extra keystrokes : ', this.extraKeystrokes);
                        this.extraKeystrokes -= 1;
                        return false;
                    }
                    else {
                        //console.log('no extra keystrokes ', this.extraKeystrokes);
                        return true;
                    }
                }
                ,

                markWrong: function () {
                    if (angular.isDefined(this.currentCharacter) && this.currentCharacter !== null) {


                        this.wrongAnswerGiven = true;
                    }

                }
            };
            dataService.getKeyCodes().then(function (codes) {
                service.keyCodes = codes;
            });

            return service;
        }]);
}());