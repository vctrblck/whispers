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
        //console.log( camera1.position);

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
    animateScene();
}

function createWall(){
  let pos = {x: -0.14, y: 0.05, z: 0};
  let scale = {x: 0.14, y: 0.105, z: 0.1};
  let rotation1 = {x:0, y: Math.PI/2, z:0};
  let quat = {x: 0, y: 0, z: 0, w: 1};
  let mass = 0;

  //threeJS Section
  //--------------------------------------------------------------------------------------
  const geometry = new THREE.BufferGeometry();
  const indices = [];
  const vertices = [];
  const normals = [];
  const colors = [];

  const size = 1;
  const segments = 10;

  const halfSize = size / 2;
  const segmentSize = size / segments;

  // generate vertices, normals for a simple grid geometry
  for ( let i = 0; i <= segments; i ++ ) {
    const y = ( i * segmentSize ) - halfSize;
    for ( let j = 0; j <= segments; j ++ ) {
      const x = ( j * segmentSize ) - halfSize;
      vertices.push( x, - y, 0 );
      normals.push( 0, 0, 1 );
      const r = ( x / size ) + 0.5;
      const g = ( y / size ) + 0.5;
      colors.push( r, g, 1 );
    }
  }

  // generate indices (data for element array buffer)

  for ( let i = 0; i < segments; i ++ ) {
    for ( let j = 0; j < segments; j ++ ) {
      const a = i * ( segments + 1 ) + ( j + 1 );
      const b = i * ( segments + 1 ) + j;
      const c = ( i + 1 ) * ( segments + 1 ) + j;
      const d = ( i + 1 ) * ( segments + 1 ) + ( j + 1 );

      // generate two faces (triangles) per iteration
      indices.push( a, b, d ); // face one
      indices.push( b, c, d ); // face two
    }
  }

  geometry.setIndex( indices );
  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
  geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
  geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) )

  const material = new THREE.MeshPhongMaterial( {
    side: THREE.DoubleSide,
    vertexColors: true
  });
  const mesh1 = new THREE.Mesh( geometry, material);
  //------------------------------------------------------------------------------------
  wall = mesh1.clone();
  
  wall.position.set(pos.x*1000, pos.y*1000, pos.z*1000);
  wall.scale.set(scale.x*1000, scale.y*1000, 1);
  wall.rotateX(rotation1.x);
  wall.rotateY(rotation1.y);
  wall.rotateZ(rotation1.z);
  wall.castShadow = true;
  wall.receiveShadow = true;
  level1.add(wall);
  
  const helper = new THREE.VertexNormalsHelper( wall, 5, 0x00ff00, 3 );
  level1.add(helper);
  level1.add( new THREE.BoxHelper( wall ) );

 //Ammojs Section
 let transform = new Ammo.btTransform();
 transform.setIdentity();
 transform.setOrigin( new Ammo.btVector3( pos.x*1000, pos.y*1000, pos.z*1000) );
 transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
 let motionState = new Ammo.btDefultMotionState( transform );
a
transformAux1 = new Ammo.btTransform();

 let colShape = new Ammo.btBoxShape( new Ammo.btVector3( scale.x * 0.5, scale.y * 0.5, scale.z * 0.5 ) );
 colShape.setMargin( 0.05 );

 let localInertia = new Ammo.btVector3( 0, 0, 0 );
 colShape.calculateLocalInertia( mass, localInertia );

 let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
 let body = new Ammo.btRigidBody( rbInfo );

 body.setFriction(10);
 body.setRollingFriction(10);

 physicsWorld.addRigidBody( body );

 //Let's overlay the wall with a grid for visual calibration
 const gridHelper = new THREE.GridHelper( 100, 100, 0x1111aa, 0xaa1111 );
 //level1.add( gridHelper );
 
  gridHelper.rotateZ( THREE.Math.degToRad(90));
  gridHelper.position.x = wall.position.x;
  gridHelper.position.y = wall.position.y;
  
 wall.userData.tag = "wall";

 //-----------------------------------------------------------
 const mesh = wall;

 mesh.geometry.computeTangents(); // generates bad data due to degenerate UVs

 const group = new THREE.Group();
 group.scale.multiplyScalar( 1 );
 //level1.add( group );

 // To make sure that the matrixWorld is up to date for the boxhelpers
 group.updateMatrixWorld( true );
 group.add( mesh );

 vnh = new THREE.VertexNormalsHelper( mesh, 10 );
 //level1.add( vnh );
 //level1.add( new THREE.BoxHelper( mesh ) );
 //level1.add( new THREE.BoxHelper( group ) );
 console.log( mesh.position, wall.position);
 //--------------------------------------------------------------------------
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
