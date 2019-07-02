const express = require('express');
const passport = require('passport');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app: authRoutes');

const authRouter = express.Router();
const url = 'mongodb://localhost:27017';
const dbName = 'libraryApp';

function router(nav) {
  authRouter.post('/signup', (req, res) => {
    debug(req.body);
    const { username, password } = req.body;

    (async function mongo() {
      let client;
      try {
        // connecting to the server
        client = await MongoClient.connect(url);
        debug('connected to server correctly');

        // connect to the database
        const db = client.db(dbName);

        // connect to collection: 'users' here
        const collection = await db.collection('users');

        const user = { username, password };

        const result = await collection.insertOne(user);

        // debug(result);

        // login user and redirect to "/auth/profile"
        // get the first object from the result
        req.login(result.ops[0], () => {
          res.redirect('/auth/profile');
        });
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());
  });

  authRouter.get('/signin', (req, res) => {
    res.render('signin', {
      title: 'Sign In',
      nav,
    });
  });

  authRouter.post('/signin', passport.authenticate('local', {
    successRedirect: '/auth/profile',
    failureRedirect: '/',
  }));

  authRouter.route('/profile').all((req, res, next) => {
    // authorize user: access profile only if logged in
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }).get((req, res) => {
    // gets the user information from passportConfig function in passport.js
    res.json(req.user);
  });

  return authRouter;
}

module.exports = router;
