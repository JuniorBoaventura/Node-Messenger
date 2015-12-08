var express          = require('express');
var session          = require('express-session');
var RedisStore       = require('connect-redis')(session);
var SessionStore     = new RedisStore();
var mongoose         = require('mongoose');
var app              = express();
var server           = require('http').Server(app);
var io               = require('socket.io')(server);
var path             = require('path');
var bodyParser       = require('body-parser');
var passportSocketIo = require('passport.socketio');

app.use(session({ key: 'connect.sid', store: SessionStore, secret: 'Act0yoaj2D', resave: false, saveUninitialized: false}));

io.use(passportSocketIo.authorize({
  cookieParser: require('cookie-parser'),
  key:          'connect.sid',
  secret:       'Act0yoaj2D',
  store:        SessionStore,
  success:      onAuthorizeSuccess,
  fail:         onAuthorizeFail,
}));

function onAuthorizeSuccess(data, accept) {
  console.log('successful connection to socket.io');
  accept();
}

function onAuthorizeFail(data, message, error, accept) {
  console.log('failed connection to socket.io:', data, message);
  if (error)
    accept(new Error(message));
}

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
require('./config/passeport.js')(app, SessionStore);

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
  if (req.user) {
    var user = req.user;
    delete user.password;
  }

  res.render('template', { user:user || {} });
});

server.listen(2020, function() {
  console.log('Listening on *:2020');
});
