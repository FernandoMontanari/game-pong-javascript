var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

// CANVAS SETTINGS
canvas.width = 600;
canvas.height = 400;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

const initialBallPositionX = canvas.width / 2;
const initialBallPositionY = canvas.height / 2;
const refreshPageVelocity = 10;

var ballPositionX = initialBallPositionX;
var ballPositionY = initialBallPositionY;
var moveBallX = 5;
var moveBallY = -5;
var player1XPosition = 10;
var player2XPosition = 580;
var player1YPosition = 150;
var player2YPosition = 150;
const playerWidth = 10;
const playerHeight = 90;
var player1Points = 0;
var player2Points = 0;

// KEYBOARD SETTINGS
var upPressed = false;
var downPressed = false;
var upPressedP2 = false;
var downPressedP2 = false;

// GAME SETTINGS
var multiplayer = false;

// CAMP SETTINGS
var campWidth = canvas.width;
var campHeight = canvas.height;

// BALL SETTINGS
var ballColor = 'white';
var ballRadius = 10;

// PLAYER1 SETTINGS
var player1Color = 'white';

// PLAYER2 SETTINGS
var player2Color = 'white';
var oponentVelocity;

function camp() {

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, campWidth, campHeight);
}

function ball(){

    ctx.fillStyle = ballColor;
    ctx.beginPath();
    ctx.arc(ballPositionX, ballPositionY, ballRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function ballMovement() {

    if (ballPositionX + ballRadius > campWidth || ballPositionX - ballRadius < 0) {
        moveBallX = -moveBallX;              
    }

    if (ballPositionY + ballRadius > campHeight || ballPositionY - ballRadius < 0) {
        moveBallY = -moveBallY;
    }

    ballPositionX += moveBallX;
    ballPositionY += moveBallY;
}

function player1(){

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.fillRect(player1XPosition, player1YPosition , playerWidth, playerHeight);
    ctx.closePath();
}

function player2(){

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.fillRect(player2XPosition, player2YPosition, playerWidth, playerHeight);
    ctx.closePath();
}

function keyDownHandler(event) {
    if (event.key === "Up" || event.key === "ArrowUp") {
        upPressed = true;
    } else if (event.key === "Down" || event.key === "ArrowDown") {
        downPressed = true;
    }

    if (multiplayer && event.key === "w") {
        upPressedP2 = true
    } else if (multiplayer || event.key === "s") {
        downPressedP2 = true;
    }
}

function keyUpHandler(event) {
    if (event.key === "Up" || event.key === "ArrowUp") {
        upPressed = false;
    } else if (event.key === "Down" || event.key === "ArrowDown") {
        downPressed = false;
    }

    if (multiplayer && event.key === "w") {
        upPressedP2 = false
    } else if (multiplayer || event.key === "s") {
        downPressedP2 = false;
    }
}

function playersMovement() {
    if (upPressed) {
        player1YPosition -= 7;
        if (player1YPosition < 0) {
            player1YPosition = 0;
        }
    } 
    
    if (downPressed) {
        player1YPosition += 7;
        if (player1YPosition > 310) {
            player1YPosition = 310;
        }
    }

    if (upPressedP2) {
        player2YPosition -= 7;
        if (player2YPosition < 0) {
            player2YPosition = 0;
        }
    } 
    
    if (downPressedP2) {
        player2YPosition += 7;
        if (player2YPosition > 310) {
            player2YPosition = 310;
        }
    }
}

function ballColisionRacket() {
    if (ballPositionX - ballRadius < player1XPosition + playerWidth &&
        ballPositionY - ballRadius < player1YPosition + playerHeight &&
        ballPositionY - ballRadius > player1YPosition - 35) {
        moveBallX *= -1;
    }

    if (ballPositionX - ballRadius > player2XPosition - playerWidth - 10 &&
        ballPositionY - ballRadius < player2YPosition + playerHeight &&
        ballPositionY - ballRadius > player2YPosition - 35 ) {
        moveBallX *= -1;
    }
}

function ballDontGetStuck() {
    if(ballPositionX - ballRadius < 0) {
        ballPositionX = 30;
        moveBallX *= -1;
    }

    if(ballPositionX + ballRadius > 600) {
        ballPositionX = 570;
        moveBallX *= -1;
    }
}

function enemyMovement() {
    if (multiplayer == false) {

        player2YPosition = player2YPosition;

        if ( player2YPosition > ballPositionY) {
            player2YPosition -= 4;
        } else {
            player2YPosition += 4;
        }
        if (player2YPosition < 0) {
            player2YPosition = 0;
        }
        if (player2YPosition > 310) {
            player2YPosition = 310;
        }
    }

}

function pointsCount() {
    if (ballPositionX > 590) {
        player1Points += 1;        
    }

    if (ballPositionX < 10) {
        player2Points += 1;
    }
}

function showPoints() {
    ctx.fillStyle = "255"
    ctx.font = "16px Arial";
    ctx.fillText(player1Points, 150, 20);
    ctx.fillText(player2Points, 450, 20);
}

/*function clearScreen() {

    ctx.clearRect(0, 0, campWidth, campHeight);            
}*/

function screenUpdate() {

    camp();
    ball();
    player1();
    player2();
    ballMovement();
    ballColisionRacket();
    enemyMovement();
    pointsCount();
    showPoints();
    ballDontGetStuck();
    playersMovement();
}

setInterval(screenUpdate, refreshPageVelocity);