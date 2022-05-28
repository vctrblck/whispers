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
//const controls3 = new THREE.OrbitControls(camera3, renderer.domElement);
//controls3.target.set(0, 20, 0);
//controls3.update();


//level 3 First person Control C
const controls3 = new THREE.FirstPersonControls(camera3,renderer.domElement);
controls3.movementSpeed = 7000;
controls3.lookSpeed = 15;
controls3.activeLook = true;

controls3.enabled = true
controls3.lookVertical = false
//set how far up and down person can view
controls3.verticalMin = Math.PI / 1.7
controls3.verticalMax = Math.PI / 2.3

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
