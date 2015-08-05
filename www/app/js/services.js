(function (window, angular, undefined) {
  "use strict";

  function authenticationService($cookies, $state, Restangular) {
    this.signUp = function signUp(firstName, lastName, email, password) {
      var self = this;

      return Restangular.all("user").post({
        username: email,
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName
      }).then(onSignUpSuccess, onSignUpFailure);

      function onSignUpSuccess(data) {
        self.logIn(email, password);
      }

      function onSignUpFailure(data) {
        console.error("Sign up failed!");
      }
    };

    this.logIn = function logIn(username, password) {
      var self = this;

      return Restangular.all("auth").all("login").post({
        username: username,
        password: password
      }).then(onLogInSuccess, onLogInFailure);

      function onLogInSuccess(data) {
        self.setAuthenticatedUser(data);

        $state.go("home");
      }

      function onLogInFailure(data) {
        console.log("Log in failed!")
      }
    };

    this.logOut = function logOut() {
      var self = this;

      return Restangular.all("auth").all("logout").post().then(onLogOutSuccess, onLogOutFailure);

      function onLogOutSuccess(data) {
        self.unauthenticate();

        $state.go("home");
      }

      function onLogOutFailure(data) {
        console.error("Log out failed!");
      }
    };

    this.getAuthenticatedUser = function getAuthenticatedUser() {
      if (!$cookies.get("authenticatedUser")) {
        return;
      }

      return JSON.parse($cookies.get("authenticatedUser"));
    };

    this.isAuthenticated = function isAuthenticated() {
      return !!$cookies.get("authenticatedUser");
    };

    this.setAuthenticatedUser = function setAuthenticatedUser(user) {
      $cookies.put("authenticatedUser", JSON.stringify(user));
    };

    this.unauthenticate = function unauthenticate() {
      $cookies.remove("authenticatedUser");
    };
  }

  function accountsService(Restangular) {
    this.list = function list() {
      return Restangular.all("accounts").getList();
    };

    this.retrieve = function retrieve() {
      return Restangular.one("accounts", id).get();
    };

    this.create = function create() {
      return Restangular.all("accounts").post(data);
    };

    this.update = function update() {
      return Restangular.one("accounts", id).customPUT(data);
    };

    this.destroy = function destroy() {
      return Restangular.one("accounts", id).remove();
    };
  }

  function feedService(Restangular) {
    this.getFeed = function getFeed() {
      return Restangular.all("users").all("feed").getList();
    };
  }

  angular.module("app")
    .service("authenticationService", ["$cookies", "$state", "Restangular", authenticationService])
    .service("accountsService", ["Restangular", accountsService])
    .service("feedService", ["Restangular", feedService]);

})(window, window.angular);