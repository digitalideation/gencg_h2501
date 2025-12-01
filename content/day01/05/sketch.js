// Animated Random Lines Pattern
// Simple generative pattern with random lines that animate

let gridSize = 20;
let cellSize;

function setup() {
    createCanvas(600, 600);
    cellSize = width / gridSize;
    background(255);
}

function draw() {
    // Fade effect for trailing lines
    fill(255, 10);
    rect(0, 0, width, height);
    
    // Draw random lines in grid cells
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            if (random() > 0.95) { // Random chance to draw
                stroke(0);
                strokeWeight(1);
                
                let posX = x * cellSize;
                let posY = y * cellSize;
                
                // Random line direction
                let angle = random(TWO_PI);
                let len = cellSize * 0.8;
                
                line(
                    posX + cellSize/2,
                    posY + cellSize/2,
                    posX + cellSize/2 + cos(angle) * len,
                    posY + cellSize/2 + sin(angle) * len
                );
            }
        }
    }
}

