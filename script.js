//Shepard
const shepard = document.getElementById("main-character");
const mainCharacter = {
    positionX: 0,
    positionY: 0,
};
document.addEventListener('keydown', (e) => {
    console.log('user pressed a key');

    if (e.code === 'ArrowUp') {
      mainCharacter.positionY++;
      shepard.style.bottom = `${mainCharacter.positionY}vh`;
    } else if (e.code === 'ArrowDown') {
        mainCharacter.positionY--;
        shepard.style.bottom = `${mainCharacter.positionY}vh`;
    } else if (e.code === 'ArrowLeft') {
        mainCharacter.positionX--;
        shepard.style.left = `${mainCharacter.positionX}vw`;
    } else if (e.code === 'ArrowRight') {
        mainCharacter.positionX++;
        shepard.style.left = `${mainCharacter.positionX}vw`;
    }
  });
  
  // Sheep
  const sheep = document.getElementById("sheep");
  console.log("Found sheep:", sheep);

  let sheepPositionY = -200;

  const dropSheep = setInterval(() => {
    sheepPositionY += 5; //increase the sheeps position Y by 5px
    sheep.style.top = sheepPositionY + "px";
  // Stop dropping at a certain px
  if (sheepPositionY >= 1000) {
   clearInterval(dropSheep);
  }
}, 30); //every 30 milliseconds