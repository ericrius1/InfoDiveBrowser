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

world.controller = function(){
  this.id = m.route.param('worldID');

}

world.view = function(ctrl){
  return m('div', ctrl.id);
}

m.route.mode = "hash"
m.route(document.body, '/', {
  "/": hub,
  "/world/:worldID": world
});





m.module(document.body, hub);