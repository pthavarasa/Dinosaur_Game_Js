class Obstacle{
  constructor(){
    this.obstacle = [];
    this.cloudCount = 2;
    this.sprite = mapSpritesheet.get(repositoryArray[0]);
    this.spriteid = 0;
    this.spritesid = [9, 10, 11, 12, 13, 14];
    this.create();
    this.speed = 1;
    this.frame = 0;
    this.velocityX = 5;
  }

  pixelCollision(obs, dino, objpos, dinopos){

    //console.log(obs.getContext('2d').getImageData(0, 0, obs.width, obs.height));
  }

  rectCollision(r1, r2){
    return (r1.x <= r2.x + r2.w &&
            r1.x + r1.w >= r2.x &&
            r1.y <= r2.y + r2.h &&
            r1.h + r1.y >= r2.y);
  }

  collition(dino){
    for(let i = 0; i < this.obstacle.length; i++){
      let obs = {
        x: this.obstacle[i].pos.x, 
        y: this.obstacle[i].pos.y - this.obstacle[i].sprite.height,
        w: this.obstacle[i].sprite.width,
        h: this.obstacle[i].sprite.height
      }
      if(this.rectCollision(dino, obs)){
        return 1;
      }
    }
    return 0;
  }
  create(){
    if(this.cloudCount > this.obstacle.length){
    this.obstacle.push({
      pos: {
        x: cnv.width, 
        y: cnv.height
      }, 
      sprite: 
        this.sprite[this.spritesid[this.spriteid]]
      });
      this.spriteid++;
      if(this.spriteid > this.spritesid.length-1)this.spriteid = 0;
    }
  }
  posUpdate(){
    this.frame++;
    if(!(this.frame%this.speed)) this.move+=this.velocityX;
    for(let i = 0; i < this.obstacle.length; i++){
      this.obstacle[i].pos.x -= this.velocityX;
    }
    this.obstacle = this.obstacle.filter(cloud => cloud.pos.x > - cloud.sprite.width);
    if(this.frame>600)this.frame = 0;
    if(!(this.frame%60))this.create();
  }
  draw(){
    this.posUpdate();
    this.obstacle.forEach(cloud => {
      ctx.drawImage(cloud.sprite, 
        cloud.pos.x, 
        cloud.pos.y - cloud.sprite.height,
        cloud.sprite.width,
        cloud.sprite.height);
    });
  }
}