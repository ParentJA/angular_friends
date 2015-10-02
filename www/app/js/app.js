(function (window, angular, undefined) {
  "use strict";

  function RestangularConfig(RestangularProvider) {
    RestangularProvider.setBaseUrl("/api/v1/");
    RestangularProvider.setRequestSuffix("/");
    RestangularProvider.setDefaultHttpFields({
      xsrfHeaderName: "X-CSRFToken",
      xsrfCookieName: "csrftoken"
    });
  }

  function UiRouterConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "/static/views/home.html",
        controller: "HomeController"
      })
      .state("log_in", {
        url: "/log_in",
        templateUrl: "/static/views/log_in.html",
        controller: "LogInController"
      })
      .state("sign_up", {
        url: "/sign_up",
        templateUrl: "/static/views/sign_up.html",
        controller: "SignUpController"
      })
      .state("profile", {
        url: "/profile",
        templateUrl: "/static/views/profile.html",
        controller: "ProfileController",
        resolve: {
          user: function(authenticationService) {
            return authenticationService.getAuthenticatedUser();
          }
        }
      })
      .state("profile_edit", {
        url: "/profile_edit",
        templateUrl: "/static/views/profile_edit.html",
        controller: "ProfileEditController",
        resolve: {
          user: function(authenticationService) {
            return authenticationService.getAuthenticatedUser();
          }
        }
      })
      .state("feed", {
        url: "/feed",
        templateUrl: "/static/views/feed.html",
        controller: "FeedController"
      })
      .state("users", {
        url: "/users",
        templateUrl: "/static/views/users.html",
        controller: "UsersController"
      })
      .state("users.search", {
        url: "/search",
        templateUrl: "/static/views/search.html",
        controller: "SearchController"
      })
      .state("users.requests", {
        url: "/requests",
        templateUrl: "/static/views/requests.html",
        controller: "UsersListController",
        resolve: {
          users: function(accountsService) {
            return accountsService.list(null, "requests").$object;
          }
        }
      })
      .state("users.browse", {
        url: "/browse",
        templateUrl: "/static/views/browse.html",
        controller: "UsersListController",
        resolve: {
          users: function(accountsService) {
            return accountsService.list().$object;
          }
        }
      })
      .state("users.friends", {
        url: "/friends",
        templateUrl: "/static/views/friends.html",
        controller: "UsersListController",
        resolve: {
          users: function(accountsService) {
            return accountsService.list(null, "friends").$object;
          }
        }
      });

    //Default state...
    $urlRouterProvider.otherwise("/");
  }

  function UiRunner($rootScope, $state) {
    $rootScope.$state = $state;
  }

  angular.module("app", ["ngCookies", "restangular", "ui.router"])
    .config(["RestangularProvider", RestangularConfig])
    .config(["$stateProvider", "$urlRouterProvider", UiRouterConfig])
    .run(["$rootScope", "$state", UiRunner]);

})(window, window.angular);