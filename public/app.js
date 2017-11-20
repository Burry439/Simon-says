var app = angular.module('anguGames', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: '/templates/home.html'
      })
      .state('simon', {
        url: '/simon',
        controller: 'simonCtrl',
        templateUrl: '/templates/simon.html',
       
      });
  
    $urlRouterProvider.otherwise('/home');
  }]);