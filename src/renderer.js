// renderer.js --- Whispers scene renderer

// Libraries:

// `three.js'

// Modules:

// None

// Code:

// Instantiate `three.js' renderer
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor('#EEEEEE', 1);
renderer.setSize(window.innerWidth, window.innerHeight);

var level1 = new THREE.Scene();

// Enable shadows
renderer.shadowMap.enabled = true;

// Use soft edges on the shadows
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// renderer.js ends here
