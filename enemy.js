class Enemy {
    constructor() {
      this.frameX = 1;
      // this.frameY = 1;
      this.fps = 20;
      this.frameInterval = 1000/this.fps;
      this.frameTimer = 0;
    }
    update(deltaTime, playerX, playerY){
        // movement
        // Calculate angle between enemy and player
        let angle = Math.atan2(playerY - this.y, playerX - this.x);

        // Use cosine and tangent to calculate new x and y positions
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;

        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.MaxFrame) this.frameX++;
            else this.frameX = 1;
        } else { h
            this.frameTimer += deltaTime;
        }
        // Change image left right
        if (this.x < playerX) this.image = Toa_run_left;
        else this.image = Toa_run;
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width* 3, this.height * 3)
    }
}
  
const enemies = [];

export class ToaEnemy extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 848/8;
        this.height = 22;
        this.x = 50; //Math.floor(Math.random() * 200);
        this.y = 100; //Math.floor(Math.random() * 200);
        this.MaxFrame = 7;
        this.speed = 2;
        this.image = Toa_run;
    }
    update(deltaTime, playerX, playerY){
        super.update(deltaTime, playerX, playerY);
    }
}