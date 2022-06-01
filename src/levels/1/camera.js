
// camera 
var mixer1 = new THREE.AnimationMixer()

var camera1 = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1500
);

camera1.position.x = -100;
camera1.position.y = 75;
camera1.position.z = 0;
camera1.rotation.y = 30;

xdir = 0;
zdir = 0;
function cam1(){ 
  controls1 = new THREE.PointerLockControls(camera1, renderer.domElement);

  controls1.lock();

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