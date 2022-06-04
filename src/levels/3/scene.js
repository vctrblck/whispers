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

/*var keyPos = new THREE.Box3(
  new THREE.Vector3(40, 20, 345),
  new THREE.Vector3(40, 20, 345)
);*/

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(10,10,10),
  new THREE.MeshPhongMaterial({color : 0xff0000})
);
cube1.position.set(45,0,45);
cube1.castShadow = true;
cube1.receiveShadow = true
cube1.scale.set(0.5,2,0.5)
level3.add(cube1)

let keyPos = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
keyPos.setFromObject(cube1)
var foundKey = false;

function getKey() {
  var playerChest1 = new THREE.Vector3();
  playerChest1 = camera3.clone();
  console.log(playerChest1.position)

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

function addBoundries(){
      //wall Boundries
  if(camera3.position.x > 53.5){
    camera3.position.x = 53.5
  }
  if(camera3.position.x < -53.5){
    camera3.position.x = -53.5
  }
  if(camera3.position.z > 53.5){
    camera3.position.z = 53.5
  }
  if(camera3.position.z < -53.5){
    camera3.position.z = -53.5
  }
}

function cabinBoundry(){
  if(camera3.position.x < 9 && camera3.position.x > -11){
    if(camera3.position.z < -7 && camera3.position.z > -8){
      console.log("on the boundry")
    }
  }
}


// scene.js ends here
