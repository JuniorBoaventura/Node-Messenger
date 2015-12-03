var express       = require('express');
var session       = require('express-session');
var mongoose      = require('mongoose');
var app           = express();
var server        = require('http').Server(app);
var io            = require('socket.io')(server);
var path          = require('path');
var bodyParser    = require('body-parser');

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// View engine
app.use(express.static(path.resolve(__dirname, 'public')));
app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname, 'public', 'views'));

var middleware = function(req, res, next) {
  if (!req.user)
    return res.send(403).end();
  next();
};

// PassportJs
require('./config/passeport.js')(app);

// Socket.io
require('./socket/chat.js')(io);

// Routes
app.get('/getTemplate/:template', function(req, res) {
  res.render(req.params.template);
});

app.get('/loginFailure', function(req, res, next) {
  res.sendStatus(401);
});

app.get('/loginSuccess', function(req, res, next) {
  res.sendStatus(200);
});

app.get('/*', function(req, res) {
  res.render('template', { user:req.user || {} });
});

server.listen(2020, function() {
  console.log('Listening on *:2020');
});
