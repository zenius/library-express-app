const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app: adminRoutes');
const books = require('../../books');

const adminRouter = express.Router();

function router(nav) {
  adminRouter.get('/', (req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function mongo() {
      let client;
      try {
        // connecting to the server
        client = await MongoClient.connect(url);
        debug('connected to server correctly');

        const db = client.db(dbName);
        const response = await db.collection('books').insertMany(books.data);

        res.json(response);
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());
  });
  return adminRouter;
}

module.exports = router;
