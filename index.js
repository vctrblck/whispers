// index.js --- Game entry point

// Libraries:

// `three.js'

// Modules:

// `src/scene.js';
// `src/renderer.js';

// Code:

// Intializes game
function init() {
  document.getElementById('game').append(renderer.domElement);

  animateScene(); // Animate the scene recursively
}

// index.js ends here
