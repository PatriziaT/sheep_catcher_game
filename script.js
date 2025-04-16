const shepherd = document.getElementById("main-character");
let shepherdX = window.innerWidth / 2 - 50; // center minus half width

// Shepherd movement (left/right arrow keys)
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") {
    shepherdX -= 10;
  } else if (e.code === "ArrowRight") {
    shepherdX += 10;
  }

  // Keep shepherd within screen bounds
  shepherdX = Math.max(0, Math.min(shepherdX, window.innerWidth - shepherd.offsetWidth));
  shepherd.style.left = shepherdX + "px";
});

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
        console.log("Sheep missed!");
      }
    }, 30);
  }

  
  let sheepDropInterval = null;

// Start dropping sheep
function startSheepInterval() {
  if (!sheepDropInterval) {
    sheepDropInterval = setInterval(dropSheep, 2000);
  }
}

// Stop dropping sheep
function stopSheepInterval() {
  if (sheepDropInterval) {
    clearInterval(sheepDropInterval);
    sheepDropInterval = null;
  }
}

// Start once on load
startSheepInterval();

// Pause/resume based on tab visibility
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopSheepInterval();
  } else {
    startSheepInterval();
  }
});

// Score Board
let score = 0;
const scoreDisplay = document.getElementById("score");