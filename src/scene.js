
// Instantiate `three.js' scene
var scene = new THREE.Scene();
var level1 = new THREE.Scene();
var level2 = new THREE.Scene();
var level3 = new THREE.Scene();

// Instantiate `three.js' scene axes [this code is just example used on scene]
var axes = new THREE.AxesHelper(20);
scene.add(axes);

camera.lookAt(scene.position);



// Render  animation
function animateScene() {
  requestAnimationFrame(animateScene);

  //this is where the renderer chooses what to render. for now just comment
  //what we dont want rendered out

  //renderer.render(scene, camera);
  // renderer.render(level1, camera1);
   renderer.render(level2, camera2);
  // renderer.render(level3, camera3);

}

// scene.js ends here
