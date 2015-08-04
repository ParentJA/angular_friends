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
      });

    //Default state...
    $urlRouterProvider.otherwise("/");
  }

  function UiRunner($rootScope, $state) {
    $rootScope.$state = $state;
  }

  angular.module("app", ["restangular", "ui.router"])
    .config(["RestangularProvider", RestangularConfig])
    .config(["$stateProvider", "$urlRouterProvider", UiRouterConfig])
    .run(["$rootScope", "$state", UiRunner]);

})(window, window.angular);