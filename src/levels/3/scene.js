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

var loader = new THREE.GLTFLoader();
var forestSource = './assets/models/levels/3/forest/source/pine.glb';
loader.load(forestSource, (gltf) => {
  gltf.scene.remove(gltf.scene.children[2]); // Remove sky dome

  console.log(gltf);
  var forest1 = gltf.scene.clone();
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
});

// Cabin

var cabinSource = './assets/models/levels/3/cabin/scene.gltf';
loader.load(cabinSource, (gltf) => {
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
