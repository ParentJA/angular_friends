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
      events: [{
        heading: "",
        friendship: {
          friendship_sender: {
            photo: ""
          },
          friendship_receiver: {
            photo: ""
          }
        },
        updated: undefined
      }]
    };

    $scope.hasEvents = function hasEvents() {
      return !_.isEmpty($scope.models.events);
    };

    function init() {
      $scope.models.events = feedService.getFeed().$object;
    }

    init();
  }

  function UsersController($state) {
    function init() {
      $state.go("users.search");
    }

    init();
  }

  function UsersListController($scope, users) {
    $scope.models = {
      users: users
    };
  }

  function SearchController($scope, accountsService) {
    $scope.models = {
      search: "",
      searched: false,
      users: [{
        id: 0,
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        photo: "",
        date_of_birth: undefined,
        address: "",
        phone_number: ""
      }]
    };

    $scope.hasUsers = function hasUsers() {
      return !_.isEmpty($scope.models.users);
    };

    $scope.search = function search() {
      accountsService.list($scope.models.search).then(function (data) {
        $scope.models.users = data;
        $scope.models.searched = true;
      });
    };
  }

  angular.module("app")
    .controller("MainController", ["$scope", "authenticationService", MainController])
    .controller("HomeController", ["$scope", "authenticationService", HomeController])
    .controller("LogInController", ["$scope", "$state", "authenticationService", LogInController])
    .controller("SignUpController", ["$scope", "authenticationService", SignUpController])
    .controller("ProfileController", ["$scope", ProfileController])
    .controller("FeedController", ["$scope", "feedService", FeedController])
    .controller("UsersController", ["$state", UsersController])
    .controller("UsersListController", ["$scope", "users", UsersListController])
    .controller("SearchController", ["$scope", "accountsService", SearchController]);

})(window, window.angular);