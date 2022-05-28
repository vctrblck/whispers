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
  //gltfScene.scene.position.y = 10;
  gltfScene.scene.scale.set(10, 10, 10);
  level3.add(gltfScene.scene);
});

const gltfLoader5 = new THREE.GLTFLoader();
gltfLoader4.load('assets/models/levels/3/circle_rug/scene.gltf', (gltfScene) => {
  /*gltfScene.scene.position.y = 30;
  gltfScene.scene.position.x = 70;
  gltfScene.scene.position.z = 345;*/

  /*Left hand rule with thumb being the y axis,middle finger point positive x axis, one finger point negative z axis*/
  gltfScene.scene.position.set(40,20,345);

  gltfScene.scene.scale.set(0.03, 0.03, 0.03);
  level3.add(gltfScene.scene);
});

const plane3 = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 1800, 10, 10),
    new THREE.MeshStandardMaterial({ 
        color : 0x00FF00, side : THREE.DoubleSide
      }));
plane3.castShadow = false;
plane3.receiveShadow = true;
plane3.rotation.x = -Math.PI / 2;
plane3.position.y = 50
//level3.add(plane3);


//Add some lights

const light33 = new THREE.PointLight( 0xFFFFFF, 1, 100 ); //white
light33.castShadow = true;
light33.position.set( 75, 75, 75 );
//level3.add( light33 );

const light34 = new THREE.PointLight(0xFF0000, 1); // red
light34.castShadow = true
light34.position.set(75,75,75)
level3.add(light34)

const light35 = new THREE.PointLight(0x00FF00, 1); //the green light
light35.castShadow = true
light35.position.set(75,75,75)
//level3.add(light35)

// player found the key

keyPos = new THREE.Box3(new THREE.Vector3(40,20,345),new THREE.Vector3(40,20,345));
var foundKey = false;

function getKey(){
  var playerChest1 = new THREE.Vector3;
  playerChest1 = camera3.clone();

  if(foundKey == false){
    if(/*keyPos.intersectsPoint(playerChest1.position) ||*/ keyPos.containsPoint(playerChest1.position) ){
      console.log("in the keyy zone now find the key")
      const light35 = new THREE.PointLight(0x00FF00, 1); //the green light
      light35.castShadow = true;
      light35.position.set(75,75,75);
      level3.add(light35);
      foundKey = true;
    }
  }
}

// scene.js ends here
