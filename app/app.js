var app = angular.module('smartCropApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'app/views/home.html',
      controller: 'MainCtrl'
    })
    .when('/dashboard', {
      templateUrl: 'app/views/dashboard.html',
      controller: 'MainCtrl'
    })
    .when('/contact', {
      templateUrl: 'app/views/contact.html',
      controller: 'MainCtrl'
    })
    .when('/login', {
      templateUrl: 'app/views/login.html',
      controller: 'AuthCtrl'
    })
    .when('/register', {
      templateUrl: 'app/views/register.html',
      controller: 'AuthCtrl'
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);
