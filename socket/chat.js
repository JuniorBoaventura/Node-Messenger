function onAuthorizeSuccess(data, accept) {
  console.log(data.user);
}

function onAuthorizeFail(data, message, error, accept) {
  console.log(data);
}

module.exports = function(io) {

  // Socket.io
  io.on('connection', function(socket) {
    var client = socket.request.user;
    console.log(client);
    // socket.broadcast.emit('connection', client.username);
    //
    // socket.on('disconnect', function() {
    //   socket.broadcast.emit('disconnect', client.username);
    // });

    socket.on('message', function(data) {
      data.username = client.username;
      console.log(client._id);
      io.emit('newMessage', data);
    });

  });

};
