// game.js --- Game state management

// Libraries:

// `three.js'

// Modules:

// None

// Code:

// ========================================================================== /
// Game State                                                                 /
// ========================================================================== /

var gameActive = false;
var gameOver = false;
var currentLevel = 1;
var prevTime = Date.now();
let prevTime2 = Date.now();
let clock = new THREE.Clock();

startCam1 = true;
camera1.userData.tag = "cam1";
startCam2 = true;
startCam3 = true;

//variable declaration section for ammo
let physicsWorld, models = [], pos = new THREE.Vector3(), tmpTrans = null;
let rigidBodies = [];
let raycaster = new THREE.Raycaster();
let wall, ball;
let loadedLevel = 0;
let CylinderBool = false;
let cbContactResult;
const STATE = { DISABLE_DEACTIVATION : 4 };
//level 1 check variables

// ========================================================================== /
// Level Manangement                                                          /
// ========================================================================== /

var scene = new THREE.Scene(); // Default `three.js' scene

var axes = new THREE.AxesHelper(100); // Default `three.js' scene axes
scene.add(axes);

function animateScene() {
  if (!gameOver) {
    if (gameActive) {
      // Active game state

      if (currentLevel == 1) {
       
      //Level 1
        if(startCam1){
          cam1();
          startCam1 = false;
        }
        
        //level1.add( new THREE.BoxHelper( level1 ) );

        document.title = "Whispers - Level 1";
        
        //cam1Limits();
        
        tiempoI = Date.now() -25
        vel = 50
        if(controls1.isLocked === true){
            tiempoF = Date.now()

            delta = (tiempoF - tiempoI)/1000

            let xDis = xdir * vel * delta;
            let zDis = zdir * vel * delta;

            controls1.moveRight(xDis);
            controls1.moveForward(zDis);
            tiempoI = tiempoF
        }

        let deltaTime = clock.getDelta();
        updatePhysics( deltaTime );

        if(loadedLevel==1){
          startAmmo();
          loadedLevel+=1;
        }

        //keyPopup
        if(clockKey1.getElapsedTime() > 2){
          clockKey1.stop();
          if(level1 == keyPopupPanel1.parent){
            level1.remove(keyPopupPanel1);
          }
        }

        renderer.render(level1, camera1);
      }  else if (currentLevel === 2) {
        // ================================================================== /
        // Level 2                                                            /
        // ================================================================== /

        document.title = 'Whispers - Level 2';

        if(startCam2){
          cam2();
          startCam2 = false;
        }

        const time2 = Date.now();
        // mixer2.update((time2 - prevTime2) * 0.001);
        prevTime2 = time2;
        animateAgents(); 
        cam2Limits()
        collisionCheck()      

        if (endLevel2()) {
          currentLevel = 3;
        }
        camera2.position.y = 45;

        //
        tiempoI = Date.now() -25
        vel = 50
        if(controls2.isLocked === true){
            tiempoF = Date.now()

            delta = (tiempoF - tiempoI)/1000

            let xDis = xdir * vel * delta;
            let zDis = zdir * vel * delta;

            controls2.moveRight(xDis);
            controls2.moveForward(zDis);
            tiempoI = tiempoF
        }
        
        renderer.render(level2, camera2);
      } else if (currentLevel === 3) {
        // ================================================================== /
        // Level 3                                                            /
        // ================================================================== /

        document.title = 'Whispers - Level 3';

        renderer.render(level3, camera3);
      } else {
        // ================================================================== /
        // Default                                                            /
        // ================================================================== /

        renderer.render(scene, camera);
      }

      requestAnimationFrame(animateScene);
    } else {
      // Paused game state
    }
  } else {
    // Game over state
    // TODO
  }
}

//ammo stuff
//Ammojs Initialization
Ammo().then(start);

function startAmmo(){
  createWall(models);
}

function start (Ammo){
    tmpTrans = new Ammo.btTransform();
    setupPhysicsWorld();
    ball = setupCamera(camera1);
    setupContactResultCallback();
    document.addEventListener('keydown', (e) => onKeyDown(e), false);
    animateScene();
}

function onKeyDown(e){
  if(level1 == controlsPanel1.parent){
    level1.remove(controlsPanel1);
  }
  if(level1 == keyPopupPanel1.parent){
    level1.remove(keyPopupPanel1);
  }

  let ballBody = ball.userData.physicsBody;
  switch (e.key) {
    case 'a':
        //xdir = -1;
        ballBody.setLinearVelocity( new Ammo.btVector3(0, 0, pos.z ) );
        break;
    case 'w':
        //zdir = 1;
        ballBody.setLinearVelocity( new Ammo.btVector3(  -pos.x, 0,  0) );
        break;
    case 'd':
        //xdir = 1;
        ballBody.setLinearVelocity( new Ammo.btVector3( 0, 0, -pos.z ) );
        break;
    case 's':
        //zdir = -1;
        ballBody.setLinearVelocity( new Ammo.btVector3( pos.x, 0, 0 ) );
        break;
    case 't':
        checkContact();
        break;
    case 'y':
      console.log(camera1.position);
    case 'f':
      if(interactWall1 && !interactLock11){
        interactLock11 = true;
        console.log("You found a spare key!");
        foundKey();
      }else if(interactWall1 && interactLock12){
        console.log("You escaped the cell using the key!");
        currentLevel = 2;
      }else console.log("Did Nothing");
      break;
  }
}

function createWall(models){
  for(let i =0; i<models.length;i++){
    let model = models[i];

    if(model.name.includes("Floor") || model.name.includes("Roof")) continue;

    let pos = {x: model.position.x, y: model.position.y, z: model.position.z};
    let scale = {x: model.scale.x, y: model.scale.y, z: model.scale.z};
    let rotation1 = {x: model.rotation.x, y: model.rotation.y, z: model.rotation.z};
    let mass = 0;

    //threeJS Section
    wall = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({color: 0x42f5bf, visible: false}));

    wall.position.set(pos.x*1000, pos.y*1000, pos.z*1000);
    wall.scale.set(scale.x*1000, scale.y*1000, 1); 
    wall.rotateX(rotation1.x);
    wall.rotateY(rotation1.y);
    wall.rotateZ(rotation1.z);

    if(model.name.includes("Lock")){
      wall.scale.set(scale.x*2000, scale.y*2000, scale.z*2000); 
    }else if(model.name.includes("Cylinder")){
      wall.scale.set(scale.x*3600, scale.y*3600, scale.z*88900); 
      wall.position.y +=50
    }else if(model.name.includes("Floor")){
      //wall.position.y +=1;
    }else if(model.name.includes("Bar")){
      wall.scale.set(scale.x*2000, scale.y*2000, scale.z*2000); 
      wall.position.y += 1;
    }
    
    wall.castShadow = true;
    wall.receiveShadow = true;

    level1.add(wall);
  //Ammojs Section
  pos = wall.position;
  scale = wall.scale;
  let transform = new Ammo.btTransform();
  transform.setIdentity();
  transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
  let motionState = new Ammo.btDefaultMotionState( transform );

  let colShape = new Ammo.btBoxShape( new Ammo.btVector3( scale.x * 0.5, scale.y * 0.5, scale.z * 0.5 ) );
  colShape.setMargin( 0.05 );

  let localInertia = new Ammo.btVector3( 0, 0, 0 );
  colShape.calculateLocalInertia( mass, localInertia );

  let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
  let body = new Ammo.btRigidBody( rbInfo );

  body.setFriction(1);
  body.setRollingFriction(10);
  
  physicsWorld.addRigidBody( body );
  body.threeObject = wall;

  //Let's overlay the wall with a grid for visual calibration
  const gridHelper = new THREE.GridHelper( Math.max(wall.scale.x, wall.scale.y, wall.scale.z), 20, 0x1111aa, 0xaa1111 );
  
  gridHelper.position.x = wall.position.x;
  gridHelper.position.y = wall.position.y;
  gridHelper.position.z = wall.position.z;
  
  if(model.name.includes("Back") || model.name.includes("Front")){
    gridHelper.rotateZ( rotation1.y);
    wall.userData.tag = "wall";
  }else if(model.name.includes("Left") || model.name.includes("Right")){
    gridHelper.rotateX( Math.PI/2);
    wall.userData.tag = "wall";
  }else if(model.name.includes("Lock")){
    gridHelper.rotateZ( Math.PI/2);
    gridHelper.position.x -=5;
    wall.userData.tag = "lock";
  }else if(model.name.includes("Cylinder")){
    wall.userData.tag = "cyl";
    if(CylinderBool){
      const helper = new THREE.VertexNormalsHelper( wall, 5, 0x00ff00, 3 );
      //level1.add(helper);
      //level1.add( new THREE.BoxHelper( wall ) );
      continue;
    }else{
      CylinderBool = true;
      gridHelper.rotateZ( Math.PI/2);
      gridHelper.position.x -=5;
      gridHelper.scale.z *= 2;
      gridHelper.position.z *= -0.1;
    }
  }else if(model.name.includes("Bar")){
    gridHelper.rotateZ( Math.PI/2);
    gridHelper.position.x -=5;
    gridHelper.scale.x = 0.03;
    wall.userData.tag = "bar";
  }
  //level1.add( gridHelper );
  gridHelper.userData.tag = "grid";
  const helper = new THREE.VertexNormalsHelper( wall, 5, 0x00ff00, 3 );
  //level1.add(helper);
  //level1.add( new THREE.BoxHelper( wall ) );
  }
  
}

function setupPhysicsWorld(){
    let collisionConfiguration  = new Ammo.btDefaultCollisionConfiguration(),
        dispatcher              = new Ammo.btCollisionDispatcher(collisionConfiguration),
        overlappingPairCache    = new Ammo.btDbvtBroadphase(),
        solver                  = new Ammo.btSequentialImpulseConstraintSolver();

    physicsWorld           = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
    physicsWorld.setGravity(new Ammo.btVector3(5, 0, 5));
}

function updatePhysics( deltaTime ){

  // Step world
  physicsWorld.stepSimulation( deltaTime, 1 );
  
  // Update rigid bodies
  for ( let i = 0; i < rigidBodies.length; i++ ) {
      let objThree = rigidBodies[ i ];
      let objAmmo = objThree.userData.physicsBody;
      let ms = objAmmo.getMotionState();
      if ( ms ) {
          ms.getWorldTransform( tmpTrans );
          let p = tmpTrans.getOrigin();
          let q = tmpTrans.getRotation();
          objThree.position.set( camera1.position.x, camera1.position.y, camera1.position.z );
          //objThree.position.set( p.x(), p.y(), p.z() );
          objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );
      }
  }
  //checkContact();
}

function checkContact(){
  physicsWorld.contactTest( ball.userData.physicsBody , cbContactResult );
}

function setupContactResultCallback(){

  cbContactResult = new Ammo.ConcreteContactResultCallback();

  cbContactResult.addSingleResult = function(cp, colObj0Wrap, partId0, index0, colObj1Wrap, partId1, index1){

      let contactPoint = Ammo.wrapPointer( cp, Ammo.btManifoldPoint );

      const distance = contactPoint.getDistance();
  
      if( distance > 0 ) return;

      let colWrapper0 = Ammo.wrapPointer( colObj0Wrap, Ammo.btCollisionObjectWrapper );
      let rb0 = Ammo.castObject( colWrapper0.getCollisionObject(), Ammo.btRigidBody );

      let colWrapper1 = Ammo.wrapPointer( colObj1Wrap, Ammo.btCollisionObjectWrapper );
      let rb1 = Ammo.castObject( colWrapper1.getCollisionObject(), Ammo.btRigidBody );

      let threeObject0 = rb0.threeObject;
      let threeObject1 = rb1.threeObject;

      let tag, localPos, worldPos;
      if(threeObject0.userData.tag == "undefined") return;
      if( threeObject0.userData.tag != "ball" ){

          tag = threeObject0.userData.tag;
          localPos = contactPoint.get_m_localPointA();
          worldPos = contactPoint.get_m_positionWorldOnA();

      }
      else{

          tag = threeObject1.userData.tag;
          localPos = contactPoint.get_m_localPointB();
          worldPos = contactPoint.get_m_positionWorldOnB();

      }

      let localPosDisplay = {x: localPos.x(), y: localPos.y(), z: localPos.z()};
      let worldPosDisplay = {x: worldPos.x(), y: worldPos.y(), z: worldPos.z()};

      console.log( { tag, localPosDisplay, worldPosDisplay});

  }

  }

  function setupCamera(cam){
    let radius = 5;
    let pos = {x:cam.position.x, y:50, z:cam.position.z};
    let quat = {x: 0, y: 0, z: 0, w: 1};
    let mass = 30;

    let ball = ballObject = new THREE.Mesh(new THREE.SphereBufferGeometry(radius), new THREE.MeshPhongMaterial({color: 0x05ff1e}));
    ball.position.set(pos.x, pos.y, pos.z);
    ball.castShadow = true;
    ball.receiveShadow = true;

    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
    transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
    let motionState = new Ammo.btDefaultMotionState( transform );

    let colShape = new Ammo.btSphereShape( radius );
    colShape.setMargin( 0.05 );

    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( mass, localInertia );

    let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
    let body = new Ammo.btRigidBody( rbInfo );

    body.setFriction(4);
    body.setRollingFriction(10);

    //body.setActivationState(1); // 1 - active
    //body.activate();
    body.setActivationState( STATE.DISABLE_DEACTIVATION );

    ball.userData.physicsBody = body;
    ball.userData.tag = "ball";

    physicsWorld.addRigidBody( body );
    rigidBodies.push(ball);
    //level1.add(ball);
    
    return body.threeObject = ball;
  }

// game.js ends here
