(function (window, angular, undefined) {
  "use strict";

  function userList() {
    return {
      restrict: "A",
      templateUrl: "/static/views/user_list.html",
      scope: {
        users: "=",
        addButton: "@",
        removeButton: "@",
        acceptButton: "@",
        rejectButton: "@"
      },
      controller: function($scope, friendsService) {
        $scope.hasUsers = function hasUsers() {
          return !_.isEmpty($scope.users);
        };

        $scope.add = function add(user) {
          return friendsService.add(user);
        };

        $scope.remove = function remove(user) {
          return friendsService.remove(user);
        };

        $scope.accept = function accept(user) {
          return friendsService.accept(user);
        };

        $scope.reject = function reject(user) {
          return friendsService.reject(user);
        };
      }
    }
  }

  angular.module("app")
    .directive("userList", [userList]);

})(window, window.angular);