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

var light2_1 = new THREE.HemisphereLight( 0xbbbbff, 0x444422 );
light2_1.position.set( 0, 1, 0 );
level2.add( light2_1 );

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

const grid = new THREE. GridHelper(1000,20);
level2.add(grid);

//==========================================================================================================//

//create the levels walls

const wallTexture = new THREE.TextureLoader().load('../images/level2/wall.png');

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
    //level2.add(model);
});

//==========================================================================================================//

//load model

//const gltfLoader12 = new THREE.GLTFLoader();


/*const mLoader = new THREE.FBXLoader();
mLoader.setPath('../models/level2/Character/');
mLoader.load('ybot.fbx', (char) => {
    //fbx.scale.setScale(1);
    char.traverse(c => {
        c.castShadow = true;
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
        
        idle.play();
    });
    char.scale.set(0.25,0.25,0.25);
    char.position.x = -300;
    char.rotation.y = (-30);*/

const mLoader = new THREE.FBXLoader();
mLoader.setPath('../models/level2/Character/');
mLoader.load('Ch32_nonPBR.fbx', (char) => {
    //fbx.scale.setScale(1);
    char.traverse(c => {
        c.castShadow = true;
    });
    
    const anim = new THREE.FBXLoader();
    anim.setPath('../models/level2/Character/');
    anim.load('Strut Walking.fbx', (anim) => {
        mixer2 = new THREE.AnimationMixer(char);
        mixer2.clipAction( anim.animations[ 0 ] ).setDuration( 1 ).play();
    
    const clip = anim.animations[0];
    const action = mixer2.clipAction( clip );
    action.clampWhenFinished = true;
    action.loop = THREE.LoopPingPong;
            
        idle.play();
    });
    char.scale.set(0.25,0.25,0.25);
    char.position.x = -100;
    char.rotation.y = (-30);
    

    level2.add(char); 
});

//==========================================================================================================//



//ROOOOF
// const roof = new THREE.TextureLoader().load( '../images/level2/wall.png' );
// const roofMesh = new THREE.Mesh(
//     new THREE.PlaneGeometry(1000, 1000, 10, 10),
//     new THREE.MeshStandardMaterial({    
//         map : roof, side : THREE.DoubleSide
//       }));
// roofMesh.castShadow = false;
// roofMesh.receiveShadow = true;
// roofMesh.position.y = 80;
// roofMesh.rotation.x = -Math.PI / 2;
// level2.add(roofMesh);


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
agent3.position.z = -325;
level2.add( agent3 );

const agent4 = new THREE.Mesh( agentGeo, agentMat4 );
agent4.position.y = 40;
agent4.position.x = 275;  
agent4.position.z = 200;
level2.add( agent4 );

//========================================================================================================//
//animate agents
var A1prevZ = 0;
var A2prevX = 0;
var A3prevZ = 0;
var A4prevX = 0;


function animateAgents(){
    //AGENT 1
    if(agent1.position.z == 0){
        A1prevZ = 0;
        agent1.position.z -= 1;
    }
    if(agent1.position.z == -325){
        A1prevZ = -325;
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
    //AGENT 3
    if(agent3.position.z == -325){
        A3prevZ = -325;
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
    
}

