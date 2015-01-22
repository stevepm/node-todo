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

var Todo = mongoose.model('Todo',{
  text : String
});

app.get('/api/todos', function(req, res){
  Todo.find(function(err, todos){
    if(err){
      res.send(err)
    }

    res.json(todos);
  })
});

app.post('/api/todos', function(req, res){
  Todo.create({
    text : req.body.text,
    done : false
  }, function(err, todo){
    if(err){
      res.send(err)
    }

    Todo.find(function(err, todos){
      if(err){
        res.send(err)
      }

      res.json(todos);
    })
  })
});

app.delete('/api/todos/:todo_id', function(req, res){
  Todo.remove({
    _id : req.params.todo_id
  }, function(err, todo){
    if(err){
      res.send(err)
    }

    Todo.find(function(err, todos){
      if(err){
        res.send(err)
      }

      res.json(todos);
    })
  })
});

app.get('*', function(req, res){
  res.sendfile('./public/index.html');
});

app.listen(8080);
console.log("App is listening on port 8080");
