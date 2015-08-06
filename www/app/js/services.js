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
    this.list = function list(search, target) {
      search = search || "";
      target = target || "";

      return Restangular.all("accounts").getList({
        s: search,
        t: target
      });
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

  function friendsService(Restangular, FriendshipAction) {
    this.add = function add(user) {
      return Restangular.all("friends").post({
        user_id: user.id,
        action: FriendshipAction.ADD
      });
    };

    this.remove = function remove(user) {
      return Restangular.all("friends").post({
        user_id: user.id,
        action: FriendshipAction.REMOVE
      });
    };

    this.accept = function accept(user) {
      return Restangular.all("friends").post({
        user_id: user.id,
        action: FriendshipAction.ACCEPT
      });
    };

    this.reject = function reject(user) {
      return Restangular.all("friends").post({
        user_id: user.id,
        action: FriendshipAction.REJECT
      });
    };
  }

  angular.module("app")
    .constant("FriendshipAction", {
      ADD: "add",
      REMOVE: "remove",
      ACCEPT: "accept",
      REJECT: "reject"
    })
    .service("authenticationService", ["$cookies", "$state", "Restangular", authenticationService])
    .service("accountsService", ["Restangular", accountsService])
    .service("feedService", ["Restangular", feedService])
    .service("friendsService", ["Restangular", "FriendshipAction", friendsService]);

})(window, window.angular);