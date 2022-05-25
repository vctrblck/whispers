// pager.js --- Menu/Page manager

// Libraries:

// None

// Modules:

// None

// Code:

// ========================================================================== /
// Pages                                                                      /
// ========================================================================== /

let HomePage = document.getElementById('home');
let GamePage = document.getElementById('game');
let PausePage = document.getElementById('pause');
// let InventoryPage = document.getElementById('inventory');
let OverPage = document.getElementById('over');

// ========================================================================== /
// Buttons                                                                    /
// ========================================================================== /

let startGameButton = document.getElementById('startGameButton');
// let settingsButton = document.getElementById('settingsButton');
let resumeGameButton = document.getElementById('resumeGameButton');
// let inventoryButton = document.getElementById('inventoryButton');
// let optionsButton = document.getElementById('optionsButton');
let quitGameButton = document.getElementById('quitGameButton');

// ========================================================================== /
// Initial States                                                             /
// ========================================================================== /

// Default HomePage initial state is correct
GamePage.style.display = 'none';
PausePage.style.display = 'none';
// InventoryPage.style.display = 'none';
OverPage.style.display = 'none';

// ========================================================================== /
// Page Event Handlers                                                        /
// ========================================================================== /

function startGame(event) {
  event.preventDefault();

  GamePage.style.display = 'block'; // Display game page
  HomePage.style.display = 'none'; // Remove home page

  // Start game
  gameActive = true;
  currentLevel = 1;
  init();
}

function pauseGame() {
  PausePage.style.display = 'grid'; // Display pause page
  GamePage.style.display = 'none'; // Remove game page

  // TODO: Pause game
  gameActive = false;
}

function resumeGame(event) {
  event.preventDefault();

  GamePage.style.display = 'block'; // Display game page
  PausePage.style.display = 'none'; // Remove pause page

  // TODO: Resume game
}

function quitGame(event) {
  event.preventDefault();

  HomePage.style.display = 'grid'; // Display home page
  PausePage.style.display = 'none'; // Remove pause page

  // TODO: Quit game
}

function endGame() {
  OverPage.style.display = 'grid'; // Display game over page
  GamePage.style.display = 'none'; // Remove game page

  setTimeout(function () {
    HomePage.style.display = 'grid'; // Display home page
    OverPage.style.display = 'none'; // Remove game over page
  }, 3000);
}

// ========================================================================== /
// Page Event Listeners                                                       /
// ========================================================================== /

startGameButton.addEventListener('click', startGame);
resumeGameButton.addEventListener('click', resumeGame);
quitGameButton.addEventListener('click', quitGame);

// pager.js ends here
