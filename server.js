var express = require('express'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override');
var app = express();

mongoose.connect('mongodb://testdb:testdb@dbh86.mongolab.com:27867/test');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());


app.listen(8080);
console.log("App is listening on port 8080");
