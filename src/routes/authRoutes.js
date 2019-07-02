const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app: authRoutes');

const authRouter = express.Router();
const url = 'mongodb://localhost:27017';
const dbName = 'libraryApp';

function router() {
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

  authRouter.get('/profile', (req, res) => {
    // gets the user information from passportConfig function in passport.js
    res.json(req.user);
  });

  return authRouter;
}

module.exports = router;
