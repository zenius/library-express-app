const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' },
];

// routing function
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const books = require('./books');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));

// serving static files - public directory
app.use(express.static(path.join(__dirname, 'public')));

// serving static files - node modules
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

// setting template engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

// setting routes
app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Library',
    nav,
    books,
  });
});

app.listen(port, () => {
  debug(`server listening on port ${chalk.green(port)}`);
});
