// Lissajous Curve Drawing Machine
// Creates parametric curves based on mouse position

let angle = 0;
let path = [];
let a = 3; // Frequency for x
let b = 2; // Frequency for y

function setup() {
    createCanvas(600, 600);
    background(26, 26, 46);
    stroke(100, 200, 255);
    strokeWeight(2);
    noFill();
}

function draw() {
    // Fade background slightly
    fill(26, 26, 46, 10);
    rect(0, 0, width, height);
    
    // Update frequencies based on mouse position
    a = map(mouseX, 0, width, 1, 8);
    b = map(mouseY, 0, height, 1, 8);
    
    // Calculate point on Lissajous curve
    let x = width/2 + 200 * sin(a * angle);
    let y = height/2 + 200 * sin(b * angle);
    
    // Store path
    path.push({x: x, y: y});
    if (path.length > 500) {
        path.shift();
    }
    
    // Draw the curve
    stroke(100, 200, 255, 200);
    strokeWeight(2);
    beginShape();
    for (let p of path) {
        vertex(p.x, p.y);
    }
    endShape();
    
    // Draw current point
    fill(255, 100, 100);
    noStroke();
    ellipse(x, y, 8, 8);
    
    angle += 0.05;
}

// Click to clear
function mousePressed() {
    background(26, 26, 46);
    path = [];
    angle = 0;
}

