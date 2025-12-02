// -----------------------------------------------------------------------------
// Adapted P_2_1_3_05 with:
// - fullscreen toggle
// - save screenshot
// - windowResize support
// - clear background
// - color modes
// - timestamp utils
// - custom saveImage()
// -----------------------------------------------------------------------------

"use strict";

// var options.tileCountX = 10;
// var options.tileCountY = 10;
var tileWidth;
var tileHeight;

var colorStep = 6;

var endSize = 0;
var stepSize = 30;

var actRandomSeed = 0;

function setup() {
  createCanvas(600, 600);
  noStroke();
  tileWidth = width / options.tileCountX;
  tileHeight = height / options.tileCountY;
}

function draw() {
  background(255);

  randomSeed(actRandomSeed);

  stepSize = min(mouseX, width) / 10;
  endSize = min(mouseY, height) / 10;

  for (var gridY = 0; gridY <= options.tileCountY; gridY++) {
    for (var gridX = 0; gridX <= options.tileCountX; gridX++) {

      var posX = tileWidth * gridX;
      var posY = tileHeight * gridY;

      // modules
      var heading = int(random(4));
      for (var i = 0; i < stepSize; i++) {
        var diameter = map(i, 0, stepSize, tileWidth, endSize);
        fill(255 - i * colorStep);
        switch (heading) {
        case 0: ellipse(posX + i, posY, diameter, diameter); break;
        case 1: ellipse(posX, posY + i, diameter, diameter); break;
        case 2: ellipse(posX - i, posY, diameter, diameter); break;
        case 3: ellipse(posX, posY - i, diameter, diameter); break;
        }
      }
    }
  }

  fill(255);
  textSize(100);
  text(toInt(deltaTime), width/2-50, height/2);
}

function mousePressed() {
  actRandomSeed = random(100000);
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}

// -----------------------------------------------------------------------------
// Interaction & Utility Functions 
// -----------------------------------------------------------------------------

function mousePressed() {
  actRandomSeed = random(100000);
}

function keyPressed() {
  if (keyCode === 32) background(backgroundColor); // SPACE clears

  if (key == "s" || key == "S") saveImage(width, height);

  switch (key) {
    case "1":
      options.color = 1;
      break;
    case "2":
      options.color = 2;
      break;
    case "3":
      options.color = 3;
      break;
  }
}

// Fullscreen toggle
function doubleClicked() {
  goFullScreen();
}

function goFullScreen() {
  let fs = fullscreen();
  fullscreen(!fs);
}

// Resize behavior
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
  tileWidth = width / tileCountX;
  tileHeight = height / tileCountY;
  background(backgroundColor);
}

// Utils
function toInt(value) {
  return ~~value;
}

function timestamp() {
  return Date.now();
}

function saveImage(w, h) {
  let img = get(width / 2 - w / 2, height / 2 - h / 2, w, h);
  save(img, "screenshot.jpg");
}
