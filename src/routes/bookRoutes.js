const express = require('express');
const books = require('../../books');

const bookRouter = express.Router();

bookRouter.get('/', (req, res) => {
  res.render('books', {
    title: 'Books',
    nav: [{ link: '/books', title: 'Books' },
      { link: 'authors', title: 'Authors' },
    ],
    books,
  });
});

bookRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  res.render('book', {
    title: 'Books',
    nav: [{ link: '/books', title: 'Books' },
      { link: 'authors', title: 'Authors' },
    ],
    book: books.data[id],
  });
});

module.exports = bookRouter;
