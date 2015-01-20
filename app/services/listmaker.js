(function () {
    "use strict";
    angular.module('ListMakerModule', ['DataServicesModule'])
        .factory('listMaker', ['dataService', '$log', function (dataService, $log) {

            var service = {
                lastList: 0,

                makeList: function (type) {
                    type = parseInt(type, 10);
                    if (type > 10) return;


                    var start = 23;
                    var end = 23;

                    start *= type;

                    end *= (type + 1);


                    //var newList = dataService.localData.slice(start, end);

                    if (dataService.cache === null) {
                        $log.error('no data cache');
                        return [];
                    }
                    var newList = dataService.cache.slice(start, end);

                    //console.log(newList);

                    return newList;

                },
                setSelection: function (selectionObject) {

                    this.selection = selectionObject;
                    this.selection.random=true;

                    this.makeListFromSelectionObject(this.selection);


                },
                makeListFromSelectionObject: function (selectionObject) {
                    if (!angular.isDefined(selectionObject)) {
                        selectionObject = this.selection;
                    }
                    var charList = this.makeListFromSelection(selectionObject.sets);

                    this.fullList = charList;
                    var list = charList;

                    if (selectionObject.filtered === 'yes') {
                        list = this.filterList(charList);
                        this.difficultList = list;

                    }
                    return list;
                },

                makeListFromSelection: function (selection) {

                    if (!angular.isDefined(selection) || selection === null) {
                        throw 'MISSING CHARACTER SET';
                    }
                    var combinedList = [];
                    Object.keys(selection).forEach(angular.bind(this, function (key) {
                            if (selection[key] === true) {
                                var part = this.makeList(key);
                                combinedList = combinedList.concat(part);
                                part = [];
                            }
                        })
                    );
                    if (selection.filtered) {

                    }
                    return combinedList;
                },
                makeDifficultItemList: function (length) {
                    if (!angular.isDefined(length)) {

                        length = 10;
                    }


                    var filteredList;

                    filteredList = this.filterList(dataService.cache);


                    //difficult = dataService.cache.slice(0, length);

                    return filteredList;

                },
                filterList: function (list) {
                    var difficult = [];
                    angular.forEach(list, function (char) {


                        //if (char.getAverage() < 0.5) {
                        if (char.getEase() < 0.9) {

                            difficult.push(char);
                        }


                    });
                    return difficult;

                }

            };


            return service;


        }])
}());