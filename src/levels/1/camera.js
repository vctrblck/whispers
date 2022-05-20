// camera.js --- `three.js' camera definitions for level 1

// Libraries:

// `three.js'

// Modules:

// None

// Code:

// Instantiate `three.js' perspective camera
var camera1 = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1500
);

// Level 1 camera position
camera1.position.x = 0;
camera1.position.y = 45;
camera1.position.z = 0;
camera1.rotation.y = 30;

// Level 1 camera controls
const controls1 = new THREE.FirstPersonControls(camera1, renderer.domElement);
controls1.movementSpeed = 7000;
controls1.lookSpeed = 15;
controls1.activeLook = true;

// camera.js ends here
