// ==== VARIABLES ====

var x = 400;
var y = 400;
var scale = 1.5;

// ==== LANDSCAPE ====

// background
background("#8ddef0"); // light blue
noStroke();

// grass and hills
fill("#225920"); // darker green
ellipse(70, 410, 700, 300);
fill("#286926"); // darker green
ellipse(550, 440, 500, 300);
fill("#307d2d"); // green
rect(0, 400, 1000, 300);

// sun
fill("#ecbe5c"); // yellow
ellipse(650, 20, 200);

// tree
fill("#286926"); // shadow green
ellipse(170, 457, 250, 20);
fill("#675137"); // tree brown
rect(145, 160, 50, 300);
fill("#307d2d"); // green
ellipse(150, 200, 100);
ellipse(110, 180, 100);
ellipse(80, 150, 100);
ellipse(70, 110, 100);
ellipse(90, 80, 100);
ellipse(120, 70, 100);
ellipse(150, 80, 100);
ellipse(210, 70, 100);
ellipse(240, 80, 100);
ellipse(260, 120, 100);
ellipse(245, 150, 100);
ellipse(220, 180, 100);
ellipse(195, 200, 100);
ellipse(180, 160, 150);

// shadow bone
fill("#286926"); // shadow green
ellipse(160, 562, 120, 20);

// bone
fill("white");
rect(120, 540, 80, 15);
ellipse(120, 540, 20);
ellipse(120, 555, 20);
ellipse(200, 540, 20);
ellipse(200, 555, 20);

// shadow ball
fill("#286926"); // shadow green
ellipse(620, 502, 75, 20);

// ball
fill("#f5b887"); // light orange
ellipse(620, 470, 70);
fill("#de7e31"); // orange
ellipse(600, 475, 15);
ellipse(620, 470, 15);
ellipse(620, 490, 15);
ellipse(608, 453, 15);
ellipse(640, 478, 15);
ellipse(635, 455, 15);

// ==== DOG ====

// tail
noFill();
stroke("black");
strokeWeight(20 * scale);
arc(x + 15 * scale, y - 25 * scale, 120 * scale, 150 * scale, 0, HALF_PI);

// shadow
noStroke();
fill("#286926"); // shadow green
ellipse(x, y + 92 * scale, 130 * scale, 22 * scale);

// hindleg left
push();
noStroke();
fill("#242424"); // dark grey
translate(x - 31 * scale, y + 20 * scale);
rotate(PI / 4);
rect(0, 0, 50 * scale, 50 * scale, 15 * scale);
pop();

push();
noStroke();
fill("#242424"); // dark grey
translate(x - 25 * scale, y + 65 * scale);
rotate(PI / 3);
rect(0, 0, 20 * scale, 30 * scale, 15 * scale);
pop();

// hindleg right
push();
noStroke();
fill("#242424"); // dark grey
translate(x + 31 * scale, y + 20 * scale);
rotate(PI / 4);
rect(0, 0, 50 * scale, 50 * scale, 15 * scale);
pop();

push();
noStroke();
fill("#242424"); // dark grey
translate(x + 14 * scale, y + 83 * scale);
rotate(PI / -3);
rect(0, 0, 20 * scale, 30 * scale, 15 * scale);
pop();

// body
noStroke();
fill("#363636"); // grey
ellipse(x, y, 100 * scale, 180 * scale);
fill("white");
ellipse(x, y + 15 * scale, 50 * scale, 130 * scale);

// ears
fill("#363636"); // grey
push();
translate(x + 10 * scale, y - 115 * scale);
rotate(10);
arc(0, 0, 25 * scale, 80 * scale, 0, PI);
pop();

push();
translate(x - 10 * scale, y - 115 * scale);
rotate(-10);
arc(0, 0, 25 * scale, 80 * scale, 0, PI);
pop();

// ears shadow
fill("#242424"); // dark grey
push();
translate(x + 10 * scale, y - 115 * scale);
rotate(10);
arc(0, 0, 20 * scale, 60 * scale, 0, PI);
pop();

push();
translate(x - 10 * scale, y - 115 * scale);
rotate(-10);
arc(0, 0, 20 * scale, 60 * scale, 0, PI);
pop();

// head
fill("#5d5d5d"); // light grey
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

// tongue
fill("#eda4c8"); // rose
rect(x - 10 * scale, y - 90 * scale, 13 * scale, 30 * scale, 20 * scale);
fill("#c789a8"); // dark rose
rect(x - 4 * scale, y - 95 * scale, 2 * scale, 30 * scale, 20 * scale);

// marking
fill("white");
rect(x - 2.5 * scale, y - 130 * scale, 5 * scale, 40 * scale, 20 * scale);

// mouth
fill("#363636"); // grey
ellipse(x, y - 85 * scale, 30 * scale);

// nose
fill("black");
ellipse(x, y - 90 * scale, 15 * scale, 17 * scale);

// frontlegs
fill("#242424"); // dark grey
rect(x - 25 * scale, y, 15 * scale, 100 * scale, 30);
rect(x + 10 * scale, y, 15 * scale, 100 * scale, 30);
