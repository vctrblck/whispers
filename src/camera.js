// camera.js --- Default camera definitions

// Libraries:

// `three.js'

// Modules:

// None

// Code:

// Instantiate default scene camera
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Default camera position
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;

// Handle window resize event for all cameras
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  camera1.aspect = window.innerWidth / window.innerHeight;
  camera1.updateProjectionMatrix();

  camera2.aspect = window.innerWidth / window.innerHeight;
  camera2.updateProjectionMatrix();

  camera3.aspect = window.innerWidth / window.innerHeight;
  camera3.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);

// camera.js ends here
