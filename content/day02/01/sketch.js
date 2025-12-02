// Static Black/White Geometric Pattern
// Simple tiling pattern with random black and white shapes

let gridSize = 12;
let cellSize;

function setup() {
    createCanvas(600, 600);
    cellSize = width / gridSize;
    noLoop(); // Static image
    randomSeed(42); // Fixed seed for reproducible pattern
}

function draw() {
    background(255);
    
    // Draw grid with random black/white shapes
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            let posX = x * cellSize;
            let posY = y * cellSize;
            
            // Random: black or white
            if (random() > 0.5) {
                fill(0);
            } else {
                fill(255);
            }
            
            noStroke();
            
            // Random shape: circle or square
            if (random() > 0.5) {
                ellipse(posX + cellSize/2, posY + cellSize/2, cellSize * 0.8, cellSize * 0.8);
            } else {
                rect(posX + cellSize * 0.1, posY + cellSize * 0.1, cellSize * 0.8, cellSize * 0.8);
            }
        }
    }
}

// Click to regenerate
function mousePressed() {
    randomSeed(millis());
    redraw();
}

