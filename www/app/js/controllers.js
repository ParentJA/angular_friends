(function (window, angular, undefined) {
  "use strict";

  function MainController($scope, authenticationService) {
    $scope.isUserAuthenticated = function isUserAuthenticated() {
      return authenticationService.isAuthenticated();
    };

    $scope.getUser = function getUser() {
      return authenticationService.getAuthenticatedUser();
    };

    $scope.logOut = function logOut() {
      return authenticationService.logOut();
    };
  }

  function HomeController($scope, authenticationService) {
    $scope.isUserAuthenticated = function isUserAuthenticated() {
      return authenticationService.isAuthenticated();
    };
  }

  function LogInController($scope, $state, authenticationService) {
    $scope.models = {
      logInForm: "",
      username: "",
      password: ""
    };

    $scope.logIn = function logIn() {
      authenticationService.logIn($scope.models.username, $scope.models.password);
    };

    function init() {
      if (authenticationService.isAuthenticated()) {
        $state.go("home");
      }
    }

    init();
  }

  function SignUpController($scope, authenticationService) {
    $scope.models = {
      signUpForm: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: ""
    };

    $scope.signUp = function signUp() {
      authenticationService.signUp(
        $scope.models.first_name,
        $scope.models.last_name,
        $scope.models.email,
        $scope.models.password
      );
    }
  }

  function ProfileController($scope) {}

  function FeedController($scope, feedService) {
    $scope.models = {
      events: feedService.getFeed().$object
    };

    $scope.hasEvents = function hasEvents() {
      return !_.isEmpty($scope.models.events);
    };
  }

  function UsersController($scope, $state) {
    function init() {
      $state.go("users.search");
    }

    init();
  }

  function SearchController($scope) {}

  function RequestsController($scope, accountsService) {
    $scope.models = {
      users: accountsService.list().$object
    };

    $scope.hasUsers = function hasUsers() {
      return !_.isEmpty($scope.models.users);
    };
  }

  function BrowseController($scope, accountsService) {
    $scope.models = {
      users: accountsService.list().$object
    };

    $scope.hasUsers = function hasUsers() {
      return !_.isEmpty($scope.models.users);
    };
  }

  function FriendsController($scope, accountsService) {
    $scope.models = {
      users: accountsService.list().$object
    };

    $scope.hasUsers = function hasUsers() {
      return !_.isEmpty($scope.models.users);
    };
  }

  angular.module("app")
    .controller("MainController", ["$scope", "authenticationService", MainController])
    .controller("HomeController", ["$scope", "authenticationService", HomeController])
    .controller("LogInController", ["$scope", "$state", "authenticationService", LogInController])
    .controller("SignUpController", ["$scope", "authenticationService", SignUpController])
    .controller("ProfileController", ["$scope", ProfileController])
    .controller("FeedController", ["$scope", "feedService", FeedController])
    .controller("UsersController", ["$scope", "$state", UsersController])
    .controller("SearchController", ["$scope", SearchController])
    .controller("RequestsController", ["$scope", "accountsService", RequestsController])
    .controller("BrowseController", ["$scope", "accountsService", BrowseController])
    .controller("FriendsController", ["$scope", "accountsService", FriendsController]);

})(window, window.angular);