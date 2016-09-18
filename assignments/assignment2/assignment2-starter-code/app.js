(function () {
  'use strict';

  angular.module('ListApp', [])
      .controller('ToBuyShoppingController', ToBuyShoppingController)
      .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
      .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


      ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
      function ToBuyShoppingController(ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.items = ShoppingListCheckOffService.getItems();

        toBuy.setBought = function (itemIndex) {
          ShoppingListCheckOffService.setBought(itemIndex);
        }

        toBuy.empty = function() {
          if (ShoppingListCheckOffService.getItems().length > 0) {
            return false;
          } else {
            return true;
          }
        }

      }


      AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
      function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
        var alreadyBought = this;

        alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();

        alreadyBought.empty = function() {
          if (ShoppingListCheckOffService.getBoughtItems().length > 0) {
            return false;
          } else {
            return true;
          }
        }

      }


      function ShoppingListCheckOffService() {
        var service = this;

        // List of shopping items
        var to_buy = [
          {
            itemName: "Milk",
            itemQuantity: "2"
          },
          {
            itemName: "Donuts",
            itemQuantity: "200"
          },
          {
            itemName: "Cookies",
            itemQuantity: "300"
          },
          {
            itemName: "Chocolate",
            itemQuantity: "5"
          },
          {
            itemName: "CheesyPuffs",
            itemQuantity: "10"
          }
        ];
        var bought = [];

        //to_buy methods
        service.getItems = function () {
          return to_buy;
        };

        //Bought methods
        service.setBought = function (itemIndex) {
          var item = to_buy[itemIndex];
          to_buy.splice(itemIndex, 1);
          bought.push(item);
        };

        service.getBoughtItems = function () {
          return bought;
        };


      }
})();
