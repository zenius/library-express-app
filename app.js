var express = require("express");
var chalk = require('chalk'); 
var debug = require('debug')('app'); 
var morgan = require('morgan'); 
var path = require('path'); 

var app = express(); 
var port = process.env.PORT || 3000; 

app.use(morgan('tiny')); 

app.get("/", function(req, res){ 
    res.sendFile(path.join(__dirname, 'views/index.html')); 
}); 

app.listen(port, function() { 
    debug(`server listening on port ${chalk.green(port)}`); 
}); 

