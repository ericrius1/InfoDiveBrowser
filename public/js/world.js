G.initialize = function() {
  G.w = window.innerWidth;
  G.h = window.innerHeight;
  G.glContainer = document.getElementById('glContainer');
  G.scene = new THREE.Scene();
  G.camera = new THREE.PerspectiveCamera(45, this.w / this.h, 1, 20000)
  // G.camera.position.z = 50
  G.renderer = new THREE.WebGLRenderer()
  G.renderer.setSize(G.w, G.h);
  G.glContainer.appendChild(G.renderer.domElement);
  var sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 16));
  G.scene.add(sphere);

  // sphere.scale.multiplyScalar(5 * data);

  // G.controls = new THREE.OrbitControls(G.camera, G.renderer.domElement);

  //GROUND
  var groundGeo = new THREE.PlaneGeometry(10000, 10000, 32, 32)
  var groundMat = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    transparent: true,
    opacity: 0.1,
    wireframe: true
  })
  var ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2
  G.scene.add(ground)

  G.renderer.autoClear = false;
  G.renderModel = new THREE.RenderPass(G.scene, G.camera);
  G.effectBloom = new THREE.BloomPass(1.1);
  G.effectCopy = new THREE.ShaderPass(THREE.CopyShader);
  G.effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
  G.effectFXAA.uniforms['resolution'].value.set(1 / G.w, 1 / G.h);
  G.effectCopy.renderToScreen = true;

  G.composer = new THREE.EffectComposer(G.renderer)
  G.composer.addPass(G.renderModel);
  G.composer.addPass(G.effectFXAA);
  G.composer.addPass(G.effectBloom);
  G.composer.addPass(G.effectCopy);

}

G.initialize();

function animate() {
  G.renderer.clear()
  G.composer.render();
  G.controls.update();

  window.requestAnimationFrame(animate);
}

G.onResize = function() {
  this.w = window.innerWidth;
  this.h = window.innerHeight;
  this.ratio = this.w / this.h;

  this.camera.aspect = this.ratio;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(this.w, this.h);

  G.effectFXAA.uniforms['resolution'].value.set(1 / this.w, 1 / this.h);

  G.composer.reset();

}

G.createScene = function(data) {
  console.log("DATA", data);
  var sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 16));
  G.scene.add(sphere);
  sphere.position.z = -100
  sphere.scale.multiplyScalar(5 * data);
  G.controls = new Controls(G.camera);
  animate()
}

window.addEventListener('resize', G.onResize.bind(G), false);