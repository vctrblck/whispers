
// camera 
var camera1 = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1500
  );
  
  camera1.position.x = 0;
  camera1.position.y = 45;
  camera1.position.z = 0;
  camera1.rotation.y = 30;
  
  // const controls2 = new THREE.OrbitControls(camera2, renderer.domElement);
  // controls2.target.set(0, 20, 0);    
  // controls2.update();
  
  const controls1 = new THREE.FirstPersonControls(camera1, renderer.domElement);
  controls1.movementSpeed = 7000;
  controls1.lookSpeed=15;
  controls1.activeLook = true;



//Setting the light for my level

light1 = new THREE.AmbientLight(0x101010, 1);
level1.add(light1);

light1 = new THREE.PointLight(0xFFFFFF, 0.8, 125);
light1.castShadow = true;
light1.position.set(0, 100, 0);
level1.add(light1);

light1 = new THREE.PointLight(0xFFFFFF, 0.8, 125);
light1.castShadow = true;
light1.position.set(75, 100, 150);
level1.add(light1);

light1 = new THREE.PointLight(0xFFFFFF, 0.8, 125);
light1.castShadow = true;
light1.position.set(75, 100, -150);
level1.add(light1);


//add cell to the world

const wallTexture1 = new THREE.TextureLoader().load('../images/level2/wall.png');

var gltfLoader1 = new THREE.GLTFLoader();

gltfLoader1.load('../models/level1/cell/Jail.gltf', (gltf) => {
    var model1 = gltf.scene;
    model1.traverse((o) => {
        if(o instanceof THREE.Mesh){
            o.material.map = wallTexture1;
            o.receiveShadow = true;
        }
    });
    model1.castShadow = true;
    model1.receiveShadow = true;
    model1.position.y = 1;
    model1.scale.set(1000,1000,1000);
    level1.add(model1);
});
//player passes checkpoint

let cubeCheck = new THREE.Box3(new THREE.Vector3(-60,0,-70), new THREE.Vector3(-50,100,-50));
var checked = false;

function checkpoint1(){
    var playerChest1 = new THREE.Vector3;
    playerChest1 = camera1.clone();

    if(checked == false){
        if(cubeCheck.containsPoint(playerChest1.position)){
            light1 = new THREE.PointLight(0x00FF00, 0.8, 125);
            light1.castShadow = true;
            light1.position.set(0, 100, 0);
            level1.add(light1);
            checked = true;
        }
    }   
}

//end of level
let cube1BB = new THREE.Box3(new THREE.Vector3(50,0,-70), new THREE.Vector3(60,100,70));
function endLevel1(){
    var playerChest1 = new THREE.Vector3;
    playerChest1 = camera1.clone();
    if(cube1BB.containsPoint(playerChest1.position) && checked == true ){
        return true;
        }
}
//============================================================================================
//walls
function cam1Limits(){

    var playerChest1 = new THREE.Vector3;
    playerChest1 = camera1.clone();
    let wall11 = new THREE.Box3(new THREE.Vector3(-60,0,68), new THREE.Vector3(60,100,70));
    let wall12 = new THREE.Box3(new THREE.Vector3(50,0,-70), new THREE.Vector3(60,100,70));
    
    let wall13 = new THREE.Box3(new THREE.Vector3(-60,0,-70), new THREE.Vector3(60,100,-60));
    let wall14 = new THREE.Box3(new THREE.Vector3(-60,0,-70), new THREE.Vector3(-50,100,70));



    if (wall11.containsPoint(playerChest1.position)){
        camera1.position.z =67;
        //console.log('yo');
    }

    if (wall12.containsPoint(playerChest1.position)){
        //console.log('yo');
        camera1.position.x = 50;
    }

    if (wall13.containsPoint(playerChest1.position)){
        camera1.position.z = -60;
        //console.log('yo');
    }

    if (wall14.containsPoint(playerChest1.position)){
        //console.log('yo');
        camera1.position.x = -50;
    }
}


































// //load model of dog into scene

// //doge
// const gltfLoader11 = new THREE.GLTFLoader();
// gltfLoader11.load('../models/level1/dog/scene.gltf', (gltfScene) => {
//     gltfScene.scene.position.y = 20;
//     gltfScene.scene.scale.set(20,20,20);
//     level1.add(gltfScene.scene);
// });

// //helmet
// const gltfLoader12 = new THREE.GLTFLoader();
// gltfLoader12.load('../models/level1/DamagedHelmet/glTF/DamagedHelmet.gltf', (gltfScene) => {
//     gltfScene.scene.position.y = 20;
//     gltfScene.scene.scale.set(12,12,12);
//     level1.add(gltfScene.scene);
// });

// //horse

// const gltfLoader13 = new THREE.GLTFLoader();
// gltfLoader13.load('../models/level1/horse.glb', (gltf) => {
//     var horse = gltf.scene.children[0];
//     horse.scale.set( 0.2, 0.2, 0.2);
//     horse.position.set(50, 0, 0);
//     level1.add(horse);
//     mixer = new THREE.AnimationMixer(horse);
//     mixer.clipAction( gltf.animations[ 0 ] ).setDuration( 1 ).play();
// });

function getMixer(){
    return mixer;
}