//control view
const controlTexture1 = new THREE.TextureLoader().load('assets/images/levels/1/Controls.png');
const controlsPanel1 = new THREE.Mesh(new THREE.BoxGeometry(60, 40, 0), new THREE.MeshBasicMaterial({map: controlTexture1}));
controlsPanel1.position.set(camera1.position.x+50, camera1.position.y, camera1.position.z);
controlsPanel1.rotateY(Math.PI/2);
level1.add(controlsPanel1);

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
level1.add(light1);*/


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
      let barTexture12 = barTexture1.clone();
      barTexture12.wrapT = THREE.RepeatWrapping;
      barTexture12.repeat.set(1, 10);
      o.material.map = barTexture12;
    }
    else if(o.name.includes("Bar")){ //Beams
      let barTexture12 = barTexture1.clone();
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

//lock
const lockTexture11 = new THREE.TextureLoader().load('assets/images/levels/1/lock.jpg');
lockTexture11.wrapS = THREE.RepeatWrapping;
lockTexture11.repeat.x =-1.2;
const lockMaterial1 = new THREE.MeshPhongMaterial({color: 0x6b6b6b,
                                                   map: lockTexture11
                                                  });

const lockCover1 = new THREE.Mesh(new THREE.BoxGeometry(12, 8, 0), lockMaterial1);
lockCover1.position.set(52.99, 51, 65.5);
lockCover1.rotateY(Math.PI/2);

level1.add(lockCover1);

//crack in wall for key new THREE.Vector3(-140,0,0), new THREE.Vector3(-130,100,15))
const crackTexture1 = new THREE.TextureLoader().load('assets/images/levels/1/wallcrack.png');
crackTexture1.wrapS = THREE.RepeatWrapping;
crackTexture1.repeat.x =-1;
const crackMaterial1 = new THREE.MeshPhongMaterial({map: crackTexture1});
const crackCover1 = new THREE.Mesh(new THREE.BoxGeometry(44.8, 32.6, 0), crackMaterial1);
crackCover1.position.set(-139.99, 51.1, -46.1);
crackCover1.rotateY(Math.PI/2);
crackCover1.castShadow = false;
level1.add(crackCover1);

//============================================================================================
//walls
var interactWall1 = false; //if near wall
var interactLock11 = false; //if interacted with wall and got key
var interactLock12 = false; //if near lock

function cam1Limits(){

  var playerChest1 = new THREE.Vector3;
  playerChest1 = camera1.clone();
  let wall11 = new THREE.Box3(new THREE.Vector3(-140,0,65), new THREE.Vector3(60,100,68)); //right wall
  let wall12 = new THREE.Box3(new THREE.Vector3(50,0,-68), new THREE.Vector3(55,100,68)); //front wall
  let wall13 = new THREE.Box3(new THREE.Vector3(-140,0,-69), new THREE.Vector3(60,100,-66)); //left wall
  let wall14 = new THREE.Box3(new THREE.Vector3(-140,0,-68), new THREE.Vector3(-137,100,68)); //back wall

  if (wall11.containsPoint(playerChest1.position)){
      camera1.position.z = wall11.min.z;
  }

  if (wall12.containsPoint(playerChest1.position)){
      camera1.position.x = wall12.min.x;
  }

  if (wall13.containsPoint(playerChest1.position)){
      camera1.position.z = wall13.max.z;
  }

  if (wall14.containsPoint(playerChest1.position)){
      camera1.position.x = wall14.max.x;
  }

  //-------------------------------- player interaction (f)

  let corner1 = new THREE.Box3(new THREE.Vector3(-140,0,0), new THREE.Vector3(-130,100,15)); //back wall for key //TODO: fix to back corner
  let lock1 = new THREE.Box3(new THREE.Vector3(50,0,-68), new THREE.Vector3(55,100,68)); //lock

  if(corner1.containsPoint(playerChest1.position)){
    interactWall1 = true;
  }

  if(interactLock11 && lock1.containsPoint(playerChest1.position)){
    interactLock12 = true;
  }
}

function loadLevel(){
  loadedLevel += 1;
}