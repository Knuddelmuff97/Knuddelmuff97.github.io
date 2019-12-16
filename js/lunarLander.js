/* UPDATE 04.12.19
Ich habe nach dem Upload letzte Woche noch einen Bug gefunden.
Manchmal (ich konnte kein System dahinter erkennen) hat man das Spiel gewonnen, obwohl man viel zu schnell war.
Der Speed wurde dann einfach auf 0 gesetzt.
Lösung des Problems war es, aus den If-Sätzen (Zeilen 357 - 371), die das Gewinnen oder Verlieren bestimmen, Speed= 0 rauszunehmen.
Das war an dieser Stelle nicht nötig, da ich einen noLoop setze und das Raumschiff damit so oder so anhält.
*/

// ==== VARIABLES ====
let x = 0; // x position
let y = 100; // y position
let r = 20; // radius
let xR = 100; // x position rocket
let yR = -100; // y position rocket
let gameStart = false; // Boolean Start/End game
let rocketDown = false; // Boolean down
let rocketUp = false; // Boolean up
let speed = 0; // speed rocket
let thrust = 0; //  thrust of rocket
let evaluation = false; // Boolean evaluation
let wonGame = false; // Boolean Win
let lostGame = false; // Boolean Loose
let speedStop = false; // Boolean count up speed
let time = 0; // counts time

//stars
let nstar = 450;
let xstar = [];
let ystar = [];
let dstar = [];
let tstar = [];

function playButton(x, y) {
  fill("#1c1c1c"); // dark grey
  strokeWeight(3);
  stroke("white");
  rect(x, y, 200, 70);
  noStroke();
  fill("white");
  textSize(17);
  textAlign(CENTER);
  textFont("Courier");
  text("START YOUR GAME", x + 100, y + 41);
}

function counterStart(counter, x, y) {
  textSize(60);
  fill("white");
  text(counter, x, y);
}

function evaluationText(textButton, subText, x, y) {
  fill("white");
  textSize(50);
  textFont("Courier");
  textAlign(CENTER);
  text(textButton, x + 100, y + 41);
  textSize(20);
  text(subText, x + 100, y + 80);
}

function tryAgainButton(x, y) {
  fill("#1c1c1c"); // dark grey
  strokeWeight(3);
  stroke("white");
  rect(x, y, 200, 70);
  noStroke();
  fill("white");
  textSize(17);
  textAlign(CENTER);
  textFont("Courier");
  text("TRY AGAIN", x + 100, y + 41);
}

function drive(x, y) {
  fill("#eb741e");
  ellipse(x + 218, y - 25, 15, 50);
  fill("#f0c930");
  ellipse(x + 218, y - 30, 10, 40);
}

function rocket(x, y) {
  push();
  translate(x, y);

  // leg left
  push();
  fill("#white");
  translate(-10, 18);
  rotate(-5.7);
  rect(0, 0, 3, 25);
  pop();
  fill("white");
  rect(-30, 37, 13, 3);

  // leg right
  push();
  fill("#white");
  translate(37, 18);
  rotate(5.7);
  rect(0, 0, 3, 25);
  pop();
  fill("white");
  rect(46, 37, 12, 3);

  // body
  fill("#592530"); // dark red
  rect(0, -33, 30, 30);
  fill("#white");
  rect(-10, 0, 50, 20);
  // antenna
  fill("#686868"); // grey
  rect(5, -48, 3, 15);
  ellipse(6.5, -50, 8);

  // big dot
  fill("#1c1c1c"); // dark grey
  ellipse(15, -17, 15);

  // little dots
  ellipse(35, 5, 5);
  ellipse(25, 5, 5);
  ellipse(15, 5, 5);
  ellipse(5, 5, 5);
  ellipse(-5, 5, 5);

  pop();
}

function moon(x, y) {
  noStroke();
  fill("grey");
  ellipse(x, y, 900, 100);
}

function crater(x, y, r) {
  fill("#3c3c3c"); // dark grey
  ellipse(x, y, 2 * r, r);
  fill("#686868"); // light grey
  ellipse(x + 2 * r * 0.02, y + r * 0.09, 2 * r * 0.9, r * 0.8);
}

// Die Idee noise zu nutzen kam von meinem Freund. Er hat mir auch bei der Umsetzung der Erde geholfen.
function earth(x, y, radius) {
  let noiseScale = 2 / radius;
  push();
  translate(x, y);
  for (i = -round(radius); i < round(radius); i++) {
    for (j = -round(radius); j < round(radius); j++) {
      noStroke();
      if (i * i + j * j < radius * radius) {
        noiseVal = noise(i * noiseScale + radius, j * noiseScale + radius);
        if (noiseVal < 0.5) {
          fill("#073d8c"); // blue
        }
        if (noiseVal >= 0.5) {
          fill("#1f961b"); // green
        }
        rect(i, j, 2, 2);
      }
    }
  }
  pop();
}

function speedText(fillText, x, y) {
  fill("white");
  textSize(20);
  text(fillText, x, y);
}

function foots(x, y) {
  fill("#686868"); // light grey
  rect(x, y, 15, 7.5, 20);
  rect(x + 25, y - 10, 15, 7.5, 20);
  rect(x + 50, y, 15, 7.5, 20);
  rect(x + 75, y - 10, 15, 7.5, 20);
}

function flag(x, y) {
  // shadow
  fill("#1c1c1c"); // dark grey
  ellipse(x + 2.5, y + 75, 10, 5);
  // flag
  fill("white");
  rect(x, y, 45, 30, 5);
  // text
  fill("black");
  textSize(15);
  textStyle(BOLD);
  text("Yay!", x + 26, y + 20);
  // pole
  fill("#3c3c3c"); // dark grey
  rect(x, y, 5, 75);
}

function explosion(x, y, scale, colorE) {
  fill(colorE);
  push();
  translate(x, y);
  triangle(
    260 * scale,
    500 * scale,
    120 * scale,
    420 * scale,
    180 * scale,
    500 * scale
  );
  triangle(
    280 * scale,
    500 * scale,
    150 * scale,
    390 * scale,
    200 * scale,
    500 * scale
  );
  triangle(
    300 * scale,
    500 * scale,
    220 * scale,
    340 * scale,
    200 * scale,
    500 * scale
  );
  triangle(
    350 * scale,
    500 * scale,
    290 * scale,
    320 * scale,
    230 * scale,
    500 * scale
  );
  triangle(
    390 * scale,
    500 * scale,
    380 * scale,
    370 * scale,
    270 * scale,
    500 * scale
  );
  triangle(
    390 * scale,
    500 * scale,
    450 * scale,
    400 * scale,
    280 * scale,
    500 * scale
  );
  triangle(
    420 * scale,
    500 * scale,
    480 * scale,
    440 * scale,
    290 * scale,
    500 * scale
  );
  pop();
}

function stars() {
  for (var i = 0; i < nstar; i++) {
    fill("rgba(255, 255, 255," + tstar[i] + " )");
    ellipse(xstar[i], ystar[i], dstar[i]);
  }
}

function randomStars() {
  for (var i = 0; i < nstar; i++) {
    xstar[i] = random(width);
    ystar[i] = random(height);
    dstar[i] = random(1, 6);
    tstar[i] = random(0, 1);
  }
}

randomStars();

// ==== FUNCTION DRAW ====
function draw() {
  background("#1c1c1c"); // dark grey
  noStroke();

  stars();

  earth(x + 550, y - 20, 20);

  // moon and crater
  moon(width / 2, y + 458);
  crater(x + 50, y + 460, 15);
  crater(x + 520, y + 440, 30);
  crater(x + 110, y + 430, 10);
  crater(x + 160, y + 450, 25);
  crater(x + 590, y + 460, 15);
  crater(x + 460, y + 460, 10);
  crater(x + 330, y + 460, 30);

  keysArePressed();

  // counter and game start
  if (gameStart) {
    time++;
  }
  if (gameStart === true && time > 0 && time < 29) {
    counterStart("3", width / 2, y + 200);
  }
  if (gameStart === true && time > 30 && time < 59) {
    counterStart("2", width / 2, y + 200);
  }
  if (gameStart === true && time > 60 && time < 89) {
    counterStart("1", width / 2, y + 200);
  }
  if (gameStart === true && time > 90) {
    determineSpeed();
    speedText("speed = " + round(speed), 90, 50);
    yR += speed;
    speed += thrust;
  }

  // after click of reset button
  if (gameStart === false) {
    playButton(x + 215, y + 80);

    textSize(60);
    textStyle(BOLD);
    text("LUNAR LANDER", width / 2, y + 250);

    textSize(20);
    textStyle(NORMAL);
    text(
      "Can you land this spaceship? \nYour speed has to be less than 2. \nUse the arrow keys. Good luck!",
      width / 2,
      y + 310
    );

    yR = 100;
    wonGame = false;
    lostGame = false;
    speed = 4;
    thrust = 0;
    evaluation = false;
    y = 100;
    time = 0;
  }

  // keys pressed to navigate spaceship
  if (rocketDown) {
    thrust = thrust + 0.01;
  }
  if (rocketUp && gameStart === true && time > 90) {
    thrust = thrust - 0.01;
    drive(xR - 3, yR + 50);
  }
  if (rocketDown === false && rocketUp === false) {
    thrust = 0;
  }
  keyReleased();

  // determine if game is won or not
  if (yR >= 470 && speed < 2) {
    wonGame = true;
    lostGame = false;

    speedUp = 0;
    thrust = 0;
  }
  if (yR >= 470 && speed > 2) {
    wonGame = false;
    lostGame = true;

    speedUp = 0;
    thrust = 0;
  }

  rocket(xR + 200, yR);

  if (wonGame) {
    foots(x + 320, y + 430);
    flag(x + 430, y + 360);

    textStyle(NORMAL);
    evaluationText("YOU WON!", "You are the greatest hero alive!", x + 225, y);
    tryAgainButton(x + 215, y + 130);
    noLoop();
  }
  if (lostGame) {
    explosion(x + 20, y - 70, 1.0, "#eda62b"); // orange
    explosion(x + 120, y + 105, 0.65, "#6e121c"); // dark red

    textStyle(NORMAL);
    evaluationText("YOU LOST!", "The entire moon mission failed.", x + 225, y);
    tryAgainButton(x + 215, y + 130);
    noLoop();
  }
}

// ==== MOUSE PRESSED ====
function mousePressed() {
  if (mouseX > 215 && mouseX < 415 && mouseY > 180 && mouseY < 250) {
    gameStart = true;
  }
  if (mouseX > 215 && mouseX < 415 && mouseY > 230 && mouseY < 300) {
    gameStart = false;
    loop();
  }
}

// ==== DETERMINE SPEED ====
function determineSpeed() {
  speed += 0.07;
}

// ==== KEY IS PRESSED ====
function keysArePressed() {
  if (keyIsPressed && keyCode === 83) {
    rocketDown = true;
  }

  if (keyIsPressed && keyCode === 40) {
    rocketDown = true;
  }

  if (keyIsPressed && keyCode === 87) {
    rocketUp = true;
  }

  if (keyIsPressed && keyCode === 38) {
    rocketUp = true;
  }
}

// ==== KEY RELEASED ====
function keyReleased() {
  rocketDown = false;
  rocketUp = false;
}
