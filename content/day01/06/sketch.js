// Clock with Live Grid Pattern Background
// Combines time display with animated generative background

let gridSize = 15;
let cellSize;

function setup() {
    createCanvas(600, 600);
    cellSize = width / gridSize;
    angleMode(DEGREES);
    strokeCap(ROUND);
}

function draw() {
    background(20);
    
    // Draw animated grid pattern background
    drawAnimatedGrid();
    
    // Draw clock in center
    drawClock();
}

function drawAnimatedGrid() {
    // Animated grid with pulsing colors based on time
    let s = second();
    let m = minute();
    
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            let posX = x * cellSize;
            let posY = y * cellSize;
            
            // Color changes based on time and position
            let hue = (frameCount + x * 10 + y * 10) % 255;
            let brightness = map(sin(frameCount * 2 + x * 20 + y * 20), -1, 1, 30, 80);
            
            noStroke();
            fill(hue, 150, brightness);
            
            // Random shape variation
            if ((x + y + floor(frameCount / 30)) % 2 === 0) {
                ellipse(posX + cellSize/2, posY + cellSize/2, cellSize * 0.6);
            } else {
                rect(posX + cellSize * 0.2, posY + cellSize * 0.2, cellSize * 0.6);
            }
        }
    }
}

function drawClock() {
    push();
    translate(width/2, height/2);
    
    // Semi-transparent clock background
    fill(0, 150);
    noStroke();
    circle(0, 0, 220);
    
    // Clock face outline
    noFill();
    stroke(255);
    strokeWeight(4);
    circle(0, 0, 200);
    
    // Hour markers
    strokeWeight(3);
    for (let i = 0; i < 12; i++) {
        let angle = i * 30;
        let x1 = cos(angle - 90) * 80;
        let y1 = sin(angle - 90) * 80;
        let x2 = cos(angle - 90) * 95;
        let y2 = sin(angle - 90) * 95;
        stroke(255, 200);
        line(x1, y1, x2, y2);
    }
    
    // Get current time
    let h = hour();
    let m = minute();
    let s = second();
    
    // Hour hand
    push();
    let hourAngle = map(h % 12, 0, 12, 0, 360) + map(m, 0, 60, 0, 30);
    rotate(hourAngle - 90);
    stroke(255, 100, 100);
    strokeWeight(6);
    line(0, 0, 50, 0);
    pop();
    
    // Minute hand
    push();
    let minuteAngle = map(m, 0, 60, 0, 360);
    rotate(minuteAngle - 90);
    stroke(100, 200, 255);
    strokeWeight(4);
    line(0, 0, 70, 0);
    pop();
    
    // Second hand
    push();
    let secondAngle = map(s, 0, 60, 0, 360);
    rotate(secondAngle - 90);
    stroke(255, 220, 80);
    strokeWeight(2);
    line(0, 0, 85, 0);
    pop();
    
    // Center dot
    fill(255);
    noStroke();
    circle(0, 0, 10);
    
    pop();
}
