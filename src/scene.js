// Instantiate `three.js' scene
var level1 = new THREE.Scene();
var level2 = new THREE.Scene();
var level3 = new THREE.Scene();


let actions, activeAction, previousAction, activeKey, previousKey;
const states = [ 'Idle', 'Walking', 'Running' ];


var mixer11 = new THREE.AnimationMixer();
var mixer12 = new THREE.AnimationMixer();
var pip;

let prevTime = Date.now();
var currentLevel = 1;

// Instantiate `three.js' scene axes [this code is just example used on scene]
var axes = new THREE.AxesHelper(1000);
=======
var mixer = new THREE.AnimationMixer();
var mixer2 = new THREE.AnimationMixer();

// Instantiate `three.js' scene axes [this code is just example used on scene]
scene.add(axes);
level1.add(axes);
//level2.add(axes); 

const gridHelper = new THREE.GridHelper( 1000, 100, 0x000000, 0x000000 );
gridHelper.material.opacity = 0.2;
gridHelper.material.transparent = true;
level1.add( gridHelper );

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
    //const api = { state: 'Walking' };
    
    
    //fadeToAction( states[0], 0.5 );

    const time = Date.now();
    mixer11.update( ( time - prevTime ) * 0.001 );
    mixer12.update( ( time - prevTime ) * 0.001 );
    
    prevTime = time;

    //activeAction = actions['Walking'];
		//activeAction.play();
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
    collisionCheck();
    endLevel2();
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

function doMouse(){
  //pip.velocity.z += 10;
  
}

function onKeyDown(event){
  previousKey = activeKey;
  activeKey = event;

  switch (event.keyCode) {
    case 16:  //shift
      fadeToAction(states[2], 1);
      //break;
    case 87: // w
    if(event.shiftKey){
      fadeToAction(states[2], 1);
      pip.position.z += 1;
    }else{
      fadeToAction(states[1], 1);
      pip.position.z += 0.5;
    }
      break;
    case 65: // a
      this._move.left = true;
      break;
    case 83: // s
      this._move.backward = true;
      break;
    case 68: // d
      fadeToAction(states[2], 1);
      break;
    case 38: // up
    case 37: // left
    case 40: // down
    case 39: // right
      break;
    
  }
}

function onKeyUp(event){
  switch(event.keyCode) {
    case 16:  //shift
      //fadeToAction(actions[previousAction.getClip().name], 1);
      fadeToAction(states[0], 1);
      break;
    case 87: // w
      fadeToAction(states[0], 1);
      break;
    case 65: // a
      this._move.left = false;
      break;
    case 83: // s
      this._move.backward = false;
      break;
    case 68: // d
      fadeToAction(states[0], 1);
      break;
    case 38: // up
    case 37: // left
    case 40: // down
    case 39: // right
      break;
  }
}

function fadeToAction( name, duration ) {
  previousAction = activeAction;
  activeAction = actions[ name ];
  
  //console.log(activeAction);
  if ( previousAction !== activeAction ) {
    //console.log(previousAction);
    previousAction.fadeOut( duration );
    previousAction.halt(duration)
    activeAction
    .reset()
    .setEffectiveTimeScale( 1 )
    .setEffectiveWeight( 1 )
    .fadeIn( duration )
    .play();
  }else{
    activeAction.play();
  }
}