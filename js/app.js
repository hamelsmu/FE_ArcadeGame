// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};


var detectCollisions = function(){

    allEnemies.forEach(function(enemy) {
        if(enemy.x < player.x + 50 && enemy.x + 70 > player.x &&
        enemy.y < player.y + 50 && enemy.y + 70 > player.y) {

            console.log('collision!');
            player.startOver();
        }
    });
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //Update the location using the speed as instrucuted.
    //since everything is only moving horizontally, only updating
    //the x location.
    this.x = this.x + (this.speed * dt);

    //If enemy is going off the screen start them back at the beginning.
    if(this.x > 505){
        this.x = 0;
    }

    //If there is a collision, then reset the player position
    detectCollisions();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
    //Save the intial position in separate variables
    //so we can "start over" from this initial position
    //in the event of a collision
    this.startx = x;
    this.starty = y;
    this.x = x;
    this.y = y;

    //set the picture
    this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(){
    if(this.y <= 40){
        this.startOver();
    }
};

Player.prototype.handleInput = function(direction){

    if(direction === 'left' && this.x > 25){this.x -=100;}
    if(direction === 'up' && this.y > 0){this.y -= 82.5;}
    if(direction === 'right' && this.x < 400){this.x += 100;}
    if(direction === 'down' && this.y < 400){this.y +=82.5;}
};

Player.prototype.startOver = function(){
    this.x = this.startx;
    this.y = this.starty;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(0, 55, 100),
    new Enemy(0, 140, 40),
    new Enemy(0, 225, 100)
    ];

var player = new Player(100, 400);


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
