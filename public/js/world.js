

G.initialize = function(){
  G.w = window.innerWidth;
  G.h = window.innerHeight;
  G.glContainer = document.getElementById('glContainer');
  G.scene = new THREE.Scene();
  G.camera = new THREE.PerspectiveCamera(45, this.w/this.h, 1, 1000)
  G.camera.position.z = 50;
  G.renderer = new THREE.WebGLRenderer()
  G.renderer.setSize(G.w, G.h);
  G.glContainer.appendChild(G.renderer.domElement)

}

G.initialize();
animate()

function animate(){
  window.requestAnimationFrame(animate);
  G.renderer.render(G.scene, G.camera);
}

G.onResize = function(){
  this.w = window.innerWidth;
  this.h = window.innerHeight;
  this.ratio = this.w / this.h;

  this.camera.aspect = this.ratio;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(this.w, this.h);

}

G.createScene = function(){
  var sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 16));
  G.scene.add(sphere);
}

window.addEventListener('resize', G.onResize.bind(G), false);