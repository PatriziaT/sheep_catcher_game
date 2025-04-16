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
startSheepInterval();

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
    document.body.appendChild(sheep);
  
    let sheepY = -100;
    const shepherdRect = shepherd.getBoundingClientRect();
    const sheepWidth = 100;
  
    // Drop sheep in a limited horizontal zone (avoid edges)
    const minDropX = window.innerWidth * 0.15;
    const maxDropX = window.innerWidth * 0.85;
    const randomX = minDropX + Math.random() * (maxDropX - minDropX);

    sheep.style.left = randomX + "px";
    sheep.style.top = sheepY + "px";
  
    const dropSheeps = setInterval(() => {
      sheepY += 2;
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
  
      if (sheepY > window.innerHeight) {
        clearInterval(dropSheeps);
        sheep.remove();
        missed++;
        console.log("Sheep missed!");

        if(missed >= 5) {
            playerDead(); //Call your "kill" logic
        }
      }
    }, 30);
  }

//############## STOP DROPPING SHEEPS  ############## 
 

// Stop dropping sheep
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
    startSheepInterval();
  }
});

//############## SCORE ############## 

// Score Board
let score = 0;
let missed = 0;
const scoreDisplay = document.getElementById("score");

//############## GAME OVER ############## 

// Player Dead
function playerDead() {
  stopSheepInterval();
  document.removeEventListener("keydown", moveShepherd);
  shepherd.classList.add("shepherd-dead");

  // Remove all sheeps
  document.querySelectorAll(".sheep").forEach(sheep => sheep.remove());

  // Immediately show Play Again button (no alert)
  document.getElementById("play-again").style.display = "block";
}

function showGameOverMessage(message, callback) {
  const alertBox = document.createElement("div");
  alertBox.textContent = message;
  alertBox.className = "game-over-alert";
  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.remove();
    if (callback) callback();  // call this after alert is gone
  }, 3000);
}

// Restart Game when clicking the button
  document.getElementById("play-again").addEventListener("click", () => {
  console.log("restarting....");

  // Reset score and missed
  score = 0;
  missed = 0;
  scoreDisplay.textContent = score;

  // Remove shepherd-dead styles
  shepherd.classList.remove("shepherd-dead");

  // Hide play again button
  document.getElementById("play-again").style.display = "none";

  // Re-enable movement
  document.addEventListener("keydown", moveShepherd);

  // Remove left-over sheeps on screen
  document.querySelectorAll(".sheep").forEach(sheep => sheep.remove());

  // Start sheep dropping again
  startSheepInterval();
});