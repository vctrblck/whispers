var fieldOfView3 = 45;
var aspect3 = window.innerWidth / window.innerHeight;
var near3 = 0.1;
var far3 = 1000;
var camera3 = new THREE.PerspectiveCamera(fieldOfView3, aspect3, near3, far3);

// Level 3 camera position
camera3.position.x = -30;
camera3.position.y = 1;
camera3.position.z = 30;
camera3.rotation.y = 30;

xdir = 0;
zdir = 0;
function cam3() {
  controls3 = new THREE.PointerLockControls(camera3, renderer.domElement);

  controls3.lock();

  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'a':
        xdir = -1;
        break;
      case 'w':
        zdir = 1;
        break;
      case 'd':
        xdir = 1;
        break;
      case 's':
        zdir = -1;
        break;
    }
  });

  document.addEventListener('keyup', (e) => {
    switch (e.key) {
      case 'a':
        xdir = 0;
        break;
      case 'w':
        zdir = 0;
        break;
      case 'd':
        xdir = 0;
        break;
      case 's':
        zdir = 0;
        break;
    }
  });
}

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
