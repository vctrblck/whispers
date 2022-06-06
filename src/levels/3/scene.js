// scene.js --- `three.js' scene definitions for level 3

// Libraries:

// `three.js'

// Modules:

// None

// Code:

// Instantiate `three.js' scene for level 3
var level3 = new THREE.Scene();

// Ambient Light

var ambientLightColour = '#0C0C0C';
var ambientLight = new THREE.AmbientLight(ambientLightColour);
level3.add(ambientLight);

// Moon Light

var moonlightColour = '#FFFFFF';
var moonlight = new THREE.PointLight(moonlightColour);
moonlight.position.set(20, 60, 20);
level3.add(moonlight);

// Forest

var Forestloader = new THREE.GLTFLoader();
var forestSource = './assets/models/levels/3/forest/source/pine2.glb';
Forestloader.load(
  forestSource,
  (gltf) => {
    var forest1 = gltf.scene;
    forest1.traverse((o) => {
      o.receiveShadow = true;
      o.castShadow = true;
    });
    var forest2 = gltf.scene.clone();
    var forest3 = gltf.scene.clone();
    var forest4 = gltf.scene.clone();

    forest1.position.set(-27.15, 0, 27.15);
    forest2.position.set(-27.15, 0, -27.15);
    forest3.position.set(27.15, 0, -27.15);
    forest4.position.set(27.15, 0, 27.15);

    forest3.rotation.y = Math.PI;
    forest4.rotation.y = Math.PI;

    level3.add(forest1);
    level3.add(forest2);
    level3.add(forest3);
    level3.add(forest4);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '%');
  }
);

// Cabin
var cabinloader = new THREE.GLTFLoader();
var cabinSource = './assets/models/levels/3/cabin/scene.gltf';
cabinloader.load(cabinSource, (gltf) => {
  var cabin = gltf.scene;
  cabin.scale.set(0.015, 0.015, 0.015);
  cabin.receiveShadow = true;
  cabin.castShadow = true;

  level3.add(gltf.scene);
});
//  key
var keyLoader = new THREE.GLTFLoader();
var keySource = './assets/models/levels/3/goldkey/scene.gltf';
keyLoader.load(keySource, (gltf) => {
  var key = gltf.scene;
  key.scale.set(1, 1, 1);
  key.receiveShadow = true;
  key.castShadow = true;

  key.position.set(45, 2, 45);
  level3.add(key);
});

// Plane (underneath map)

var planeWidth = 240;
var planeHeight = 240;
var planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 1, 1);
var planeColour = '#444444';
var planeMaterial = new THREE.MeshLambertMaterial({ color: planeColour });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = -5;
plane.rotation.x = -Math.PI / 2;
level3.add(plane);

// Walls

var wallTexture3 = new THREE.TextureLoader().load(
  '../../../assets/images/levels/2/wall.png'
);

var wallWidth = 300;
var wallHeight = 200;
var wallGeometry = new THREE.PlaneGeometry(wallWidth, wallHeight, 1, 1);
var wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
var wall31 = new THREE.Mesh(wallGeometry, wallMaterial);
wall31.receiveShadow = true;
wall31.castShadow = true;
wall31.material.map = wallTexture3;
wall31.material.side = THREE.DoubleSide;
wall31.position.z = 54.3;
level3.add(wall31);

wall32 = wall31.clone();
wall32.rotation.y = Math.PI / 2;
wall32.position.x = 54.3;
level3.add(wall32);

wall33 = wall31.clone();
wall33.rotation.y = Math.PI / 2;
wall33.position.x = -54.3;
level3.add(wall33);

wall34 = wall31.clone();
wall34.position.z = -54.3;
level3.add(wall34);

// Fog

var fogColour = '#444444';
var fogNear = 0.015;
var fogFar = 100;
var fog = new THREE.Fog(fogColour, fogNear, fogFar);
level3.fog = fog;

// Sky Box

loader3 = new THREE.CubeTextureLoader();
var skyTexture = loader3.load([
  './assets/images/levels/3/sky/skybox_front.png',
  './assets/images/levels/3/sky/skybox_back.png',
  './assets/images/levels/3/sky/skybox_up.png',
  './assets/images/levels/3/sky/skybox_down.png',
  './assets/images/levels/3/sky/skybox_right.png',
  './assets/images/levels/3/sky/skybox_left.png',
]);
level3.background = skyTexture;

// Agents
/*
agentGeo = new THREE.SphereGeometry(40, 32, 16);
deadBodies = new THREE.TextureLoader().load('./assets/images/levels/3/deadBodies.png')
agentMat1L3 = new THREE.MeshBasicMaterial({ map: deadBodies });
agent1L3 = new THREE.Mesh(agentGeo, agentMat1L3);*/
const agentGeo3 = new THREE.SphereGeometry(40, 32, 16);

const deadBodies = new THREE.TextureLoader().load(
  './assets/images/levels/3/deadBodies.png'
);
const blood = new THREE.TextureLoader().load(
  './assets/images/levels/3/blood.jpg'
);
const blood2 = new THREE.TextureLoader().load(
  './assets/images/levels/3/blood2.png'
);
const skulls = new THREE.TextureLoader().load(
  './assets/images/levels/3/skulls.jpg'
);

const agentMat1L3 = new THREE.MeshBasicMaterial({ map: deadBodies });
const agentMat2L3 = new THREE.MeshBasicMaterial({ map: blood });
const agentMat3L3 = new THREE.MeshBasicMaterial({ map: blood2 });
const agentMat4L3 = new THREE.MeshBasicMaterial({ map: skulls });

const agent1L3 = new THREE.Mesh(agentGeo3, agentMat1L3);
const agent2L3 = new THREE.Mesh(agentGeo3, agentMat2L3);
const agent3L3 = new THREE.Mesh(agentGeo3, agentMat3L3);
const agent4L3 = new THREE.Mesh(agentGeo3, agentMat4L3);

agent1L3.scale.set(0.1, 0.1, 0.1);
agent1L3.position.set(10, 0, 10);
level3.add(agent1L3);

agent2L3.scale.set(0.1, 0.1, 0.1);
agent2L3.position.set(-14, 0, 10);
level3.add(agent2L3);

agent3L3.scale.set(0.1, 0.1, 0.1);
agent3L3.position.set(10, 0, -10);
level3.add(agent3L3);

agent4L3.scale.set(0.1, 0.1, 0.1);
agent4L3.position.set(-10, 0, -10);
level3.add(agent4L3);

// Animate agentsS
// Animated agents radius
var A1L3prevX = 0;
var A2L3prevZ = 0;
var A3L3prevZ = 0;
var A4L3prevX = 0;
//boundaries of the balls
var ball1BBL3 = new THREE.Sphere(agent1L3.position, 4);
var ball2BBL3 = new THREE.Sphere(agent2L3.position, 4);
var ball3BBL3 = new THREE.Sphere(agent3L3.position, 4);
var ball4BBL3 = new THREE.Sphere(agent4L3.position, 4);

var agentSpeed = 0.1;

function animateAgents3() {
  // Agent 1
  if (agent1L3.position.x >= 10) {
    A1L3prevX = 10;
    agent1L3.position.x -= agentSpeed;
  }
  if (agent1L3.position.x <= -10) {
    A1L3prevX = -10;
    agent1L3.position.x += agentSpeed;
  }
  if (A1L3prevX > agent1L3.position.x) {
    A1L3prevX -= agentSpeed;
    agent1L3.position.x -= agentSpeed;
  }
  if (A1L3prevX < agent1L3.position.x) {
    A1L3prevX += agentSpeed;
    agent1L3.position.x += agentSpeed;
  }
  ball1BBL3 = new THREE.Sphere(agent1L3.position, 4);

  // Agent 2
  if (agent2L3.position.z >= 10) {
    A2L3prevZ = 10;
    agent2L3.position.z -= 1;
  }
  if (agent2L3.position.z <= -10) {
    A2L3prevZ = -10;
    agent2L3.position.z += agentSpeed;
  }
  if (A2L3prevZ > agent2L3.position.z) {
    A2L3prevZ -= agentSpeed;
    agent2L3.position.z -= agentSpeed;
  }
  if (A2L3prevZ < agent2L3.position.z) {
    A2L3prevZ += agentSpeed;
    agent2L3.position.z += agentSpeed;
  }
  ball2BBL3 = new THREE.Sphere(agent2L3.position, 4);

  // Agent 3
  if (agent3L3.position.z >= 10) {
    A3L3prevZ = 10;
    agent3L3.position.z -= 1;
  }
  if (agent3L3.position.z <= -10) {
    A3L3prevZ = -10;
    agent3L3.position.z += agentSpeed;
  }
  if (A3L3prevZ > agent3L3.position.z) {
    A3L3prevZ -= agentSpeed;
    agent3L3.position.z -= agentSpeed;
  }
  if (A3L3prevZ < agent3L3.position.z) {
    A3L3prevZ += agentSpeed;
    agent3L3.position.z += agentSpeed;
  }
  ball3BBL3 = new THREE.Sphere(agent3L3.position, 4);

  // Agent 4

  if (agent4L3.position.x >= 10) {
    A4L3prevX = 10;
    agent4L3.position.x -= agentSpeed;
  }
  if (agent4L3.position.x <= -10) {
    A4L3prevX = -10;
    agent4L3.position.x += agentSpeed;
  }
  if (A4L3prevX > agent4L3.position.x) {
    A4L3prevX -= agentSpeed;
    agent4L3.position.x -= agentSpeed;
  }
  if (A4L3prevX < agent4L3.position.x) {
    A4L3prevX += agentSpeed;
    agent4L3.position.x += agentSpeed;
  }
  ball4BBL3 = new THREE.Sphere(agent4L3.position, 4);
}

// collision Check

function collisionCheck3() {
  var playerChestL3 = new THREE.Vector3();
  playerChestL3 = camera3.clone();

  if (
    ball1BBL3.containsPoint(playerChestL3.position) ||
    ball2BBL3.containsPoint(playerChestL3.position) ||
    ball3BBL3.containsPoint(playerChestL3.position) ||
    ball4BBL3.containsPoint(playerChestL3.position)
  ) {
    endGame();
  }
}

// player found the key

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshPhongMaterial({ color: 0xff0000 })
);
cube1.position.set(45, 0, 45);
cube1.castShadow = true;
cube1.receiveShadow = true;
cube1.scale.set(0.5, 2, 0.5);
//level3.add(cube1)

let keyPos = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
keyPos.setFromObject(cube1);
var foundKeyL3 = false;

function getKey() {
  var playerChest2L3 = new THREE.Vector3();
  playerChest2L3 = camera3.clone();

  if (foundKeyL3 == false) {
    if (keyPos.containsPoint(playerChest2L3.position)) {
      console.log('You have found the key!');
      const light35 = new THREE.PointLight(0x00ff00, 1); //the green light
      light35.castShadow = true;
      light35.position.set(75, 75, 75);
      level3.add(light35);
      foundKeyL3 = true;
    }
  }
}

function addBoundries() {
  //wall Boundries
  if (camera3.position.x > 53.5) {
    camera3.position.x = 53.5;
  }
  if (camera3.position.x < -53.5) {
    camera3.position.x = -53.5;
  }
  if (camera3.position.z > 53.5) {
    camera3.position.z = 53.5;
  }
  if (camera3.position.z < -53.5) {
    camera3.position.z = -53.5;
  }
}

function boundCabin() {
  // cabin Boundry
  if (0 < camera3.position.x && camera3.position.x < 9) {
    if (-8 < camera3.position.z && camera3.position.z < 8) {
      camera3.position.x = 9;
    }
  }
  if (-13 < camera3.position.x && camera3.position.x < 0) {
    if (-8 < camera3.position.z && camera3.position.z < 8) {
      camera3.position.x = -13;
    }
  }
  if (0 < camera3.position.z && camera3.position.z < 8) {
    if (-13 < camera3.position.x && camera3.position.x < 9) {
      camera3.position.z = 8;
    }
  }
  if (-8 < camera3.position.z && camera3.position.z < 0) {
    if (-13 < camera3.position.x && camera3.position.x < 9) {
      camera3.position.x = -8;
    }
  }
}
// Access cabin when key found
function cabbinAccess() {
  if (foundKeyL3 == false) {
    boundCabin();
  }
}

function survivalComplete(winGame) {
  if (foundKeyL3 == true) {
    if (
      -13 < camera3.position.x &&
      0 > camera3.position.x &&
      -8 < camera3.position.z &&
      0 > camera3.position.z
    ) {
      console.log('Game completed!');
      winGame();
    }
  }
}

const riddle = new THREE.TextureLoader().load(
  './assets/images/levels/3/sky/Riddle.png'
);
const instruction_Board = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshPhongMaterial({ map: riddle })
);
instruction_Board.position.set(-30, 2, -23.49);
instruction_Board.scale.set(1, 0.5, 1.5);
instruction_Board.castShadow = true;
instruction_Board.receiveShadow = true;
level3.add(instruction_Board);

//audio 
music3 = true;
listener3 = new THREE.AudioListener();
camera3.add(listener3);

const sound3 = new THREE.Audio(listener3);
const sLoader3 = new THREE.AudioLoader();

function lvl3Music(){
  if(music3){
    sound2.stop();
    sound3.setLoop( true );
    sLoader3.load('/assets/audio/Wind_Tunnel.mp3', (buffer) => {
    sound3.setBuffer(buffer);
    sound3.setVolume(1);
    sound3.play();
    
    });
    music3 = false;
  }
  
}

// scene.js ends here
