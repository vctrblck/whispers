// scene.js --- `three.js' scene definitions for level 2

// Libraries:

// `three.js'

// Modules:

// None

// Code:

// Instantiate `three.js' scene for level 2
var level2 = new THREE.Scene();

var mixer2 = new THREE.AnimationMixer();

// ========================================================================== /
// Lighting                                                                   /
// ========================================================================== /

const lloader = new THREE.FBXLoader();

var lampPos = [
  new THREE.Vector3(-300, 80, 0),
  new THREE.Vector3(0, 80, 0),
  new THREE.Vector3(0, 80, -300),
];
//1
lloader.load('assets/models/levels/2/Room/lamp.fbx', (lamp) => {
  for (var i = 0; i < 3; i++) {
    lamp.position.set(-300, 80, 0);
    lamp.scale.set(0.06, 0.06, 0.06);
    lamp.castShadow = true;
    level2.add(lamp);
  }
});
//2
lloader.load('assets/models/levels/2/Room/lamp.fbx', (lamp) => {
  for (var i = 0; i < 3; i++) {
    lamp.position.set(0, 80, 0);
    lamp.scale.set(0.06, 0.06, 0.06);
    level2.add(lamp);
  }
});
//3
lloader.load('assets/models/levels/2/Room/lamp.fbx', (lamp) => {
  for (var i = 0; i < 3; i++) {
    lamp.position.set(0, 80, -300);
    lamp.scale.set(0.06, 0.06, 0.06);
    level2.add(lamp);
  }
});
//4
lloader.load('assets/models/levels/2/Room/lamp.fbx', (lamp) => {
  for (var i = 0; i < 3; i++) {
    lamp.position.set(300, 80, -300);
    lamp.scale.set(0.06, 0.06, 0.06);
    lamp.castShadow = true;
    level2.add(lamp);
  }
});
//5
lloader.load('assets/models/levels/2/Room/lamp.fbx', (lamp) => {
  for (var i = 0; i < 3; i++) {
    lamp.position.set(300, 80, 0);
    lamp.scale.set(0.06, 0.06, 0.06);
    level2.add(lamp);
  }
});
//6
lloader.load('assets/models/levels/2/Room/lamp.fbx', (lamp) => {
  for (var i = 0; i < 3; i++) {
    lamp.position.set(50, 80, 200);
    lamp.scale.set(0.06, 0.06, 0.06);
    level2.add(lamp);
  }
});
//7
lloader.load('assets/models/levels/2/Room/lamp.fbx', (lamp) => {
  for (var i = 0; i < 3; i++) {
    lamp.position.set(200, 80, 200);
    lamp.scale.set(0.06, 0.06, 0.06);
    level2.add(lamp);
  }
});

light2 = new THREE.AmbientLight(0x101010, 1);
level2.add(light2);

light2 = new THREE.PointLight(0xff0000, 0.8, 125);
light2.castShadow = true;
light2.position.set(-300, 60, 0);
level2.add(light2);

light2 = new THREE.PointLight(0xff0000, 0.8, 125);
light2.castShadow = true;
light2.position.set(0, 60, 0);
level2.add(light2);

light2 = new THREE.PointLight(0xff0000, 0.8, 125);
light2.castShadow = true;
light2.position.set(0, 60, -300);
level2.add(light2);

light2 = new THREE.PointLight(0xff0000, 0.8, 125);
light2.castShadow = true;
light2.position.set(300, 60, -300);
level2.add(light2);

light2 = new THREE.PointLight(0xff0000, 0.8, 125);
light2.castShadow = true;
light2.position.set(300, 60, 0);
level2.add(light2);

light2 = new THREE.PointLight(0xff0000, 0.8, 125);
light2.castShadow = true;
light2.position.set(50, 60, 200);
level2.add(light2);

light2 = new THREE.PointLight(0xff0000, 0.8, 125);
light2.castShadow = true;
light2.position.set(200, 60, 200);
level2.add(light2);

// ========================================================================== /
// Skybox                                                                     /
// ========================================================================== /

const loader2 = new THREE.CubeTextureLoader();
const texture2 = loader2.load([
  'assets/images/levels/2/skybox/1.png',
  'assets/images/levels/2/skybox/2.png',
  'assets/images/levels/2/skybox/3.png',
  'assets/images/levels/2/skybox/4.png',
  'assets/images/levels/2/skybox/5.png',
  'assets/images/levels/2/skybox/6.png',
]);
level2.background = texture2;

// ========================================================================== /
// Walls                                                                      /
// ========================================================================== /

const wallTexture = new THREE.TextureLoader().load(
  'assets/images/levels/2/wall.png'
);

// Load external corridor model
var gltfLoader2 = new THREE.GLTFLoader();
gltfLoader2.load('assets/models/levels/2/Room/corridors.gltf', (gltf) => {
  var model = gltf.scene;
  model.traverse((o) => {
    if (o.isMesh) {
      o.material.map = wallTexture;
      o.receiveShadow = true;
    }
  });
  model.position.x = -300;
  model.position.y = -1;
  model.castShadow = true;
  model.receiveShadow = true;
  model.scale.set(100, 100, 100);
  level2.add(model); // Add corridor to level 2 scene
});

let wall1 = new THREE.Box3(
  new THREE.Vector3(-50, 0, 150),
  new THREE.Vector3(50, 100, 250)
);

function cam2Limits() {
  var playerChest = new THREE.Vector3();
  playerChest = camera2.clone();

  let wall1 = new THREE.Box3(
    new THREE.Vector3(-350, 0, 48),
    new THREE.Vector3(50, 100, 150)
  );
  let wall2 = new THREE.Box3(
    new THREE.Vector3(-450, 0, -50),
    new THREE.Vector3(-348, 100, 50)
  );
  let wall3 = new THREE.Box3(
    new THREE.Vector3(-350, 0, -152),
    new THREE.Vector3(-50, 100, -48)
  );
  let wall4 = new THREE.Box3(
    new THREE.Vector3(-250, 0, -250),
    new THREE.Vector3(-148, 100, -150)
  );
  let wall5 = new THREE.Box3(
    new THREE.Vector3(-350, 0, -350),
    new THREE.Vector3(-48, 100, -250)
  );
  let wall6 = new THREE.Box3(
    new THREE.Vector3(-50, 0, -450),
    new THREE.Vector3(50, 100, -348)
  );
  let wall7 = new THREE.Box3(
    new THREE.Vector3(150, 0, -450),
    new THREE.Vector3(350, 100, -348)
  );
  let wall8 = new THREE.Box3(
    new THREE.Vector3(348, 0, -350),
    new THREE.Vector3(450, 100, -250)
  );
  let wall9 = new THREE.Box3(
    new THREE.Vector3(348, 0, -150),
    new THREE.Vector3(450, 100, 350)
  );
  let wall10 = new THREE.Box3(
    new THREE.Vector3(-50, 0, 248),
    new THREE.Vector3(250, 100, 350)
  );
  let wall11 = new THREE.Box3(
    new THREE.Vector3(247, 0, 50),
    new THREE.Vector3(252, 100, 150)
  );
  let wall12 = new THREE.Box3(
    new THREE.Vector3(150, 0, 50),
    new THREE.Vector3(246, 100, 152)
  );
  let wall13 = new THREE.Box3(
    new THREE.Vector3(47, 0, -50),
    new THREE.Vector3(150, 100, 50)
  );
  let wall14 = new THREE.Box3(
    new THREE.Vector3(48, 0, -250),
    new THREE.Vector3(150, 100, -150)
  );
  let wall15 = new THREE.Box3(
    new THREE.Vector3(247, 0, -250),
    new THREE.Vector3(252, 100, -50)
  );

  if (wall1.containsPoint(playerChest.position))
    if (playerChest.position.x > 50) {
      camera2.position.x = 52;
    } else {
      camera2.position.z = 47;
    }

  if (wall2.containsPoint(playerChest.position)) {
    camera2.position.x = -347;
  }
  if (wall3.containsPoint(playerChest.position)) {
    if (camera2.position.z > -100) {
      camera2.position.z = -47;
    } else {
      camera2.position.z = -153;
    }
  }
  if (wall4.containsPoint(playerChest.position)) {
    camera2.position.x = -147;
  }
  if (wall5.containsPoint(playerChest.position)) {
    camera2.position.x = -47;
  }
  if (wall6.containsPoint(playerChest.position)) {
    camera2.position.z = -347;
  }
  if (wall7.containsPoint(playerChest.position)) {
    camera2.position.z = -347;
  }
  if (wall8.containsPoint(playerChest.position)) {
    camera2.position.x = 347;
  }
  if (wall9.containsPoint(playerChest.position)) {
    camera2.position.x = 347;
  }
  if (wall10.containsPoint(playerChest.position)) {
    camera2.position.z = 247;
  }
  if (wall11.containsPoint(playerChest.position)) {
    camera2.position.x = 253;
  }
  if (wall12.containsPoint(playerChest.position)) {
    camera2.position.z = 153;
  }
  if (wall13.containsPoint(playerChest.position)) {
    camera2.position.x = 47;
  }
  if (wall14.containsPoint(playerChest.position)) {
    camera2.position.x = 47;
  }
  if (wall15.containsPoint(playerChest.position)) {
    camera2.position.x = 253;
  }
}

// ========================================================================== /
// Roof                                                                       /
// ========================================================================== /

const roof = new THREE.TextureLoader().load('assets/images/levels/2/wall.png');
const roofMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(1000, 1000, 10, 10),
  new THREE.MeshStandardMaterial({
    map: roof,
    side: THREE.DoubleSide,
  })
);
roofMesh.castShadow = false;
roofMesh.receiveShadow = true;
roofMesh.position.y = 80;
roofMesh.rotation.x = -Math.PI / 2;
level2.add(roofMesh);

// ========================================================================== /
// Agents                                                                     /
// ========================================================================== /

// Agent radius
const agentGeo = new THREE.SphereGeometry(40, 32, 16);
const agentMat1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const agentMat2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const agentMat3 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const agentMat4 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const agent1 = new THREE.Mesh(agentGeo, agentMat1);
agent1.position.y = 40;
level2.add(agent1);

const agent2 = new THREE.Mesh(agentGeo, agentMat2);
agent2.position.y = 40;
agent2.position.x = 25;
agent2.position.z = -300;
level2.add(agent2);

const agent3 = new THREE.Mesh(agentGeo, agentMat3);
agent3.position.y = 40;
agent3.position.x = 300;
agent3.position.z = -275;
level2.add(agent3);

const agent4 = new THREE.Mesh(agentGeo, agentMat4);
agent4.position.y = 40;
agent4.position.x = 275;
agent4.position.z = 200;
level2.add(agent4);

// Animate agents
// Animated agents radius
var A1prevZ = 0;
var A2prevX = 0;
var A3prevZ = 0;
var A4prevX = 0;
//boundaries of the balls
var ball1BB = new THREE.Sphere(agent1.position, 40);
var ball2BB = new THREE.Sphere(agent2.position, 40);
var ball3BB = new THREE.Sphere(agent3.position, 40);
var ball4BB = new THREE.Sphere(agent4.position, 40);

function animateAgents() {
  // Agent 1
  if (agent1.position.z == 0) {
    A1prevZ = 0;
    agent1.position.z -= 1;
  }
  if (agent1.position.z == -275) {
    A1prevZ = -275;
    agent1.position.z += 1;
  }
  if (A1prevZ > agent1.position.z) {
    A1prevZ -= 1;
    agent1.position.z -= 1;
  }
  if (A1prevZ < agent1.position.z) {
    A1prevZ += 1;
    agent1.position.z += 1;
  }
  ball1BB = new THREE.Sphere(agent1.position, 40);

  // Agent 2
  if (agent2.position.x == 25) {
    A2prevX = 25;
    agent2.position.x += 1;
  }
  if (agent2.position.x == 275) {
    A2prevX = 275;
    agent2.position.x -= 1;
  }
  if (A2prevX < agent2.position.x) {
    A2prevX += 1;
    agent2.position.x += 1;
  }
  if (A2prevX > agent2.position.x) {
    A2prevX -= 1;
    agent2.position.x -= 1;
  }
  ball2BB = new THREE.Sphere(agent2.position, 40);

  // Agent 3
  if (agent3.position.z == -275) {
    A3prevZ = -275;
    agent3.position.z += 1;
  }
  if (agent3.position.z == 175) {
    A3prevZ = 175;
    agent3.position.z -= 1;
  }
  if (A3prevZ < agent3.position.z) {
    A3prevZ += 1;
    agent3.position.z += 1;
  }
  if (A3prevZ > agent3.position.z) {
    A3prevZ -= 1;
    agent3.position.z -= 1;
  }
  ball3BB = new THREE.Sphere(agent3.position, 40);

  // Agent 4

  if (agent4.position.x == 275) {
    A4prevX = 275;
    agent4.position.x -= 1;
  }
  if (agent4.position.x == 0) {
    A4prevX = 0;
    agent4.position.x += 1;
  }
  if (A4prevX > agent4.position.x) {
    A4prevX -= 1;
    agent4.position.x -= 1;
  }
  if (A4prevX < agent4.position.x) {
    A4prevX += 1;
    agent4.position.x += 1;
  }
  ball4BB = new THREE.Sphere(agent4.position, 40);
}

// Agent collision check

function collisionCheck() {
  var playerChest = new THREE.Vector3();
  playerChest = camera2.clone();

  if (
    ball1BB.containsPoint(playerChest.position) ||
    ball2BB.containsPoint(playerChest.position) ||
    ball3BB.containsPoint(playerChest.position) ||
    ball4BB.containsPoint(playerChest.position)
  ) {
    console.log('dead');
  }
  // console.log( playerChest.position);
}

//end of level
let cube2BB = new THREE.Box3(
  new THREE.Vector3(-50, 0, 150),
  new THREE.Vector3(50, 100, 250)
);

function endLevel2() {
  var playerChest = new THREE.Vector3();
  playerChest = camera2.clone();
  if (cube2BB.containsPoint(playerChest.position)) {
    return true;
  }
}

// scene.js ends here
