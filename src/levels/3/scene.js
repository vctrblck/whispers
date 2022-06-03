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
var forestSource = './assets/models/levels/3/forest/source/pine.glb';
Forestloader.load(forestSource, (gltf) => {
  //  gltf.scene.remove(gltf.scene.children[2]); // Remove sky dome

  
  var forest1 = gltf.scene;
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
}, function(xhr){
  console.log((xhr.loaded/xhr.total*100) + '%')
});

// Cabin
var cabinloader = new THREE.GLTFLoader();
var cabinSource = './assets/models/levels/3/cabin/scene.gltf';
cabinloader.load(cabinSource, (gltf) => {
  console.log(gltf);

  var cabin = gltf.scene;
  cabin.scale.set(0.015, 0.015, 0.015);

  level3.add(gltf.scene);
});

// Plane (underneath map)

var planeWidth = 60;
var planeHeight = 60;
var planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 1, 1);
var planeColour = '#444444';
var planeMaterial = new THREE.MeshLambertMaterial({ color: planeColour });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = -5;
plane.rotation.x = -Math.PI / 2;
level3.add(plane);

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

agent1.scale.set(0.1, 0.1, 0.1);
agent1.position.set(10, 0, 10);
level3.add(agent1);

agent2.scale.set(0.1, 0.1, 0.1);
agent2.position.set(-14, 0, 10);
level3.add(agent2);

agent3.scale.set(0.1, 0.1, 0.1);
agent3.position.set(10, 0, -10);
level3.add(agent3);

agent4.scale.set(0.1, 0.1, 0.1);
agent4.position.set(-10, 0, -10);
level3.add(agent4);

// Animate agentsS
// Animated agents radius
var A1prevX = 0;
var A2prevZ = 0;
var A3prevZ = 0;
var A4prevX = 0;
//boundaries of the balls
var ball1BB = new THREE.Sphere(agent1.position, 4);
var ball2BB = new THREE.Sphere(agent2.position, 4);
var ball3BB = new THREE.Sphere(agent3.position, 4);
var ball4BB = new THREE.Sphere(agent4.position, 4);

var agentSpeed = 0.1;

function animateAgents3() {
  // Agent 1
  if (agent1.position.x >= 10) {
    A1prevX = 10;
    agent1.position.x -= agentSpeed;
  }
  if (agent1.position.x <= -10) {
    A1prevX = -10;
    agent1.position.x += agentSpeed;
  }
  if (A1prevX > agent1.position.x) {
    A1prevX -= agentSpeed;
    agent1.position.x -= agentSpeed;
  }
  if (A1prevX < agent1.position.x) {
    A1prevX += agentSpeed;
    agent1.position.x += agentSpeed;
  }
  ball1BB = new THREE.Sphere(agent1.position, 4);

  // Agent 2
  if (agent2.position.z >= 10) {
    A2prevZ = 10;
    agent2.position.z -= 1;
  }
  if (agent2.position.z <= -10) {
    A2prevZ = -10;
    agent2.position.z += agentSpeed;
  }
  if (A2prevZ > agent2.position.z) {
    A2prevZ -= agentSpeed;
    agent2.position.z -= agentSpeed;
  }
  if (A2prevZ < agent2.position.z) {
    A2prevZ += agentSpeed;
    agent2.position.z += agentSpeed;
  }
  ball2BB = new THREE.Sphere(agent2.position, 4);

  // Agent 3
  if (agent3.position.z >= 10) {
    A3prevZ = 10;
    agent3.position.z -= 1;
  }
  if (agent3.position.z <= -10) {
    A3prevZ = -10;
    agent3.position.z += agentSpeed;
  }
  if (A3prevZ > agent3.position.z) {
    A3prevZ -= agentSpeed;
    agent3.position.z -= agentSpeed;
  }
  if (A3prevZ < agent3.position.z) {
    A3prevZ += agentSpeed;
    agent3.position.z += agentSpeed;
  }
  ball3BB = new THREE.Sphere(agent3.position, 4);

  // Agent 4

  if (agent4.position.x >= 10) {
    A4prevX = 10;
    agent4.position.x -= agentSpeed;
  }
  if (agent4.position.x <= -10) {
    A4prevX = -10;
    agent4.position.x += agentSpeed;
  }
  if (A4prevX > agent4.position.x) {
    A4prevX -= agentSpeed;
    agent4.position.x -= agentSpeed;
  }
  if (A4prevX < agent4.position.x) {
    A4prevX += agentSpeed;
    agent4.position.x += agentSpeed;
  }
  ball4BB = new THREE.Sphere(agent4.position, 4);
}



// player found the key

var keyPos = new THREE.Box3(
  new THREE.Vector3(40, 20, 345),
  new THREE.Vector3(40, 20, 345)
);
var foundKey = false;

function getKey() {
  var playerChest1 = new THREE.Vector3();
  playerChest1 = camera3.clone();

  if (foundKey == false) {
    if (keyPos.containsPoint(playerChest1.position)) {
      console.log('in the keyy zone now find the key');
      const light35 = new THREE.PointLight(0x00ff00, 1); //the green light
      light35.castShadow = true;
      light35.position.set(75, 75, 75);
      level3.add(light35);
      foundKey = true;
    }
  }
}

// scene.js ends here
