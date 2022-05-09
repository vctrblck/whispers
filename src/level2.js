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
    '../images/level2/lvl2Skybox/1.png',
    '../images/level2/lvl2Skybox/2.png',
    '../images/level2/lvl2Skybox/3.png',
    '../images/level2/lvl2Skybox/4.png',
    '../images/level2/lvl2Skybox/5.png',
    '../images/level2/lvl2Skybox/6.png' 
]);
level2.background = texture2;

//add texture to plane and place it in world

const grid = new THREE.TextureLoader().load( '../images/level2/grid.png' );
const plane2 = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000, 10, 10),
    new THREE.MeshStandardMaterial({    
        map : grid, side : THREE.DoubleSide
      }));
plane2.castShadow = false;
plane2.receiveShadow = true;
plane2.rotation.x = -Math.PI / 2;
level2.add(plane2);

//create a wall
//1 grid block around 90 units
const wallgeometry = new THREE.PlaneGeometry(370, 90);
const wallTexture = new THREE.TextureLoader().load('../images/level2/wall.png');
const wallmaterial = new THREE.MeshBasicMaterial( {map : wallTexture, side: THREE.DoubleSide} );

//wallTexture.flipY = false;
var light2_1 = new THREE.HemisphereLight( 0xbbbbff, 0x444422 );
light2_1.position.set( 0, 1, 0 );
level2.add( light2_1 );

var gltfLoader2 = new THREE.GLTFLoader();

gltfLoader2.load('../models/level2/room/corridors.gltf', (gltf) => {
    var model = gltf.scene;
    model.traverse((o) => {
        if(o.isMesh){
            o.material.map = wallTexture;
        }
    });
    //model.rotation.x = -Math.PI / 2;
    model.position.x =  -300;
    model.position.y = -1;
    model.scale.set(100,100,100);
    level2.add(model);
});
