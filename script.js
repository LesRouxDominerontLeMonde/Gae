const canvas = canvas1;
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let enemies = [];
let lastMouseX = 0;
let lastMouseY = 0;
class Player {
    constructor() {
      this.x = 250;
      this.y = 250;
      this.radius = 50;
      this.color = "blue";
      this.speed = 5;
      this.velocity = { x: 0, y: 0 };    }
  
    draw(context) {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      context.fillStyle = this.color;
      context.fill();
    }

    update() {
        if (lastMouseX !== this.x && lastMouseY !== this.y) {
          let xDiff = lastMouseX - this.x;
          let yDiff = lastMouseY - this.y;
          let angle = Math.atan2(yDiff, xDiff);
    
          this.velocity.x = Math.cos(angle) * this.speed;
          this.velocity.y = Math.sin(angle) * this.speed;
        }
    
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        console.log(this.velocity.x);
        }
}

class Enemy {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 25;
      this.color = "red";
      this.speed = 2;
    }
  
    draw(context) {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      context.fillStyle = this.color;
      context.fill();
    }
  
    moveTowardsPlayer(player) {
      // Calculate the angle between the enemy and the player
      let angle = Math.atan2(player.y - this.y, player.x - this.x);
  
      // Update the enemy's position based on the angle and speed
      this.x += Math.cos(angle) * this.speed;
      this.y += Math.sin(angle) * this.speed;
    }
}

function spawnEnemy() {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    enemies.push(new Enemy(x, y));
}

setInterval(spawnEnemy, 5000);




// beter to check colision around the player only 1 time ?
function checkCollision(player, enemy) {
    let xDistance = player.x - enemy.x;
    let yDistance = player.y - enemy.y;
    let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
  
    if (distance < player.radius + enemy.radius) {
      return true;
    }
    return false;
}

let player = new Player();
let display = document.createElement("div");
display.style.position = "absolute";
display.style.top = "50px";
display.style.left = "50px";
document.body.appendChild(display);

setInterval(() => {
    display.innerHTML = "Player X: " + player.x + " Player Y: " + player.y;
}, 1000);

document.addEventListener("mousemove", event => {
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
});

function displayCoordinates() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`x: ${player.x} y: ${player.y}`, 50, 50);
}


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save(); 
    ctx.translate(canvas.width / 2 - player.x, canvas.height / 2 - player.y);
    player.update();
    player.draw(ctx);

    
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].moveTowardsPlayer(player);
      enemies[i].draw(ctx);
      if(checkCollision(player, enemies[i])) {
        enemies.splice(i, 1);
      }
    }
    ctx.restore() // utile comme save?
    requestAnimationFrame(gameLoop);
}

gameLoop();