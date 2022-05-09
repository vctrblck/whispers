// Instantiate `three.js' scene
var scene = new THREE.Scene();
var level1 = new THREE.Scene();
var level2 = new THREE.Scene();
var level3 = new THREE.Scene();

var mixer = new THREE.AnimationMixer();
var mixer2 = new THREE.AnimationMixer();

let prevTime = Date.now();
let prevTime2 = Date.now();
var currentLevel = 2;

// Instantiate `three.js' scene axes [this code is just example used on scene]
var axes = new THREE.AxesHelper(1000);
scene.add(axes);
level1.add(axes);
level2.add(axes); 

camera.lookAt(scene.position);
camera2.lookAt(0,0,0)

var test;

// Render  animation
function animateScene() {
  requestAnimationFrame(animateScene);

  //this is where the renderer chooses what to render. for now just comment
  //what we dont want rendered out

  //renderer.render(scene, camera);
  if(currentLevel==1){
    //=========================================================================================== Level 1 Start
    //Level 1
    
    document.title = "Whispers - Level 1";

    const time = Date.now();
    mixer.update( ( time - prevTime ) * 0.001 );
    prevTime = time;
    renderer.render(level1, camera1);
    
    //=========================================================================================== Level 1 End
  }else if(currentLevel==2){
    //=========================================================================================== Level 2 Start 
    //Level 2

    document.title = "Whispers - Level 2";

    const time2 = Date.now();
    mixer2.update( ( time2 - prevTime2 ) * 0.001 );
    prevTime2 = time2;
    animateAgents();

    renderer.render(level2, camera2);

    //=========================================================================================== Level 2 End
  }else{
    //=========================================================================================== Level 3 Start 
    //Level 3

    document.title = "Whispers - Level 3";

    renderer.render(level3, camera3);

    //=========================================================================================== Level 3 End
  }
}

// scene.js ends here
