//level 2 lights
const lloader = new THREE.FBXLoader();

var lampPos = [
        new THREE.Vector3(-300,80,0),
        new THREE.Vector3(0, 80, 0),
        new THREE.Vector3(0, 80, -300)
];
//1
lloader.load(
	'../models/level2/room/lamp.fbx',
	(lamp) => {
        for( var i = 0; i < 3; i++ ){
            lamp.position.set(-300,80,0);
            lamp.scale.set(0.06,0.06,0.06);
            lamp.castShadow = true;
            level2.add( lamp );
        }   
	}
);
//2
lloader.load(
	'../models/level2/room/lamp.fbx',
	(lamp) => {
        for( var i = 0; i < 3; i++ ){
            lamp.position.set(0, 80, 0);
            lamp.scale.set(0.06,0.06,0.06);
            level2.add( lamp );
        }   
	}
);
//3
lloader.load(
	'../models/level2/room/lamp.fbx',
	(lamp) => {
        for( var i = 0; i < 3; i++ ){
            lamp.position.set(0, 80, -300);
            lamp.scale.set(0.06,0.06,0.06);
            level2.add( lamp );
        }   
	}
);
//4
lloader.load(
	'../models/level2/room/lamp.fbx',
	(lamp) => {
        for( var i = 0; i < 3; i++ ){
            lamp.position.set(300, 80, -300);
            lamp.scale.set(0.06,0.06,0.06);
            lamp.castShadow = true;
            level2.add( lamp );
        }   
	}
);
//5
lloader.load(
	'../models/level2/room/lamp.fbx',
	(lamp) => {
        for( var i = 0; i < 3; i++ ){
            lamp.position.set(300, 80, 0);
            lamp.scale.set(0.06,0.06,0.06);
            level2.add( lamp );
        }   
	}
);
//6
lloader.load(
	'../models/level2/room/lamp.fbx',
	(lamp) => {
        for( var i = 0; i < 3; i++ ){
            lamp.position.set(50, 80, 200);
            lamp.scale.set(0.06,0.06,0.06);
            level2.add( lamp );
        }   
	}
);
//7
lloader.load(
	'../models/level2/room/lamp.fbx',
	(lamp) => {
        for( var i = 0; i < 3; i++ ){
            lamp.position.set(200, 80, 200);
            lamp.scale.set(0.06,0.06,0.06);
            level2.add( lamp );
        }   
	}
);

light2 = new THREE.AmbientLight(0x101010, 1);
level2.add(light2);

light2 = new THREE.PointLight(0xFF0000, 0.8, 125);
light2.castShadow = true;
light2.position.set(-300, 60, 0);
level2.add(light2);

light2 = new THREE.PointLight(0xFF0000, 0.8, 125);  
light2.castShadow = true;  
light2.position.set(0, 60, 0);
level2.add(light2);

light2 = new THREE.PointLight(0xFF0000, 0.8, 125);  
light2.castShadow = true;  
light2.position.set(0, 60, -300);
level2.add(light2);

light2 = new THREE.PointLight(0xFF0000, 0.8, 125);  
light2.castShadow = true;  
light2.position.set(300, 60, -300);
level2.add(light2);

light2 = new THREE.PointLight(0xFF0000, 0.8, 125);  
light2.castShadow = true;  
light2.position.set(300, 60, 0);
level2.add(light2);

light2 = new THREE.PointLight(0xFF0000, 0.8, 125);  
light2.castShadow = true;  
light2.position.set(50, 60, 200);
level2.add(light2);

light2 = new THREE.PointLight(0xFF0000, 0.8, 125);  
light2.castShadow = true;  
light2.position.set(200, 60, 200);
level2.add(light2);




//==========================================================================================================//
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

// const grid = new THREE. GridHelper(1000,20);
// level2.add(grid);

//==========================================================================================================//

//create the levels walls

const wallTexture = new THREE.TextureLoader().load('../images/level2/wall.png');

var gltfLoader2 = new THREE.GLTFLoader();

gltfLoader2.load('../models/level2/room/corridors.gltf', (gltf) => {
    var model = gltf.scene;
    model.traverse((o) => {
        if(o instanceof THREE.Mesh){
            o.material.map = wallTexture;
            o.receiveShadow = true;
        }
    });
    //model.rotation.x = -Math.PI / 2;
    model.position.x =  -300;
    model.position.y = -1;
    model.castShadow = true;
    model.receiveShadow = true;
    model.scale.set(100,100,100);
    level2.add(model);
});

//==========================================================================================================//



//ROOOOF
const roof = new THREE.TextureLoader().load( '../images/level2/wall.png' );
const roofMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000, 10, 10),
    new THREE.MeshStandardMaterial({    
        map : roof, side : THREE.DoubleSide
      }));
roofMesh.castShadow = false;
roofMesh.receiveShadow = true;
roofMesh.position.y = 80;
roofMesh.rotation.x = -Math.PI / 2;
level2.add(roofMesh);


//=========================================================================================================//
//create agents radius
const agentGeo = new THREE.SphereGeometry( 40, 32, 16 );
const agentMat1 = new THREE.MeshBasicMaterial( { color: 0xFF0000});
const agentMat2 = new THREE.MeshBasicMaterial( { color: 0x0000FF});
const agentMat3 = new THREE.MeshBasicMaterial( { color: 0xffff00});
const agentMat4 = new THREE.MeshBasicMaterial( { color: 0x00FF00});


const agent1 = new THREE.Mesh( agentGeo, agentMat1 );
agent1.position.y = 40 ;
level2.add( agent1 );

const agent2 = new THREE.Mesh( agentGeo, agentMat2 );
agent2.position.y = 40;
agent2.position.x = 25;  
agent2.position.z = -300;
level2.add( agent2 );

const agent3 = new THREE.Mesh( agentGeo, agentMat3 );
agent3.position.y = 40;
agent3.position.x = 300;  
agent3.position.z = -275;
level2.add( agent3 );

const agent4 = new THREE.Mesh( agentGeo, agentMat4 );
agent4.position.y = 40;
agent4.position.x = 275;  
agent4.position.z = 200;
level2.add( agent4 );

//========================================================================================================//
//animate agents radius
var A1prevZ = 0;
var A2prevX = 0;
var A3prevZ = 0;
var A4prevX = 0;
//boundaries of the balls
var ball1BB = new THREE.Sphere(agent1.position, 40);
var ball2BB = new THREE.Sphere(agent2.position, 40)
var ball3BB = new THREE.Sphere(agent3.position, 40)
var ball4BB = new THREE.Sphere(agent4.position, 40)


function animateAgents(){
    //AGENT 1
    if(agent1.position.z == 0){
        A1prevZ = 0;
        agent1.position.z -= 1;
    }
    if(agent1.position.z == -275){
        A1prevZ = -275;
        agent1.position.z += 1;
    }
    if(A1prevZ > agent1.position.z){
        A1prevZ -= 1;
        agent1.position.z -= 1;
    }
    if(A1prevZ < agent1.position.z){
        A1prevZ += 1;
        agent1.position.z += 1;
    }
    ball1BB = new THREE.Sphere(agent1.position, 40);
      //AGENT 2

    if(agent2.position.x == 25){
        A2prevX = 25;
        agent2.position.x += 1;
    }
    if(agent2.position.x == 275){
        A2prevX = 275;
        agent2.position.x -= 1;
    }
    if(A2prevX < agent2.position.x){
        A2prevX += 1;
        agent2.position.x += 1;
    }
    if(A2prevX > agent2.position.x){
        A2prevX -= 1;
        agent2.position.x -= 1;
        
    }
    ball2BB = new THREE.Sphere(agent2.position, 40);
    //AGENT 3
    if(agent3.position.z == -275){
        A3prevZ = -275;
        agent3.position.z += 1;
    }
    if(agent3.position.z == 175){
        A3prevZ = 175;
        agent3.position.z -= 1;
    }
    if(A3prevZ < agent3.position.z){
        A3prevZ += 1;
        agent3.position.z += 1;
    }
    if(A3prevZ > agent3.position.z){
        A3prevZ -= 1;
        agent3.position.z -= 1;
    }
    ball3BB = new THREE.Sphere(agent3.position, 40);

    //AGENT 4

    if(agent4.position.x == 275){
        A4prevX = 275;
        agent4.position.x -= 1;
    }
    if(agent4.position.x == 0){
        A4prevX = 0;
        agent4.position.x += 1;
    }
    if(A4prevX > agent4.position.x){
        A4prevX -= 1;
        agent4.position.x -= 1;
    }
    if(A4prevX < agent4.position.x){
        A4prevX += 1;
        agent4.position.x += 1;
        
    }
    ball4BB = new THREE.Sphere(agent4.position, 40);
    
}

//make agents invisibllie
// agent1.visible = false;
// agent2.visible = false;
// agent3.visible = false;
// agent4.visible = false;

//==========================================================================================================//
//load model

playerPos = new THREE.Vector3(-300,0,0);
const mLoader = new THREE.FBXLoader();
mLoader.setPath('../models/level2/Character/');
mLoader.load('ybot.fbx', (char) => {
    //fbx.scale.setScale(1);
    char.traverse(c => {
        if(c instanceof THREE.Mesh){
            // c.receiveShadow = true;
            c.castShadow = true;
        }
    });

    const anim = new THREE.FBXLoader();
    anim.setPath('../models/level2/Character/');
    anim.load('Walking.fbx', (anim) => {
        mixer2 = new THREE.AnimationMixer(char);
        mixer2.clipAction( anim.animations[ 0 ] ).setDuration( 1 ).play();

    const clip = anim.animations[0];
    const action = mixer2.clipAction( clip );
    action.clampWhenFinished = true;
    action.loop = THREE.LoopPingPong;
        
        //idle.play();
    });

    char.scale.set(0.25,0.25,0.25);
    char.position.set(playerPos.x,playerPos.y,playerPos.z );
    char.rotation.y = -30;
    char.castShadow = true;

    level2.add(char); 
});

//collision checking


function collisionCheck(){
    var playerChest = new THREE.Vector3;
    playerChest = camera2.clone();

    if(ball1BB.containsPoint(playerChest.position) || ball2BB.containsPoint(playerChest.position) || 
    ball3BB.containsPoint(playerChest.position) || ball4BB.containsPoint(playerChest.position)){
        console.log('dead');
    }
    // console.log( playerChest.position);
    
}

//end of level
let cube2BB = new THREE.Box3(new THREE.Vector3(-50,0,150), new THREE.Vector3(50,100,250));


function endLevel2(){
    var playerChest = new THREE.Vector3;
    playerChest = camera2.clone();
    if(cube2BB.containsPoint(playerChest.position)){
        return true;
        }
}

