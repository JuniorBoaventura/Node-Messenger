var express       = require('express');
var mongoose      = require('mongoose');
var app           = express();
var server        = require('http').Server(app);
var io            = require('socket.io')(server);
var path          = require('path');
var bodyParser    = require('body-parser');
var passport      = require('passport');
var session       = require('express-session');
var LocalStrategy = require('passport-local').Strategy;

var middleware = function(req, res, next) {
  if (!req.user)
    return res.send(403).end();
  next();
};

// Mongoose
mongoose.connect('mongodb://localhost/Messenger');
var Users = require('./models/user')(mongoose);

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// PassportJs
app.use(session({ secret: 'Act0yoaj2D', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

// View engine
app.use(express.static(path.resolve(__dirname, 'public')));
app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname, 'public', 'views'));

app.get('/', function(req, res) {
  res.render('template.jade');
});

// PasseportJs routing
app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure',
  })

);

app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});

app.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});

app.get('/getTemplate/:template', function(req, res) {
  res.render(req.params.template);
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    Users.findOne({
      username: username,
    }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      if (user.password != password) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
}));

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
