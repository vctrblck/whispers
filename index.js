// index.js --- Game entry point
// Code:

function init() {
  // Add renderer to DOM
  document.getElementById('canvas').append(renderer.domElement);

  // Animate the scene recursively
  animateScene();
}

// Initialise game
init();

// index.js ends here
