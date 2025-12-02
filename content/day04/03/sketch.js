// Interactive Pendulum Drawing Machine
// Double pendulum system that creates chaotic patterns

let angle1 = Math.PI / 2;
let angle2 = Math.PI / 2;
let angleVel1 = 0;
let angleVel2 = 0;
let len1 = 150;
let len2 = 150;
let mass1 = 20;
let mass2 = 20;
let gravity = 1;
let damping = 0.999;
let cx, cy;
let prevX, prevY;
let drawing = [];

function setup() {
    createCanvas(600, 600);
    cx = width / 2;
    cy = 150;
    background(10);
    stroke(255, 100);
    strokeWeight(1);
}

function draw() {
    // Fade effect
    fill(10, 10);
    rect(0, 0, width, height);
    
    // Physics calculations
    let num1 = -gravity * (2 * mass1 + mass2) * sin(angle1);
    let num2 = -mass2 * gravity * sin(angle1 - 2 * angle2);
    let num3 = -2 * sin(angle1 - angle2) * mass2;
    let num4 = angleVel2 * angleVel2 * len2 + angleVel1 * angleVel1 * len1 * cos(angle1 - angle2);
    let den = len1 * (2 * mass1 + mass2 - mass2 * cos(2 * angle1 - 2 * angle2));
    let angleAcc1 = (num1 + num2 + num3 * num4) / den;
    
    num1 = 2 * sin(angle1 - angle2);
    num2 = angleVel1 * angleVel1 * len1 * (mass1 + mass2);
    num3 = gravity * (mass1 + mass2) * cos(angle1);
    num4 = angleVel2 * angleVel2 * len2 * mass2 * cos(angle1 - angle2);
    den = len2 * (2 * mass1 + mass2 - mass2 * cos(2 * angle1 - 2 * angle2));
    let angleAcc2 = (num1 * (num2 + num3 + num4)) / den;
    
    // Update velocities and angles
    angleVel1 += angleAcc2;
    angleVel2 += angleAcc2;
    angleVel1 *= damping;
    angleVel2 *= damping;
    angle1 += angleVel1;
    angle2 += angleVel2;
    
    // Calculate positions
    let x1 = cx + len1 * sin(angle1);
    let y1 = cy + len1 * cos(angle1);
    let x2 = x1 + len2 * sin(angle2);
    let y2 = y1 + len2 * cos(angle2);
    
    // Draw pendulum arms
    stroke(100, 100, 150, 100);
    strokeWeight(2);
    line(cx, cy, x1, y1);
    line(x1, y1, x2, y2);
    
    // Draw trail
    if (prevX !== undefined) {
        stroke(100, 200, 255, 150);
        strokeWeight(1);
        line(prevX, prevY, x2, y2);
        
        // Store drawing history
        drawing.push({x: x2, y: y2});
        if (drawing.length > 500) {
            drawing.shift();
        }
    }
    
    prevX = x2;
    prevY = y2;
    
    // Draw pendulum bobs
    fill(255, 100, 100);
    noStroke();
    ellipse(x1, y1, mass1, mass1);
    fill(100, 255, 100);
    ellipse(x2, y2, mass2, mass2);
}

// Click to reset
function mousePressed() {
    angle1 = map(mouseX, 0, width, 0, TWO_PI);
    angle2 = map(mouseY, 0, height, 0, TWO_PI);
    angleVel1 = 0;
    angleVel2 = 0;
    prevX = undefined;
    prevY = undefined;
    drawing = [];
    background(10);
}

