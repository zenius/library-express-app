const passport = require('passport');
const { Strategy } = require('passport-local');

function localStrategy() {
  // configure strategy
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password',
  }, ((username, password, done) => {
    const user = {
      username,
      password,
    };
    done(null, user);
  })));
}

module.exports = localStrategy;
