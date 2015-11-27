var express    = require('express');
var mongoose   = require('mongoose');
var app        = express();
var server     = require('http').Server(app);
var io         = require('socket.io')(server);
var path       = require('path');
var bodyParser = require('body-parser');

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// View engine
app.use(express.static(path.resolve(__dirname, 'public')));
app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname, 'public', 'views'));

app.get('/', function(req, res) {
  res.render('template.jade');
});

app.post('/login', function(req, res) {
  console.log(req.body);
});

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

server.listen(2020, function() {
  console.log('Listening on *:2020');
});
