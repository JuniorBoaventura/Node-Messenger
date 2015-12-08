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
    socket.on('message', function(data) {
      data.username = client.username;
      data.userId = client._id;
      io.emit('newMessage', data);
    });

  });

};
