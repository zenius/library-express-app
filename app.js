var express = require("express");
var chalk = require('chalk'); 

var app = express(); 
var port = process.env.PORT || 3000; 

app.get("/", function(req, res){ 
    res.send("Welcome to Express"); 
}); 

app.listen(port, function() { 
    console.log(`server listening on port ${chalk.green(port)}`); 
}); 

