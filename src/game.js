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

startCam1 = true;
startCam2 = true;
startCam3 = true;

//variable declaration section for ammo
let physicsWorld, models = [], pos = new THREE.Vector3(), tmpTrans = null;
let rigidBodies = [];
let raycaster = new THREE.Raycaster();
let wall;
let loadedLevel = 0;
let CylinderBool = false;
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
        camera1.position.y = 75;

        
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

        updatePhysics( time );
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
    setupCamera(camera1);
    animateScene();
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
    wall.scale.set(scale.x*1000, scale.y*1000, scale.z*1000); 
    wall.rotateX(rotation1.x);
    wall.rotateY(rotation1.y);
    wall.rotateZ(rotation1.z);

    if(model.name.includes("Lock")){
      wall.scale.set(scale.x*2000, scale.y*2000, scale.z*2000); 
    }else if(model.name.includes("Cylinder")){
      wall.scale.set(scale.x*3600, scale.y*3600, scale.z*88900); 
      wall.position.y +=50
    }else if(model.name.includes("Floor")){
      wall.position.y +=1;
    }else if(model.name.includes("Bar")){
      wall.scale.set(scale.x*2000, scale.y*2000, scale.z*2000); 
      wall.position.y += 1;
    }
    
    wall.castShadow = true;
    wall.receiveShadow = true;

    level1.add(wall);

  //Ammojs Section
  let transform = new Ammo.btTransform();
  transform.setIdentity();
  transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
  transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
  let motionState = new Ammo.btDefaultMotionState( transform );

  let colShape = new Ammo.btBoxShape( new Ammo.btVector3( scale.x * 0.5, scale.y * 0.5, scale.z * 0.5 ) );
  colShape.setMargin( 0.05 );

  let localInertia = new Ammo.btVector3( 0, 0, 0 );
  colShape.calculateLocalInertia( mass, localInertia );

  let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
  let body = new Ammo.btRigidBody( rbInfo );

  body.setFriction(4);
  body.setRollingFriction(10);

  physicsWorld.addRigidBody( body );
  wall.userData.tag = "wall";

  //Let's overlay the wall with a grid for visual calibration
  const gridHelper = new THREE.GridHelper( Math.max(wall.scale.x, wall.scale.y, wall.scale.z), 20, 0x1111aa, 0xaa1111 );
  
  gridHelper.position.x = wall.position.x;
  gridHelper.position.y = wall.position.y;
  gridHelper.position.z = wall.position.z;
  
  if(model.name.includes("Back") || model.name.includes("Front")){
    gridHelper.rotateZ( rotation1.y);
  }else if(model.name.includes("Left") || model.name.includes("Right")){
    gridHelper.rotateX( Math.PI/2);
  }else if(model.name.includes("Lock")){
    gridHelper.rotateZ( Math.PI/2);
    gridHelper.position.x -=5;
  }else if(model.name.includes("Cylinder")){
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
  }
  level1.add( gridHelper ); //console.log(model.name, model.scale, gridHelper.scale);

  const helper = new THREE.VertexNormalsHelper( wall, 5, 0x00ff00, 3 );
  level1.add(helper);
  level1.add( new THREE.BoxHelper( wall ) );
  }
  
}

function setupPhysicsWorld(){
    let collisionConfiguration  = new Ammo.btDefaultCollisionConfiguration(),
        dispatcher              = new Ammo.btCollisionDispatcher(collisionConfiguration),
        overlappingPairCache    = new Ammo.btAxisSweep3(),
        solver                  = new Ammo.btSequentialImpulseConstraintSolver();

    physicsWorld           = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
    physicsWorld.setGravity(new Ammo.btVector3(0, -10, 0));
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
          objThree.position.set( camera1.position.x, camera1.position.y, camera1.position.z );
          //objThree.position.set( p.x(), p.y(), p.z() );
          objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );
      }
  }
  detectCollision();
}

function detectCollision(){

  let dispatcher = physicsWorld.getDispatcher();
  let numManifolds = dispatcher.getNumManifolds();
  console.log(dispatcher.getNumManifolds());

  for ( let i = 0; i < numManifolds; i ++ ) {

      let contactManifold = dispatcher.getManifoldByIndexInternal( i );
      let rb0 = Ammo.castObject( contactManifold.getBody0(), Ammo.btRigidBody );
      let rb1 = Ammo.castObject( contactManifold.getBody1(), Ammo.btRigidBody );
      let threeObject0 = rb0.threeObject;
      let threeObject1 = rb1.threeObject;
      if ( ! threeObject0 && ! threeObject1 ) continue;
      let userData0 = threeObject0 ? threeObject0.userData : null;
      let userData1 = threeObject1 ? threeObject1.userData : null;
      let tag0 = userData0 ? userData0.tag : "none";
      let tag1 = userData1 ? userData1.tag : "none";

      let numContacts = contactManifold.getNumContacts();

      for ( let j = 0; j < numContacts; j++ ) {

          let contactPoint = contactManifold.getContactPoint( j );
          let distance = contactPoint.getDistance();
          if( distance > 0.0 ) continue;
          let velocity0 = rb0.getLinearVelocity();
          let velocity1 = rb1.getLinearVelocity();
          let worldPos0 = contactPoint.get_m_positionWorldOnA();
          let worldPos1 = contactPoint.get_m_positionWorldOnB();
          let localPos0 = contactPoint.get_m_localPointA();
          let localPos1 = contactPoint.get_m_localPointB();
          
          console.log({
              manifoldIndex: i, 
              contactIndex: j, 
              distance: distance, 
              object0:{
              tag: tag0,
              velocity: {x: velocity0.x(), y: velocity0.y(), z: velocity0.z()},
              worldPos: {x: worldPos0.x(), y: worldPos0.y(), z: worldPos0.z()},
              localPos: {x: localPos0.x(), y: localPos0.y(), z: localPos0.z()}
              },
              object1:{
              tag: tag1,
              velocity: {x: velocity1.x(), y: velocity1.y(), z: velocity1.z()},
              worldPos: {x: worldPos1.x(), y: worldPos1.y(), z: worldPos1.z()},
              localPos: {x: localPos1.x(), y: localPos1.y(), z: localPos1.z()}
              }
          });
      }
  }
  }

  function setupCamera(cam){
    let radius = 5;
    let pos = {x:cam.position.x, y:cam.position.y, z:cam.position.z};
    let quat = {x: 0, y: 0, z: 0, w: 1};
    let mass = 35;

    let ball = ballObject = new THREE.Mesh(new THREE.SphereBufferGeometry(radius), new THREE.MeshPhongMaterial({color: 0x05ff1e}));
    ball.position.set(pos.x, pos.y, pos.z);
    ball.castShadow = true;
    ball.receiveShadow = true;
    level1.add(ball);

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

    body.setActivationState(1); // 1 - active
    body.activate();

    physicsWorld.addRigidBody( body );
    rigidBodies.push(ball);
    //rigidBodies.push(cam);
    
    ball.userData.physicsBody = body;
    ball.userData.tag = "ball";
    
    return body.threeObject = ball;
  }

// game.js ends here
