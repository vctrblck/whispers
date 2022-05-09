//Setting the light for my level

let light1 = new THREE.DirectionalLight(0xFFFFFF, 1.0);
light1.position.set(20, 100, 10);
light1.target.position.set(0, 0, 0);
light1.castShadow = true;
light1.shadow.bias = -0.001;
light1.shadow.mapSize.width = 2048;
light1.shadow.mapSize.height = 2048;
light1.shadow.camera.near = 0.1;
light1.shadow.camera.far = 500.0;
light1.shadow.camera.near = 0.5;
light1.shadow.camera.far = 500.0;
light1.shadow.camera.left = 100;
light1.shadow.camera.right = -100;
light1.shadow.camera.top = 100;
light1.shadow.camera.bottom = -100;
level1.add(light1);

let light12 = new THREE.AmbientLight(0x101010);
level1.add(light12);

//creating the skybox

const loader1 = new THREE.CubeTextureLoader();
const texture1 = loader1.load([
    '../images/level2/lvl2Skybox/1.png',
    '../images/level2/lvl2Skybox/2.png',
    '../images/level2/lvl2Skybox/3.png',
    '../images/level2/lvl2Skybox/4.png',
    '../images/level2/lvl2Skybox/5.png',
    '../images/level2/lvl2Skybox/6.png' 
]);
level1.background = texture1;

//add texture to plane and place it in world

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000, 10, 10),
    new THREE.MeshStandardMaterial({
        color : 0xFFFFFF, side : THREE.DoubleSide
      }));
plane.castShadow = false;
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
level1.add(plane);

//load model of dog into scene

//doge
const gltfLoader11 = new THREE.GLTFLoader();
gltfLoader11.load('../models/level1/dog/scene.gltf', (gltfScene) => {
    gltfScene.scene.position.y = 20;
    gltfScene.scene.scale.set(20,20,20);
    level1.add(gltfScene.scene);
});

//helmet
const gltfLoader12 = new THREE.GLTFLoader();
gltfLoader12.load('../models/level1/DamagedHelmet/glTF/DamagedHelmet.gltf', (gltfScene) => {
    gltfScene.scene.position.y = 20;
    gltfScene.scene.scale.set(12,12,12);
    level1.add(gltfScene.scene);
});

//horse

const gltfLoader13 = new THREE.GLTFLoader();
gltfLoader13.load('../models/level1/horse.glb', (gltf) => {
    var horse = gltf.scene.children[0];
    horse.scale.set( 0.2, 0.2, 0.2);
    horse.position.set(50, 0, 0);
    level1.add(horse);
    mixer = new THREE.AnimationMixer(horse);
    mixer.clipAction( gltf.animations[ 0 ] ).setDuration( 1 ).play();
});

function getMixer(){
    return mixer;
}