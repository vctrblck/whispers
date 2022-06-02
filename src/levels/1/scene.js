// ========================================================================== /
// Lighting                                                                   /
// ========================================================================== /

light1 = new THREE.AmbientLight(0xffffff, 1); //
level1.add(light1);

/**light1 = new THREE.PointLight(0xFFFFFF, 0.8, 125);
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
level1.add(light1);**/


// ========================================================================== /
// Skybox                                                                     /
// ========================================================================== /

const loader1 = new THREE.CubeTextureLoader();
const texture1 = loader1.load([
  'assets/images/levels/2/skybox/1.png',
  'assets/images/levels/2/skybox/2.png',
  'assets/images/levels/2/skybox/3.png',
  'assets/images/levels/2/skybox/4.png',
  'assets/images/levels/2/skybox/5.png',
  'assets/images/levels/2/skybox/6.png',
]);
level1.background = texture1;


// ========================================================================== /



// ========================================================================== /
// Room                                                                       /
// ========================================================================== /
var countChild =0;

//Floor 
const floorTexture1 = new THREE.TextureLoader().load('assets/images/levels/1/concrete_grey.jpg');
//Walls Hallway
const wallTexture1 = new THREE.TextureLoader().load('assets/images/levels/1/bloody_wall.jpg');
//Roof Hallway
const roofTexture1 = wallTexture1.clone();
roofTexture1.wrapS = THREE.RepeatWrapping;
roofTexture1.repeat.x = - 1;
//Metal bars etc
const barTexture1 = new THREE.TextureLoader().load('assets/images/levels/1/metall010-new-tileable_0.png');
//Cell
const cellTexture1 = new THREE.TextureLoader().load('assets/images/levels/1/tiles.png');

var gltfLoader1 = new THREE.GLTFLoader();
gltfLoader1.load('assets/models/levels/1/Cell/Jail.gltf', (gltf) => {
  var model1 = gltf.scene;
  model1.traverse((o) => {
    if(o.name.includes("Cylinder")){ //Poles
      barTexture12 = barTexture1.clone();
      barTexture12.wrapT = THREE.RepeatWrapping;
      barTexture12.repeat.set(1, 10);
      o.material.map = barTexture12;
    }
    else if(o.name.includes("Bar")){ //Beams
      barTexture12 = barTexture1.clone();
      barTexture12.wrapT = THREE.RepeatWrapping;
      barTexture12.wrapS = THREE.RepeatWrapping;
      barTexture12.repeat.set(1, 10);
      o.material.map = barTexture12;
    }
    else if(o.name.includes("Lock")){ //Lock
      o.material.map = barTexture1;
    }
    else if(o.name.includes("Wall")){  //Walls
      if(o.name.includes("Hallway")){
        o.material.map = wallTexture1;
      }else if(o.name.includes("Cell")){
        const cellTexture12 = cellTexture1.clone();
        cellTexture12.wrapS = THREE.MirroredRepeatWrapping;
        if(o.name.includes("Back")){
          cellTexture12.wrapT = THREE.MirroredRepeatWrapping;
          cellTexture12.repeat.set(1.02, 1.05);
          cellTexture12.offset.set(0.32, -0.025); // offset y by a pixel to align with side wall
        }else{
          cellTexture12.repeat.set(1.65, 1);
          if(o.name.includes("Left")){
            cellTexture12.offset.set(-0.65, 0); // offset by -2/3 the texture
          }else{
            cellTexture12.offset.set(0.35, 0); // offset by 1/3 the texture
          }          
        }
        o.material.map = cellTexture12;
      }
    }
    else if(o.name.includes("Roof")){ //Roof
      if(o.name.includes("Hallway")){
        o.material.map = roofTexture1;
      }else if(o.name.includes("Cell")){
        const cellTexture12 = cellTexture1.clone();
        cellTexture12.wrapS = THREE.MirroredRepeatWrapping;
        cellTexture12.wrapT = THREE.MirroredRepeatWrapping;
        cellTexture12.repeat.set(1.64, 1.0245);
        cellTexture12.offset.set(-0.328, -0.0075); // offset by 1/3 the texture
        o.material.map = cellTexture12;
      }
    }
    else if(o.name.includes("Floor")){  //Floor
      const floorTexture12 = floorTexture1.clone();
      floorTexture12.wrapS = THREE.RepeatWrapping;
      if(o.name.includes("Hallway")){
        floorTexture12.repeat.set(4, 1);
      }else if(o.name.includes("Cell")){
        floorTexture12.repeat.set(1.5, 1);
      }
      o.material.map = floorTexture12;
    }

    if(o instanceof THREE.Mesh){
      o.receiveShadow = true;
      models.push(o);
      countChild+=1;
    }
  });
  model1.castShadow = true;
  model1.receiveShadow = true;
  model1.position.y = 1;
  model1.scale.set(1000,1000,1000);
  //model1.visible = false;
  level1.add(model1);
  loadLevel();
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

function loadLevel(){
  loadedLevel += 1;
}