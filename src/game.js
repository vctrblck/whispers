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

        level1.add( new THREE.BoxHelper( level1 ) );

        document.title = "Whispers - Level 1";

        const time = Date.now();
        prevTime = time;
        checkpoint1();
        if (endLevel1()){
          currentLevel = 2;

        }
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
    document.addEventListener('keyup', (e) => onKeyUp(e), false);
    animateScene();
}

function onKeyDown(e){
  raycaster.setFromCamera( camera1.position, camera1 );
  pos.copy( raycaster.ray.direction );
  pos.add( raycaster.ray.origin );
  
  //ball = setupCamera(camera1);
  let ballBody = ball.userData.physicsBody;
  pos.copy( raycaster.ray.direction );
  pos.multiplyScalar( 70 );
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
    case 'z':
        camera1.position.y = 1;
        break;
  }
}

function onKeyUp(e){
  let ballBody = ball.userData.physicsBody;
  switch (e.key) {
    case 'a':
        //xdir = 0
        //ballBody.setLinearVelocity( new Ammo.btVector3( 0, 0, 0 ) );
        break;
    case 'w':
        //zdir = 0
        //ballBody.setLinearVelocity( new Ammo.btVector3( 0, 0, 0 ) );
        break;
    case 'd':
        //xdir = 0
        //ballBody.setLinearVelocity( new Ammo.btVector3( 0, 0, 0 ) );
        break;
    case 's':
        //zdir = 0
        //ballBody.setLinearVelocity( new Ammo.btVector3( 0, 0, 0 ) );
        break;
  }
}

function createWall(models){
  for(let i =0; i<models.length;i++){
    let model = models[i];

    let pos = {x: model.position.x, y: model.position.y, z: model.position.z};
    let scale = {x: model.scale.x, y: model.scale.y, z: model.scale.z};
    let rotation1 = {x: model.rotation.x, y: model.rotation.y, z: model.rotation.z};
    let quat = {x: 0, y: 0, z: 0, w: 1};
    let mass = 0;

    //threeJS Section
    wall = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({color: 0x42f5bf, visible: false}));

    wall.position.set(pos.x*1000, pos.y*1000, pos.z*1000);
    wall.scale.set(scale.x*1000, scale.y*1000, 0.1); 
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
      level1.add(helper);
      level1.add( new THREE.BoxHelper( wall ) );
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
  level1.add( gridHelper ); //console.log(model.name, model.scale, gridHelper.scale);
  gridHelper.userData.tag = "grid";
  const helper = new THREE.VertexNormalsHelper( wall, 5, 0x00ff00, 3 );
  level1.add(helper);
  level1.add( new THREE.BoxHelper( wall ) );
  }
  
}

function setupPhysicsWorld(){
    let collisionConfiguration  = new Ammo.btDefaultCollisionConfiguration(),
        dispatcher              = new Ammo.btCollisionDispatcher(collisionConfiguration),
        overlappingPairCache    = new Ammo.btDbvtBroadphase(),
        solver                  = new Ammo.btSequentialImpulseConstraintSolver();

    physicsWorld           = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
    physicsWorld.setGravity(new Ammo.btVector3(0, 0, 0)); //TODO: GRavity?
}

function updatePhysics( deltaTime ){

  // Step world
  physicsWorld.stepSimulation( deltaTime, 10 );
  
  // Update rigid bodies
  for ( let i = 0; i < rigidBodies.length; i++ ) {
      let objThree = rigidBodies[ i ];
      let objAmmo = objThree.userData.physicsBody;
      let ms = objAmmo.getMotionState();
      if ( ms ) {
          ms.getWorldTransform( tmpTrans );
          let p = tmpTrans.getOrigin();
          let q = tmpTrans.getRotation();
          objThree.position.set( camera1.position.x, 0, camera1.position.z );
          //objThree.position.set( p.x(), p.y(), p.z() );
          objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );
      }
  }
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
      //TODO: Remove shapes
      const c = Math.floor( Math.random() * ( 1 << 24 ) );
      const sphere = new THREE.Mesh(new THREE.SphereGeometry( 5, 32, 16 ), new THREE.MeshPhongMaterial( { color: c } ));
      sphere.position.set(worldPosDisplay.x, worldPosDisplay.y, worldPosDisplay.z);
      const sphere2 = sphere.clone();
      sphere2.position.set(localPosDisplay.x, localPosDisplay.y, localPosDisplay.z);
      const cammy = new THREE.Mesh( new THREE.BoxGeometry( 10, 10, 10 ), new THREE.MeshBasicMaterial( {color: 0x00ff00} ) );
      cammy.position.set(camera1.position.x, camera1.position.y, camera1.position.z);
      level1.add(sphere, cammy);

      console.log( { tag, localPosDisplay, worldPosDisplay}, c);

  }

  }

  function setupCamera(cam){
    let radius = 5;
    let pos = {x:cam.position.x, y:0, z:cam.position.z};
    let quat = {x: 0, y: 0, z: 0, w: 1};
    let mass = 10;

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
    level1.add(ball);
    
    return body.threeObject = ball;
  }

// game.js ends here
