const express = require('express');
const books = require('../../books');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.get('/', (req, res) => {
    res.render('books', {
      title: 'Books',
      nav,
      books,
    });
  });

  bookRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    res.render('book', {
      title: 'Books',
      nav,
      book: books.data[id],
    });
  });
  return bookRouter;
}

module.exports = router;
