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
var currentLevel = null;
var prevTime = Date.now();
let prevTime2 = Date.now();

//variable declaration section for ammo
let physicsWorld, rigidBodies, models = [], pos = new THREE.Vector3(), tmpTrans = null;
let mouseCoords = new THREE.Vector2(), raycaster = new THREE.Raycaster();
let wall, ball;
let ttl = 3, ttlCounter, loadedLevel = 0;
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
        level1.add( new THREE.BoxHelper( level1 ) );

        document.title = "Whispers - Level 1";

        const time = Date.now();
        mixer1.update( ( time - prevTime ) * 0.001 );
        prevTime = time;
        checkpoint1();

        if (endLevel1()){
          currentLevel = 2;
          cam2()
        }
        //cam1Limits();
        camera1.position.y = 75;
        //controls1.update(0.000150);
        
        //updatePhysics( time );
        renderer.render(level1, camera1);

        if(loadedLevel==1){
          startAmmo();
          loadedLevel+=1;
        }

      } else if (currentLevel === 2) {
        // ================================================================== /
        // Level 2                                                            /
        // ================================================================== /

        document.title = 'Whispers - Level 2';

        const time2 = Date.now();
        mixer2.update((time2 - prevTime2) * 0.001);
        prevTime2 = time2;
        animateAgents();
        collisionCheck();
        if (endLevel2()) {
          currentLevel = 1;
        }
        cam2Limits();
        camera2.position.y = 45;
        controls2.update(0.00015);

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
    physicsWorld.setGravity(new Ammo.btVector3(0, 0, 0));
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
          objThree.position.set( p.x(), p.y(), p.z() );
          objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );

      }
  }
  detectCollision();
}

function detectCollision(){

  let dispatcher = physicsWorld.getDispatcher();
  let numManifolds = dispatcher.getNumManifolds();

  for ( let i = 0; i < numManifolds; i ++ ) {

      let contactManifold = dispatcher.getManifoldByIndexInternal( i );
      let numContacts = contactManifold.getNumContacts();

      for ( let j = 0; j < numContacts; j++ ) {

          let contactPoint = contactManifold.getContactPoint( j );
          let distance = contactPoint.getDistance();
          if( distance > 0.0 ) continue;
          console.log({manifoldIndex: i, contactIndex: j, distance: distance});
      }
  }
  }

// game.js ends here
