class Road{
  constructor(){
    this.pos = {x: 0, y: cnv.height-15};
    this.sprite = mapSpritesheet.get(repositoryArray[1])[0];
    this.move = 0;
    this.velocityX = 5;
    this.speed = 1;
    this.frame = 0;
  }
  draw(){
    this.frame++;
    if(!(this.frame%this.speed)) this.move+=this.velocityX;
    ctx.drawImage(this.sprite, this.pos.x-this.move, this.pos.y, this.sprite.width, this.sprite.height);
    ctx.drawImage(this.sprite, this.pos.x-this.move+this.sprite.width, this.pos.y, this.sprite.width, this.sprite.height);
    if(this.move>=this.sprite.width)this.move=0;
    if(this.frame>100)this.frame;
  }
}