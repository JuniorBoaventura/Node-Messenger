(function(window, angular) {

angular
  .module('messenger')
  .factory('user', user);

user.$inject = ['$http'];

function user($http) {
  var factory = {
    login: login,
  };
  return factory;

  function login(username, password, callback) {
    var data = {
      username: username,
      password: password,
    };
    data = angular.toJson(data);
    console.log(data);
    $http.post('/login', data).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {

      console.log(response);
    });
  }

};

})(window, window.angular);
