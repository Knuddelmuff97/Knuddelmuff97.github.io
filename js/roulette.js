// ==== VARIABLES ====
var stateOne = false;
var stateTwo = false;
var randomState = 0;
var evalText = "";
var x = 40;
var y = 140;
var a = 40;
var b = 140;
var berry = "#800d38";
var darkBerry = "#42071d";
var blue = "#1a3f7d";
var darkBlue = "#132b54";
var strokeBerry = "#800d38";
var strokeBlue = "#1a3f7d";
var hatUp = false;

noStroke();

// ==== WELCOME TEXT AND COLOR BUTTONS ====
function welcomeText(x, y) {
  fill("white");
  textFont("Corbel");
  textStyle(BOLD);
  textSize(30);
  text("Häschen-Roulette", x, y - 80);
  textStyle(NORMAL);
  textSize(20);
  text("Welche Farbe wird \ndas Häschen haben?", x, y - 40);
}

function buttonChoose(x, y, color, strokeColor) {
  strokeWeight(5);
  stroke(strokeColor);
  fill(color);
  rect(x, y, 60, 60, 20);
}

// ==== PLAY BUTTON ====
function playButton(x, y) {
  fill("white");
  rect(x, y, 60, 60, 20);
  fill("black");
  text("play", x + 13, y + 35);
}

// ==== EVALUATION BUTTON ====
function evaluationButton(x, y, evalText) {
  fill("white");
  rect(x, y, 200, 60, 20);
  fill("black");
  text(evalText, x + 20, y + 37);
}

// ==== TRY AGAIN BUTTON ====
function tryAgainButton(x, y) {
  fill("white");
  rect(x, y, 200, 60, 20);
  fill("black");
  text("Versuchs nochmal!", x + 20, y + 37);
}

// ==== RABBIT ====
function rabbit(x, y, scale) {
  // hindlegs
  fill(darkBerry);
  ellipse(x - 20 * scale, y + 72 * scale, 50 * scale, 20 * scale);
  ellipse(x + 20 * scale, y + 72 * scale, 50 * scale, 20 * scale);

  // body
  fill(berry);
  ellipse(x, y, 100 * scale, 160 * scale);
  fill("white");
  ellipse(x, y + 10 * scale, 50 * scale, 130 * scale);

  // ears
  ellipse(x + 12 * scale, y - 150 * scale, 15 * scale, 80 * scale);
  ellipse(x - 12 * scale, y - 150 * scale, 15 * scale, 80 * scale);

  // ears shadow
  fill(berry);
  ellipse(x + 12 * scale, y - 150 * scale, 10 * scale, 60 * scale);
  ellipse(x - 12 * scale, y - 150 * scale, 10 * scale, 60 * scale);

  // head
  fill("white");
  ellipse(x, y - 100 * scale, 60 * scale, 70 * scale);

  // eye left
  fill("#5fabde"); // blue
  ellipse(x - 15 * scale, y - 110 * scale, 10 * scale);
  fill("black");
  ellipse(x - 14 * scale, y - 110 * scale, 4 * scale);

  // eye right
  fill("#5fabde"); // blue
  ellipse(x + 15 * scale, y - 110 * scale, 10 * scale);
  fill("black");
  ellipse(x + 14 * scale, y - 110 * scale, 4 * scale);

  // nose
  fill(darkBerry);
  ellipse(x, y - 95 * scale, 10 * scale, 10 * scale);

  // frontlegs
  fill(darkBerry);
  rect(x - 25 * scale, y - 40 * scale, 15 * scale, 40 * scale, 30);
  rect(x + 10 * scale, y - 40 * scale, 15 * scale, 40 * scale, 30);
}

// ==== HAT ====
function hat(x, y, scale) {
  fill("black");
  rect(x, y, 200 * scale, 300 * scale, 20 * scale);
  rect(x - 25 * scale, y + 260 * scale, 250 * scale, 40 * scale, 20 * scale);
}

// ==== DRAW ====
function draw() {
  background("#260404");
  playButton(x + 90, y + 20);
  welcomeText(x, y);
  buttonChoose(x, y + 20, "#1a3f7d", strokeBlue); // blue
  buttonChoose(x + 180, y + 20, "#800d38", strokeBerry); // berry

  noStroke();

  // floor
  fill("#1f1f1f");
  rect(0, 500, width, 400);

  rabbit(x + 440, y + 290, 1.0);

  if (hatUp) {
    // evaluation shows
    if (stateOne === true && stateTwo === false && randomState === 0) {
      evaluationButton(x, y + 120, "Du hast gewonnen!");
      tryAgainButton(x, y + 220);
      berry = blue;
      darkBerry = darkBlue;
    }
    if (stateOne === false && stateTwo === true && randomState === 1) {
      evaluationButton(x, y + 120, "Du hast gewonnen!");
      tryAgainButton(x, y + 220);
    }
    if (stateOne === true && stateTwo === false && randomState === 1) {
      evaluationButton(x, y + 120, "Du hast verloren!");
      tryAgainButton(x, y + 220);
    }
    if (stateOne === false && stateTwo === true && randomState === 0) {
      evaluationButton(x, y + 120, "Du hast verloren!");
      tryAgainButton(x, y + 220);
      berry = blue;
      darkBerry = darkBlue;
    }
  }

  hat(a + 340, b + 75, 1.0);

  if (hatUp && b > -160) {
    // hat moving
    b -= 6;
  }
}

// ==== MOUSE PRESSED ====
function mousePressed() {
  if (mouseX > 40 && mouseX < 100 && mouseY > 160 && mouseY < 220) {
    stateOne = true; // blau
    stateTwo = false; // rot
    strokeBlue = darkBlue;
  }

  if (mouseX > 220 && mouseX < 280 && mouseY > 160 && mouseY < 220) {
    stateOne = false; // blau
    stateTwo = true; // rot
    strokeBerry = darkBerry;
  }
  if (mouseX > 130 && mouseX < 190 && mouseY > 160 && mouseY < 220) {
    randomState = round(random(0, 1)); // 0 = erster Zustand; 1 = zweiter Zustand
    hatUp = true;
  }
  if (mouseX > 40 && mouseX < 240 && mouseY > 360 && mouseY < 420) {
    berry = "#800d38";
    darkBerry = "#42071d";
    strokeBlue = blue;
    strokeBerry = berry;
    hatUp = false;
    b = 140;
  }
}
