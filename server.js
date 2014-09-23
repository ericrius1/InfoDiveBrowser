//modules
// mongodb://heroku_app29862006:72o7v0fsmoaro2ra30grr8n57n@ds039000.mongolab.com:39000/heroku_app29862006

var express = require('express');
var app = express();
var mongodb = require('mongodb');
var mongojs = require('mongojs');
var THREE = require('three');
var port = process.env.PORT || 8080
app.use(express.static(__dirname + '/public'));

// var uri = 'mongodb://heroku_app29862006:72o7v0fsmoaro2ra30grr8n57n@ds039000.mongolab.com:39000/heroku_app29862006';
var uri = 'infodive';
var data = {
  primitives: [
    {
      type: 'sphere',
      position: new THREE.Vector3(Math.random() * 30, 20, -300)
    },
    {
      type: 'sphere',
      position: new THREE.Vector3(Math.random() * 30, 20, -300)
    }
  ]
}
var db = mongojs.connect(uri);
db.createCollection('worlds');
var worlds = db.collection('worlds');
worlds.insert(data, function(err, result) {
  if (err) throw err;
});


//routes
require('./app/routes')(app, db);



app.listen(port);
console.log('Magic happens on port' + port);
