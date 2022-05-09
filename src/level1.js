//Setting the light for my level

let light1 = new THREE.DirectionalLight(0xFFFFFF, 1.0);
light1.position.set(0, 100, 10);
light1.target.position.set(0, 0, 0);
light1.castShadow = true;
light1.shadow.bias = -0.001;
light1.shadow.mapSize.width = 2048;
light1.shadow.mapSize.height = 2048;
light1.shadow.camera.near = 0.1;
light1.shadow.camera.far = 500.0;
light1.shadow.camera.near = 0.5;
light1.shadow.camera.far = 500.0;
light1.shadow.camera.left = 100;
light1.shadow.camera.right = -100;
light1.shadow.camera.top = 100;
light1.shadow.camera.bottom = -100;
level1.add(light1);

let light12 = new THREE.AmbientLight(0x101010);
level1.add(light12);

var light13 = new THREE.HemisphereLight( 0xbbbbff, 0x444422 );
light13.position.set( 0, 1, 0 );
level1.add( light13 );

//creating the skybox

const loader1 = new THREE.CubeTextureLoader();
const texture1 = loader1.load([
    '../images/level2/lvl2Skybox/1.png',
    '../images/level2/lvl2Skybox/2.png',
    '../images/level2/lvl2Skybox/3.png',
    '../images/level2/lvl2Skybox/4.png',
    '../images/level2/lvl2Skybox/5.png',
    '../images/level2/lvl2Skybox/6.png' 
]);
level1.background = texture1;

//add texture to plane and place it in world

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000, 10, 10),
    new THREE.MeshStandardMaterial({
        color : 0xFFFFFF, side : THREE.DoubleSide
      }));
plane.castShadow = false;
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
level1.add(plane);

//pip 
const gltfLoader11 = new THREE.GLTFLoader();
gltfLoader11.load( '../models/level1/RobotExpressive/RobotExpressive.glb', function ( gltf ) {
    pip = gltf.scene.children[0];
    pip.scale.set( 10, 10, 10);
    pip.position.set(0, 0, 0);
    level1.add( pip );
    mixer12 = new THREE.AnimationMixer(pip);
    mixer12.clipAction(gltf.animations[2]).setDuration( 2 ).play();

    actions = {};
    for ( let i = 0; i < gltf.animations.length; i ++ ) {
        const clip = gltf.animations[ i ];
        const action = mixer12.clipAction( clip );
        actions[ clip.name ] = action;
    }
    previousAction = actions[states[0]];
    activeAction = actions[states[0]];

    // const params = {
    //     target: gltf,
    //     camera: camera1,
    //   }
      //pip.controls = new BasicCharacterControls(params);
}, undefined, function ( e ) {
    console.error( e );
} );

//====================================================================================================

class BasicCharacterControls {
    constructor(params) {
      this._Init(params);
    }
  
    _Init(params) {
      this._params = params;
      this._move = {
        forward: false,
        backward: false,
        left: false,
        right: false,
      };
      this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
      this._acceleration = new THREE.Vector3(1, 0.25, 50.0);
      this._velocity = new THREE.Vector3(0, 0, 0);
  
      document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
      document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
    }
  
    _onKeyDown(event) {
      switch (event.keyCode) {
        case 87: // w
          this._move.forward = true;
          break;
        case 65: // a
          this._move.left = true;
          break;
        case 83: // s
          this._move.backward = true;
          break;
        case 68: // d
          this._move.right = true;
          break;
        case 38: // up
        case 37: // left
        case 40: // down
        case 39: // right
          break;
      }
    }
  
    _onKeyUp(event) {
      switch(event.keyCode) {
        case 87: // w
          this._move.forward = false;
          break;
        case 65: // a
          this._move.left = false;
          break;
        case 83: // s
          this._move.backward = false;
          break;
        case 68: // d
          this._move.right = false;
          break;
        case 38: // up
        case 37: // left
        case 40: // down
        case 39: // right
          break;
      }
    }
  
    Update(timeInSeconds) {
      const velocity = this._velocity;
      const frameDecceleration = new THREE.Vector3(
          velocity.x * this._decceleration.x,
          velocity.y * this._decceleration.y,
          velocity.z * this._decceleration.z
      );
      frameDecceleration.multiplyScalar(timeInSeconds);
      frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
          Math.abs(frameDecceleration.z), Math.abs(velocity.z));
  
      velocity.add(frameDecceleration);
  
      const controlObject = this._params.target;
      const _Q = new THREE.Quaternion();
      const _A = new THREE.Vector3();
      const _R = controlObject.quaternion.clone();
  
      if (this._move.forward) {
        velocity.z += this._acceleration.z * timeInSeconds;
      }
      if (this._move.backward) {
        velocity.z -= this._acceleration.z * timeInSeconds;
      }
      if (this._move.left) {
        _A.set(0, 1, 0);
        _Q.setFromAxisAngle(_A, Math.PI * timeInSeconds * this._acceleration.y);
        _R.multiply(_Q);
      }
      if (this._move.right) {
        _A.set(0, 1, 0);
        _Q.setFromAxisAngle(_A, -Math.PI * timeInSeconds * this._acceleration.y);
        _R.multiply(_Q);
      }
  
      controlObject.quaternion.copy(_R);
  
      const oldPosition = new THREE.Vector3();
      oldPosition.copy(controlObject.position);
  
      const forward = new THREE.Vector3(0, 0, 1);
      forward.applyQuaternion(controlObject.quaternion);
      forward.normalize();
  
      const sideways = new THREE.Vector3(1, 0, 0);
      sideways.applyQuaternion(controlObject.quaternion);
      sideways.normalize();
  
      sideways.multiplyScalar(velocity.x * timeInSeconds);
      forward.multiplyScalar(velocity.z * timeInSeconds);
  
      controlObject.position.add(forward);
      controlObject.position.add(sideways);
  
      oldPosition.copy(controlObject.position);
    }
  }