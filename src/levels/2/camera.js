// camera.js --- `three.js' camera definitions for level 2

// Libraries:

// `three.js'

// Modules:

// None

// Code:

// Instantiate `three.js' perpesctive camera
var camera2 = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1500
);

// Level 2 camera position
camera2.position.x = -349;
camera2.position.y = 45;
camera2.position.z = 0;
camera2.rotation.y = 30;

// Level 2 orbital camera controls
// const controls2 = new THREE.OrbitControls(camera2, renderer.domElement);
// controls2.target.set(0, 20, 0);
// controls2.update();

// Level 2 first person controls
// const controls2 = new THREE.FirstPersonControls(camera2, renderer.domElement);
// controls2.lookVertical = false
// controls2.movementSpeed = 7000;
// controls2.lookSpeed = 15;
// controls2.activeLook = true;

function cam2(){ 
  let controls2
  controls2 = new THREE.PointerLockControls(camera2, renderer.domElement);

  
  controls2.lock()
  

  var direction2 = new THREE.Vector3();
  document.addEventListener('keydown', (e)=>{
    switch (e.key) {
        case 'w':
            camera2.getWorldDirection(direction2);
            camera2.position.add(direction2.multiplyScalar(2));
            break;
        case 'd':
            // camera1.getWorldDirection(direction1);
            // camera1.position.sub(direction1.multiplyScalar(2));
            break;
        case 's':
            camera2.getWorldDirection(direction2);
            camera2.position.sub(direction2.multiplyScalar(2));
            break;
        case 'a':
            // camera1.getWorldDirection(direction1);
            // camera1.position.add(direction1.multiplyScalar(2));
            break;
    }
  })

}

// camera.js ends here
