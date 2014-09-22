var hub = {}
var world = {}

var mContainer = document.getElementById('mContainer');


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000)
var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight);
glContainer.appendChild(renderer.domElement);

animate()

function animate(){
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

hub.load = function() {
  return m.request({
    method: 'GET',
    url: "/api/worlds"
  });
}

hub.controller = function() {
  this.worlds = hub.load()
  this.worlds.then(function(){
    m.render(mContainer, hub.view(hub.controller))
  })
}

hub.view = function(ctrl) {
  return m(".world-list", [
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

}

m.route.mode = "hash"
m.route(mContainer, '/', {
  "/": hub,
  "/world/:worldID": world
});


m.render(mContainer, world.view(world.controller));
//so if we go straight to world via link it renders properly!
