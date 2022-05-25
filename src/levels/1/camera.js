
// camera 
var mixer1 = new THREE.AnimationMixer()

var camera1 = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1500
);

camera1.position.x = 0;
camera1.position.y = 45;
camera1.position.z = 0;
camera1.rotation.y = 30;

// const controls2 = new THREE.OrbitControls(camera2, renderer.domElement);
// controls2.target.set(0, 20, 0);    
// controls2.update();

const controls1 = new THREE.FirstPersonControls(camera1, renderer.domElement);
controls1.movementSpeed = 7000;
controls1.lookSpeed=15;
controls1.activeLook = true;