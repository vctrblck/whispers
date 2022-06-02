// game.js --- Game state management

// Libraries:

// `three.js'

// Modules:

// None

// Code:

// ========================================================================== /
// Game State                                                                 /
// ========================================================================== /

var gameActive = false;
var gameOver = false;
var currentLevel = null;
var prevTime = Date.now();
var prevTime2 = Date.now();
var prevTime3 = Date.now();

startCam3 = true;

// ========================================================================== /
// Level Manangement                                                          /
// ========================================================================== /

var scene = new THREE.Scene(); // Default `three.js' scene

var axes = new THREE.AxesHelper(100); // Default `three.js' scene axes
scene.add(axes);

function animateScene() {
  if (!gameOver) {
    if (gameActive) {
      // Active game state

      if (currentLevel == 1) {
        //Level 1

        document.title = 'Whispers - Level 1';

        const time = Date.now();
        mixer1.update((time - prevTime) * 0.001);
        prevTime = time;
        checkpoint1();
        if (endLevel1()) {
          currentLevel = 2;
        }
        cam1Limits();
        camera1.position.y = 75;
        controls1.update(0.00015);
        renderer.render(level1, camera1);
      } else if (currentLevel === 2) {
        // ================================================================== /
        // Level 2                                                            /
        // ================================================================== /

        document.title = 'Whispers - Level 2';

        const time2 = Date.now();
        mixer2.update((time2 - prevTime2) * 0.001);
        prevTime2 = time2;
        animateAgents();
        collisionCheck();
        if (endLevel2()) {
          currentLevel = 1;
        }
        cam2Limits();
        camera2.position.y = 45;
        controls2.update(0.00015);

        renderer.render(level2, camera2);
      } else if (currentLevel === 3) {
        // ================================================================== /
        // Level 3                                                            /
        // ================================================================== /

        document.title = 'Whispers - Level 3';

        if (startCam3) {
          cam3();
          startCam3 = false;
        }

        const time3 = Date.now();
        prevTime3 = time3;
        getKey();

        tiempoI = Date.now() - 25;
        vel = 50;

        if (controls3.isLocked === true) {
          tiempoF = Date.now();

          delta = (tiempoF - tiempoI) / 1000;

          let xDis = xdir * vel * delta;
          let zDis = zdir * vel * delta;

          controls3.moveRight(xDis);
          controls3.moveForward(zDis);
          tiempoI = tiempoF;
        }

        renderer.render(level3, camera3);
      } else {
        // ================================================================== /
        // Default                                                            /
        // ================================================================== /

        renderer.render(scene, camera);
      }

      requestAnimationFrame(animateScene);
    } else {
      // Paused game state
    }
  } else {
    // Game over state
    // TODO
  }
}

// game.js ends here
