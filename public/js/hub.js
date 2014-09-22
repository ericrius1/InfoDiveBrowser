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
  this.worlds.then(function(worlds){
    worlds.map(function(world){
    })
  });
  
}

hub.view = function(ctrl) {
  return m(".worlds", [
    ctrl.worlds().map(function(world, index) {
      return m('div', [
        m("a[href] = '/world/]", {config: m.route}, 'world ' + index)
      ])
    })
  ]);
};

world.controller = function(){

}

world.view = function(){
  return m('div');
}

m.route.mode = "hash"
m.route(document.body, '/', {
  "/": hub,
  "/world" : world
});




m.module(document.body, hub);