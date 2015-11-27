(function(window, angular) {
'use strict';

angular
  .module('messenger')
  .controller('LoginController', LoginController);

LoginController.$inject = ['$scope', 'user'];

function LoginController($scope, user) {
  var vm = this;

  vm.submit = submit;

  function submit() {
    user.login(vm.username, vm.password);
  };

}

})(window, window.angular);
