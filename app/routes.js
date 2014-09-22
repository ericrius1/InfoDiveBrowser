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
}