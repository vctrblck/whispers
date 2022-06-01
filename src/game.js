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
let physicsWorld, rigidBodies = [], pos = new THREE.Vector3(), tmpTrans = null;
let mouseCoords = new THREE.Vector2(), raycaster = new THREE.Raycaster();
let wall, ball;
let ttl = 3, ttlCounter = 0, ballInWorld = false;
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

        //update ball time to live if ball in world
        if( ballInWorld ) ttlCounter += time;

        //if time to live has been exceeded then delete the ball
        if( ttlCounter > ttl ){

            physicsWorld.removeRigidBody( ball.userData.physicsBody );
            level1.remove(ball);

            ttlCounter = 0;
            ballInWorld = false;

        }
        updatePhysics( time );
        renderer.render(level1, camera1);


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

function start (){
    tmpTrans = new Ammo.btTransform();
    setupPhysicsWorld();
    createWall();
    document.addEventListener( 'mousedown', onMouseDown, false );
    animateScene();
}

function createWall(){
  let pos = model1.position;
  let scale = model1.scale;
  let quat = {x: 0, y: 0, z: 0, w: 1};
  let mass = 0;

  //threeJS Section
  wall = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({color: 0x42f5bf}));

  wall.position.set(pos.x, pos.y, pos.z);
  wall.scale.set(scale.x, scale.y, scale.z);

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

 //Let's overlay the wall with a grid for visual calibration
 const gridHelper = new THREE.GridHelper( 200, 100, 0x1111aa, 0xaa1111 );
 const helper = new THREE.VertexNormalsHelper( model1, 10, 0x00ff00, 3 );
 level1.add( gridHelper );
 level1.add(helper);
//  gridHelper.rotateZ( THREE.Math.degToRad(90));
//  gridHelper.position.x = model1.position.x;
//  gridHelper.position.y = model1.position.y;
  console.log( helper.position, model1.position);
 wall.userData.tag = "wall";
}

function createBall(pos){
                
  let radius = 0.8;
  let quat = {x: 0, y: 0, z: 0, w: 1};
  let mass = 35;

  //threeJS Section
  let ball = ballObject = new THREE.Mesh(new THREE.SphereBufferGeometry(radius), new THREE.MeshPhongMaterial({color: 0x05ff1e}));

  ball.position.set(pos.x, pos.y, pos.z);
  
  ball.castShadow = true;
  ball.receiveShadow = true;

  level1.add(ball);


  //Ammojs Section
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

  body.setActivationState( STATE.DISABLE_DEACTIVATION )


  physicsWorld.addRigidBody( body );
  rigidBodies.push(ball);
  
  ball.userData.physicsBody = body;
  ball.userData.tag = "ball";
  
  return ball;
}

function onMouseDown ( event ) {

  if( ballInWorld ) return;

  mouseCoords.set(  ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );

  raycaster.setFromCamera( mouseCoords, camera );

  // Create a ball 
  pos.copy( raycaster.ray.direction );
  pos.add( raycaster.ray.origin );

  ball = createBall(pos);
  
  //shoot out the ball
  let ballBody = ball.userData.physicsBody;

  pos.copy( raycaster.ray.direction );
  pos.multiplyScalar( 70 );
  ballBody.setLinearVelocity( new Ammo.btVector3( pos.x, pos.y, pos.z ) );

  ballInWorld = true;

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
