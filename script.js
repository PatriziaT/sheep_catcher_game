//Shepard
const shepard = document.getElementById("main-character");
const mainCharacter = {
    positionX: 0,
    positionX: -0,
};
document.addEventListener('keydown', (e) => {
    console.log('user pressed a key');

 if (e.code === 'ArrowLeft') {
        mainCharacter.positionX--;
        shepard.style.left = `${mainCharacter.positionX}vw`;
    } else if (e.code === 'ArrowRight') {
        mainCharacter.positionX++;
        shepard.style.left = `${mainCharacter.positionX}vw`;
    }
  });
  
  // Sheeps
  function dropSheeps() {
    const sheep = document.createElement("div"); //creates a div from memory
    sheep.classList.add("sheep");
    
    document.body.appendChild(sheep);

     //gets current position of both characters
    const sheepRect = sheep.getBoundingClientRect();
    const shepardRect = shepard.getBoundingClientRect();

    // isCaught = () checks logic if two rectangles overlap
    const isCaught = !(
        sheepRect.bottom < shepardRect.top ||
        sheepRect.top > shepardRect.bottom ||
        sheepRect.left < shepardRect.right ||
        sheepRect.right > shepardRect.left
    );

    if (isCaught) {
        clearInterval(dropASheep) //stop the sheep from falling
        sheep.remove(); //removes sheep from screen
        console.log("Caught a sheep!");
    }


    sheep.style.top = "-300px"; //starts avobe the visible screen
    sheep.style.left = Math.random() * window.innerWidth + "px"; //random sheep position, converts into px

    
    let sheepPositionY = -300;

    const dropASheep = setInterval(() => {
        sheepPositionY +=5;
        sheep.style.top = sheepPositionY + "px";

        if(sheepPositionY > window.innerHeight) {
            clearInterval(dropASheep);
            sheep.remove();
        }
    }, 30);
}
setInterval(dropSheeps, 2000); //drops a sheep every 2 seconds