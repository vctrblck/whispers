// Scene.js ---

// Modules:

//import * as THREE from './../../../lib/three.js';
import Plane from './Plane.js';

// Code:

class Scene extends THREE.Scene {
  constructor(renderer) {
    super();

    var scene = this;

    this.animationID = undefined; // Used to identify animation to begin/pause

    // Clock

    this.clock = new THREE.Clock();

    // Axes

    var axesSize = 20;
    var axes = new THREE.AxesHelper(axesSize);
    this.add(axes);

    // Plane

    //var planeDimensions = { width: 60, height: 40 };
    //var planePosition = { x: 0, y: 0, z: 0 };
    //var planeColour = '#CCCCCC';
    //var plane = new Plane(planeDimensions, planePosition, planeColour);
    //this.add(plane);

    // Forest

    var loader = new THREE.GLTFLoader();
    var forestSource = './assets/models/levels/3/forest/source/pine.glb';
    loader.load(forestSource, (gltf) => {
      gltf.scene.remove(gltf.scene.children[2]); // Remove sky dome

      console.log(gltf);
      var forest1 = gltf.scene.clone();
      var forest2 = gltf.scene.clone();
      var forest3 = gltf.scene.clone();
      var forest4 = gltf.scene.clone();

      forest1.position.set(-27.15, 0, 27.15);
      forest2.position.set(-27.15, 0, -27.15);
      forest3.position.set(27.15, 0, -27.15);
      forest4.position.set(27.15, 0, 27.15);

      forest3.rotation.y = Math.PI;
      forest4.rotation.y = Math.PI;

      scene.add(forest1);
      scene.add(forest2);
      scene.add(forest3);
      scene.add(forest4);
    });

    // Cabin

    var cabinSource = './assets/models/levels/3/cabin/scene.gltf';
    loader.load(cabinSource, (gltf) => {
      console.log(gltf);

      var cabin = gltf.scene;
      cabin.scale.set(0.01, 0.01, 0.01);

      scene.add(gltf.scene);
    });

    // Sky Box

    loader = new THREE.CubeTextureLoader();
    var skyTexture = loader.load([
      './assets/images/levels/3/sky/skybox_front.png',
      './assets/images/levels/3/sky/skybox_back.png',
      './assets/images/levels/3/sky/skybox_up.png',
      './assets/images/levels/3/sky/skybox_down.png',
      './assets/images/levels/3/sky/skybox_right.png',
      './assets/images/levels/3/sky/skybox_left.png',
    ]);
    this.background = skyTexture;

    // Ambient Light

    var ambientLightColour = '#0C0C0C';
    var ambientLight = new THREE.AmbientLight(ambientLightColour);
    this.add(ambientLight);

    // Moon Light

    var moonlightColour = '#FFFFFF';
    var moonlight = new THREE.PointLight(moonlightColour);
    moonlight.position.set(20, 60, 20);
    scene.add(moonlight);

    // Camera

    var fieldOfView = 45;
    var aspect = window.innerWidth / window.innerHeight;
    var near = 0.1;
    var far = 1000;
    this.camera = new THREE.PerspectiveCamera(fieldOfView, aspect, near, far);
    this.camera.position.x = -30;
    this.camera.position.y = 40;
    this.camera.position.z = 30;
    //this.camera.lookAt(this.position);

    // Orbital Controls

    this.controls = new THREE.OrbitControls(this.camera, renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.minDistance = 5;
    //this.controls.maxDistance = 15;
    this.controls.enablePan = false;
    //this.controls.maxPolarAngle = Math.PI / 2 - 0.05;
    var delta = this.clock.getDelta();
    this.controls.update(delta);

    // First Person Controls

    /*this.controls = new THREE.FirstPersonControls(
      this.camera,
      renderer.domElement
    );
    this.controls.lookSpeed = 0.05;
    this.controls.movementSpeed = 5;*/

    // Animate scene

    var scene = this;
    this.animate = function () {
      scene.controls.update(scene.clock.getDelta());

      renderer.render(scene, scene.camera);
      // Increment frames
      scene.animationID = requestAnimationFrame(scene.animate);
    };

    // Pause scene
    this.pause = function () {
      cancelAnimationFrame(this.animationID);

      this.animationID = undefined;
    };
  }
}

export default Scene;

// Scene.js ends here
