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

// Enable shadows
renderer.shadowMap.enabled = true;

// Use soft edges on the shadows
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// renderer.js ends here
