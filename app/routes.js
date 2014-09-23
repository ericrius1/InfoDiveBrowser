var mongojs = require('mongojs');

module.exports = function(app, db) { 
  // server routes ===========================================================
  // handle things like api calls
  // authentication routes

  // sample api route
  app.get('/api/worlds', function(req, res) {
    var worlds = db.collection('worlds')
    worlds.find(function(err, docs){
      res.json(docs);
    });
  });

  app.get('/api/world/:worldID', function(req, res){
    var worlds = db.collection('worlds');

    worlds.findOne({
      _id:mongojs.ObjectId(req.params.worldID)
    }, function(err, world){
      res.json(world);
    });
  });

  app.put('api/world/:worldID', function(req, res){
    worlds.findOne({
      _id: mongojs.ObjectId(req.params.worldID)
    }, function(err, world){
      console.log('yar!!')
    })
  })

}