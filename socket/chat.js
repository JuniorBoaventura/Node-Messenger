module.exports = function(io) {

  // Socket.io
  io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('disconnect', function() {
      console.log('user disconnected');
    });

    socket.on('message', function(data) {
      console.log(data.username + ' : ' + data.message);
      io.emit('newMessage', data);
    });

  });

};
