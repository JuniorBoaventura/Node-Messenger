angular
  .module('messenger')
  .config(config);

function config($routeProvider) {
  $routeProvider.
    when('/', {
      controller:   'LoginController',
      controllerAs: 'toto',
    }).
    when('/chat', {
      templateUrl:  'views/chat',
      controller:   'ChatController',
      controllerAs: 'chat',
    }).
    when('/login', {
      templateUrl:  'views/login',
      controller:   'loginController',
      controllerAs: 'login',
    }).
    otherwise({
      redirectTo: '/',
    });
}
