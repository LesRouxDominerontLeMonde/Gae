const states = {
    SITTING: 0,
    SITTINGLEFT: 1,
    RUNNING: 2,
    RUNNINGLEFT: 3
}

class State {
    constructor(state){
        this.state = state;
    }
}

export class Sitting extends State {
    constructor(player){
        super('SITTING'); // L8 parent class need (state)
        this.player = player;
    }
    enter(){
        this.player.image = B_idle;
        this.player.width = 32;
        this.player.height = 288/6;
        this.player.maxFrame = 6;
        this.player.frameInterval = 1000/15;
    }
    handleInput(input){
        // If key press, chang to RUNNING
        if (input.includes('ArrowLeft')) {
            this.player.setState(states.SITTINGLEFT);
        } else if (input.includes('ArrowRight') || 
                  input.includes('ArrowUp') || 
                  input.includes('ArrowDown')) {
            this.player.setState(states.RUNNING);
        }
    }
}

export class SittingLeft extends State {
    constructor(player){
        super('SITTINGLEFT'); 
        this.player = player;
    }
    enter(){
        this.player.image = B_idle_left;
        this.player.width = 32;
        this.player.height = 288/6;
        this.player.maxFrame = 6;
        this.player.frameInterval = 1000/15;
    }
    handleInput(input){
        // If key press, chang to RUNNING
        if (input.includes('ArrowRight')) {
            this.player.setState(states.SITTING);
        } else if (input.includes('ArrowLeft') || 
                   input.includes('ArrowUp') || 
                   input.includes('ArrowDown')) {
            this.player.setState(states.RUNNINGLEFT);
        }
    }
}

export class Running extends State {
    constructor(player){
        super('RUNNING'); 
        this.player = player;
    }
    enter(){
        this.player.image = B_run;
        this.player.width = 32;
        this.player.height = 384/8; 
        this.player.maxFrame = 8;
        this.player.frameInterval = 1000/20;

    }
    handleInput(input){
        // If a key is press, swap from sitting to runing :)
        if (!input.includes('ArrowRight') && 
            !input.includes('ArrowUp') && 
            !input.includes('ArrowDown')) {
            this.player.setState(states.SITTING);
        }
        else if (input.includes('ArrowLeft') && 
                 input.includes('ArrowRight')) {
            this.player.setState(states.RUNNING);
        }
        else if (input.includes('ArrowLeft')) {
            this.player.setState(states.RUNNINGLEFT);
        }
    }
}

export class RunningLeft extends State {
    constructor(player){
        super('RUNNINGLEFT'); 
        this.player = player;
    }
    enter(){
        this.player.image = B_run_left; // using the reversed image
        this.player.width = 32;
        this.player.height = 384/8; 
        this.player.maxFrame = 8;
        this.player.frameInterval = 1000/20;
    }
    handleInput(input){
        // If a key is press, swap from runningleft to SITTINGLEFT :)
        if (!input.includes('ArrowLeft') &&
            !input.includes('ArrowRight') && 
            !input.includes('ArrowUp') && 
            !input.includes('ArrowDown')) {
            this.player.setState(states.SITTINGLEFT);
        }
        else if (input.includes('ArrowRight')) {
            this.player.setState(states.RUNNING);
        }
    }
}