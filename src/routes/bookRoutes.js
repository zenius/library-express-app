const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app: bookRoutes');

const url = 'mongodb://localhost:27017';
const dbName = 'libraryApp';

const bookRouter = express.Router();

function router(nav) {
  // authorize user: access books only if user is logged in
  bookRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });

  bookRouter.get('/', (req, res) => {
    (async function mongo() {
      let client;
      try {
        // connecting to the server
        client = await MongoClient.connect(url);
        debug('connected to server correctly');

        // connect to database
        const db = client.db(dbName);

        // get collection: 'books' here
        const collection = await db.collection('books');

        // get all the books
        const books = await collection.find().toArray();

        debug(books);

        res.render('books', {
          title: 'Library',
          nav,
          books,
        });
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());
  });

  bookRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    (async function mongo() {
      let client;
      try {
        // connecting to the server
        client = await MongoClient.connect(url);
        debug('connected to server correctly');

        // connect to database
        const db = client.db(dbName);

        // get collection: 'books' here
        const collection = await db.collection('books');

        // get single book by id
        const book = await collection.findOne({ _id: new ObjectID(id) });

        debug(book);

        res.render('book', {
          title: 'Library',
          nav,
          book,
        });
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());
  });
  return bookRouter;
}

module.exports = router;
