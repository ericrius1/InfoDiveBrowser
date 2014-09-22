var hub = {}
var world = {}

hub.load = function() {
  return m.request({
    method: 'GET',
    url: "/api/worlds"
  });
}

hub.controller = function() {
  this.worlds = hub.load()
  this.worlds.then(function(){
    m.render(document.body, hub.view(hub.controller))
  })
}

hub.view = function(ctrl) {
  return m(".worlds", [
    ctrl.worlds().map(function(world, index) {

      var element = "a[href='/world/" + world._id + "']";
      return m('div', [
        m(element, {config: m.route}, 'world ' + index)
      ])
    })
  ]);
};


world.load = function(url){
  return m.request({method: 'GET', url: url})
}

world.controller = function(){
  this.id = m.route.param('worldID');
  this.data = world.load('/api/world/' + this.id);

}

world.view = function(ctrl){
  return m('div', 'ahhhh');
}

m.route.mode = "hash"
m.route(document.body, '/', {
  "/": hub,
  "/world/:worldID": world
});


m.render(document.body, world.view(world.controller));
//so if we go straight to world via link it renders properly!
