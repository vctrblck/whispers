//Setting the light for my levelglTF

let light3 = new THREE.DirectionalLight(0xFFFFFF, 1.0);
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
    '../images/level2/lvl2Skybox/1.png',
    '../images/level2/lvl2Skybox/2.png',
    '../images/level2/lvl2Skybox/3.png',
    '../images/level2/lvl2Skybox/4.png',
    '../images/level2/lvl2Skybox/5.png',
    '../images/level2/lvl2Skybox/6.png' 
]);
level3.background = texture3;

//add texture to plane and place it in world

const plane3 = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000, 10, 10),
    new THREE.MeshStandardMaterial({
        color : 0xFFFFFF, side : THREE.DoubleSide
      }));
plane3.castShadow = false;
plane3.receiveShadow = true;
plane3.rotation.x = -Math.PI / 2;
level3.add(plane3);

//load model of dog into scene

const gltfLoader3 = new THREE.GLTFLoader();
gltfLoader3.load('../models/level1/dog/scene.gltf', (gltfScene) => {
    gltfScene.scene.position.y = 10;
    gltfScene.scene.scale.set(10,10,10);
    level3.add(gltfScene.scene);
});

const gltfLoader4 = new THREE.GLTFLoader();
gltfLoader4.load('../models/level3/valley/scene.gltf', (gltfScene) => {
    gltfScene.scene.position.y = 10;
    gltfScene.scene.scale.set(10,10,10);
    level3.add(gltfScene.scene);
});