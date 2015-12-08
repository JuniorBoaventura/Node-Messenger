(function(window, angular) {
  'use strict';

  angular
    .module('messenger')
    .factory('socket', socket);

  socket.$inject = ['$rootScope'];

  function socket($rootScope) {
    function readCookie(cookieName) {
      var re = new RegExp('[; ]' + cookieName + '=([^\\s;]*)');
      var sMatch = (' ' + document.cookie).match(re);
      if (cookieName && sMatch) return unescape(sMatch[1]);
      return '';
    }

    var socket = io.connect('http://localhost:2020');

    // var socket = io.connect('http://localhost:2020' + window.location.host, { query: 'session_id=' + readCookie('connect.sid') });

    var factory = {
      on: function(eventName, callback) {
        function wrapper() {
          var args = arguments;
          $rootScope.$apply(function() {
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
