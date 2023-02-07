import { Sitting, SittingLeft, Running, RunningLeft} from "./playerStates.js";

export class Player {
    constructor(game){
        this.game = game; 
        // size of player match sprite sheet size
        this.width = 32;
        this.height = 48;
        this.x = -this.width*0.5;
        this.y = -this.height*0.5;
        this.image = B_run; // Need to change with the curent State because each image is separated.
        this.frameX = 0; // no need to change ^^
        this.frameY = 0; // Will change to animate character
        this.maxFrame = 5;
        // inutile on change direct le frame interval // this.fps = 15; // img per second for animation sprite sheet
        this.frameInterval = 1000/20; //1second / fps = environ 16.
        this.frameTimer = 0; // loop until frameinterval (16)
        this.speedX = 0
        this.speedY = 0;
        this.maxSpeed = 5; 
        this.states = [new Sitting(this), new SittingLeft(this), new Running(this), new RunningLeft(this)];
        this.currentState = this.states[0];
        this.currentState.enter(); //initialization when player is also initialized.
    }
    update(input, deltaTime){
        this.currentState.handleInput(input);
        // Input is this.keys from imputHandler

        // digonal speed = 2.5
        if ((input.includes('ArrowDown') && 
            (input.includes('ArrowRight') || input.includes('ArrowLeft'))) || 
            (input.includes('ArrowUp') && 
            (input.includes('ArrowRight') || input.includes('ArrowLeft')))) {
            this.maxSpeed = 2.5;
          } else {
            this.maxSpeed = 5;
          }
          
            // Horizontal movement
        this.x += this.speedX;
        if (input.includes('ArrowRight')) this.speedX = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speedX = -this.maxSpeed;
        else this.speedX = 0;
        // Vertical movement
        this.y += this.speedY;
        if (input.includes('ArrowDown')) this.speedY = this.maxSpeed;
        else if (input.includes('ArrowUp')) this.speedY = -this.maxSpeed;
        else this.speedY = 0;
        
        //Sprite animation
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameY < this.maxFrame - 1) this.frameY++;
            else this.frameY = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        
        }
    draw(context){
        context.fillStyle = 'blue';
        context.fillRect(this.x, this.y, 32*1.5, 48*1.5);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, 32*1.5, 48*1.5);
        context.beginPath();
        //red circle
        context.arc(this.x + (32 * 1.5) / 2, this.y + (48 * 1.5) / 2, 5, 0, 2 * Math.PI);
        context.fillStyle = 'red';
        context.fill();

    }
    setState(stateNumber){
        this.currentState = this.states[stateNumber]
        this.currentState.enter();
    }
}