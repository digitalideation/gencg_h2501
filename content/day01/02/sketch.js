let canvas, video;

// Default P5 setup function
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.hide();
}

// Default P5 draw loop function
function draw() {
  drawImage(video);
}

function keyPressed() {
  if (key == "s" || key == "S") saveImage(width, height);
}

// Tools

// Make sketch full screen
function goFullScreen() {
  let isFullScreen = Boolean(fullscreen());
  fullscreen(!isFullScreen);
}

// Resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
}

// Sketch is double clicked
function doubleClicked() {
  goFullScreen();
}

// Timestamp
function timestamp() {
  return Date.now();
}

// Thumb
function saveImage(w, h) {
  let img = get(width / 2 - w / 2, height / 2 - h / 2, w, h);
  save(img, `screenshot-${timestamp()}.jpg`);
}

// Draw centered full page image
function drawImage(img) {
  // var
  let imgWidth = width;
  let imgHeight = height;
  let imgPosX = 0;
  let imgPosY = 0;

  // Calculate aspect ratios
  const imgAspectRatio = img.width / img.height;
  const sketchAspectRatio = width / height;

  // Calculate img size and position
  if (sketchAspectRatio >= imgAspectRatio) {
    imgHeight = (img.height * width) / img.width;
    imgPosY = -(imgHeight - height) / 2;
  } else {
    imgWidth = (img.width * height) / img.height;
    imgPosX = -(imgWidth - width) / 2;
  }

  // Draw image
  image(img, imgPosX, imgPosY, imgWidth, imgHeight);
}
