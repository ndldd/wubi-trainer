/**
 * Created by thomas on 21.12.14.
 */

angular.module('DataServicesModule', ['LocalStorageModule', 'CharacterModule']).
    factory('dataService', ['localStorageService', '$q', '$http', 'Character', '$log', function (localStorageService, $q, $http, Character, $log) {

        var CHARACTERS_KEY = 'characters';
        var CACHE = 'cache';
        var QUEUE_KEY = 'QUEUE';
        var service = {
            localData: null,
            cache: null,

            resetData: function () {

                localStorageService.remove(CHARACTERS_KEY);
                localStorageService.remove(CACHE);
                this.getRootCharacters();
            },
            saveQueue: function (list) {
                this.save(QUEUE_KEY, list);
            },

            saveCache: function () {
                this.save(CACHE, this.cache);
            },
            saveCharacterToCash: function (char) {
                for (var i = 0; i < this.cache.length; i++) {
                    if (char.character === this.cache[i].character) {
                        this.cache[i] = angular.copy(char); //
                    }
                }

            },

            loadCache: function () {

                var cacheData = localStorageService.get(CACHE);

                if (angular.isDefined(cacheData) && cacheData !== null) {
                    var characterArray = [];
                    var data = cacheData;

                    Object.keys(data).forEach(function (key) {

                        characterArray.push(new Character(data[key]));

                    });


                    this.cache = characterArray;

                    //deferred.resolve(this.characterArray);
                }


            },

            getKeyCodes: function () {
                var keyCodes = $q.defer();
                $http.get('view1/keycodes.json').then(angular.bind(this, function (response) {

                    this.keyCodes = response.data;
                    keyCodes.resolve(this.keyCodes);
                }));
                return keyCodes.promise;
            },

            save: function (key, characterArray) {
                localStorageService.set(key, characterArray);
            },

            getRootCharacters: function () {
                var deferred = $q.defer();
                this.localData = localStorageService.get(CHARACTERS_KEY);
                if (this.localData !== null) {
                    var characterArray = [];
                    var data = this.localData;

                    Object.keys(data).forEach(function (key) {

                        characterArray.push(new Character(data[key]));

                    });


                    this.cache = characterArray;
                    deferred.resolve(this.characterArray);
                }
                else {
                    $http.get('view1/data.json').then(angular.bind(this, function (response) {

                        var characterArray = [];
                        var data = response.data;

                        Object.keys(data).forEach(function (key) {

                            for (var i = 0; i < data[key].files.length; i++) {

                                var info = {
                                    key: key,
                                    character: data[key].files[i],
                                    status: 'unseen',
                                    group: data[key]['group']
                                };
                                characterArray.push(new Character(info));
                            }
                        });
                        //$scope.data.characters = $scope.data.characters.splice(1,25);
                        localStorageService.set(CHARACTERS_KEY, characterArray);

                        this.localData = characterArray;
                        alert('reloaded data');
                        deferred.resolve(this.localData);
                    }));
                }
                return deferred.promise;
            }
        };
        service.getRootCharacters();
        service.loadCache();
        service.getKeyCodes();
        return service;

    }])
;