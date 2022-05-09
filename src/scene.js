// Instantiate `three.js' scene
var scene = new THREE.Scene();
var level1 = new THREE.Scene();
var level2 = new THREE.Scene();
var level3 = new THREE.Scene();

var mixer = new THREE.AnimationMixer();
let prevTime = Date.now();
// Instantiate `three.js' scene axes [this code is just example used on scene]
var axes = new THREE.AxesHelper(100);
scene.add(axes);
level1.add(axes);

camera.lookAt(scene.position);

// Render  animation
function animateScene() {
  requestAnimationFrame(animateScene);

  //this is where the renderer chooses what to render. for now just comment
  //what we dont want rendered out

  //renderer.render(scene, camera);

  //===========================================================================================
  //Level 1
  
  const time = Date.now();
  mixer.update( ( time - prevTime ) * 0.001 );
  prevTime = time;
  renderer.render(level1, camera1);
   
  //===========================================================================================
  //renderer.render(level2, camera2);
  // renderer.render(level3, camera3);

}

// scene.js ends here
