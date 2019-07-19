const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app: bookController');

const url = 'mongodb://localhost:27017';
const dbName = 'libraryApp';

function bookController(bookService, nav) {
  function getBooks(req, res) {
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
  }

  function getBookById(req, res) {
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

        // get the details using bookService
        // eslint-disable-next-line no-underscore-dangle
        book.details = await bookService.getDescriptionById(book.bookId);

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
  }

  return {
    getBooks,
    getBookById,
  };
}

module.exports = bookController;
