// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.height = 65;
    this.width = 95;
    this.speed = 100 + Math.floor(Math.random() * 200);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // speed of the bugs
    this.x += this.speed * dt;

    // if bugs out of canvas, relocate back and give it different speed
    if (this.x > 510) {
        this.x = -100; // out of the canvas 
        this.speed = 100 + Math.floor(Math.random() * 200); // minimum 101
    };

    // if collision happen between player and bug, player will reset at start position 
    // if there is lifes or health added, it will decrement by 1
    if (player.x < (this.x + this.width) &&
        (player.x + player.width) > this.x &&
        player.y < (this.y + this.height) &&
        (player.y + player.height) > this.y) {
        //player relocation
        resetGame();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// player class
let Player = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.height = 75;
    this.width = 65;
}

// an update() method
Player.prototype.update = function(dt) {
    // check if the player reach the water block(Wins) 
    if (player.y < 65) {
        // timeout for the game to restart
        setTimeout(() => {
            playerWon();
        }, 800);
    }

};
// a render() method
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// a handleInput() method.
// it change x,y based on keypushed + it ensure the play will stay on canvas
Player.prototype.handleInput = function(keyPushed) {
    if (keyPushed === 'left' && this.x > 0) {
        this.x -= 100;
    } else if (keyPushed === 'up' && this.y > 0) {
        this.y -= 83;
    } else if (keyPushed === 'right' && this.x < 400) {
        this.x += 100;
    } else if (keyPushed === 'down' && this.y < 400) {
        this.y += 83;
    }
}

// enemies' position
const enemiesPosition = [64, 147, 230]; // 83 px difference 
// Place all enemy objects in an array called allEnemies
const allEnemies = enemiesPosition.map((y, x) => {
    return new Enemy((-200 * (x + 1)), y);
});
// player object in a variable called Player
const player = new Player(200, 400, 'images/char-boy.png');

//console.log(allEnemies);
let winingScore = 0;
// a function for when player wins
function playerWon() {
    //console.log('You Won!');
    // maybe a congrat message or count score appear on the screen 
    winingScore++;
    resetGame();
}

// a function for reset the game
function resetGame() {
    // reseting player position back to its start
    player.x = 200;
    player.y = 400;
    // reseting bugs back to the left of the screen
    allEnemies[0].x = -200;
    allEnemies[1].x = -200;
    allEnemies[2].x = -200;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});