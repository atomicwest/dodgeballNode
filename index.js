var http = require('http');

var express = require('express');

var app = express();

var scoreController = require('./controllers/scoreController');

app.set('view engine', 'ejs');

app.use(express.static('./public'));

scoreController(app);

//change for heroku
var c9Port = process.env.PORT;
app.listen(c9Port);
console.log('listening on port ' + c9Port);