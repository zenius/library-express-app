const passport = require('passport');

// local-strategy returns function
require('./strategies/local-strategy')();

function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // stores User in session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Retrieves User from session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  return passport;
}

module.exports = passportConfig;
