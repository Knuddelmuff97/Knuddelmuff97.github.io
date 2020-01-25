function preload() {
  // vorlage hamster: https://de.freepik.com/vektoren-kostenlos/set-von-karten-mit-nachrichten-und-hand-gezeichneten-hamster_1252054.htm#page=1&query=hamster&position=0
  hamster_up = loadImage("../../img/hamster_up.png");
  hamster_down = loadImage("../img/hamster_down.png");
  wheel = loadImage("../img/wheel.png");
  // vorlage Katze: https://de.freepik.com/vektoren-kostenlos/handgezeichnete-entzueckende-tiere-sammlung_4176026.htm#page=2&query=cat&position=1
  cat = loadImage("../img/cat.png");
  plattformWood = loadImage("../img/plattform_wood.png");
  plattformGrass = loadImage("../img/plattform_grass.png");
  plattformSand = loadImage("../img/plattform_sand.png");
  startImage = loadImage("../img/start.png");
  resetImage = loadImage("../img/reset.png");
  title = loadImage("../img/title.png");
  hamsterWave = loadImage("../img/hamster_wave.png");
  endTitle = loadImage("../img/end.png");
  howTo = loadImage("../img/how_to.png");
  closeButton = loadImage("../img/x.png");

  myFont = loadFont("../img/GROBOLD.ttf");
}

function setup() {
  createCanvas(400, 600);
  frameRate(30);
}

/*
window.addEventListener("resize", function() {
resizeCanvas(windowWidth, windowHeight);
  clear();
});
*/
new p5();
var width = windowWidth;
var height = windowHeight;
