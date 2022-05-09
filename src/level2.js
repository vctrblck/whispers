//Setting the light for my level

let light2 = new THREE.DirectionalLight(0xFFFFFF, 1.0);
light2.position.set(20, 100, 10);
light2.target.position.set(0, 0, 0);
light2.castShadow = true;
light2.shadow.bias = -0.001;
light2.shadow.mapSize.width = 2048;
light2.shadow.mapSize.height = 2048;
light2.shadow.camera.near = 0.1;
light2.shadow.camera.far = 500.0;
light2.shadow.camera.near = 0.5;
light2.shadow.camera.far = 500.0;
light2.shadow.camera.left = 100;
light2.shadow.camera.right = -100;
light2.shadow.camera.top = 100;
light2.shadow.camera.bottom = -100;
level2.add(light2);

light2 = new THREE.AmbientLight(0x101010);
level2.add(light2);

//creating the skybox

const loader2 = new THREE.CubeTextureLoader();
const texture2 = loader2.load([
    '../images/lvl2Skybox/1.png',
    '../images/lvl2Skybox/2.png',
    '../images/lvl2Skybox/3.png',
    '../images/lvl2Skybox/4.png',
    '../images/lvl2Skybox/5.png',
    '../images/lvl2Skybox/6.png' 
]);
level2.background = texture2;

//add texture to plane and place it in world

const plane2 = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000, 10, 10),
    new THREE.MeshStandardMaterial({
        color : 0xFFFFFF, side : THREE.DoubleSide
      }));
plane2.castShadow = false;
plane2.receiveShadow = true;
plane2.rotation.x = -Math.PI / 2;
level2.add(plane2);

//load model of dog into scene

const gltfLoader2 = new THREE.GLTFLoader();

gltfLoader2.load('../models/dog/scene.gltf', (gltfScene) => {
    gltfScene.scene.position.y = 10;
    gltfScene.scene.scale.set(10,10,10);
    level2.add(gltfScene.scene);
});