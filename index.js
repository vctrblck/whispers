// index.js --- Game entry point
// Code:
function init() {
  // Add renderer to DOM
  document.getElementById('canvas').append(renderer.domElement);

  // Animate the scene recursively
  animateScene();

  window.addEventListener("mousedown",doMouse,false);
  window.addEventListener('keydown', (e) => onKeyDown(e), false);
  window.addEventListener('keyup', (e) => onKeyUp(e), false);
}

// Initialise game
init();

// index.js ends here
