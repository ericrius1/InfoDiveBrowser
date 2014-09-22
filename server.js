//modules
// mongodb://heroku_app29862006:72o7v0fsmoaro2ra30grr8n57n@ds039000.mongolab.com:39000/heroku_app29862006

var express = require('express');
var app = express();
var mongodb = require('mongodb');
var mongojs = require('mongojs');
var port = process.env.PORT || 8080
app.use(express.static(__dirname + '/public'));

// var uri = 'mongodb://heroku_app29862006:72o7v0fsmoaro2ra30grr8n57n@ds039000.mongolab.com:39000/heroku_app29862006';
var uri = 'infodive';
var seedData = [{
  data: Math.random()
}]
var db = mongojs.connect(uri);
db.createCollection('worlds');
var worlds = db.collection('worlds');
worlds.insert(seedData[0], function(err, result) {
  if (err) throw err;
});


//routes
require('./app/routes')(app, db);



app.listen(port);
console.log('Magic happens on port' + port);
