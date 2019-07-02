const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local-strategy');

const url = 'mongodb://localhost:27017';
const dbName = 'libraryApp';

function localStrategy() {
  // configure strategy
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password',
  }, ((username, password, done) => {
    (async function mongo() {
      let client;
      try {
        // connecting to the server
        client = await MongoClient.connect(url);
        debug('connected to server correctly');

        // connect to database
        const db = client.db(dbName);

        // get collection: 'users' here
        const collection = await db.collection('users');

        const user = await collection.findOne({ username });

        // authenticate user
        if (user && user.password === password) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());
  })));
}

module.exports = localStrategy;
