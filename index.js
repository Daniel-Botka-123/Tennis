// Get Elements from HTML

let player_1_score = document.getElementById("player_1_score");
let player_2_score = document.getElementById("player_2_score");

// Event Listeners

document.addEventListener("keydown", keyPushOne);
document.addEventListener("keydown", keyPushTwo);

// Canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// VARIABLES *****************************************************************************************************************

// Panel 1 - Top

let panel1PosX = 300;
let panel1PosY = 10;

// Panel 2 - Bottom

let panel2PosX = 300;
let panel2PosY = 580;

// Panel 2 - Common

const panelLength = 120;
const panelWidth = 10;
const panelHalf = panelLength / 2;
const panelSpeed = 50;

// Ball

let ballPosX = 300;
let ballPosY = 300;
let ballSize = 10;

let ballDx = 2;
let ballDy = -3;

// Score

let score1 = 0;
let score2 = 0;

let isTheGameRunning = true;

// GAME **********************************************************************************************************************

// GAME LOOP

function gameLoop() {
  drawStuff();
  if (isTheGameRunning) {
    setTimeout(ballMove, 2000);
    ballColisions();
    winner();
    requestAnimationFrame(gameLoop);
  }
}

gameLoop();

// BALL MOVE

function ballMove() {
  ballPosX += ballDx;
  ballPosY += ballDy;
  setTimeout(increaseSpeed_1, 10000);
  setTimeout(increaseSpeed_2, 10000);
}

function increaseSpeed_1() {
  ballDx *= 1.0005;
  ballDy *= 1.0005;
}

function increaseSpeed_2() {
  ballDx *= 1.0005;
  ballDy *= 1.0005;
}

// COLISIONS

// Walls Left & Right

function ballColisions() {
  if (ballPosX + ballSize > canvas.width || ballPosX - ballSize < 0) {
    ballDx *= -1;
  }

  // BOTTOM surface

  if (
    between(ballPosX, panel2PosX - panelHalf, panel2PosX + panelHalf) &&
    between(ballPosY + ballSize, panel2PosY, panel2PosY + panelWidth)
  ) {
    ballDy *= -1;
  }

  // TOP surface

  if (
    between(ballPosX, panel1PosX - panelHalf, panel1PosX + panelHalf) &&
    between(ballPosY - ballSize, panel1PosY, panel1PosY + panelWidth)
  ) {
    ballDy *= -1;
  }

  // Player 1 Score Add

  if (ballPosY - ballSize > canvas.height) {
    player_1_score.textContent = ++score1;
    ballRestart();
  }

  // Player 2 Score Add

  if (ballPosY < 0) {
    player_2_score.textContent = ++score2;
    ballRestart();
  }
}

// Min-Max Evaluate to hit the panel

function between(x, min, max) {
  return x >= min && x <= max;
}

function ballRestart() {
  ballPosX = 300;
  ballPosY = 300;
  ballDx = -2;
  ballDy = 3;
}

// Draw function

function drawStuff() {
  drawRectangle("#fcf8ec", 0, 0, canvas.width, canvas.height);

  drawRectangle(
    "#892cdc",
    panel1PosX - panelHalf,
    panel1PosY,
    panelLength,
    panelWidth
  );
  drawRectangle(
    "#a20a0a",
    panel2PosX - panelHalf,
    panel2PosY,
    panelLength,
    panelWidth
  );
  drawBall("#000", ballPosX, ballPosY, ballSize, 0, 2 * Math.PI);
}

function drawBall(color, a, b, c, d, e) {
  ctx.beginPath();
  ctx.arc(a, b, c, d, e * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawRectangle(color, posX, posY, length, width) {
  ctx.fillStyle = color;
  ctx.fillRect(posX, posY, length, width);
}

// MOVE STUFF

// Buttons

// Player 1

function keyPushOne(event) {
  if (event.key === "ArrowRight") {
    panel1PosX += panelSpeed;
  }
  if (panel1PosX > canvas.width - panelHalf) {
    panel1PosX = canvas.width - panelHalf;
  }
  if (event.key === "ArrowLeft") {
    panel1PosX -= panelSpeed;
  }
  if (panel1PosX < panelHalf) {
    panel1PosX = panelHalf;
  }
}

// Player 2

function keyPushTwo(event) {
  if (event.key === "d") {
    panel2PosX += panelSpeed;
  }
  if (panel2PosX > canvas.width - panelHalf) {
    panel2PosX = canvas.width - panelHalf;
  }
  if (event.key === "a") {
    panel2PosX -= panelSpeed;
  }
  if (panel2PosX < panelHalf) {
    panel2PosX = panelHalf;
  }
}

// Winner Condition

function winner() {
  if (score1 === 10) {
    isTheGameRunning = false;
    player_1_score.innerHTML = score1 + "<br>" + "<br>" + " 🏆 WINNER 🏆";
  }
  if (score2 === 10) {
    isTheGameRunning = false;
    player_2_score.innerHTML = score2 + "<br>" + "<br>" + " 🏆 WINNER 🏆";
  }
}
