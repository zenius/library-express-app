const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' },
];

// routing function
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')();

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));

// body parser for Post methods
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cookie-parser and expression-session
app.use(cookieParser());
app.use(session({ secret: 'library', resave: false, saveUninitialized: false }));

// require passport config
require('./src/config/passport')(app);

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
app.use('/auth', authRouter);
app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Library',
    nav,
  });
});

app.listen(port, () => {
  debug(`server listening on port ${chalk.green(port)}`);
});
