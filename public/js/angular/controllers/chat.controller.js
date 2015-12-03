(function(window, angular) {
'use strict';

angular
  .module('messenger')
  .controller('ChatController', ChatController);

ChatController.$inject = ['$scope', 'socket'];

function ChatController($scope, socket) {
  var vm         = this;
  vm.message     = '';
  vm.username    = '';
  vm.submit      = submit;
  vm.getUsername = getUsername;
  vm.messages = [];

  function getUsername() {
    vm.username = prompt('Username');
  };

  socket.on('newMessage', function(data) {
    vm.messages.push(data);
    console.log(data);
  });

  function submit() {
    var data = {
      message:  vm.message,
    };
    socket.emit('message', data);
    vm.message = '';
    console.log('message sent');
  };

}

})(window, window.angular);
