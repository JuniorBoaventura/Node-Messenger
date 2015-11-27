(function(window, angular) {
  'use strict';

  angular
    .module('messenger')
    .factory('socket', socket);

  socket.$inject = ['$rootScope'];

  function socket($rootScope) {
    console.log($rootScope);
    var socket = io.connect('http://localhost:2020');

    var factory = {
      on: function(eventName, callback) {
        function wrapper() {
          var args = arguments;
          $rootScope.$apply(function() {
            console.log('toto');
            callback.apply(socket, args);
          });
        }

        socket.on(eventName, wrapper);

        return function() {
          socket.removeListener(eventName, wrapper);
        };
      },

      emit: function(eventName, data, callback) {
        socket.emit(eventName, data, function() {
          var args = arguments;
          $rootScope.$apply(function() {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      },
    };

    return factory;
  }
})(window, window.angular);
