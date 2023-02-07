class Layer {
    constructor(game, width, height, image){
        this.game = game;
        this.width = width;
        this.height = height;
        //this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }
    draw(context){
        //context.drawImage(this.image, this.x, this.y, -this.width, -this.height);
        let k = 1;
        for (let i = -1.5; i < 1; i++) {
            for (let j = -1.5; j < 1; j++) {
                
                context.drawImage(this.image, this.x + j * this.width, this.y + i * this.height);
                // ligne
                context.lineWidth = 5;
                context.strokeStyle = "red";
                context.strokeRect(this.x + j * this.width - 2.5, this.y + i * this.height - 2.5, this.width + 5, this.height + 5);
                //number
                context.fillStyle = 'red';
                context.font = '30px Arial';
                context.textAlign = 'center';
                context.fillText(k, this.x + j * this.width + this.width / 2, this.y + i * this.height + this.height / 2);
                k++;
            }
        }
    }
    update(playerX, playerY){
        // this.x mean top left corner of 9 background.
        if (playerX > this.x + (this.width * 0.5)) { //cross right
            this.x += this.width;
        }
        else if (playerX < this.x - (this.width * 0.5)) { //cross left
            this.x -= this.width;
        }
        else if (playerY < this.y - (this.height * 0.5)) { //cross up
            this.y -= this.height;
        }
        else if (playerY > this.y + (this.height *0.5)) { //cross down
            this.y += this.height;
        }
    }
}

export class Background {
    constructor(game){
        this.game = game;
        this.width = 816;
        this.height = 816;
        this.layerImage1 = layer1;
        this.layer01 = new Layer(this.game, this.width, this.height, this.layerImage1);
        this.backgroundLayers = [this.layer01];
    }
    update(playerX, playerY) {
        this.backgroundLayers.forEach(layer => {
            layer.update(playerX, playerY);
        })
    }
    draw(context){
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        })
    }
}