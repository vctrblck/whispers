// camera.js --- `three.js' camera definitions for level 3

// Libraries:

// `three.js'

// Modules:

// `renderer.js'

// Code:

// Instantiate `three.js' perspective camera
var camera3 = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  100000
);

// Level 3 camera position
camera3.position.x = 100;
camera3.position.y = 10;
camera3.position.z = 100;

// Level 3 camera controls
const controls3 = new THREE.OrbitControls(camera3, renderer.domElement);
controls3.target.set(0, 20, 0);
controls3.update();

// Resize window for level 3 camera
window.addEventListener(
  'resize',
  function () {
    camera3.aspect = window.innerWidth / window.innerHeight;
    camera3.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);

// camera.js ends here
