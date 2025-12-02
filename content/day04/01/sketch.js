// Simple Spiral Drawing Machine
// Creates a static spiral pattern with controlled randomness

let angle = 0;
let radius = 0;

function setup() {
    createCanvas(600, 600);
    background(20);
    stroke(255, 150);
    strokeWeight(1);
    noFill();
    
    // Draw the spiral
    beginShape();
    for (let i = 0; i < 500; i++) {
        let x = width/2 + cos(angle) * radius;
        let y = height/2 + sin(angle) * radius;
        
        // Add slight randomness to create organic feel
        x += random(-2, 2);
        y += random(-2, 2);
        
        vertex(x, y);
        
        angle += 0.3;
        radius += 0.5;
    }
    endShape();
    
    noLoop();
}

// Click to regenerate
function mousePressed() {
    angle = 0;
    radius = 0;
    background(20);
    loop();
    redraw();
    noLoop();
}

