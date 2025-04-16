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
  
    // Center sheep above shepherd for test, or random:
    sheep.style.left = Math.random() * (window.innerWidth - sheepWidth) + "px";
    sheep.style.top = sheepY + "px";
  
    const dropSheeps = setInterval(() => {
      sheepY += 5;
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

// Drop a sheep every 2 seconds
setInterval(dropSheep, 2000);

//Score Board
let score = 0;
const scoreDisplay = document.getElementById("score");
