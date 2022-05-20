// scene.js --- `three.js' scene definitions for level 3

// Libraries:

// `three.js'

// Modules:

// None

// Code:

// Instantiate `three.js' scene for level 3
var level3 = new THREE.Scene();

let light3 = new THREE.DirectionalLight(0xffffff, 1.0);
light3.position.set(20, 100, 10);
light3.target.position.set(0, 0, 0);
light3.castShadow = true;
light3.shadow.bias = -0.001;
light3.shadow.mapSize.width = 2048;
light3.shadow.mapSize.height = 2048;
light3.shadow.camera.near = 0.1;
light3.shadow.camera.far = 500.0;
light3.shadow.camera.near = 0.5;
light3.shadow.camera.far = 500.0;
light3.shadow.camera.left = 100;
light3.shadow.camera.right = -100;
light3.shadow.camera.top = 100;
light3.shadow.camera.bottom = -100;
level3.add(light3);

light32 = new THREE.AmbientLight(0x101010);
level3.add(light32);

//creating the skybox

const loader3 = new THREE.CubeTextureLoader();
const texture3 = loader3.load([
  'assets/images/levels/2/skybox/1.png',
  'assets/images/levels/2/skybox/2.png',
  'assets/images/levels/2/skybox/3.png',
  'assets/images/levels/2/skybox/4.png',
  'assets/images/levels/2/skybox/5.png',
  'assets/images/levels/2/skybox/6.png',
]);
level3.background = texture3;

const gltfLoader4 = new THREE.GLTFLoader();
gltfLoader4.load('assets/models/levels/3/Valley/scene.gltf', (gltfScene) => {
  gltfScene.scene.position.y = 10;
  gltfScene.scene.scale.set(10, 10, 10);
  level3.add(gltfScene.scene);
});

// scene.js ends here
