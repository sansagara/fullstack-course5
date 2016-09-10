(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('CheckDishesController', function ($scope) {
  $scope.output = "";
  $scope.dishes = "";

  $scope.checkIfTooMuch = function () {
    var output = calculateOutput($scope.dishes);
    $scope.output = output;
  };


  function calculateOutput(string) {
    string = string.trim();
    if (string == "") {
      return "Please enter data first"
    }

    dish_list = string.split(",")
    if (dish_list.length > 3) {
      return "Too much!"
    } else {
      return "Enjoy!"
    }

  }

});

})();
