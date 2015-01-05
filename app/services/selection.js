angular.module('SelectionModule', []).service('Selection', function () {

    var Selection = function (data) {

        if (angular.isDefined(data)) {
            this.sets = data.sets || {};
            this.filtered = data.filtered || 'no';
        }
        else {
            this.sets = this.defaultSelection;
            this.filtered = 'no';
        }


    };

    Selection.prototype.defaultSelection = {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false
    };


    return Selection;

});