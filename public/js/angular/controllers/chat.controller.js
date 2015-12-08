(function(window, angular) {
'use strict';

angular
  .module('messenger')
  .controller('ChatController', ChatController);

ChatController.$inject = ['$scope', 'socket', 'user'];

function ChatController($scope, socket, user) {
  var vm         = this;
  vm.message     = '';
  vm.username    = '';
  vm.submit      = submit;
  vm.messages = [];
  vm.connected = [];
  vm.user = user.data;
  console.log(user.data);

  socket.on('newMessage', function(data) {
    console.log(data);

    if (data.userId === vm.user._id)
      data.sent = true;

    console.log(data);
    vm.messages.push(data);
  });

  // socket.on('connection', function(data) {
  //   vm.connected.push(data);
  // });
  //
  // socket.on('disconnectedClient', function(data) {
  //
  // });

  function submit() {
    var data = {
      message:  vm.message,
    };
    var toto = socket.emit('message', data);
    console.log(toto);
    vm.message = '';
  };

}

})(window, window.angular);
