(function(window, angular) {

angular
  .module('messenger')
  .factory('user', user);

user.$inject = ['$http', '$location'];

function user($http, $location) {
  var factory = {
    login: login,
    data: userData,
  };
  return factory;

  function login(username, password, callback) {
    var data = {
      username: username,
      password: password,
    };

    $http.post('/login', data).then(function successCallback(response) {
      $location.path('/chat');
    }, function errorCallback(response) {

      $location.path('/login');
    });
  }

};

})(window, window.angular);
