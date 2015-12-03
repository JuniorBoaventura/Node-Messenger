angular
  .module('messenger')
  .config(config);

function config($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      controller:   'LoginController',
      controllerAs: 'login',
    }).
    when('/chat', {
      templateUrl:  'getTemplate/chat',
      controller:   'ChatController',
      controllerAs: 'chat',
    }).
    when('/login', {
      templateUrl:  'getTemplate/login',
      controller:   'LoginController',
      controllerAs: 'login',
    }).
    otherwise({
      redirectTo: '/',
    });

  $locationProvider.html5Mode(true);
}
