class Enemy {
    constructor() {
      this.frameX = 0;
      // this.frameY = 1;
      this.fps = 20;
      this.frameInterval = 1000/this.fps;
      this.frameTimer = 0;
      this.markedForDeletion = false;
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
        } else {
            this.frameTimer += deltaTime;
        }
        // Change image left right
        // reomved bug image size pixel x_x
        //if (this.x < playerX) this.image = Toa_run;
        //else this.image = Toa_run_left;

        // Check if off screen 
        if ((this.x > playerX + 500 ||
            this.x < playerX - 500) || 
            (this.y > playerY + 500 ||
            this.y < playerY - 500)) {
                this.markedForDeletion = true;
        }
    }
    draw(context){
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height)
        }
        context.drawImage(this.image, this.frameX * this.width2 + 8, 0, 25, this.height2, this.x, this.y, this.width, this.height);
    }
}
  
const enemies = [];

export class ToaEnemy extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 25 * 2.5;
        this.width2 = 848/8; //not the width of charac, but larger due to error sprite sheet
        this.height = 22 * 2.5;
        this.height2 = 22;
        this.radius = 300; // zone de pop
        this.angle = Math.random() * 2 * Math.PI;
        this.x = this.game.player.x + Math.cos(this.angle) * this.radius;
        this.y = this.game.player.y + Math.sin(this.angle) * this.radius;
        this.MaxFrame = 7;
        this.speed = 2;
        this.image = Toa_run;
    }
    update(deltaTime, playerX, playerY){
        super.update(deltaTime, playerX, playerY);
    }
}