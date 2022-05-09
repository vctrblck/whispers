

// Instantiate `scene.js' camera
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Scene.js Camera transformations
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;

//=========================================================================//

//level 1 Camera + controls [orbit controls ect are declared here]
var camera1 = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  100000
);

camera1.position.x = 100;
camera1.position.y = 10;
camera1.position.z = 100;

const controls1 = new THREE.OrbitControls(camera1, renderer.domElement);
controls1.target.set(0, 20, 0);
controls1.update();

//=========================================================================//

//level 2 Camera + controls [orbit controls ect are declared here]
var camera2 = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  100000
);

camera2.position.x = 0;
camera2.position.y = 1000;
camera2.position.z = 0;

const controls2 = new THREE.OrbitControls(camera2, renderer.domElement);
controls2.target.set(0, 20, 0);
controls2.update();



//=========================================================================//

//level 3 Camera + controls [orbit controls ect are declared here]
var camera3 = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  100000
);

camera3.position.x = 100;
camera3.position.y = 10;
camera3.position.z = 100;

const controls3 = new THREE.OrbitControls(camera3, renderer.domElement);
controls3.target.set(0, 20, 0);
controls3.update();


//=========================================================================//

//Resizing the window for all cameras


window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    camera1.aspect = window.innerWidth / window.innerHeight;
    camera1.updateProjectionMatrix();

    camera2.aspect = window.innerWidth / window.innerHeight;
    camera2.updateProjectionMatrix();

    camera3.aspect = window.innerWidth / window.innerHeight;
    camera3.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

