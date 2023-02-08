import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { ToaEnemy } from "./enemy.js";
//import array enemies ?
window.addEventListener('load', function(){
    const canvas = canvas1;
    const ctx = canvas.getContext('2d');
    canvas.width = 1050;
    canvas.height = 1050;

    class Game {
        constructor(width, height){
            this.cameraX = 0;
            this.cameraY = 0;
            // this.groundmargin
            this.width = width;
            this.height = height;
            this.background = new Background(this);
            this.player = new Player(this); //initialization of player
            this.input = new InputHandler(this);
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 2000;
            this.debug = true;
        }
        update(deltaTime){
            this.background.update(this.player.x, this.player.y)
            this.player.update(this.input.keys, deltaTime);
            // set the camera position to player's position
            this.cameraX = this.player.x - canvas.width/2 + this.player.width/2;
            this.cameraY = this.player.y - canvas.height/2 + this.player.height/2;
            // Handle Enemies!
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime, this.player.x, this.player.y);
                if (enemy.markedForDeletion) {
                    this.enemies.splice(this.enemies.indexOf(enemy), 1);
                }
            });

        }
        draw(context){
            context.save(); 
            //not sur if save.restore change something .
            // subtract the camera's position from player's pos 
            context.translate(-this.cameraX, -this.cameraY);
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            context.fillStyle = "red";
            context.restore();
        }
        addEnemy(){
            this.enemies.push(new ToaEnemy(this));
            console.log(this.enemies);
        }

        
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    animate(0);
});
