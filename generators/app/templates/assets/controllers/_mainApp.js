var mainApp = angular.module('mainApp', ['ngRoute', 'ngToast', 'ui.bootstrap', 'nvd3', 'ui.grid', 'ui.grid.edit',
  'ui.grid.grouping', 'ui.grid.exporter','angularSpinner']);

mainApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

  // route for the home page

    .when('/main', {
      templateUrl: 'pages/main/main.html',
      controller: 'mainController'
    })

    .when('/users', {
      templateUrl: 'pages/users/users.html',
      controller: 'usersController'
    })

    .when('/users/:id', {
      templateUrl: 'pages/users/usersdetail.html',
      controller: 'usersDetailController'
    })

    .when('/criaruser', {
      templateUrl: 'pages/users/usersdetail.html',
      controller: 'criarUserController'
    })

    .when('/login', {
      templateUrl: 'pages/users/login.html'
    })
    //===== yeoman mainapp hook =====//
    .otherwise({ redirectTo: '/main'});

}]);

mainApp.config(['ngToastProvider',function(ngToast) {
  ngToast.configure({
    verticalPosition: 'top',
    horizontalPosition: 'right',
    maxNumber: 3,
    timeout: 2000,
    dismissOnTimeout: true
  });
}]);

mainApp.controller("navController", ['$scope', function ($scope) {
  $scope.funcao1 = "Utilizadores";
}]);

