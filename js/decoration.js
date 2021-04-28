class Decoration{
  constructor(){
    this.clouds = [];
    this.cloudCount = 3;
    this.sprite = mapSpritesheet.get(repositoryArray[0])[15];
    this.create();
    this.speed = 1;
    this.frame = 0;
    this.velocityX = 3;
  }
  create(){
    if(this.cloudCount > this.clouds.length)
    this.clouds.push({
      pos: {
        x: cnv.width, 
        y: Math.floor(Math.random() * cnv.height/3)
      }, 
      sprite: 
        this.sprite
      });
  }
  posUpdate(){
    this.frame++;
    if(!(this.frame%this.speed)) this.move+=this.velocityX;
    for(let i = 0; i < this.clouds.length; i++){
      this.clouds[i].pos.x -= this.velocityX;
    }
    this.clouds = this.clouds.filter(cloud => cloud.pos.x > - cloud.sprite.width);
    if(this.frame>100)this.frame = 0;
    if(!(this.frame%50))this.create();
  }
  draw(){
    this.posUpdate();
    this.clouds.forEach(cloud => {
      ctx.drawImage(cloud.sprite, 
        cloud.pos.x, 
        cloud.pos.y,
        cloud.sprite.width,
        cloud.sprite.height);
    });
  }
}