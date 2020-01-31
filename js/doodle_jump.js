// ==== VARIABLES ====
let gameStart = false;
let gameEndScreen = false;
let x = 0;
let y = 0;
let speedY = 0;
let speedX = 0;
let thrust = 0;
let score = 0;
let scoreUp = false;
let xStartButton = 150;
let yStartButton = 250;
let widthStartButton = 100;
let heightStartButton = 64;
let xResetButton = 95;
let yResetButton = 240;
let widthResetButton = 214;
let heightResetButton = 64;
let xHowTo = 275;
let yHowTo = 565;
let widthHowTo = 100;
let heightHowTo = 20;
let xCloseButton = 315;
let yCloseButton = 60;
let widthCloseButton = 25;
let heightCloseButton = 25;
let showMenu = false;
let textArray = [];
let writeIntoLastScores = true;

// ==== VARIABLES Doodler ====
let xDoodler = width / 2;
let yDoodler = height / 2;
let doodlerLeft = false;
let doodlerRight = false;
let doodlerWidth = 55;
let doodlerHeight = 55;

// ==== VARIABLES plattform ====
let plattformHeight = 13;
let plattformWidth = 55;
let plattformX = random(width - plattformWidth);
let plattformY = -10;
let plattformDown = false;
let thrustPlattform = 4;
let movePlattformY = 6;
let distancePlattformR = random(20, 90);
let plattformAbsolutHeight = 0;
let indexLastPlattform = 0;
let indexTopPlattform = 0;
let indexSecondLastPlattform = 0;
let plattform = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  type: 0,
  direction: 0,
  hit: false
};
let plattformArray = [];
let plattformN = 0;

// ==== VARIABLES blackHole ====
let blackHoleRadius = 130;
let alreadyDrawnBlackHole = false;
let randomBlackHole = 0;
let blackHole = {
  x: 0,
  y: 0,
  radius: 0
};
let blackHoleArray = [];

// ==== VARIABLES monster ====
let monsterWidth = 0;
let monsterHeight = 0;
let monsterX = 0;
let alreadyDrawnMonster = false;
let randomMonster = 0;
let randomMonsterDraw = 0;
let deleteMonsterFromCanvas = false;
let typeMonster = 0;
let alignmentMonster = 0;
let stopMovingMonster = false;
let monster = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  type: 0
};
let monsterArray = [];

// ==== VARIABLES seed ====
let startShooting = false;
let seedX = xDoodler + speedX;
let seedY = yDoodler + speedY;
let seedRadius = 15;
let seed = {
  x: 0,
  y: 0,
  radius: 0,
  rotation: 0
};
let seedArray = [];

// ==== VARIABLES wheat ====
let wheatWidth = 30;
let wheatHeight = 50;
let alreadyDrawnWheat = false;
let randomWheat = 0;
let wheat = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};
let wheatArray = [];

// ==== PLATTFORMS ====
function setPlattform() {
  plattformX = random(width - plattformWidth);
  plattform = {
    x: plattformX,
    y: plattformY,
    width: plattformWidth,
    height: plattformHeight,
    type: floor(random(0, 2)),
    direction: floor(random(0, 2)),
    number: plattformN
  };
  if (score <= 1000) {
    plattform.type = floor(random(0, 2));
  }
  if (score > 1000 && score <= 5000) {
    plattform.type = floor(random(0, 3));
  }
  if (score > 5000 && score <= 9000) {
    plattform.type = floor(random(1, 3));
  }
  if (score > 9000) {
    plattform.type = 2;
  }
  plattformArray.push(plattform);
  plattformN++;
}

function drawPlattform() {
  for (let i in plattformArray) {
    if (plattformArray[i].type === 0) {
      image(
        plattformWood,
        plattformArray[i].x,
        plattformArray[i].y,
        plattformArray[i].width,
        plattformArray[i].height,
        10
      );
    }
    if (plattformArray[i].type === 1) {
      image(
        plattformSand,
        plattformArray[i].x,
        plattformArray[i].y,
        plattformArray[i].width,
        plattformArray[i].height,
        10
      );
    }
    if (plattformArray[i].type === 2) {
      image(
        plattformGrass,
        plattformArray[i].x,
        plattformArray[i].y,
        plattformArray[i].width,
        plattformArray[i].height,
        10
      );
    }
  }
}

function movePlattformX() {
  for (let i in plattformArray) {
    if (plattformArray[i].type === 2) {
      if (plattformArray[i].direction === 0) {
        plattformArray[i].x--;
      } else {
        plattformArray[i].x++;
      }
      if (plattformArray[i].x > width - 50) {
        plattformArray[i].direction = 0;
      }
      if (plattformArray[i].x < 0) {
        plattformArray[i].direction = 1;
      }
    }
  }
}

function movePlattformDown() {
  for (let i in plattformArray) {
    if (plattformArray[i].type === 1 && plattformArray[i].hit) {
      plattformArray[i].y += 5;
    }
  }
}

function addPlattform() {
  indexTopPlattform = plattformArray[plattformArray.length - 1];
  if (indexTopPlattform.y > 200) {
    setPlattform();
  }
}

// ==== BLACK HOLE ====
function setBlackHole() {
  blackHole = {
    x: random(width - blackHoleRadius),
    y: -120,
    radius: blackHoleRadius
  };
  blackHoleArray.push(blackHole);
}

function setFirstBlackHole() {
  if (!alreadyDrawnBlackHole) {
    setBlackHole();
    alreadyDrawnBlackHole = true;
  }
}

function drawBlackHole() {
  for (let i in blackHoleArray) {
    image(
      wheel,
      blackHoleArray[i].x,
      blackHoleArray[i].y,
      blackHoleArray[i].radius,
      blackHoleArray[i].radius
    );
  }
}

// ==== MONSTER ====
function setMonster() {
  setPlattform();
  typeMonster = floor(random(0, 2));
  alignmentMonster = floor(random(0, 2));

  if (typeMonster === 0) {
    monsterWidth = 90;
    monsterHeight = 100;

    monster = {
      x: plattformArray[plattformArray.length - 1].x - 20,
      y: plattformArray[plattformArray.length - 1].y - 100,
      width: monsterWidth,
      height: monsterHeight,
      type: typeMonster,
      plattformNumber: plattformArray[plattformArray.length - 1].number
    };
  }

  if (alignmentMonster === 0) {
    monsterX = 200;
  }
  if (alignmentMonster === 1) {
    monsterX = -150;
  }

  if (typeMonster === 1) {
    monsterWidth = 200;
    monsterHeight = 67;

    monster = {
      x: monsterX,
      y: -50,
      width: monsterWidth,
      height: monsterHeight,
      type: typeMonster,
      direction: floor(random(0, 2)),
      alignment: alignmentMonster
    };
  }

  monsterArray.push(monster);
}

function updateMonster() {
  for (let i in plattformArray) {
    for (let j in monsterArray) {
      if (monsterArray[j].plattformNumber === plattformArray[i].number) {
        monsterArray[j].x = plattformArray[i].x - 20;
      }
    }
  }
}

function setFirstMonster() {
  if (!alreadyDrawnMonster) {
    setMonster();
    alreadyDrawnMonster = true;
  }
}

function drawMonster() {
  for (let i in monsterArray) {
    if (monsterArray[i].type === 0) {
      image(
        cat,
        monsterArray[i].x,
        monsterArray[i].y,
        monsterArray[i].width,
        monsterArray[i].height
      );
    }
    if (monsterArray[i].type === 1) {
      if (alignmentMonster === 0) {
        image(
          hand,
          monsterArray[i].x,
          monsterArray[i].y,
          monsterArray[i].width,
          monsterArray[i].height
        );
      }
      if (alignmentMonster === 1) {
        image(
          hand_mirrored,
          monsterArray[i].x,
          monsterArray[i].y,
          monsterArray[i].width,
          monsterArray[i].height
        );
      }
    }
  }
}

function deleteMonster() {
  for (let i in monsterArray) {
    if (deleteMonsterFromCanvas === true) {
      monsterArray.splice(i, 1);
    }
  }
}

function newMonsterAfterDelete() {
  if (deleteMonsterFromCanvas === true) {
    randomMonsterDraw = floor(random(1, 2000));
    if (randomMonsterDraw === 1999) {
      setMonster();
      deleteMonsterFromCanvas = false;
    }
  }
}

function moveMonsterX() {
  if (stopMovingMonster === false) {
    for (let i in monsterArray) {
      if (alignmentMonster === 0) {
        if (monsterArray[i].type === 1) {
          if (monsterArray[i].direction === 0) {
            monsterArray[i].x--;
          } else {
            monsterArray[i].x++;
          }
          if (monsterArray[i].x > width - 50) {
            monsterArray[i].direction = 0;
          }
          if (monsterArray[i].x < 200) {
            monsterArray[i].direction = 1;
          }
        }
      }

      if (alignmentMonster === 1) {
        if (monsterArray[i].type === 1) {
          if (monsterArray[i].direction === 0) {
            monsterArray[i].x--;
          } else {
            monsterArray[i].x++;
          }
          if (monsterArray[i].x > -20) {
            monsterArray[i].direction = 0;
          }
          if (monsterArray[i].x < -150) {
            monsterArray[i].direction = 1;
          }
        }
      }
    }
  }
}

// ==== SEEDS ====
function setSeed(a) {
  // get current Doodler position
  seedX = xDoodler + speedX;
  seedY = yDoodler + speedY;
  // set seed at Doodler position
  seed = {
    x: seedX,
    y: seedY,
    radius: seedRadius,
    rotation: a
  };
  seedArray.push(seed);
}

function drawSeed() {
  for (let i in seedArray) {
    image(
      imgSeed,
      seedArray[i].x,
      seedArray[i].y,
      seedArray[i].radius,
      seedArray[i].radius
    );
  }
}

function moveSeed() {
  for (let i in seedArray) {
    seedArray[i].x = seedArray[i].x + cos(seedArray[i].rotation) * 3;
    seedArray[i].y = seedArray[i].y + sin(seedArray[i].rotation) * 3;

    // delete seed if out of canvas
    if (
      seedArray[i].x < 0 ||
      seedArray[i].x > width ||
      seedArray[i].y < 0 ||
      seedArray[i].y > height
    ) {
      seedArray.splice(i, 1);
    }
  }
}

// ==== MONSTER ====
function setWheat() {
  plattformY = -60;
  setPlattform();
  wheat = {
    x: plattformArray[plattformArray.length - 1].x + 15,
    y: plattformArray[plattformArray.length - 1].y - 50,
    width: wheatWidth,
    height: wheatHeight,
    plattformNumber: plattformArray[plattformArray.length - 1].number
  };
  wheatArray.push(wheat);
  plattformY = -10;
}

function setFirstWheat() {
  if (!alreadyDrawnWheat) {
    setWheat();
    alreadyDrawnWheat = true;
  }
}

function drawWheat() {
  for (let i in wheatArray) {
    image(
      imgWheat,
      wheatArray[i].x,
      wheatArray[i].y,
      wheatArray[i].width,
      wheatArray[i].height
    );
  }
}

function updateWheat() {
  for (let i in plattformArray) {
    for (let j in wheatArray) {
      if (wheatArray[j].plattformNumber === plattformArray[i].number) {
        wheatArray[j].x = plattformArray[i].x + 15;
      }
    }
  }
}

// ==== GENERAL ====
function doodler(xDoodler, yDoodler, doodlerWidth, doodlerHeight) {
  fill("white");
  if (speedY > 0) {
    image(hamster_down, xDoodler, yDoodler, doodlerWidth, doodlerHeight);
  }
  if (speedY < 0) {
    image(hamster_up, xDoodler, yDoodler, doodlerWidth, doodlerHeight);
  }
}

function startButton() {
  image(
    startImage,
    xStartButton,
    yStartButton,
    widthStartButton,
    heightStartButton
  );
}

function resetButton() {
  image(
    resetImage,
    xResetButton,
    yResetButton,
    widthResetButton,
    heightResetButton
  );
}

function menu() {
  fill("rgba(40, 53, 13, 0.7)");
  rect(0, 0, width, height);
  fill("rgb(166, 206, 163)");
  rect(30, 30, 340, 540);

  image(
    closeButton,
    xCloseButton,
    yCloseButton,
    widthCloseButton,
    heightCloseButton
  );

  fill("#3E751A");
  textFont(myFont);
  textAlign(LEFT);

  textSize(30);
  text("How to play", 60, 80);

  textSize(13);
  image(hamster_down, 70, 150, 80, 94);
  text("Use the arrow keys", 200, 180);
  text("or A and D to navigate", 200, 200);
  text("the hamster.", 200, 220);

  image(cat, 65, 280, 90, 100);
  text("Use the mouse to", 200, 310);
  text("shoot seeds at", 200, 330);
  text("dangerous monster.", 200, 350);

  blackHoleRadius = 110;
  image(wheel, 60, 410, blackHoleRadius, blackHoleRadius);
  text("Be careful of the", 200, 440);
  text("wheels, you can't", 200, 460);
  text("shoot them.", 200, 480);
  blackHoleRadius = 130;
}

function showScore(x, y) {
  textSize(15);
  textAlign(LEFT);
  textFont(myFont);
  text("score = " + score, x, y);
}

function reset() {
  score = 0;
  plattformArray = [];
  blackHoleArray = [];
  seedArray = [];
  while (plattformAbsolutHeight < height) {
    distancePlattformR = random(20, 90);
    setPlattform();
    moveScreen(distancePlattformR);
    plattformAbsolutHeight = plattformAbsolutHeight + distancePlattformR;
  }
  plattformArray[0].y = height / 2 + 50;
  plattformArray[0].x = width / 2;
  plattformArray[0].type = 0;
}

function updateScreen() {
  if (!gameEndScreen) {
    speedY += 0.1;
    thrust = 0.2;
    if (yDoodler + speedY > height / 2) {
      yDoodler += speedY;
      scoreUp = true;
    } else {
      moveScreen(-speedY);
    }
    if (indexLastPlattform === indexSecondLastPlattform) {
      scoreUp = false;
    }
    if (scoreUp === true && speedY < 0) {
      score++;
    }
  }
}

function moveScreen(speedMove) {
  scoreUp = true;
  // plattforms
  for (let i in plattformArray) {
    plattformArray[i].y += speedMove;
    if (plattformArray[i].y > height) {
      plattformArray.splice(i, 1);
      if (
        (plattformArray.length < 15 &&
          indexTopPlattform.y > -10 &&
          score < 3000) ||
        (plattformArray.length < 10 &&
          indexTopPlattform.y > -10 &&
          score < 6000) ||
        (plattformArray.length < 8 &&
          indexTopPlattform.y > -10 &&
          score < 9000) ||
        plattformArray.length < 6
      ) {
        setPlattform();
      }
    }
  }

  // black holes
  for (let i in blackHoleArray) {
    blackHoleArray[i].y += speedMove;
    if (blackHoleArray[i].y > height * 2) {
      randomBlackHole = floor(random(1, 700));
      if (randomBlackHole === 699) {
        setBlackHole();
        blackHoleArray.splice(i, 1);
      }
    }
  }

  // monster
  for (let i in monsterArray) {
    monsterArray[i].y += speedMove;
    if (monsterArray[i].y > height * 2) {
      randomMonster = floor(random(1, 700));
      if (randomMonster === 699) {
        setMonster();
        monsterArray.splice(i, 1);
      }
    }
  }

  // wheat
  for (let i in wheatArray) {
    wheatArray[i].y += speedMove;
    if (wheatArray[i].y > height * 2) {
      randomWheat = floor(random(1, 500));
      if (randomWheat === 499) {
        setWheat();
        wheatArray.splice(i, 1);
      }
    }
  }
}

function gameEnd() {
  gameEndScreen = false;
  gameStart = false;
  yDoodler = height / 2;
  xDoodler = width / 2;
  speedX = 0;
  alreadyDrawnBlackHole = false;
  alreadyDrawnMonster = false;
  alreadyDrawnWheat = false;
  plattformAbsolutHeight = 0;
  startShooting = false;
  writeIntoLastScores = true;
  stopMovingMonster = false;
}

function endScreen() {
  background(166, 206, 163);
  speedY = 0;
  thrust = 0;
  gameEndScreen = true;
  resetButton();
  image(endTitle, 40, 50, 325, 105);
  textSize(25);
  textAlign(CENTER);
  text("score: " + score, width / 2, 200);
  yourHighscore();
}

function yourHighscore() {
  writeLastScores();
  text("Your best scores:", width / 2, 370);
  text("1. " + textArray[textArray.length - 1], width / 2, 420);
  if (textArray.length > 1) {
    text("2. " + textArray[textArray.length - 2], width / 2, 460);
  }
  if (textArray.length > 2) {
    text("3. " + textArray[textArray.length - 3], width / 2, 500);
  }
  if (textArray.length > 3) {
    text("4. " + textArray[textArray.length - 4], width / 2, 540);
  }
  if (textArray.length > 4) {
    text("5. " + textArray[textArray.length - 5], width / 2, 580);
  }
}

function writeLastScores() {
  if (writeIntoLastScores) {
    textArray.push(score);
    textArray.sort(compareScores);
    if (textArray.length > 5) {
      textArray.shift();
    }
  }
  writeIntoLastScores = false;
}

function compareScores(a, b) {
  return a - b;
}

function draw() {
  background(166, 206, 163);

  noStroke();

  frameRate(100);

  if (!gameStart) {
    image(title, 40, 100, 325, 70);
    image(hamsterWave, -50, 350, 300, 300);
    image(howTo, xHowTo, yHowTo, widthHowTo, heightHowTo);
    startButton();
    speedY = 0;

    if (showMenu) {
      menu();
    }
  } else {
    drawPlattform();
    updateScreen();
    updateMonster();
    updateWheat();
    drawPlattform();
    drawBlackHole();
    drawMonster();
    drawWheat();
    movePlattformX();
    moveMonsterX();
    moveSeed();
    deleteMonster();
    newMonsterAfterDelete();
    addPlattform();
    showScore(20, 30);

    if (score === 500) {
      setFirstBlackHole();
    }

    if (score === 1000) {
      setFirstMonster();
    }

    if (score === 100) {
      setFirstWheat();
    }

    drawSeed();
  }
  doodler(xDoodler, yDoodler, doodlerWidth, doodlerHeight);

  // keys pressed to navigate doodler
  if (!gameEndScreen) {
    keysAreDown();
  }

  if (doodlerLeft && gameStart) {
    xDoodler -= speedX;
    if (speedX <= 20) {
      speedX = speedX + thrust;
    }
  }
  if (doodlerRight && gameStart) {
    xDoodler += speedX;
    if (speedX <= 20) {
      speedX = speedX + thrust;
    }
  }
  if (!doodlerLeft && !doodlerRight) {
    speedX = 0;
  }

  keyReleased();

  // collision detection Monster Seed
  for (let seed of seedArray) {
    for (let monster of monsterArray) {
      if (
        seed.x > monster.x &&
        seed.x + seed.radius < monster.x + monsterWidth &&
        seed.y > monster.y &&
        seed.y + seed.radius < monster.y + monsterHeight
      ) {
        deleteMonsterFromCanvas = true;
      }
    }
  }

  // collision detection Doodler Black Hole
  for (let i in blackHoleArray) {
    if (
      xDoodler > blackHoleArray[i].x &&
      xDoodler + doodlerWidth <
        blackHoleArray[i].x + blackHoleArray[i].radius &&
      yDoodler + doodlerHeight > blackHoleArray[i].y &&
      yDoodler + doodlerHeight < blackHoleArray[i].y + blackHoleArray[i].radius
    ) {
      endScreen();
    }
  }

  // collision detection Doodler Monster
  for (let i in monsterArray) {
    if (
      xDoodler > monsterArray[i].x - 40 &&
      xDoodler + doodlerWidth < monsterArray[i].x + monsterWidth + 40 &&
      yDoodler + doodlerHeight > monsterArray[i].y &&
      yDoodler + doodlerHeight < monsterArray[i].y + monsterHeight
    ) {
      stopMovingMonster = true;
      endScreen();
    }
  }

  // collision detection Doodler Wheat
  for (let i in wheatArray) {
    if (
      xDoodler > wheatArray[i].x - 40 &&
      xDoodler + doodlerWidth < wheatArray[i].x + wheatWidth + 40 &&
      yDoodler + doodlerHeight > wheatArray[i].y &&
      yDoodler + doodlerHeight < wheatArray[i].y + wheatHeight &&
      speedY > 0
    ) {
      speedY = -14;
    }
  }

  // collision detection Doodler Plattform
  // Quelle Methode: https://happycoding.io/tutorials/processing/collision-detection
  for (let i in plattformArray) {
    if (
      xDoodler > plattformArray[i].x - 40 &&
      xDoodler + doodlerWidth < plattformArray[i].x + plattformWidth + 40 &&
      yDoodler + doodlerHeight > plattformArray[i].y &&
      yDoodler + doodlerHeight < plattformArray[i].y + plattformHeight &&
      speedY > 0
    ) {
      indexSecondLastPlattform = indexLastPlattform;
      indexLastPlattform = plattformArray[i];
      plattformArray[i].hit = true;
      speedY = -7;
    }
  }

  // if plattform type 1 is hit, it goes down
  movePlattformDown();

  // xDoodler gets out of canvas
  if (xDoodler > width) {
    xDoodler = 0;
  }
  if (xDoodler < 0) {
    xDoodler = width;
  }

  // Doodler hits bottom / Game ends
  if (yDoodler > height) {
    endScreen();
  }
}

// ==== MOUSE PRESSED ====
function mousePressed() {
  // start game
  if (
    mouseX > xStartButton &&
    mouseX < xStartButton + widthStartButton &&
    mouseY > yStartButton &&
    mouseY < yStartButton + heightStartButton &&
    gameEndScreen === false
  ) {
    gameStart = true;
  }

  // click reset button
  if (
    mouseX > xResetButton &&
    mouseX < xResetButton + widthResetButton &&
    mouseY > yResetButton &&
    mouseY < yResetButton + heightResetButton &&
    gameEndScreen === true
  ) {
    gameEnd();
    reset();
  }

  // show menu
  if (
    mouseX > xHowTo &&
    mouseX < xHowTo + widthHowTo &&
    mouseY > yHowTo &&
    mouseY < yHowTo + heightHowTo &&
    gameStart === false
  ) {
    showMenu = true;
  }

  // hide menu
  if (
    mouseX > xCloseButton &&
    mouseX < xCloseButton + widthCloseButton &&
    mouseY > yCloseButton &&
    mouseY < yCloseButton + heightCloseButton &&
    gameStart === false
  ) {
    showMenu = false;
  }
}

// ==== MOUSE CLICKED TO FIRE SEED ====
function mouseClicked() {
  if (startShooting === true) {
    let angleBetween = getAngleBetweenPoint(xDoodler, yDoodler, mouseX, mouseY);
    setSeed(angleBetween);
  }
  if (gameStart) {
    startShooting = true;
  }
}

// ==== KEY IS PRESSED ====
function keysAreDown() {
  if (keyIsDown(37) || keyIsDown(65)) {
    doodlerLeft = true;
  }

  if (keyIsDown(39) || keyIsDown(68)) {
    doodlerRight = true;
  }
}

// ==== KEY RELEASED ====
function keyReleased() {
  doodlerLeft = false;
  doodlerRight = false;
}

// dieser Codeschnipsel ist von Leander, hierfür haben meine mathematischen Kenntnisse nicht mehr ausgereicht.....
function getAngleBetweenPoint(x, y, ax, ay) {
  let vx = [-1, 0];
  let vy = [x - ax, y - ay];
  let a = acos((vx[0] * vy[0] + vx[1] * vy[1]) / (betrag(vx) * betrag(vy)));
  if (ay < y) {
    a = -a;
  }
  return a;
}

function betrag(vektor) {
  return sqrt(sq(vektor[0]) + sq(vektor[1]));
}
