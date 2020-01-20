// Enemies our player must avoid
var Enemy = function(x,y) {
    this.x = x;
    this.y = y;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.height = 65;
    this.width = 95;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let Player = function(x, y, sprite){
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.height = 75;
    this.width = 65;
}

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// change x,y based on keypushed
Player.prototype.handleInput = function(keyPushed){
    if (keyPushed === 'left'){ 
        this.x -= 100;
    }
    else if (keyPushed === 'up'){
        this.y -= 100;
    }
    else if (keyPushed === 'right'){
        this.x += 100;
    }
    else if (keyPushed === 'down'){
        this.y += 100;
    }

}
// enemies' position
const enemiesPosition = [64, 147, 230];
// Place all enemy objects in an array called allEnemies
const allEnemies = enemiesPosition.map((y, x) => {
    return new Enemy((-200 * (x+1)), y);
});
// Place the player object in a variable called Player
const player = new Player(200, 400, 'images/char-boy.png');

console.log(allEnemies);    

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
