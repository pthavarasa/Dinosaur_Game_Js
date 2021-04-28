class Dino{
  constructor(){
    this.pos = {x: 20, y: cnv.height};
    this.spriteIndex = 0;
    this.speed = 5;
    this.frame = 0;
    this.sprite = [mapSpritesheet.get(repositoryArray[0])[0],
                   mapSpritesheet.get(repositoryArray[0])[1],
                   mapSpritesheet.get(repositoryArray[0])[2],
                   mapSpritesheet.get(repositoryArray[0])[3],
                   mapSpritesheet.get(repositoryArray[0])[4],
                   mapSpritesheet.get(repositoryArray[0])[5]];
    this.animeId = "run";
    this.currentAnime;
    this.anime = {
      "run" : [0, 1, 2],
      "stand" : [0],
      "bend" : [4, 5],
      "death" : [3]
    };
    this.run = [0, 1, 2];

    this.velocityY = 0.0;
    this.gravity = 0.5;
    this.onGround = false;
  }

  getCoordination(){
    return {x: this.pos.x,
            y: this.pos.y-this.sprite[this.currentAnime].height,
            w: this.sprite[this.currentAnime].width,
            h: this.sprite[this.currentAnime].height};
  }

  startJump(){
    if(this.onGround){
      this.velocityY = -10.0;
      this.onGround = false;
    }
  }


  jump(){
    if(keyState[38] || keyState[32])this.startJump();
    if(keyState[40])this.gravity = 1; else this.gravity = 0.5;
    if(this.onGround)this.gravity = 0.5;
    this.velocityY += this.gravity;
    this.pos.y += this.velocityY;
    
    if(this.pos.y > 150.0){
      this.pos.y = 150.0;
      this.velocityY = 0.0;
      this.onGround = true;
    }
  }

  draw(){
    this.jump();
    this.frame++;
    if(!(this.frame%this.speed)) this.spriteIndex++;

    if(keyState[40] && this.onGround) this.animeId = "bend"; 
    else if(!this.onGround) this.animeId = "stand"; 
    else this.animeId = "run";
    this.currentAnime = this.anime[this.animeId][this.spriteIndex%this.anime[this.animeId].length];
    ctx.drawImage(this.sprite[this.currentAnime], 
                  this.pos.x, 
                  this.pos.y-this.sprite[this.currentAnime].height, 
                  this.sprite[this.currentAnime].width,
                  this.sprite[this.currentAnime].height);
    if(this.frame>100)this.frame;
    if(this.spriteIndex>100)this.spriteIndex = 0;
  }
}