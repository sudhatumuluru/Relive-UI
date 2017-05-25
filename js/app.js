/*var mainApp = angular.module('myApp', ['ngRoute']);

mainApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/home', {
        templateUrl: 'views/home.html'
    })
        .when('/login', {
        templateUrl: 'views/loginPage.html'
        controller: 'LoginController'
    })
    .when('/RegistrationPage',{
        templateUrl: 'views/RegistrationPage.html'
        
    }).otherwise({
        redirecTo:'/home'
    });
}]);

app.controller('myCtrl', function($scope, $http) {
    
    
    $scope.user = {
        
        name: "koushik",
        password: "12345"
    }
    
    $http({
        method : "GET",
        url : "welcome.htm"
    }).then(function mySucces(response) {
        $scope.myWelcome = response.data;
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
});
*/


'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('rio', [
  'ngRoute',
  'ngCookies',
  'ngMaterial',
 // 'rio.page1',
 // 'rio.page2',
//  'rio.version',
  'rio.auth',
//  'demo',
//  'ngTasty'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/page1', {
        templateUrl: 'app/partials/page1/page1.html'
      })
      .when('/page2', {
        templateUrl: 'app/partials/page2/page2.html'
      })
      .when('/login', {
          templateUrl: 'app/partials/auth/login.html'
      })
      .otherwise({redirectTo: '/views/home.html'});

}]).run(['$rootScope', '$http', '$location', '$cookieStore', function($rootScope, $http, $location, $cookieStore){
    //$rootScope.APIServerAddress = envConfig.APIAddress;
    console.log("Release server UI is ready!");

    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        console.log("Current user is not empty");
        //$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/page1', '/page2']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/home');
        }
    });

    //$http.get('data/login.json').then(function(response){
        $rootScope.APIServerAddress = "http://127.0.0.1:9999/api/";
        console.log("Test Message -- API Address: " + $rootScope.APIServerAddress);
    //});
}]);

app.controller('AppCtrl', function($scope, $location, $mdDialog, $rootScope) {
    $scope.isActive = function(route) {
        return route === $location.path();
    };

    $scope.showAdvanced = function(event) {
        $mdDialog.show({
            controller: 'LoginCtrl',
            templateUrl: 'login-popup.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
    };
    $scope.signout = function(event) {
        $rootScope.isAuthorized = false;
        $location.path('views/home.html');
    }
});
