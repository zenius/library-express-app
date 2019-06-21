var express = require("express");
var chalk = require('chalk'); 
var debug = require('debug')('app'); 
var morgan = require('morgan'); 
var path = require('path'); 

var app = express(); 
var port = process.env.PORT || 3000; 

app.use(morgan('tiny')); 
// serving static files - public directory 
app.use(express.static(path.join(__dirname, 'public'))); 

// serving static files - node modules
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.get("/", function(req, res){ 
    res.sendFile(path.join(__dirname, 'views/index.html')); 
}); 

app.listen(port, function() { 
    debug(`server listening on port ${chalk.green(port)}`); 
}); 

