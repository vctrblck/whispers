
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

// const controls1 = new THREE.FirstPersonControls(camera1, document);
// controls1.movementSpeed = 7000;
// controls1.lookSpeed=15;
// controls1.activeLook = true;
window.onload = function(){ 
  let controls1
  controls1 = new THREE.PointerLockControls(camera1, renderer.domElement);

  document.getElementById('startGameButton').onclick = ()=>{
    controls1.lock()
  }

  var direction1 = new THREE.Vector3();
  document.addEventListener('keydown', (e)=>{
    switch (e.key) {
        case 'w':
            camera1.getWorldDirection(direction1);
            camera1.position.add(direction1.multiplyScalar(5));
            break;
        case 'd':
            // camera1.getWorldDirection(direction1);
            // camera1.position.sub(direction1.multiplyScalar(2));
            break;
        case 's':
            camera1.getWorldDirection(direction1);
            camera1.position.sub(direction1.multiplyScalar(2));
            break;
        case 'a':
            // camera1.getWorldDirection(direction1);
            // camera1.position.add(direction1.multiplyScalar(2));
            break;
    }
  })

  // document.addEventListener('keyup', (e)=>{
  //   switch (e.key) {
  //     case 'w':
  //       break;
  //     case 'd':
  //       zdir = 1
  //       break;
  //     case 's':
  //       xdir = -1
  //       break;
  //     case 'a':
  //       zdir = -1
  //       break;
  //   }
  // })




}