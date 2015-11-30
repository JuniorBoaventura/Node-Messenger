angular
  .module('messenger')
  .config(config);

function config($routeProvider) {
  $routeProvider.
    when('/', {
      controller:   'LoginController',
      controllerAs: 'login',
    }).
    when('/chat', {
      templateUrl:  'views/chat',
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
}
