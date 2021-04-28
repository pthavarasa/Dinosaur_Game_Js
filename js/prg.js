const cnv = document.getElementById('myCanvas');
const ctx = cnv.getContext('2d');

let isLoaded = false;
let play = false;
let score = 0;
let dino;
let road;
let obstacle;
let keyState = {};


window.addEventListener('keyup',(e) =>{
  keyState[e.keyCode || e.which] = false;
},true);
window.addEventListener('keydown',(e) => {
  keyState[e.keyCode || e.which] = true;
},true);


const update = () => {
  if(!play && keyState[32]){
    play = true;
    isLoaded = false; 
    keyState[32] = false;
  }
  if(!isLoaded && isSpriteSheetReady()){
    isLoaded = true;
    play = true;
    dino = new Dino();
    road = new Road();
    deco = new Decoration();
    obstacle = new Obstacle();
  }

  if(play && isLoaded){
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    road.draw();
    deco.draw();
    obstacle.draw();
    dino.draw();
    ctx.font = '20px serif';
    ctx.fillText(score++, cnv.width-100, 20);
    if(obstacle.collition(dino.getCoordination())){
      play = false;
      ctx.font = '20px serif';
      ctx.fillText("Game Over", cnv.width/2-50, 50);
      let repeatSprite = mapSpritesheet.get(repositoryArray[0])[6];
      ctx.drawImage(repeatSprite,
                    cnv.width/2-repeatSprite.width/2,
                    cnv.height/2-repeatSprite.height/2,
                    repeatSprite.width,
                    repeatSprite.height);
    }
  }
  requestAnimationFrame(update,30);
}
getAllSprite();
update();