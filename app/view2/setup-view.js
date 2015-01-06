'use strict';

angular.module('wubi.setupView', ['ngRoute', 'ListMakerModule', 'SelectionModule', 'DataServicesModule'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/setup', {
            templateUrl: 'view2/setup-view-tpl.html',
            controller: 'setupViewController'
        });
    }])


    .controller('setupViewController', ['$scope', 'listMaker', 'runner', 'dataService', 'Selection', function ($scope, listMaker, runner, dataService, Selection) {

        //------------------------ reset data
        $scope.reset = function () {
            dataService.resetData();
        };
        //------------------------


        $scope.data = {};
        $scope.input = {};

        var sel = new Selection();
        sel.sets = angular.copy(sel.defaultSelection);

        $scope.input.selection = sel.sets;
        $scope.input.filtered = sel.filtered;

        $scope.input.lessons = [0, 1, 2, 3, 4, 5, 6, 7, 8];   // used for ng-repeat to create list of sets


        $scope.$watch('input.filtered', function (nv, ov) {
            if (nv !== ov) {
                sel.filtered = nv;
                $scope.updateLists();
            }
        });

        $scope.$watch('input.selection', function (nv, ov) {
            if (nv !== ov) {
                $scope.updateLists();
            }
        }, true);

        $scope.updateLists = function () {

            var list = listMaker.makeListFromSelection(sel.sets);
            $scope.data.fullList = list;
            $scope.data.difficultChars = listMaker.filterList(list);

            var toLearn = list;
            var filteredList = listMaker.filterList(list);
            if (sel.filtered === 'yes') {
                toLearn = filteredList;
            }
            runner.setLearningQueue(angular.copy(toLearn));
            $scope.data.learningQueue = toLearn;
        };

        $scope.setList = function (number) {
            sel.sets = angular.copy(sel.defaultSelection);
            $scope.input.selection = sel.sets;
            $scope.input.selection[number] = true;

        };

        $scope.selectAll = function () {

            angular.forEach(sel.sets, function (value, key) {
                sel.sets[key] = true;
            });

            console.log(sel.sets);
        };

        //---------------------init
        if (listMaker.selection) {
            sel = listMaker.selection;
            $scope.input.selection = listMaker.selection.sets;
            $scope.input.filtered = listMaker.selection.filtered;
        }

        else {
            $scope.setList(0);
        }

        listMaker.setSelection(sel);

        $scope.updateLists();
        $scope.data.learningQueue = runner.learningQueue;


    }]);