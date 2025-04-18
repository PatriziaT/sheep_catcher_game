//############## GAME ENVIORNMENT ############## 
const gameArea = document.getElementById("game-area");

//############## SHEPHERD ############## 
const shepherd = document.querySelector("#main-character"); 
let shepherdX = window.innerWidth / 2 - 50; // center minus half width

// Shepherd movement (left/right arrow keys)
document.addEventListener("keydown", moveShepherd);

function moveShepherd(e) {
  if (e.code === "ArrowLeft") {
    shepherdX -= 10;
  } else if (e.code === "ArrowRight") {
    shepherdX += 10;
  }

  // Keep shepherd within screen bounds
  shepherdX = Math.max(0, Math.min(shepherdX, window.innerWidth - shepherd.offsetWidth));
  shepherd.style.left = shepherdX + "px";
}

//############## START SHEEP INTERVAL ON LOAD  ############## 

let activeSheepInterval = [];
let sheepDropInterval = null;

// Start dropping sheep
function startSheepInterval() {
  if (!sheepDropInterval) {
    sheepDropInterval = setInterval(dropSheep, 2000);
  }
}

// Drop sheep function
function dropSheep() {
  const sheep = document.createElement("div");
  sheep.classList.add("sheep");
  gameArea.appendChild(sheep);

  let sheepY = -100;
  const shepherdRect = shepherd.getBoundingClientRect();
  const sheepWidth = 100;

  // Drop sheep in a limited horizontal zone (avoid edges)
  const minDropX = window.innerWidth * 0.3;
  const maxDropX = window.innerWidth * 0.7;
  const randomX = minDropX + Math.random() * (maxDropX - minDropX);

  sheep.style.left = randomX + "px";
  sheep.style.top = sheepY + "px";

  const speed = Math.random() * 1.5 + 1.5; // random speek of sheeps
  const dropSheeps = setInterval(() => {
    sheepY += speed;
    sheep.style.top = sheepY + "px";

    activeSheepInterval.push(dropSheeps);

    const sheepRect = sheep.getBoundingClientRect();
    const updatedShepherdRect = shepherd.getBoundingClientRect();

    const isCaught =
      sheepRect.bottom >= updatedShepherdRect.top &&
      sheepRect.top <= updatedShepherdRect.bottom &&
      sheepRect.left <= updatedShepherdRect.right &&
      sheepRect.right >= updatedShepherdRect.left;

    if (isCaught) {
      clearInterval(dropSheeps);
      sheep.remove();
      score++;
      scoreDisplay.textContent = score;
      console.log("Sheep caught!");
      return;
    }

    if (sheepY > gameArea.offsetHeight) {
      clearInterval(dropSheeps);
      sheep.remove();
      missed++;
      console.log("Sheep missed!");
      missedDisplay.textContent = missed;

      if (missed >= 5) {
        playerDead(); //Call your "kill" logic
      }
    }
  }, 30);
}

//############## STOP DROPPING SHEEPS  ############## 

function stopSheepInterval() {
  if (sheepDropInterval) {
    clearInterval(sheepDropInterval);
    sheepDropInterval = null;
  }
  activeSheepInterval.forEach(interval => clearInterval(interval));
  activeSheepInterval = [];
}

// Pause/resume based on tab visibility
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopSheepInterval();
  } else {
    if (gameStarted) startSheepInterval();
  }
});

//############## SCORE ############## 

let score = 0;
let missed = 0;
const scoreDisplay = document.getElementById("score");
const missedDisplay = document.getElementById("missed");

//############## GAME OVER ############## 

function playerDead() {
  stopSheepInterval();
  document.removeEventListener("keydown", moveShepherd);
  shepherd.classList.add("shepherd-dead");

  document.querySelectorAll(".sheep").forEach(sheep => sheep.remove());

  gameButton.style.display = "block"; // Show Play Again button
  gameButton.textContent = "Play Again";
}

function GameOverMessage(message, callback) {
  const alertBox = document.createElement("div");
  alertBox.textContent = message;
  alertBox.className = "game-over-alert";
  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.remove();
    if (callback) callback();
  }, 3000);
}

//############## GAME START BUTTON ############## 

const gameButton = document.getElementById("game-button");
let gameStarted = false;

gameButton.addEventListener("click", () => {
  if (!gameStarted) {
    console.log("Game starting...");
    gameStarted = true;
  } else {
    console.log("Restarting game...");
  }

  // Reset everything
  score = 0;
  missed = 0;
  scoreDisplay.textContent = score;
  missedDisplay.textContent = missed;

  // Reset shepherd to center
  shepherdX = window.innerWidth / 2 - 50;
  shepherd.style.left = shepherdX + "px";

  shepherd.classList.remove("shepherd-dead");
  gameButton.style.display = "none";
  document.getElementById("main-character").classList.remove("hidden");
  document.addEventListener("keydown", moveShepherd);
  document.querySelectorAll(".sheep").forEach(sheep => sheep.remove());
  startSheepInterval();
  dropSheep();
});