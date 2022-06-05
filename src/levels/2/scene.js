var level2 = new THREE.Scene();

var mixer21;
var mixer22;
var mixer23;
var mixer24;

//control panel
const controlTexture2 = new THREE.TextureLoader().load(
  'assets/images/levels/2/controls2.png'
);
const controlsPanel2 = new THREE.Mesh(
  new THREE.BoxGeometry(60, 40, 0),
  new THREE.MeshBasicMaterial({ map: controlTexture2, side: THREE.FrontSide })
);
controlsPanel2.position.set(
  camera2.position.x + 50,
  camera2.position.y,
  camera2.position.z
);
controlsPanel2.rotateY(Math.PI / 2);
controlsPanel2.receiveShadow = false;
controlsPanel2.castShadow = false;
level2.add(controlsPanel2);

// ========================================================================== /
// Lighting                                                                   /
// ========================================================================== /

var lightMod = [];
const lloader = new THREE.FBXLoader();
//1
lloader.load('assets/models/levels/2/Room/lamp.fbx', (lamp) => {
  lamp.position.set(-300, 80, 0);
  lamp.scale.set(0.06, 0.06, 0.06);
  lamp.castShadow = true;
  level2.add(lamp);
});
//2
lloader.load('assets/models/levels/2/Room/lamp.fbx', (lamp) => {
  lamp.position.set(0, 80, 0);
  lamp.scale.set(0.06, 0.06, 0.06);
  level2.add(lamp);
});
//3
lloader.load('assets/models/levels/2/Room/lamp.fbx', (lamp) => {
  lamp.position.set(0, 80, -300);
  lamp.scale.set(0.06, 0.06, 0.06);
  level2.add(lamp);
});
//4
lloader.load('assets/models/levels/2/Room/lamp.fbx', (lamp) => {
  lamp.position.set(300, 80, -300);
  lamp.scale.set(0.06, 0.06, 0.06);
  lamp.castShadow = true;
  level2.add(lamp);
});
//5
lloader.load('assets/models/levels/2/Room/lamp.fbx', (lamp) => {
  lamp.position.set(300, 80, 0);
  lamp.scale.set(0.06, 0.06, 0.06);
  level2.add(lamp);
});
//6
lloader.load('assets/models/levels/2/Room/lamp.fbx', (lamp) => {
  lamp.position.set(50, 80, 200);
  lamp.scale.set(0.06, 0.06, 0.06);
  level2.add(lamp);
});
//7
lloader.load('assets/models/levels/2/Room/lamp.fbx', (lamp) => {
  lamp.position.set(200, 80, 200);
  lamp.scale.set(0.06, 0.06, 0.06);
  level2.add(lamp);
});

//Main lights
var lights2 = [];
function lvl2Lights() {
  //emergency lights and ambient
  lightsSet = true;
  light2 = new THREE.AmbientLight(0x101010, 0.5);
  level2.add(light2);

  light2 = new THREE.PointLight(0xff0000, 0.8, 125);
  light2.castShadow = true;
  light2.position.set(-300, 60, 0);
  level2.add(light2);
  lights2.push(light2);

  light2 = new THREE.PointLight(0xff0000, 0.8, 125);
  light2.castShadow = true;
  light2.position.set(0, 60, 0);
  level2.add(light2);
  lights2.push(light2);

  light2 = new THREE.PointLight(0xff0000, 0.8, 125);
  light2.castShadow = true;
  light2.position.set(0, 60, -300);
  level2.add(light2);
  lights2.push(light2);

  light2 = new THREE.PointLight(0xff0000, 0.8, 125);
  light2.castShadow = true;
  light2.position.set(300, 60, -300);
  level2.add(light2);
  lights2.push(light2);

  light2 = new THREE.PointLight(0xff0000, 0.8, 125);
  light2.castShadow = true;
  light2.position.set(300, 60, 0);
  level2.add(light2);
  lights2.push(light2);

  light2 = new THREE.PointLight(0xff0000, 0.8, 125);
  light2.castShadow = true;
  light2.position.set(50, 60, 200);
  level2.add(light2);
  lights2.push(light2);

  light2 = new THREE.PointLight(0xff0000, 0.8, 125);
  light2.castShadow = true;
  light2.position.set(200, 60, 200);
  level2.add(light2);
  lights2.push(light2);
}

var to0 = true;
var to1 = false;

function Emergency() {
  if (to0) {
    for (var i = 0; i < 7; i++) {
      lights2[i].intensity -= 0.01;
      if (lights2[i].intensity <= 0.05) {
        to0 = false;
        to1 = true;
      }
    }
  }
  if (to1) {
    for (var i = 0; i < 7; i++) {
      lights2[i].intensity += 0.01;
      if (lights2[i].intensity >= 0.95) {
        to0 = true;
        to1 = false;
      }
    }
  }
}

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

//load model
const zomModels = [];

const mLoader = new THREE.FBXLoader();
mLoader.setPath('assets/models/levels/2/Agent/');
mLoader.load('Ch30_nonPBR.fbx', (char) => {
  //fbx.scale.setScale(1);
  char.traverse((c) => {
    if (c instanceof THREE.Mesh) {
      // c.receiveShadow = true;
      c.castShadow = true;
    }
  });
  var playerPos = new THREE.Vector3(-300, 0, 0);
  const anim = new THREE.FBXLoader();
  anim.setPath('assets/models/levels/2/Agent/');
  anim.load('Zombie Walk.fbx', (anim) => {
    mixer21 = new THREE.AnimationMixer(char);
    mixer21.clipAction(anim.animations[0]).setDuration(2.5).play();
  });

  char.scale.set(0.4, 0.4, 0.4);
  //char.rotation.y = -30;
  char.castShadow = true;
  zomModels[0] = char;
  level2.add(char);
});

mLoader.setPath('assets/models/levels/2/Agent/');
mLoader.load('Ch30_nonPBR.fbx', (char) => {
  //fbx.scale.setScale(1);
  char.traverse((c) => {
    if (c instanceof THREE.Mesh) {
      // c.receiveShadow = true;
      c.castShadow = true;
    }
  });
  var playerPos = new THREE.Vector3(-300, 0, 0);
  const anim = new THREE.FBXLoader();
  anim.setPath('assets/models/levels/2/Agent/');
  anim.load('Zombie Walk.fbx', (anim) => {
    mixer22 = new THREE.AnimationMixer(char);
    mixer22.clipAction(anim.animations[0]).setDuration(2.5).play();
  });

  char.scale.set(0.4, 0.4, 0.4);
  char.rotation.y = 3;
  char.castShadow = true;
  zomModels[1] = char;
  level2.add(char);
});

mLoader.setPath('assets/models/levels/2/Agent/');
mLoader.load('Ch30_nonPBR.fbx', (char) => {
  //fbx.scale.setScale(1);
  char.traverse((c) => {
    if (c instanceof THREE.Mesh) {
      // c.receiveShadow = true;
      c.castShadow = true;
    }
  });
  var playerPos = new THREE.Vector3(-300, 0, 0);
  const anim = new THREE.FBXLoader();
  anim.setPath('assets/models/levels/2/Agent/');
  anim.load('Zombie Walk.fbx', (anim) => {
    mixer23 = new THREE.AnimationMixer(char);
    mixer23.clipAction(anim.animations[0]).setDuration(2.5).play();
  });

  char.scale.set(0.4, 0.4, 0.4);
  //char.rotation.y = -30;
  char.castShadow = true;
  zomModels[2] = char;
  level2.add(char);
});

mLoader.setPath('assets/models/levels/2/Agent/');
mLoader.load('Ch30_nonPBR.fbx', (char) => {
  //fbx.scale.setScale(1);
  char.traverse((c) => {
    if (c instanceof THREE.Mesh) {
      // c.receiveShadow = true;
      c.castShadow = true;
    }
  });
  var playerPos = new THREE.Vector3(-300, 0, 0);
  const anim = new THREE.FBXLoader();
  anim.setPath('assets/models/levels/2/Agent/');
  anim.load('Zombie Walk.fbx', (anim) => {
    mixer24 = new THREE.AnimationMixer(char);
    mixer24.clipAction(anim.animations[0]).setDuration(2.5).play();
  });

  char.scale.set(0.4, 0.4, 0.4);
  char.rotation.y = 3;
  char.castShadow = true;
  zomModels[3] = char;
  level2.add(char);
});

// Agent radius
const agentGeo = new THREE.SphereGeometry(40, 32, 16);
const agentMat1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const agentMat2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const agentMat3 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const agentMat4 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const agent1 = new THREE.Mesh(agentGeo, agentMat1);
agent1.position.y = 40;
level2.add(agent1);
agent1.visible = false;

const agent2 = new THREE.Mesh(agentGeo, agentMat2);
agent2.position.y = 40;
agent2.position.x = 25;
agent2.position.z = -300;
level2.add(agent2);
agent2.visible = false;

const agent3 = new THREE.Mesh(agentGeo, agentMat3);
agent3.position.y = 40;
agent3.position.x = 300;
agent3.position.z = -275;
level2.add(agent3);
agent3.visible = false;

const agent4 = new THREE.Mesh(agentGeo, agentMat4);
agent4.position.y = 40;
agent4.position.x = 275;
agent4.position.z = 200;
level2.add(agent4);
agent4.visible = false;

// Animate agents
// Animated agents radius
var A1prevZ = 0;
var A2prevX = 0;
var A3prevZ = 0;
var A4prevX = 0;

var A1front = false;
var A1back = false;

var A2front = false;
var A2back = false;

var A3front = false;
var A3back = false;

var A4front = false;
var A4back = false;

//boundaries of the balls
var ball1BB = new THREE.Sphere(agent1.position, 40);
var ball2BB = new THREE.Sphere(agent2.position, 40);
var ball3BB = new THREE.Sphere(agent3.position, 40);
var ball4BB = new THREE.Sphere(agent4.position, 40);

function animateAgents() {
  // Agent 1
  if (agent1.position.z >= 0) {
    A1prevZ = 0;
    A1front = true;
    agent1.position.z -= 0.3;
  }
  if (agent1.position.z <= -275) {
    A1prevZ = -275;
    A1back = true;
    agent1.position.z += 0.3;
  }
  if (A1prevZ > agent1.position.z) {
    A1prevZ -= 0.3;
    agent1.position.z -= 0.3;
  }
  if (A1prevZ < agent1.position.z) {
    A1prevZ += 0.3;
    agent1.position.z += 0.3;
  }
  ball1BB = new THREE.Sphere(agent1.position, 40);
  zomModels[0].position.x = agent1.position.x;
  zomModels[0].position.z = agent1.position.z;

  if (A1front) {
    zomModels[0].rotation.y += 0.05;
    if (zomModels[0].rotation.y >= 3) {
      A1front = false;
    }
  }
  if (A1back) {
    zomModels[0].rotation.y -= 0.05;
    if (zomModels[0].rotation.y <= -0.5) {
      A1back = false;
    }
  }

  // Agent 2
  if (agent2.position.x <= 25) {
    A2prevX = 25;
    agent2.position.x += 0.3;
    A2back = true;
  }
  if (agent2.position.x >= 275) {
    A2prevX = 275;
    agent2.position.x -= 0.3;
    A2front = true;
  }
  if (A2prevX < agent2.position.x) {
    A2prevX += 0.3;
    agent2.position.x += 0.3;
  }
  if (A2prevX > agent2.position.x) {
    A2prevX -= 0.3;
    agent2.position.x -= 0.3;
  }
  ball2BB = new THREE.Sphere(agent2.position, 40);
  zomModels[1].position.x = agent2.position.x;
  zomModels[1].position.z = agent2.position.z;

  if (A2front) {
    zomModels[1].rotation.y += 0.05;
    if (zomModels[1].rotation.y >= 4.5) {
      A2front = false;
    }
  }
  if (A2back) {
    zomModels[1].rotation.y -= 0.05;
    if (zomModels[1].rotation.y <= 1.5) {
      A2back = false;
    }
  }

  // Agent 3
  if (agent3.position.z <= -275) {
    A3prevZ = -275;
    agent3.position.z += 0.3;
    A3back = true;
  }
  if (agent3.position.z >= 175) {
    A3prevZ = 175;
    agent3.position.z -= 0.3;
    A3front = true;
  }
  if (A3prevZ < agent3.position.z) {
    A3prevZ += 0.3;
    agent3.position.z += 0.3;
  }
  if (A3prevZ > agent3.position.z) {
    A3prevZ -= 0.3;
    agent3.position.z -= 0.3;
  }
  ball3BB = new THREE.Sphere(agent3.position, 40);
  zomModels[2].position.x = agent3.position.x;
  zomModels[2].position.z = agent3.position.z;

  if (A3front) {
    zomModels[2].rotation.y += 0.05;
    if (zomModels[2].rotation.y >= 3) {
      A3front = false;
    }
  }
  if (A3back) {
    zomModels[2].rotation.y -= 0.05;
    if (zomModels[2].rotation.y <= -0.5) {
      A3back = false;
    }
  }

  // Agent 4

  if (agent4.position.x >= 275) {
    A4prevX = 275;
    agent4.position.x -= 0.3;
    A4front = true;
  }
  if (agent4.position.x <= 0) {
    A4prevX = 0;
    agent4.position.x += 0.3;
    A4back = true;
  }
  if (A4prevX > agent4.position.x) {
    A4prevX -= 0.3;
    agent4.position.x -= 0.3;
  }
  if (A4prevX < agent4.position.x) {
    A4prevX += 0.3;
    agent4.position.x += 0.3;
  }
  ball4BB = new THREE.Sphere(agent4.position, 40);
  zomModels[3].position.x = agent4.position.x;
  zomModels[3].position.z = agent4.position.z;

  if (A4front) {
    zomModels[3].rotation.y += 0.05;
    if (zomModels[3].rotation.y >= 4.5) {
      A4front = false;
    }
  }
  if (A4back) {
    zomModels[3].rotation.y -= 0.05;
    if (zomModels[3].rotation.y <= 1.5) {
      A4back = false;
    }
  }
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
    return true;
  } else {
    return false;
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

//extra models

//2368
const doorLoader = new THREE.FBXLoader();
doorLoader.setPath('assets/models/levels/2/Extras/sidedoors/source/');
doorLoader.load('door1.fbx', (door) => {
  //fbx.scale.setScale(1);
  door.traverse((c) => {
    if (c instanceof THREE.Mesh) {
      // c.receiveShadow = true;
      c.castShadow = true;
    }
  });
  door.scale.set(0.3, 0.3, 0.3);
  door.position.y = 60;
  door.position.x = -50;
  door.position.z = 200;
  door.rotation.y = Math.PI / 2;
  door.castShadow = true;
  level2.add(door);
});

const sideLoader = new THREE.FBXLoader();
sideLoader.setPath('assets/models/levels/2/Extras/exitDoor/source/');
sideLoader.load('Door.fbx', (door) => {
  //fbx.scale.setScale(1);
  door.traverse((c) => {
    if (c instanceof THREE.Mesh) {
      // c.receiveShadow = true;
      c.castShadow = true;
    }
  });
  door.scale.set(0.25, 0.25, 0.25);
  door.position.y = -15;
  door.position.x = 50;
  door.position.z = -100;
  door.rotation.y = Math.PI / 2;
  door.castShadow = true;
  level2.add(door);
});

sideLoader.setPath('assets/models/levels/2/Extras/exitDoor/source/');
sideLoader.load('Door.fbx', (door) => {
  //fbx.scale.setScale(1);
  door.traverse((c) => {
    if (c instanceof THREE.Mesh) {
      // c.receiveShadow = true;
      c.castShadow = true;
    }
  });
  door.scale.set(0.25, 0.25, 0.25);
  door.position.y = -15;
  door.position.x = 100;
  door.position.z = -350;
  //door.rotation.y = Math.PI/2;
  door.castShadow = true;
  level2.add(door);
});

sideLoader.setPath('assets/models/levels/2/Extras/exitDoor/source/');
sideLoader.load('Door.fbx', (door) => {
  //fbx.scale.setScale(1);
  door.traverse((c) => {
    if (c instanceof THREE.Mesh) {
      // c.receiveShadow = true;
      c.castShadow = true;
    }
  });
  door.scale.set(0.25, 0.25, 0.25);
  door.position.y = -15;
  door.position.x = 200;
  door.position.z = -250;
  door.castShadow = true;
  level2.add(door);
});

sideLoader.setPath('assets/models/levels/2/Extras/exitDoor/source/');
sideLoader.load('Door.fbx', (door) => {
  //fbx.scale.setScale(1);
  door.traverse((c) => {
    if (c instanceof THREE.Mesh) {
      // c.receiveShadow = true;
      c.castShadow = true;
    }
  });
  door.scale.set(0.25, 0.25, 0.25);
  door.position.y = -15;
  door.position.x = 350;
  door.position.z = -200;
  door.rotation.y = Math.PI / 2;
  door.castShadow = true;
  level2.add(door);
});

sideLoader.setPath('assets/models/levels/2/Extras/exitDoor/source/');
sideLoader.load('Door.fbx', (door) => {
  //fbx.scale.setScale(1);
  door.traverse((c) => {
    if (c instanceof THREE.Mesh) {
      // c.receiveShadow = true;
      c.castShadow = true;
    }
  });
  door.scale.set(0.25, 0.25, 0.25);
  door.position.y = -15;
  door.position.x = 250;
  door.position.z = 0;
  door.rotation.y = Math.PI / 2;
  door.castShadow = true;
  level2.add(door);
});

sideLoader.setPath('assets/models/levels/2/Extras/exitDoor/source/');
sideLoader.load('Door.fbx', (door) => {
  //fbx.scale.setScale(1);
  door.traverse((c) => {
    if (c instanceof THREE.Mesh) {
      // c.receiveShadow = true;
      c.castShadow = true;
    }
  });
  door.scale.set(0.25, 0.25, 0.25);
  door.position.y = -15;
  door.position.x = 300;
  door.position.z = 250;
  door.castShadow = true;
  level2.add(door);
});
sideLoader.setPath('assets/models/levels/2/Extras/exitDoor/source/');
sideLoader.load('Door.fbx', (door) => {
  //fbx.scale.setScale(1);
  door.traverse((c) => {
    if (c instanceof THREE.Mesh) {
      // c.receiveShadow = true;
      c.castShadow = true;
    }
  });
  door.scale.set(0.25, 0.25, 0.25);
  door.position.y = -15;
  door.position.x = 100;
  door.position.z = 150;
  //door.rotation.y = Math.PI / 2;
  door.castShadow = true;
  level2.add(door);
});

sideLoader.setPath('assets/models/levels/2/Extras/exitDoor/source/');
sideLoader.load('Door.fbx', (door) => {
  //fbx.scale.setScale(1);
  door.traverse((c) => {
    if (c instanceof THREE.Mesh) {
      // c.receiveShadow = true;
      c.castShadow = true;
    }
  });
  door.scale.set(0.25, 0.25, 0.25);
  door.position.y = -15;
  door.position.x = -50;
  door.position.z = -200;
  door.rotation.y = Math.PI / 2;
  door.castShadow = true;
  level2.add(door);
});



//audio 
music2 = true;
listener2 = new THREE.AudioListener();
camera2.add(listener2);

const sound2 = new THREE.Audio(listener2);
const sLoader2 = new THREE.AudioLoader();

function lvl2Music(){
  if(music2){
    sound2.setLoop( true );
    sLoader2.load('/assets/audio/Heartbeat.mp3', (buffer) => {
    sound2.setBuffer(buffer);
    sound2.setVolume(1);
    sound2.play();
    });
    music2 = false;
  }
  
}

// scene.js ends here
