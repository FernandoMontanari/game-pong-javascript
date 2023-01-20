var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

// CANVAS SETTINGS
canvas.width = 1280;
canvas.height = 720;

var initialBallPositionX = canvas.width / 2;
var initialBallPositionY = canvas.height / 2;
var moveBallX = 2;
var moveBallY = -2;
var player1WidthPosition = - 1260;
var player2WidthPosition = - 30;
var player1HeightPosition = 250;
var player2HeightPosition = 250;


// KEYBOARD SETTINGS
var keyUp = 38;
var keyDown = 40;
var keyMovement = 20;

// GAME SETTINGS

// CAMP SETTINGS
var campWidth = canvas.width;
var campHeight = canvas.height;

// BALL SETTINGS
var ballColor = 'white';
var ballRadius = 10;

// PLAYER1 SETTINGS
var player1Color = 'white';
var player1Height = 200;
var player1PositionY = player1HeightPosition;

// PLAYER2 SETTINGS
var player2Color = 'white';
var player2Height = 200;
var player2PositionY = player2HeightPosition;

function camp() {

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, campWidth, campHeight);
}

function ball(){

    ctx.fillStyle = ballColor;
    ctx.beginPath();
    ctx.arc(initialBallPositionX, initialBallPositionY, ballRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function ballMovement() {

    if (initialBallPositionX + ballRadius > campWidth || initialBallPositionX - ballRadius < 0) {
        moveBallX = -moveBallX;              
    }

    if (initialBallPositionY + ballRadius > campHeight || initialBallPositionY - ballRadius < 0) {
        moveBallY = -moveBallY;
    }

    initialBallPositionX += moveBallX;
    initialBallPositionY += moveBallY;
}

function player1(){

    ctx.fillStyle = 'white';
    ctx.fillRect(campWidth + player1WidthPosition, player1PositionY , 10, player1Height);
}

function player2(){

    ctx.fillStyle = 'white';
    ctx.fillRect(campWidth + player2WidthPosition, player2PositionY, 10, player1Height);
}

function pressKey(event) {

    if(event.keyCode == keyUp) {
        player1PositionY -= keyMovement
    } else if (event.keyCode == keyDown) {
        player1PositionY += keyMovement
    }
}

function clearScreen() {

    ctx.clearRect(0, 0, campWidth, campHeight);            
}

function screenUpdate() {

    clearScreen();
    camp();
    ball();
    player1();
    player2();
    ballMovement();
}

setInterval(screenUpdate, 1);
document.onkeydown = pressKey;