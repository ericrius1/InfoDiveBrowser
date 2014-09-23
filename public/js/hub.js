var hub = {}
var world = {}

var mContainer = document.getElementById('mContainer');



hub.load = function() {
  return m.request({
    method: 'GET',
    url: "/api/worlds"
  });
}

hub.controller = function() {
  this.worlds = hub.load()
  this.worlds.then(function() {
    // m.render(mContainer, hub.view(hub.controller))
  })
}

hub.view = function(ctrl) {
  return m('.hub', [
    m(".world-list", [
      ctrl.worlds().map(function(world, index) {

        var element = "a[href='/world/" + world._id + "']";
        return m('div', [
          m(element, {
            config: m.route
          }, 'world ' + index)
        ])
      })
    ]),
    m('button[class="new"]', "New")
  ]);
};


world.load = function(url) {
  return m.request({
    method: 'GET',
    url: url
  })
}

world.controller = function() {
  this.id = m.route.param('worldID');
  this.data = world.load('/api/world/' + this.id);
  this.data.then(function(data){
    G.createScene(data);
  });
  this.save = function(){
    G.saveScene();
  }

}

world.view = function(ctrl) {
  return m('button[class="save"]', {onclick: ctrl.save}, "Save")


}

m.route.mode = "hash"
m.route(mContainer, '/', {
  "/": hub,
  "/world/:worldID": world
});


m.render(mContainer, world.view(world.controller));
//so if we go straight to world via link it renders properly!