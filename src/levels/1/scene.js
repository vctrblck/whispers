//control panel
const controlTexture1 = new THREE.TextureLoader().load('assets/images/levels/1/Controls.png');
const controlsPanel1 = new THREE.Mesh(new THREE.BoxGeometry(60, 40, 0), new THREE.MeshBasicMaterial({map: controlTexture1}));
controlsPanel1.position.set(camera1.position.x+50, camera1.position.y, camera1.position.z);
controlsPanel1.rotateY(Math.PI/2);
controlsPanel1.receiveShadow = false;
controlsPanel1.castShadow = false;
level1.add(controlsPanel1);

//key found popup
var camView = new THREE.Vector3();

const keyPopupTexture1 = new THREE.TextureLoader().load('assets/images/levels/1/KeyFound.png');
const keyPopupPanel1 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.3, 0), new THREE.MeshBasicMaterial({color: 0xffffff, map: keyPopupTexture1}));
keyPopupPanel1.rotateY(Math.PI/2);
keyPopupPanel1.receiveShadow = false;
keyPopupPanel1.castShadow = false;
const clockKey1 = new THREE.Clock();
clockKey1.stop();

function foundKey(){
  camera1.getWorldDirection( camView );
  keyPopupPanel1.position.set(camera1.position.x+1.5*camView.x, camera1.position.y+camView.y, camera1.position.z+1.5*camView.z);

  if(Math.abs(camView.x)>Math.abs(camView.z)){
    if(camView.x>0){
      keyPopupPanel1.rotateX(-camView.y);
    }else{
      keyPopupPanel1.rotateX(camView.y);
    }
  }else{
    if(camView.z>0){
      keyPopupPanel1.rotateY(1.5*-camView.z);
    }else{
      keyPopupPanel1.rotateY(1.7*camView.z);
    }
  }

  level1.add(keyPopupPanel1);
  clockKey1.start();
}

// ========================================================================== /
// Lighting                                                                   /
// ========================================================================== /

light1 = new THREE.AmbientLight(0xFFFFFF, 0.15);
level1.add(light1);

const LightTexture1 = new THREE.TextureLoader().load('assets/images/levels/1/light_metal.jpeg');
LightTexture1.wrapS = THREE.RepeatWrapping;
LightTexture1.wrapT = THREE.RepeatWrapping;
LightTexture1.repeat.set(3, 3);

const fbxLoader1 = new THREE.FBXLoader();
const lampPos = [{x:100, y:99, z:130}, {x:100, y:99, z:-130}, {x:100, y:99, z:0}];
fbxLoader1.load('assets/models/levels/2/Room/lamp.fbx', (lamp) => {
  lamp.scale.set(0.07, 0.04, 0.04);
  lamp.children[0].material.map = LightTexture1;
  lamp.rotateY(Math.PI/2);
  lamp.castShadow = true;
  for (var i = 0; i < 3; i++) {
    let lampClone1 = lamp.clone();
    lampClone1.position.set(lampPos[i].x, lampPos[i].y, lampPos[i].z);
    level1.add(lampClone1);
  }
});

let pointLight11 = new THREE.PointLight(0xFFFFFF, 0.7, 160, 2);
pointLight11.castShadow = true;
pointLight11.position.set(-45, 99, 0);
level1.add(pointLight11);

const RectAreaLight11 = new THREE.RectAreaLight( 0xFFFFFF, 5, 10, 40 );
RectAreaLight11.position.set(100, 90, 130);
RectAreaLight11.rotateX(-Math.PI/2);
level1.add(RectAreaLight11);

const RectAreaLight12 = new THREE.RectAreaLight( 0xFFFFFF, 5, 10, 40 );
RectAreaLight12.position.set(100, 90, -130);
RectAreaLight12.rotateX(-Math.PI/2);
level1.add(RectAreaLight12);

const RectAreaLight13 = new THREE.RectAreaLight( 0xFFFFFF, 5, 10, 40 );
RectAreaLight13.position.set(100, 90, 0);
RectAreaLight13.rotateX(-Math.PI/2);
level1.add(RectAreaLight13);


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

const spotLight1 = new THREE.SpotLight( 0xffffff, 0.3, 30, Math.PI/4);
spotLight1.position.set(40, 50, 57);
const targetObject1 = new THREE.Object3D();
targetObject1.position.set(50, 50, 60);
level1.add(targetObject1);
spotLight1.target = targetObject1;
spotLight1.castShadow = false;
spotLight1.decay = 1.5;
spotLight1.penumbra = 1;
level1.add( spotLight1 );


//crack in wall for key
const crackTexture1 = new THREE.TextureLoader().load('assets/images/levels/1/wallcrack.png');
const crackMaterial1 = new THREE.MeshStandardMaterial({map: crackTexture1, side: THREE.BackSide});
const crackCover1 = new THREE.Mesh(new THREE.BoxGeometry(44.8, 32.6, 0), crackMaterial1);
crackCover1.position.set(-139.99, 51.1, -46.1);
crackCover1.rotateY(Math.PI/2);
crackCover1.castShadow = true;
crackCover1.receiveShadow = false;
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

  let corner1 = new THREE.Box3(new THREE.Vector3(-140,0,-68), new THREE.Vector3(-120,100,-25)); //back wall for key
  let lock1 = new THREE.Box3(new THREE.Vector3(30,0,40), new THREE.Vector3(50,100,68)); //lock

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