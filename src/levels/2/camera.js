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
camera2.rotation.y = -Math.PI/2;

//============================================================================================================================//

// test camera
xdir = 0;
zdir = 0;
function cam2(){ 
  controls2 = new THREE.PointerLockControls(camera2, renderer.domElement);

  controls2.lock();

  document.addEventListener('keydown', (e)=>{
      switch (e.key) {
          case 'a':
              xdir = -1
              break;
          case 'w':
              zdir = 1
              break;
          case 'd':
              xdir = 1
              break;
          case 's':
              zdir = -1
              break;
      }
  })

  document.addEventListener('keyup', (e)=>{
      switch (e.key) {
          case 'a':
              xdir = 0
              break;
          case 'w':
              zdir = 0
              break;
          case 'd':
              xdir = 0
              break;
          case 's':
              zdir = 0
              break;
      }
  })
}



//============================================================================================================================//

//semi working camera

// function cam2(){ 
//   let controls2
//   controls2 = new THREE.PointerLockControls(camera2, renderer.domElement);

  
//   controls2.lock()
  

//   var direction2 = new THREE.Vector3();
//   document.addEventListener('keydown', (e)=>{
//     switch (e.key) {
//         case 'w':
//             camera2.getWorldDirection(direction2);
//             camera2.position.add(direction2.multiplyScalar(2));
//             break;
//         case 'd':
//             // camera1.getWorldDirection(direction1);
//             // camera1.position.sub(direction1.multiplyScalar(2));
//             break;
//         case 's':
//             camera2.getWorldDirection(direction2);
//             camera2.position.sub(direction2.multiplyScalar(2));
//             break;
//         case 'a':
//             // camera1.getWorldDirection(direction1);
//             // camera1.position.add(direction1.multiplyScalar(2));
//             break;
//     }
//   })

// }

//============================================================================================================================//
