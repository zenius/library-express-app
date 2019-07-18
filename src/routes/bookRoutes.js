const express = require('express');
const bookController = require('../controllers/book-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const bookService = require('../services/good-reads-service');

const bookRouter = express.Router();

function router(nav) {
  const { getBooks, getBookById } = bookController(bookService, nav);

  // authorize user: access books only if user is logged in
  bookRouter.use(authMiddleware);

  bookRouter.get('/', getBooks);

  bookRouter.get('/:id', getBookById);

  return bookRouter;
}

module.exports = router;
