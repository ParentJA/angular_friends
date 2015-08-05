(function (window, angular, undefined) {
  "use strict";

  function authenticationService($cookies, $state, Restangular) {
    this.signUp = function signUp(firstName, lastName, email, password) {
      var self = this;

      return Restangular.all("accounts").post({
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
        self.setAuthenticatedAccount(data);

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

    this.getAuthenticatedAccount = function getAuthenticatedAccount() {
      if (!$cookies.get("authenticatedAccount")) {
        return;
      }

      return JSON.parse($cookies.get("authenticatedAccount"));
    };

    this.isAuthenticated = function isAuthenticated() {
      return !!$cookies.get("authenticatedAccount");
    };

    this.setAuthenticatedAccount = function setAuthenticatedAccount(account) {
      $cookies.put("authenticatedAccount", JSON.stringify(account));
    };

    this.unauthenticate = function unauthenticate() {
      $cookies.remove("authenticatedAccount");
    };
  }

  angular.module("app")
    .service("authenticationService", ["$cookies", "$state", "Restangular", authenticationService]);

})(window, window.angular);