(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            restrict: 'E',
            scope: {
                foundItems: '<',
                onRemove: '&'
            }
        };
        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var narrow = this;
        narrow.search_term = "";
        narrow.found = [];
        narrow.message = "";

        narrow.search = function () {
            console.log("Searching..");
            if (narrow.search_term.trim() === "") {
                narrow.message = "Nothing found";
                narrow.found = [];
            } else {
                var found_promise = MenuSearchService.getMatchedMenuItems(narrow.search_term);
                found_promise.then(function (response) {
                    narrow.found = response;

                    if (narrow.length === 0) {
                        narrow.message = "Nothing found";
                    }

                    console.log("Found: ", narrow.found)
                });
            }
        };

        narrow.removeItem = function(index) {
            narrow.found.splice(index, 1);
        }
    }


    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (response) {
                var matched_items = [];
                var data = response.data.menu_items;
                //console.log(data);

                for (var i = 0; i < data.length; i++) {
                    var item = data[i].description;
                    //console.log(item);
                    if (item.includes(searchTerm)) {
                        //console.log("match on description: " + item);
                        matched_items.push(data[i])
                    }
                }

                return matched_items;
            }).catch(function (error) {
                console.error("Something went terribly wrong." + error);
            });
        }
    }

})();
