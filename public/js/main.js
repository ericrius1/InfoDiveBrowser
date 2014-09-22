var hub = {}

hub.load = function(){
  return m.request({method: 'GET', url: "/api/worlds"}).then(function(list){
    return list;
  });
}

hub.controller = function() {
 this.worlds = hub.load();
}

hub.view = function(ctrl) {
  return m(".worlds", [
    ctrl.worlds().map(function(world) {
      return m('.world', world.num);
    })
  ])
}

var world = {}

m.module(document.body, hub);