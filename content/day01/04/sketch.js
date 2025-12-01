// Simple Procedural Drawing
// Inspired by Sol LeWitt's wall drawings
// A grid of random shapes with procedural rules

let gridSize = 8; // 8x8 grid
let cellSize;

function setup() {
    createCanvas(600, 600);
    cellSize = width / gridSize;
    noLoop(); // Draw once, or remove for animation
}

function draw() {
    background(255);
    
    // Draw grid with random shapes
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            let posX = x * cellSize;
            let posY = y * cellSize;
            
            // Random decision: circle or square
            let shapeType = random() > 0.5 ? 'circle' : 'square';
            
            // Random color from a limited palette
            let colors = [
                [255, 0, 0],    // Red
                [0, 0, 255],    // Blue
                [255, 255, 0],  // Yellow
                [0, 255, 0],    // Green
                [0, 0, 0]       // Black
            ];
            let colorChoice = colors[floor(random(colors.length))];
            
            fill(colorChoice[0], colorChoice[1], colorChoice[2]);
            noStroke();
            
            // Draw shape with some randomness in size
            let size = cellSize * random(0.4, 0.9);
            
            push();
            translate(posX + cellSize/2, posY + cellSize/2);
            
            if (shapeType === 'circle') {
                ellipse(0, 0, size, size);
            } else {
                rectMode(CENTER);
                rect(0, 0, size, size);
            }
            
            pop();
        }
    }
}

// Click to regenerate
function mousePressed() {
    redraw();
}

