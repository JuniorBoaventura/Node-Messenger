var passport      = require('passport');
var session       = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var Users         = require('../schema/user');

module.exports = function(app) {

  app.use(session({ secret: 'Act0yoaj2D', resave: false, saveUninitialized: false}));
  app.use(passport.initialize());
  app.use(passport.session());

  // PasseportJs routing
  app.post('/login',
    passport.authenticate('local', {
      successRedirect: '/loginSuccess',
      failureRedirect: '/loginFailure',
    })
  );

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

};
