// scene.js --- Whispers scene

// Libraries:

// `three.js'

// Modules:

// `./camera.js'

// Code:

// Instantiate `three.js' scene
var scene = new THREE.Scene();

// Instantiate `three.js' scene axes
var axes = new THREE.AxesHelper(20);
scene.add(axes);

// Set camera direction
camera.lookAt(scene.position);

// ADD OBJECTS TO SCENE BELOW ---------------------------------------------- /

// ADD OBJECTS TO SCENE ABOVE ---------------------------------------------- /

// Render  animation
function animateScene() {
  requestAnimationFrame(animateScene);
  renderer.render(scene, camera);
}

// scene.js ends here
