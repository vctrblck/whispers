// ========================================================================== /
// Lighting                                                                   /
// ========================================================================== /

light1 = new THREE.AmbientLight(0x404040, 1);0x101010
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

// ========================================================================== /
// Room                                                                       /
// ========================================================================== /

const loader1 = new THREE.CubeTextureLoader();
const hallWayTexture = loader1.load([
  'assets/images/levels/1/bloody_wall.jpg',
  'assets/images/levels/1/bloody_wall.jpg',
  'assets/images/levels/1/concrete_grey.jpg',
  'assets/images/levels/1/concrete_grey.jpg',
  'assets/images/levels/1/bloody_wall.jpg',
  'assets/images/levels/1/bloody_wall.jpg',
]);

//Floor 
const wallTexture11 = new THREE.TextureLoader().load('../../../assets/images/levels/1/concrete_grey.jpg');
wallTexture11.wrapS = THREE.RepeatWrapping;
wallTexture11.repeat.set(4, 1);
//Walls
const wallTexture12 = new THREE.TextureLoader().load('../../../assets/images/levels/1/bloody_wall.jpg');
wallTexture12.wrapS = THREE.RepeatWrapping;
//Roof
const roofTexture1 = wallTexture12.clone();
roofTexture1.wrapS = THREE.RepeatWrapping;
roofTexture1.repeat.x = - 1;
//Metal bars etc
const barTexture1 = new THREE.TextureLoader().load('../../../assets/images/levels/1/metall010-new-tileable_0.png');
barTexture1.wrapS = THREE.RepeatWrapping;
barTexture1.wrapT = THREE.RepeatWrapping;
//Cell Room
const cellTexture1 = new THREE.TextureLoader().load('../../../assets/images/levels/1/tiles.png');

var gltfLoader1 = new THREE.GLTFLoader();

gltfLoader1.load('../../../assets/models/levels/1/Cell/Jail.gltf', (gltf) => {
  var model1 = gltf.scene;
  model1.traverse((o) => {
    o.receiveShadow = true;
    if(o.name.includes("Cylinder")){
      barTexture1.repeat.set(1, 10);
      o.material.map = barTexture1;
    }
    else if(o.name.includes("Bar")){
      barTexture1.repeat.set(10, 1);
      o.material.map = barTexture1;
    }
    else if(o.name.includes("Lock")){
      o.material.map = barTexture1;
    }
    else if(o.name.includes("Wall")){
      o.material.map = wallTexture12;
    }
    else if(o.name.includes("Roof")){
      o.material.map = roofTexture1;
    }
    else if(o.name.includes("Floor")){
      o.material.map = wallTexture11;
    }
    else if(o.name.includes("Cell")){
      o.material.map = cellTexture1;
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

function getMixer(){
  return mixer1;
}
