// camera.js --- Whispers camera

// Libraries:

// `three.js'

// Modules:

// None

// Code:

// Instantiate `three.js' camera
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Camera transformations
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;

// camera.js ends here
